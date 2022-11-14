package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.response.CoinResponse;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.db.entity.User;
import com.ssafy.ssantaClinic.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @FileName : CoinServiceImpl
 * @Class 설명 : 게임 머니 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class CoinServiceImpl implements CoinService{
    private final UserRepository userRepository;

    @Override
    public CoinResponse earnMoney(int userId, int money) {
        // 존재하는 회원인지 확인
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        // 돈이 0원인지 확인
        if(money == 0){
            throw new CustomException(ErrorCode.EARN_NOTHING);
        }
        user.changeMoney(user.getMoney() + money);
        userRepository.save(user);
        return CoinResponse.builder()
                            .coin(user.getMoney())
                            .build();
    }

    @Override
    public CoinResponse getMoneyInfo(int userId) {
        // 존재하는 회원인지 확인
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        return CoinResponse.builder()
                .coin(user.getMoney())
                .build();
    }
}
