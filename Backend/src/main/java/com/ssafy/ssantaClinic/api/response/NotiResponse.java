package com.ssafy.ssantaClinic.api.response;

import com.ssafy.ssantaClinic.db.entity.AdventCalendar;
import com.ssafy.ssantaClinic.db.entity.AdventCalendarImg;
import com.ssafy.ssantaClinic.db.entity.Notification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @FileName : NotiResponse
 * @Class 설명 : 알림 관련 API 요청에 대한 리스폰스 바디 정의
 */
public class NotiResponse {
    @Data
    @Builder
    public static class GetNotiListReponse {
        private List<GetNotiResponse> notiList;
    }

    @Data
    @Builder
    @AllArgsConstructor
    public static class GetNotiResponse {
        private int notiId;
        private String url;
        private String message;
        private String type;

        public GetNotiResponse(Notification noti) {
            this.notiId = noti.getNotiId();
            this.url = noti.getUrl();
            this.message = noti.getMessage();
            this.type = String.valueOf(noti.getType());
        }
    }
}
