package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.db.entity.User;
import com.ssafy.ssantaClinic.db.entity.UserItemBox;
import com.ssafy.ssantaClinic.db.repository.ItemRepository;
import com.ssafy.ssantaClinic.db.repository.UserItemBoxRepository;
import com.ssafy.ssantaClinic.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.StringTokenizer;

/**
 * @FileName : TreeServiceImpl
 * @Class 설명 : 트리 꾸미기 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class TreeServiceImpl implements TreeService{
    private final UserRepository userRepository;
    private final UserItemBoxRepository userItemBoxRepository;
    private final ItemRepository itemRepository;

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
    @Transactional
    public void updateUserItemBox(int userId, String leftItem) {
        // 유저 검색
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        StringTokenizer stk = new StringTokenizer(leftItem, "[,] ");
        try {
            userItemBoxRepository.deleteAllByUserUserId(userId);
        } catch (Exception e) {
        }
        // 남은 아이템 목록으로 업데이트 하기기
        while (stk.hasMoreTokens()) {
            int itemId = Integer.parseInt(stk.nextToken());
            UserItemBox item = userItemBoxRepository.findByUser_UserIdAndItem_ItemId(userId, itemId)
                    .orElse(UserItemBox.builder()
                            .item(itemRepository.findById(itemId).orElseThrow(() ->
                                    new CustomException(ErrorCode.NOT_FOUND_ITEM_INFO)))
                            .user(user)
                            .count(0)
                            .build());
            item.changeCount(item.getCount() + 1);
            userItemBoxRepository.save(item);
        }
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
