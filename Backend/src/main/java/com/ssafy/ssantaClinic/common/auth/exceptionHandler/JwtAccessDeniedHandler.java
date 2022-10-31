package com.ssafy.ssantaClinic.common.auth.exceptionHandler;

import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @FileName : JwtAccessDeniedHandler
 * @Class 설명 : JWT 토큰이 유효하지 않은 경우 or 권한 부족할 때 403 에러를 리턴하는 핸들러
 */
@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ErrorCode accessDeniedHandler = ErrorCode.JWT_TOKEN_ACCESS_DENIED;
        response.sendError(accessDeniedHandler.getStatus().value(), accessDeniedHandler.getErrorMessage());
    }
}
