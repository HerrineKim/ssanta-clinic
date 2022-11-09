package com.ssafy.ssantaClinic.api.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class StoreRequest {

    @Data
    public static class BuyItemRequest{
        @NotNull(message = "userId는 최소 하나 이상의 숫자로 이루어져야 합니다.")
        private int userId;
        @NotNull(message = "itemId는 최소 하나 이상의 숫자로 이루어져야 합니다.")
        private int itemId;
        @NotNull(message = "count는 최소 하나 이상의 숫자로 이루어져야 합니다.")
        private int count;
    }
}
