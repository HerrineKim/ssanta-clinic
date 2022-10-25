package com.ssafy.ssantaClinic.api.request;

import lombok.Data;

public class CalendarRequest {
    @Data
    public static class sendRequest{
        private String content;
        private String sender;
        private String date;
        private int receiverId;
    }
}
