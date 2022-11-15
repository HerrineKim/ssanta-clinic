package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.response.StoreResponse;
import com.ssafy.ssantaClinic.db.entity.Item;
import com.ssafy.ssantaClinic.db.entity.UserItemBox;

import java.util.List;

public interface StoreService {

    List<StoreResponse.StoreItemListResponse> getItemList();

    StoreResponse.BuyItemResponse buyItem(int userId, int itemId, int count);

    StoreResponse.UserItemListResponse getUserItemList(int userId);

    List<StoreResponse.UserItemList2Response> getUserItemList2(int userId);
}
