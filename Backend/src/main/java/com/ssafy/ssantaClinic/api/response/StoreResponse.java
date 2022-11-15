package com.ssafy.ssantaClinic.api.response;

import com.ssafy.ssantaClinic.db.entity.AdventCalendar;
import com.ssafy.ssantaClinic.db.entity.AdventCalendarImg;
import com.ssafy.ssantaClinic.db.entity.UserItemBox;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

public class StoreResponse {

    @Data
    @Builder
    public static class StoreItemListResponse {
        private int itemId;
        private String itemName;
        private int price;
    }
    @Data
    @Builder
    public static class BuyItemResponse {
        private int money;
    }

    @Data
    @Builder
    public static class UserItemListResponse {
        private List<Integer> itemList;
    }

    @Data
    @Builder
    public static class UserItemList2Response {
        private int itemId;
        private int price;
        private String itemName;

        public UserItemList2Response(UserItemBox userItemBox) {
            this.itemId = userItemBox.getItem().getItemId();
            this.price = userItemBox.getItem().getPrice();
            this.itemName = userItemBox.getItem().getItemName();
        }
    }
}
