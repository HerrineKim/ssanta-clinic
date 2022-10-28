package com.ssafy.ssantaClinic.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    //img
    IMAGE_UPLOAD_ERROR(HttpStatus.BAD_REQUEST, "400", "이미지 업로드에 실패했습니다"),
    WRONG_IMAGE_FORMAT(HttpStatus.BAD_REQUEST, "400", "지원하지 않는 파일 형식입니다"),

    // Token
    JWT_TOKEN_WRONG_SIGNATURE(HttpStatus.UNAUTHORIZED, "401", "잘못된 JWT 서명입니다"),
    JWT_TOKEN_NOT_SUPPORTED(HttpStatus.UNAUTHORIZED, "401", "지원되지 않는 JWT 토큰입니다."),
    JWT_TOKEN_WRONG_FORM(HttpStatus.UNAUTHORIZED, "401", "JWT 토큰이 잘못되었습니다."),
    JWT_TOKEN_ACCESS_DENIED(HttpStatus.FORBIDDEN, "403", "접근이 거부되었습니다."),
    JWT_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "401", "JWT 토큰을 찾을 수 없습니다."),

    // 로그인
    LOGIN_NOT_FOUND_ID(HttpStatus.NOT_FOUND, "404", "해당 아이디를 찾을 수 없습니다"),
    NOT_FOUND_USER_INFO(HttpStatus.NOT_FOUND, "404", "해당 유저가 존재하지 않습니다"),

    // formatter 오류
    FORMAT_NOT_MATCH(HttpStatus.BAD_REQUEST, "400", "변환 형식이 일치하지 않습니다."),

    // 어드벤트 캘린더
    D_DAY_IS_NOT_COMING(HttpStatus.FORBIDDEN, "403", "아직 상자를 열람할 수 없습니다."),
    BOX_NOT_FOUND(HttpStatus.NOT_FOUND, "404", "해당 상자가 존재하지 않습니다."),
    BOX_OPEN_WRONG_ACCESS(HttpStatus.FORBIDDEN, "403", "상자의 주인만 상자를 열 수 있습니다."),
    EMPTY_BOX_ERROR(HttpStatus.BAD_REQUEST, "400", "빈 상자는 선물할 수 없습니다.");

    private final HttpStatus status;
    private final String errorCode;
    private final String errorMessage;
}
