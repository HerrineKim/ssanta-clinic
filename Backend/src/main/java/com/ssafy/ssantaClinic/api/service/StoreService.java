package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.response.StoreResponse;
import com.ssafy.ssantaClinic.db.entity.Item;
import com.ssafy.ssantaClinic.db.entity.UserItemBox;

import java.util.List;

public interface StoreService {

    List<Item> getItemList();

    int buyItem(int userId, int itemId, int count);

    List<StoreResponse.UserItemListResponse> getUserItemList(int userId);
}
