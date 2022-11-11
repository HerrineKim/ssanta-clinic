package com.ssafy.ssantaClinic.api.response;

import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.db.entity.Notification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

/**
 * @FileName : NotiResponse
 * @Class 설명 : 알림 관련 API 요청에 대한 리스폰스 바디 정의
 */
public class NotiResponse {
    private NotiResponse() {
        throw new CustomException(ErrorCode.UTILITY_CLASS_ERROR);
    }
    @Data
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
