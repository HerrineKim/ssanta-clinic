package com.ssafy.ssantaClinic.api.response;

import lombok.Builder;
import lombok.Data;

public class UserResponse {
    @Data
    @Builder
    public static class UserDataResponse {
        private int userId;
        private String email;
        private String nickName;
    }

    @Data
    @Builder
    public static class DuplicatedResponse {
        private Boolean duplicated;
    }

    @Data
    @Builder
    public static class findPasswordResponse {
        private String findPasswordNum;
    }

}
