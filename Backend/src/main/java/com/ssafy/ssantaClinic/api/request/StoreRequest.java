package com.ssafy.ssantaClinic.api.request;

import lombok.Data;

public class StoreRequest {

    @Data
    public static class BuyItemRequest{
        private int userId;
        private int itemId;
        private int count;
    }
}
