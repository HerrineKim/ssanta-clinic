package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.UserRequest;
import com.ssafy.ssantaClinic.api.response.UserResponse;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.common.util.SHA256;
import com.ssafy.ssantaClinic.db.entity.User;
import com.ssafy.ssantaClinic.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.aws.mail.simplemail.SimpleEmailServiceJavaMailSender;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;
/**
 * @FileName : UserServiceImpl
 * @Class 설명 : 유저 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final JavaMailSender mailSender;

    private static final String FROM_ADDRESS = "ssantaa201@gmail.com";

    @Override
    public void save(UserRequest.JoinRequest joinRequest) {
        User user = User.builder()
                .email(joinRequest.getEmail())
                .password(passwordEncoder.encode(joinRequest.getPassword()))
                .nickName(joinRequest.getNickName())
                .build();
        userRepository.save(user);
    }


    @Override
    public User getUserByUserId(int userId) {
        /**
         * @Method Name : getUserByUserId
         * @Method 설명 : userId에 해당하는 유저 객체를 반환한다.
         */
        User user = userRepository.getUserByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
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
    public UserResponse.DuplicatedResponse isDuplicatedNickName(String nickname) {
        /**
         * @Method Name : isDuplicatedNickName
         * @Method 설명 : nickname을 받아 boolean 반환. 중복이면 true 아니면 false
         */
        boolean isDuplicated = true;
        Optional<User> user = userRepository.findByNickName(nickname);
        if (user.isEmpty()) {
            isDuplicated = false;
        }
        return UserResponse.DuplicatedResponse.builder()
                .duplicated(isDuplicated)
                .build();
    }

    @Override
    public UserResponse.DuplicatedResponse isDuplicatedEmail(String email) {
        /**
         * @Method Name : isDuplicatedEmail
         * @Method 설명 : email을 받아 boolean 반환. 중복이면 true 아니면 false
         */
        boolean isDuplicated = true;
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            isDuplicated = false;
        }
        return UserResponse.DuplicatedResponse.builder()
                .duplicated(isDuplicated)
                .build();
    }

    @Override
    public UserResponse.findPasswordResponse getFindPasswordNum(String email) throws NoSuchAlgorithmException {
        /**
         * @Method Name : getFindPasswordNum
         * @Method 설명 : email을 받아 유저 존재를 확인한 뒤, 있으면 고유값을 없으면 null을 반환
         */
        // email로 유저 검색, 없으면 404 error
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));

        // userId를 이용하여 sha256 변환
        SHA256 sha256 = new SHA256();

        return UserResponse.findPasswordResponse.builder()
                .findPasswordNum(sha256.encrypt(user.getEmail()))
                .build();
    }

    @Override
    public void sendMail(String email, String url) {
        /**
         * @Method Name : sendMail
         * @Method 설명 : 회원 email로 비밀번호 재설정 url을 전송한다.
         */
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setFrom(UserServiceImpl.FROM_ADDRESS);
        message.setSubject("비밀번호 수정 페이지 안내드립니다.");
        message.setText(url);

        mailSender.send(message);
    }

    @Override
    public void updatePassword(int userId, String password) {
        /**
         * @Method Name : updatePassword
         * @Method 설명 : 새로운 비밀번호를 받아서 회원 비밀번호를 재설정한다.
         */
        User user = userRepository.getUserByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));

        user.changePassword(password);
    }
}
