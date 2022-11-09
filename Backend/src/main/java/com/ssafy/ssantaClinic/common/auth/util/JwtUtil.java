package com.ssafy.ssantaClinic.common.auth.util;

import com.ssafy.ssantaClinic.common.auth.UserSecurity;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

/**
 * @FileName : JwtUtil
 * @Class 설명 : Jwt 관련 유틸리티 클래스
 */
@Configuration
public class JwtUtil {
    public static final String AUTHORIZATION_HEADER = "Authorization";
    /**
     * @Method Name : resolveToken
     * @Method 설명 :  request header에서 jwt 토큰을 추출한다.
     */
    public static String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader(AUTHORIZATION_HEADER);
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    /**
     * @Method Name : getCurrentUserEmail
     * @Method 설명 : Security Context의 Authentication 객체를 이용해 현재 로그인된 사용자의 email을 반환한다.
     */
    public static Optional<String> getCurrentUserEmail() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null) {
            return Optional.empty();
        }

        String username = null;
        if(authentication.getPrincipal() instanceof UserDetails) {
            UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
            username = springSecurityUser.getUsername();
        } else if(authentication.getPrincipal() instanceof String) {
            username = (String) authentication.getPrincipal();
        }

        return Optional.ofNullable(username);
    }

    /**
     * @Method Name : getCurrentUserId
     * @Method 설명 : Security Context의 Authentication 객체를 이용해 현재 로그인된 사용자의 userID를 반환한다.
     */
    public static int getCurrentUserId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null) {
            throw new CustomException(ErrorCode.SPRING_SECURITY_AUTHENTICATION_NOT_FOUND);
        }
        UserSecurity user = (UserSecurity) (authentication.getPrincipal());

        return user.getUserId();
    }

    public static String getCurrentNickname(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null) {
            throw new CustomException(ErrorCode.SPRING_SECURITY_AUTHENTICATION_NOT_FOUND);
        }
        UserSecurity user = (UserSecurity) (authentication.getPrincipal());
        return user.getNickName();
    }

    /**
     * @Method Name : passwordEncoder
     * @Method 설명 : 비밀번호 암호화 객체를 생성한다.
     */
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
