package com.ssafy.ssantaClinic.api.request;

import lombok.Data;

public class UserRequest {

    @Data
    public static class JoinRequest{
        private int userId;
        private String email;
        private String password;
        private String nickName;
    }

    @Data
    public static class CheckDuplicateNicknameRequest{
        private String nickName;
    }

    @Data
    public static class EmailRequest{
        private String email;
    }

    @Data
    public static class LoginRequest{
        private String email;
        private String password;
    }

    @Data
    public static class UrlRequest{
        private String url;
        private String email;
    }
}
