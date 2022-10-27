package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.db.entity.User;

import java.util.Optional;

public interface UserService {

    void save(User user);

    User getUserByUserId(int userId);

    Optional<User> findByNickName(String nickname);

    Optional<User> findByEmail(String email);
}
