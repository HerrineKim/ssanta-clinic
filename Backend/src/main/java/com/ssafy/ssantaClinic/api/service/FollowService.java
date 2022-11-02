package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.db.entity.User;

import java.util.List;

public interface FollowService {
    void save(int parentId, int childId);

    List<User> getFollowerList(int userId);
    List<User> getFollowerList(String email);
    List<User> getFollowingList(int userId);
    List<User> getFollowingList(String email);
}
