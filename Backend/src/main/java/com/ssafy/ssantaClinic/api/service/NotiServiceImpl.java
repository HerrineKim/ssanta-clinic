package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.response.NotiResponse;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.db.entity.Notification;
import com.ssafy.ssantaClinic.db.entity.Type;
import com.ssafy.ssantaClinic.db.entity.User;
import com.ssafy.ssantaClinic.db.repository.EmitterRepository;
import com.ssafy.ssantaClinic.db.repository.NotiRepository;
import com.ssafy.ssantaClinic.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @FileName : NotiServiceImpl
 * @Class 설명 : SSE 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class NotiServiceImpl implements NotiService {
    private static final Long DEFAULT_TIMEOUT = 60L* 1000 * 10; // 10분
    private static final String BASE_URL = "http://localhost:8080";
    private final EmitterRepository emitterRepository;
    private final NotiRepository notiRepository;
    private final UserRepository userRepository;

    @Override
    public SseEmitter subscribe(String email, String lastEventId) {
        /**
         * @Method Name :  subscribe
         * @Method 설명 :  SSE 서버에 접속한다.
         */
        // last_evnet_id 값을 위해 id에 현재 시간도 같이 저장
        // 데이터가 유실된 시점을 파악할 수 있어서 유실된 데이터만 재전송 가능하다.
        String id = email + "_" + System.currentTimeMillis();
        // 유효시간 만큼 sse 연결 유지. 시간 지나면 자동으로 클라이언트에서 재연결 요청을 보낸다.
        SseEmitter emitter = emitterRepository.save(id, new SseEmitter(DEFAULT_TIMEOUT));
        // 시간초과와 네트워크 오류를 포함한 모든 이유로 비동기 요청이 정상 동작할 수 없으면 emitter 삭제
        emitter.onCompletion(() -> emitterRepository.deleteById(id));
        // 비동기 요청이 시간 초과가 나면 emitter를 삭제한다.
        emitter.onTimeout(() -> emitterRepository.deleteById(id));
        // sse 연결을 유지하기 위한 dummy data 전송
        sendToClient(emitter, id, "EventStream Created. [userEmail = " + email + "]");
        // 헤더에 last-event-id가 있으면 유실된 데이터를 다시 전송한다.
        if(!lastEventId.isEmpty()){
            Map<String, Object> events = emitterRepository.findAllEventCacheStartWithByEmail(email);
            events.entrySet().stream()
                    // last-event-id 이전에 전송된 이벤트들은 제외
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    // 유실된 이벤트들은 다시 전송
                    .forEach(entry -> sendToClient(emitter, entry.getKey(), entry.getValue()));
        }
        return emitter;
    }
    @Override
    public void sendToClient(SseEmitter emitter, String id, Object data) {
        /**
         * @Method Name :  sendToClient
         * @Method 설명 :  sse로 데이터를 전송한다.
         */
        try {
            emitter.send(SseEmitter.event()
                                    .id(id).name("sse").data(data));
        } catch (IOException e) {
            emitterRepository.deleteById(id);
            throw new CustomException(ErrorCode.SSE_SEND_ERROR);
        }
    }
    @Override
    public void send(User receiver, Type type, String message, int id) {
        /**
         * @Method Name :  send
         * @Method 설명 :  알림 생성부터 데이터 전송까지 관련된 모든 로직을 처리한다.
         */
        Notification notification = createNotification(receiver, type, message, id);
        String email = receiver.getEmail();

        // 로그인 한 유저의 SseEmitter 모두 가져오기
        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitterStartWithByEmail(email);
        sseEmitters.forEach(
                (key, emitter) -> {
                    // 데이터 캐시 저장(유실된 데이터 처리하기 위함)
                    emitterRepository.saveEventCache(key, notification);
                    // 데이터 전송
                    sendToClient(emitter, key, new NotiResponse.GetNotiResponse(notification));
                }
        );
    }
    @Override
    public Notification createNotification(User receiver, Type type, String message, int id) {
        /**
         * @Method Name :  createNotification
         * @Method 설명 :  알림 객체를 생성한다.
         */
        String url = BASE_URL;
        if (!type.getType().equals(Type.REPLY.getType()) || !type.getType().equals(Type.GIFT.getType())) {
            throw new CustomException(ErrorCode.WRONG_NOTI_TYPE_ERROR);
        } else {
            url += "/api/" + type.getUrl() + "/" + id;
        }
        return Notification.builder()
                .user(receiver)
                .url(url)
                .message(message)
                .type(type)
                .isRead(false)
                .build();
    }
}
