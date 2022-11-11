package com.ssafy.ssantaClinic.api.response;

import com.ssafy.ssantaClinic.api.request.CalendarRequest;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.db.entity.AdventCalendar;
import com.ssafy.ssantaClinic.db.entity.AdventCalendarImg;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @FileName : CalendarResponse
 * @Class 설명 : 회원 어드벤트 캘린더 조회 API 요청에 대한 리스폰스 바디 정의
 */
public class CalendarResponse {
    private CalendarResponse() {
        throw new CustomException(ErrorCode.UTILITY_CLASS_ERROR);
    }

    @Data
    @Builder
    public static class GetCalendarResponse {
        private int date;
        private int cnt;
    }

    @Data
    @Builder
    @AllArgsConstructor
    public static class GetBoxResponse {
        private int boxId;
        private String content;
        private String audioUrl;
        private List<String> imges;
        private String sender;
        private boolean isRead;

        public GetBoxResponse(AdventCalendar calendar) {
            this.boxId = calendar.getId();
            this.content = calendar.getContent();
            this.audioUrl = calendar.getAudioUrl();
            this.imges = calendar.getImgList().stream()
                    .map(AdventCalendarImg::getImgUrl).collect(Collectors.toList());
            this.sender = calendar.getSender();
            this.isRead = calendar.isRead();
        }
    }

    @Data
    @Builder
    public static class GetBoxDetailResponse {
        private String content;
        private String audioUrl;
        private List<String> imges;
        private String sender;
    }
}
