package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.UserRequest;
import com.ssafy.ssantaClinic.db.entity.User;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;
import java.util.OptionalInt;

public interface UserService {

    void save(UserRequest.JoinRequest joinRequest);
    void save(User user);

    User getUserByUserId(int userId);

    User getUserByEmail(String email);

    Optional<User> findByNickName(String nickname);

    boolean isDuplicatedNickName(String nickname);

    boolean isDuplicatedEmail(String email);

    Optional<User> findByEmail(String email);

    String getFindPasswordNum(String email) throws NoSuchAlgorithmException;

}
