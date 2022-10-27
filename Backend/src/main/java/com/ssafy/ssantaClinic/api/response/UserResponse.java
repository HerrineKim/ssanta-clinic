package com.ssafy.ssantaClinic.api.response;

import lombok.Builder;
import lombok.Data;

public class UserResponse {

    @Data
    @Builder
    public static class GetUserResponse {
        private int userId;
        private String email;
        private String nickName;
    }

    @Data
    @Builder
    public static class DuplicatedResponse {
        private Boolean duplicated;
    }

}
