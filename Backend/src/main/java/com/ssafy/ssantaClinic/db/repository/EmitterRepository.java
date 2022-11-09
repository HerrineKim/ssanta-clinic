package com.ssafy.ssantaClinic.db.repository;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

public interface EmitterRepository {
    SseEmitter save(String emitterId, SseEmitter sseEmitter);
    void saveEventCache(String emitterId, Object event);
    Map<String, SseEmitter> findAllEmitterStartWithByUserId(int userId);
    Map<String, Object> findAllEventCacheStartWithByUserId(int userId);
    void deleteById(String id);
    void deleteAllEmitterStartWithUserId(int userId);
    void deleteAllEventCacheStartWithUserId(int userId);
    int getConcurrentUsers();
}