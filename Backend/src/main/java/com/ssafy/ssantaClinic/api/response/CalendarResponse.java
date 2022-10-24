package com.ssafy.ssantaClinic.api.response;

import com.ssafy.ssantaClinic.db.entity.AdventCalendar;
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

    @Data
    @Builder
    public static class GetBoxResponse {
        private int boxId;
        private String content;
        private String audioUrl;
        private String sender;
        private boolean isRead;

        public GetBoxResponse(AdventCalendar calendar) {
            this.boxId = calendar.getAdventCalendarId();
            this.content = calendar.getContent();
            this.audioUrl = calendar.getAudioUrl();
            this.sender = calendar.getSender().getNickName();
            this.isRead = calendar.getIsRead();
        }
    }

    @Data
    @Builder
    public static class GetBoxDetailResponse {
        private String content;
        private String audioUrl;
        private String sender;
    }
}
