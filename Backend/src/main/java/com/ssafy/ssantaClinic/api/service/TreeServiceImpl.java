package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.db.entity.User;
import com.ssafy.ssantaClinic.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @FileName : TreeServiceImpl
 * @Class 설명 : 트리 꾸미기 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class TreeServiceImpl implements TreeService{
    private final UserRepository userRepository;

    @Override
    public String saveTreeImage(int userId, String treeUrl) {
        // 유저 검색
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        // 기존 tree url 받아오기
        String userTreeUrl = user.getTreeUrl();
        user.changeTree(treeUrl);
        // tree url update
        userRepository.save(user);
        return userTreeUrl;
    }

    @Override
    public List<String> getRandomTree(int userId) {
        // 존재하는 회원인지 확인
        if(!userRepository.findById(userId).isPresent())
            throw new CustomException(ErrorCode.NOT_FOUND_USER_INFO);
        return userRepository.findRandomUserId(userId);
    }

    @Override
    public String getTreeInfo(int userId) {
        // 유저 검색
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        String treeUrl = user.getTreeUrl().isBlank() ? "" : user.getTreeUrl();
        return treeUrl;
    }
}
