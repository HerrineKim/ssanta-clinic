package com.ssafy.ssantaClinic.common.auth.filter;


import com.ssafy.ssantaClinic.common.auth.util.JwtManager;
import com.ssafy.ssantaClinic.common.auth.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

/**
 * @FileName : jwtFilter
 * @Class 설명 : controller 진입 전 jwt 토큰을 검증하는 필터. JwtSecurityConfig에 등록한다.
 */
@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {
    final private JwtManager jwtManager;

    /**
     * @Method Name : doFilter(override)
     * @Method 설명 : jwt 토큰을 검증하고, 검증된 토큰으로부터 Authentication 객체를 생성해 SecurityContext에 저장한다.<br>
     * 검증에 실패하면 not authorized 에러를 발생시킨다.
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // controller 진입 전 filter로 Token 검증
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String jwt = JwtUtil.resolveToken(httpServletRequest);
        String requestURI = httpServletRequest.getRequestURI();

        if(StringUtils.hasText(jwt) && jwtManager.validateToken(jwt)) {
            Authentication authentication = jwtManager.getAuthentication(jwt);
            // SecurityContext에 Authentication 객체를 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Token의 시간이 30분 이하로 남았으면 갱신 해준다.
            if(!requestURI.equals("/api/user/join") && !requestURI.equals("/api/user/login") && !requestURI.equals("/api/error")) {
                jwt = JwtUtil.resolveToken((HttpServletRequest) request);
                if(StringUtils.hasText(jwt) && jwtManager.validateToken(jwt)){
                    Date expireTime  = jwtManager.getExpirationDate(jwt);
                    long timeDifference = (expireTime.getTime() - new Date().getTime());
                    long minutes_difference = timeDifference / (1000*60);

                    if(minutes_difference <= 30) {
                        // SecurityContext에서 Authentication 객체를 가져온다.
                        authentication = SecurityContextHolder.getContext().getAuthentication();

                        // 해당 jwt는 더 이상 사용하지 못하게 blockList에 저장해둔다.
                        jwtManager.deleteToken(jwt);
                        ((HttpServletResponse) response).setHeader("Authorization", "Bearer " + jwtManager.createToken(authentication));
                    }
                }
            }
        } else {
            logger.debug("JWT token is not valid");
//            ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "The token is not valid.");
        }



        chain.doFilter(request, response);
    }
}
