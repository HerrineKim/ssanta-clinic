package com.ssafy.ssantaClinic.db.repository;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

public interface EmitterRepository {
    SseEmitter save(String emitterId, SseEmitter sseEmitter);
    void saveEventCache(String emitterId, Object event);
    Map<String, SseEmitter> findAllEmitterStartWithByEmail(String email);
    Map<String, Object> findAllEventCacheStartWithByEmail(String email);
    void deleteById(String id);
    void deleteAllEmitterStartWithEmail(String email);
    void deleteAllEventCacheStartWithEmail(String email);
    int getConcurrentUsers();
}