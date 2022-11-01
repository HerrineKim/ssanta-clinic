package com.ssafy.ssantaClinic.common.auth.exceptionHandler;

import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @FileName Name : JwtAuthenticationEntryPoint
 * @Class 설명 : JWT 토큰이 유효하지 않은 경우(존재하지 않는 경우) 401 에러를 리턴하는 핸들러
 */
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        ErrorCode authenticationEntryPoint = ErrorCode.JWT_TOKEN_NOT_FOUND;
        response.sendError(authenticationEntryPoint.getStatus().value(), authenticationEntryPoint.getErrorMessage());
    }
}