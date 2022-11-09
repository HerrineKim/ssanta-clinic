package com.ssafy.ssantaClinic.api.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
    public static class NicknameRequest {
        @NotBlank(message = "nickName은 최소 하나 이상의 문자로 이루어져야 합니다.")
        private String nickName;
    }

    @Data
    public static class EmailRequest{
        @NotBlank(message = "email은 최소 하나 이상의 문자로 이루어져야 합니다.")
        private String email;
    }

    @Data
    public static class LoginRequest{
        private String email;
        private String password;
    }

    @Data
    public static class UrlRequest{
        @NotBlank(message = "url은 최소 하나 이상의 문자로 이루어져야 합니다.")
        private String url;
        @NotBlank(message = "email은 최소 하나 이상의 문자로 이루어져야 합니다.")
        private String email;
    }

    @Data
    public static class UpdatePasswordRequest{
        @NotBlank(message = "password는 최소 하나 이상의 문자로 이루어져야 합니다.")
        private String password;
        @NotBlank(message = "findPasswordNum은 최소 하나 이상의 문자로 이루어져야 합니다.")
        private String findPasswordNum;
    }

    @Data
    public static class UpdateMoneyRequest{
        @NotNull(message = "userId는 최소 하나 이상의 숫자로 이루어져야 합니다.")
        private int userId;
        @NotNull(message = "money는 최소 하나 이상의 숫자로 이루어져야 합니다.")
        private int money;
    }

    @Data
    public static class UpdateUserItemRequest{
        @NotNull(message = "userId는 최소 하나 이상의 숫자로 이루어져야 합니다.")
        private int userId;
        @NotNull(message = "itemList는 최소 하나 이상의 원소로 이루어져야 합니다.")
        private List<Integer> itemList;
    }
}
