package com.ssafy.ssantaClinic.api.response;

import lombok.*;

/**
 * @FileName : BoxResponse
 * @Class 설명 : 상자 목록 조회 API 요청에 대한 리스폰스 바디 정의
 */
public class BoxResponse {
    @Data
    @Builder
    public static class GetBoxResponse {
        private int boxId;
        private String content;
        private String audioUrl;
        private String sender;
        private boolean isRead;
    }
}
