package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.api.service.UserService;
import com.ssafy.ssantaClinic.api.service.UserServiceImpl;
import com.ssafy.ssantaClinic.db.entity.Notification;
import com.ssafy.ssantaClinic.db.entity.Type;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.time.LocalDateTime;
import java.util.Map;
@SpringBootTest
public class EmitterRepositoryImplTest {
    @Autowired
    private EmitterRepository emitterRepository;
    @Autowired
    private UserService userService;
    private Long DEFAULT_TIMEOUT = 60L * 1000L * 10L;

    @Test
    @DisplayName("새로운 Emitter를 추가한다.")
    public void save() throws Exception {
        //given
        Long memberId = 1L;
        String emitterId =  memberId + "_" + System.currentTimeMillis();
        SseEmitter sseEmitter = new SseEmitter(DEFAULT_TIMEOUT);

        //when, then
        Assertions.assertDoesNotThrow(() -> emitterRepository.save(emitterId, sseEmitter));
    }

    @Test
    @DisplayName("수신한 이벤트를 캐시에 저장한다.")
    public void saveEventCache() throws Exception {
        //given
        String eventCacheId =  "email2_" + System.currentTimeMillis();
        Notification notification = Notification.builder().user(userService.findByEmail("email2").get()).type(Type.GIFT)
                .message("선물이 도착했습니다!").url("URL").createdAt(LocalDateTime.now()).build();

        //when, then
        Assertions.assertDoesNotThrow(() -> emitterRepository.saveEventCache(eventCacheId, notification));
    }

    @Test
    @DisplayName("어떤 회원이 접속한 모든 Emitter를 찾는다")
    public void findAllEmitterStartWithByEmail() throws Exception {
        //given
        String emitterId1 = "email2_" + System.currentTimeMillis();
        emitterRepository.save(emitterId1, new SseEmitter(DEFAULT_TIMEOUT));

        Thread.sleep(100);
        String emitterId2 = "email2_" + System.currentTimeMillis();
        emitterRepository.save(emitterId2, new SseEmitter(DEFAULT_TIMEOUT));

        Thread.sleep(100);
        String emitterId3 = "email2_" + System.currentTimeMillis();
        emitterRepository.save(emitterId3, new SseEmitter(DEFAULT_TIMEOUT));


        //when
        Map<String, SseEmitter> ActualResult = emitterRepository.findAllEmitterStartWithByEmail("email2");

        //then
        Assertions.assertEquals(3, ActualResult.size());
    }

    @Test
    @DisplayName("어떤 회원에게 수신된 이벤트를 캐시에서 모두 찾는다.")
    public void findAllEventCacheStartWithByEmail() throws Exception {
        //given
        String email = "email2";
        String eventCacheId1 =  email + "_" + System.currentTimeMillis();
        Notification notification1 = Notification.builder().user(userService.findByEmail("email2").get()).type(Type.GIFT)
                .message("선물이 도착했습니다!").url("URL").createdAt(LocalDateTime.now()).build();
        emitterRepository.saveEventCache(eventCacheId1, notification1);

        Thread.sleep(100);
        String eventCacheId2 =  email + "_" + System.currentTimeMillis();
        Notification notification2 = Notification.builder().user(userService.findByEmail("email2").get()).type(Type.GIFT)
                .message("선물이 도착했습니다!").url("URL").createdAt(LocalDateTime.now()).build();
        emitterRepository.saveEventCache(eventCacheId2, notification2);

        Thread.sleep(100);
        String eventCacheId3 =  email + "_" + System.currentTimeMillis();
        Notification notification3 = Notification.builder().user(userService.findByEmail("email2").get()).type(Type.GIFT)
                .message("선물이 도착했습니다!").url("URL").createdAt(LocalDateTime.now()).build();
        emitterRepository.saveEventCache(eventCacheId3, notification3);

        //when
        Map<String, Object> ActualResult = emitterRepository.findAllEventCacheStartWithByEmail(email);

        //then
        Assertions.assertEquals(3, ActualResult.size());
    }

    @Test
    @DisplayName("ID를 통해 Emitter를 Repository에서 제거한다.")
    public void deleteById() throws Exception {
        //given
        String email = "email2";
        String eventCacheId1 =  email + "_" + System.currentTimeMillis();
        SseEmitter sseEmitter = new SseEmitter(DEFAULT_TIMEOUT);

        //when
        emitterRepository.save(eventCacheId1, sseEmitter);
        emitterRepository.deleteById(eventCacheId1);

        //then
        Assertions.assertEquals(0, emitterRepository.findAllEmitterStartWithByEmail(email).size());
    }

    @Test
    @DisplayName("저장된 모든 Emitter를 제거한다.")
    public void deleteAllEmitterStartWithId() throws Exception {
        //given
        String email = "email2";
        String emitterId1 =  email + "_" + System.currentTimeMillis();
        emitterRepository.save(emitterId1, new SseEmitter(DEFAULT_TIMEOUT));

        Thread.sleep(100);
        String emitterId2 = email + "_" + System.currentTimeMillis();
        emitterRepository.save(emitterId2, new SseEmitter(DEFAULT_TIMEOUT));

        //when
        emitterRepository.deleteAllEmitterStartWithEmail(email);

        //then
        Assertions.assertEquals(0, emitterRepository.findAllEmitterStartWithByEmail(email).size());
    }

    @Test
    @DisplayName("수신한 이벤트를 캐시에 저장한다.")
    public void deleteAllEventCacheStartWithId() throws Exception {
        //given
        String email = "email2";
        String eventCacheId1 =  email + "_" + System.currentTimeMillis();
        Notification notification1 = Notification.builder().user(userService.findByEmail("email2").get()).type(Type.GIFT)
                .message("선물이 도착했습니다!").url("URL").createdAt(LocalDateTime.now()).build();
        emitterRepository.saveEventCache(eventCacheId1, notification1);

        Thread.sleep(100);
        String eventCacheId2 =  email + "_" + System.currentTimeMillis();
        Notification notification2 = Notification.builder().user(userService.findByEmail("email2").get()).type(Type.GIFT)
                .message("선물이 도착했습니다!").url("URL").createdAt(LocalDateTime.now()).build();
        emitterRepository.saveEventCache(eventCacheId2, notification2);

        //when
        emitterRepository.deleteAllEventCacheStartWithEmail(email);

        //then
        Assertions.assertEquals(0, emitterRepository.findAllEventCacheStartWithByEmail(email).size());
    }
}