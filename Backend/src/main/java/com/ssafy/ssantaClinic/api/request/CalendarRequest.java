package com.ssafy.ssantaClinic.api.request;

import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import lombok.Data;

public class CalendarRequest {
    private CalendarRequest() {
        throw new CustomException(ErrorCode.UTILITY_CLASS_ERROR);
    }
    @Data
    public static class sendRequest{
        private String content;
        private String sender;
        private String createdAt;
        private int day;
        private int receiverId;
    }
}
