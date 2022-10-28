package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.db.entity.User;

import java.util.Optional;
import java.util.OptionalInt;

public interface UserService {

    void save(User user);

    User getUserByUserId(int userId);

    User getUserByEmail(String email);

    Optional<User> findByNickName(String nickname);

    Optional<User> findByEmail(String email);

    String getFindPasswordNum(String email);

}
