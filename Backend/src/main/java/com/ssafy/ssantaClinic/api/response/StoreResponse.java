package com.ssafy.ssantaClinic.api.response;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

public class StoreResponse {

    @Data
    @Builder
    public static class BuyItemResponse {
        private int money;
    }

    @Data
    @Builder
    public static class UserItemListResponse {
        private int ItemId;
        private int count;
    }
}
