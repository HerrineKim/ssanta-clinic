package com.ssafy.ssantaClinic.api.response;

import lombok.Builder;
import lombok.Data;

/**
 * @FileName : BoxDetailResponse
 * @Class 설명 : 상자 상세 정보 조회 API 요청에 대한 리스폰스 바디 정의
 */
public class BoxDetailResponse {
    @Data
    @Builder
    public static class GetBoxDetailResponse {
        private String content;
        private String audioUrl;
        private String sender;
    }
}
