package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.db.entity.User;
import com.ssafy.ssantaClinic.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
/**
 * @FileName : UserServiceImpl
 * @Class 설명 : 유저 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public void save(User user) {
        /**
         * @Method Name : save
         * @Method 설명 : 회원가입 정보를 받아 저장한다.
         */
        userRepository.save(user);
    }

    @Override
    public User getUserByUserId(int userId) {
        /**
         * @Method Name : getUserByUserId
         * @Method 설명 : userId에 해당하는 유저 객체를 반환한다.
         */
        User user = userRepository.getUserByUserId(userId);
        return user;
    }

    @Override
    public Optional<User> findByNickName(String nickname) {
        /**
         * @Method Name : findByNickName
         * @Method 설명 : nickname을 받아 해당하는 유저를 반환한다. 없으면 Empty.
         */
        return userRepository.findByNickName(nickname);
    }
}
