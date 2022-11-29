package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.UserRequest;
import com.ssafy.ssantaClinic.api.response.UserResponse;
import com.ssafy.ssantaClinic.db.entity.User;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

public interface UserService {


    User getUserByUserId(int userId);

    User getUserByEmail(String email);

    User getUserByNickName(String nickName);

    UserResponse.DuplicatedResponse isDuplicatedNickName(String nickname);

    UserResponse.DuplicatedResponse isDuplicatedEmail(String email);

    UserResponse.findPasswordResponse getFindPasswordNum(String email) throws NoSuchAlgorithmException;

    void save(UserRequest.JoinRequest joinRequest);

    void sendMail(String email, String url);

    void updatePassword(String findPasswordNum, String password);

    void updateMoney(int userId, int money);

    void updateUserItemList(int userId, List<Integer> itemList);

    void updateLastLoginAt(int userId);
}
