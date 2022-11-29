package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.response.FriendResponse;
import com.ssafy.ssantaClinic.db.entity.User;

import java.util.List;

public interface FollowService {
    void follow(int parentId, int childId);
    void unfollow(int parentId, int childId);
    List<User> getFollowerList(int userId);
    List<User> getFollowerList(String email);
    List<User> getFollowingList(int userId);
    List<User> getFollowingList(String email);
    List<FriendResponse> getRecommendFriendList();
}
