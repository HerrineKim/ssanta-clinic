package com.ssafy.ssantaClinic.common.auth.util;

import com.ssafy.ssantaClinic.common.auth.UserSecurity;
import com.ssafy.ssantaClinic.db.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * @FileName : JwtManager
 * @Class 설명 : JWT 토큰 생성 및 검증을 위한 클래스
 */
@Component
public class JwtManager implements InitializingBean {
    private final Logger logger = LoggerFactory.getLogger(JwtManager.class);
    private static final String AUTHORITIES_KEY = "auth";
    private static final String USER_ID = "userId";
    private static final String NICK_NAME = "nickName";
    private final String secret;

    private UserRepository userRepository;
    private final long tokenValidityInMilliseconds;
    private Key key;

    // 로그아웃 요청으로 더 이상 유효하지 않은 토큰을 저장할 Map
    // 이후 로그아웃 요청이 들어올 때, 해당 토큰이 유효하지 않은 토큰인지 검증할 때 사용
    // ConcurrentHashMap은 동기화를 보장하는 HashMap
    // 현재 토큰을 한번 저장하고 나면 삭제하지 않는 문제가 있음. 매번 삭제하는 것은 성능적으로 좋지 않을 것 같아, 차후 redis를 사용하여 해결할 수 있는지 검토 예정.
    private final Map<String,Date> blockList = new ConcurrentHashMap<>();

    /**
     * @Method Name : JwtManager 생성자
     * @Method 설명 :  account.properties 파일에서 JWT 관련 설정값을 가져온다.
     */
    public JwtManager(@Value("${jwt.secret}") String secret, @Value("${jwt.token-validity-in-seconds}") long tokenValidityInMilliseconds, UserRepository userRepository) {
        this.secret = secret;
        this.tokenValidityInMilliseconds = tokenValidityInMilliseconds * 1000;
        this.userRepository = userRepository;
    }

    /**
     * @Method Name : afterPropertiesSet
     * @Method 설명 : JWT 토큰 생성을 위한 secret key를 생성한다.<br>
     * InitializingBean를 implements 하여 afterPropertiesSet() 메소드를 오버라이딩하면, spring에서 injection 이후 이 메소드를 실행한다.
     */
    @Override
    public void afterPropertiesSet() throws Exception {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * @Method Name : createToken
     * @Method 설명 : Authentication 객체의 권한을 이용해서 JWT 토큰을 생성한다.
     * @param authentication
     * @return JwtToken
     */
    public String createToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date validity = new Date(now + this.tokenValidityInMilliseconds);

        com.ssafy.ssantaClinic.db.entity.User user = userRepository.getUserByEmail(authentication.getName());
        // 토큰 생성
        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim(USER_ID, user.getUserId())
                .claim(NICK_NAME, user.getNickName())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    /**
     * @Method Name : deleteToken
     * @Method 설명 : 토큰을 더 이상 사용할 수 없게 blockList에 저장한다.
     * @param token
     * @return JwtToken
     */
    public boolean deleteToken(String token) {
        try {
            Date now = new Date();
            blockList.put(token, now);
    	    return true;
        }catch (Exception e) {
            logger.error("deleteToken error : {}", e.getMessage());
            return false;
        }
    }

    /**
     * @Method Name : getAuthentication
     * @Method 설명 : JWT 토큰을 분석해서 Authentication 객체를 리턴한다.
     * @param token
     * @return Authentication
     */
    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

//        Collection<? extends GrantedAuthority> authorities =
//                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
//                        .map(SimpleGrantedAuthority::new)
//                        .collect(Collectors.toList());
        List<GrantedAuthority> authorities = new ArrayList<>();
        int userId = claims.get(USER_ID, Integer.class);
        String nickName = claims.get(NICK_NAME, String.class);
        UserSecurity principal = new UserSecurity(userId, nickName, claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    /**
     * @Method Name : validateToken
     * @Method 설명 : JWT 토큰의 유효성을 검증한다.
     * @param token
     * @return boolean
     */
    public boolean validateToken(String token){
        try {
            // 로그아웃 처리된 토큰은 사용할 수 없다.
            if(blockList.containsKey(token)){
                return false;
            }
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            logger.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            logger.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            logger.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            logger.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    public Date getExpirationDate(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }
    public int getUserId(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get(USER_ID, Integer.class);
    }

    public String getEmail(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String getNickName(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get(NICK_NAME, String.class);
    }
}
