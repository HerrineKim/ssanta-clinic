package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.response.OnlineResponse;
import com.ssafy.ssantaClinic.db.repository.EmitterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @FileName : OnlineServiceImpl
 * @Class 설명 : 온라인 접속자 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class OnlineServiceImpl implements OnlineService{
    private final EmitterRepository emitterRepository;
    @Override
    public OnlineResponse countOnlineUser() {
        return OnlineResponse.builder()
                .cnt(emitterRepository.getConcurrentUsers())
                .build();
    }
}
