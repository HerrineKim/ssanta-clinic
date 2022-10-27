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
    public User getUserByEmail(String email) {
        /**
         * @Method Name : getUserByEmail
         * @Method 설명 : email에 해당하는 유저 객체를 반환한다.
         */

        // 유저 있는지 없는지 부터 체크해야함
        User user = userRepository.getUserByEmail(email);
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

    @Override
    public Optional<User> findByEmail(String email) {
        /**
         * @Method Name : findByEmail
         * @Method 설명 : email을 받아 해당하는 유저를 반환한다. 없으면 Empty.
         */
        return userRepository.findByEmail(email);
    }

    @Override
    public String getFindPasswordNum(String email) {
        /**
         * @Method Name : getFindPasswordNum
         * @Method 설명 : email을 받아 유저 존재를 확인한 뒤, 있으면 고유값을 없으면 null을 반환
         */
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            return null;
        }
        int userId = userRepository.getUserByEmail(email).getUserId();
        // 할 일) userId를 이용해서 sha256 해쉬변환하기
        return Integer.toString(userId);
    }
}
