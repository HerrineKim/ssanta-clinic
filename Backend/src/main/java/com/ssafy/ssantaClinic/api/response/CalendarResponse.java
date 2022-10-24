package com.ssafy.ssantaClinic.api.response;

import lombok.Builder;
import lombok.Data;

/**
 * @FileName : CalendarResponse
 * @Class 설명 : 회원 어드벤트 캘린더 조회 API 요청에 대한 리스폰스 바디 정의
 */
public class CalendarResponse {
    @Data
    @Builder
    public static class GetCalendarResponse {
        private int date;
        private int cnt;
    }
}
