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
    FILE_NAME_BLANK_ERROR(HttpStatus.BAD_REQUEST,"400", "파일 이름이 빈 값입니다."),
    FILE_DELETE_ERROR(HttpStatus.BAD_REQUEST, "400", "파일 삭제에 실패했습니다."),

    // Token
    JWT_TOKEN_WRONG_SIGNATURE(HttpStatus.UNAUTHORIZED, "401", "잘못된 JWT 서명입니다"),
    JWT_TOKEN_NOT_SUPPORTED(HttpStatus.UNAUTHORIZED, "401", "지원되지 않는 JWT 토큰입니다."),
    JWT_TOKEN_WRONG_FORM(HttpStatus.UNAUTHORIZED, "401", "JWT 토큰이 잘못되었습니다."),
    JWT_TOKEN_ACCESS_DENIED(HttpStatus.FORBIDDEN, "403", "접근이 거부되었습니다."),
    JWT_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "401", "JWT 토큰을 찾을 수 없습니다."),

    SPRING_SECURITY_AUTHENTICATION_UNKNOWN_ERROR(HttpStatus.UNAUTHORIZED, "401", "Authentication 객체가 존재하지 않습니다."),
    SPRING_SECURITY_AUTHENTICATION_NOT_FOUND(HttpStatus.UNAUTHORIZED, "401", "Authentication 객체에 유효한 principal 객체가 존재하지 않습니다."),

    // 로그인
    LOGIN_NOT_FOUND_ID(HttpStatus.NOT_FOUND, "404", "해당 아이디를 찾을 수 없습니다"),
    NOT_FOUND_USER_INFO(HttpStatus.NOT_FOUND, "404", "해당 유저가 존재하지 않습니다"),

    // 산타 편지
    NOT_FOUND_SANTA_LETTER(HttpStatus.NOT_FOUND, "404", "해당 산타 편지가 존재하지 않습니다"),
    NOT_FOUND_SEND_LETTER(HttpStatus.NOT_FOUND, "404", "편지가 존재하지 않습니다"),
    NOT_FOUND_REPLY_LETTER(HttpStatus.NOT_FOUND, "404", "편지가 존재하지 않습니다"),

    // formatter 오류
    FORMAT_NOT_MATCH(HttpStatus.BAD_REQUEST, "400", "변환 형식이 일치하지 않습니다."),

    // 어드벤트 캘린더
    D_DAY_IS_NOT_COMING(HttpStatus.FORBIDDEN, "400", "아직 상자를 열람할 수 없습니다."),
    BOX_NOT_FOUND(HttpStatus.NOT_FOUND, "404", "해당 상자가 존재하지 않습니다."),
    NOT_YOUR_BOX(HttpStatus.FORBIDDEN, "400", "상자의 주인만 상자를 열 수 있습니다."),
    EMPTY_BOX_ERROR(HttpStatus.BAD_REQUEST, "400", "빈 상자는 선물할 수 없습니다."),
    SELF_GIFT_ERROR(HttpStatus.BAD_REQUEST, "400", "자기 자신에게 선물할 수 없습니다."),
    CHRISTMAS_IS_OVER(HttpStatus.BAD_REQUEST, "400", "1일에서 25일까지만 선물 가능합니다."),

    // 팔로우 팔로잉
    ALREADY_FOLLOWED(HttpStatus.BAD_REQUEST, "400", "이미 팔로우 중입니다."),

    // 로그인
    FOLLOW_NOT_FOUND_USER_ID(HttpStatus.NOT_FOUND, "404", "해당 아이디를 찾을 수 없습니다"),
    FOLLOW_NOT_FOUND_USER_INFO(HttpStatus.NOT_FOUND, "404", "해당 유저가 존재하지 않습니다"),
    FOLLOW_ALREADY_FOLLOWING(HttpStatus.BAD_REQUEST, "400", "이미 팔로우 중입니다"),
    FOLLOW_NOT_FOLLOWING(HttpStatus.BAD_REQUEST, "400", "팔로우 중이 아닙니다"),

    // store
    NOT_FOUND_ITEM_INFO(HttpStatus.NOT_FOUND, "404", "해당 아이템이 존재하지 않습니다."),
    NOT_FOUND_USER_ITEM_INFO(HttpStatus.NOT_FOUND, "404", "유저가 해당 아이템을 가지고 있지 않습니다."),
    ITEM_COUNT_UNDER_ZERO_ERROR(HttpStatus.BAD_REQUEST, "400", "아이템 개수는 0보다 작을 수 없습니다."),
    NOT_ENOUGH_MONEY_ERROR(HttpStatus.BAD_REQUEST, "400", "잔고가 부족합니다."),
    ITEM_LIMIT_EXCESS(HttpStatus.BAD_REQUEST, "400", "아이템은 24개까지 보유할 수 있습니다."),

    // SSE
    SSE_SEND_ERROR(HttpStatus.BAD_REQUEST, "400", "SSE 전송 오류"),
    NOTI_NOT_FOUND(HttpStatus.NOT_FOUND, "404", "해당 알림이 존재하지 않습니다."),
    NOTI_ACCESS_ERROR(HttpStatus.FORBIDDEN, "400", "알림 당사자만 알림을 조회할 수 있습니다."),
    WRONG_NOTI_TYPE_ERROR(HttpStatus.BAD_REQUEST, "400", "잘못된 알림 타입입니다."),

    // coin
    EARN_NOTHING(HttpStatus.BAD_REQUEST, "400", "게임 머니 값이 입력되지 않았습니다."),

    // tree
    TREE_URL_NOT_FOUND(HttpStatus.BAD_REQUEST, "400", "트리 주소를 찾을 수 없습니다."),

    // 공통
    UTILITY_CLASS_ERROR(HttpStatus.BAD_REQUEST, "400", "유틸리티 클래스는 접근할 수 없습니다.");
    
    private final HttpStatus status;
    private final String errorCode;
    private final String errorMessage;
}
