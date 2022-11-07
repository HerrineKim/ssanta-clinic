package com.ssafy.ssantaClinic.api.request;

import lombok.Data;

import java.util.List;

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

    @Data
    public static class UpdatePasswordRequest{
        private String password;
        private int userId;
    }

    @Data
    public static class UpdateMoneyRequest{
        private int userId;
        private int money;
    }

    @Data
    public static class UpdateUserItemRequest{
        private int userId;
        private List<Integer> itemList;
    }
}
