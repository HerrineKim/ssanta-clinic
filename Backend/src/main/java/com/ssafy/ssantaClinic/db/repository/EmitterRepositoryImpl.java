package com.ssafy.ssantaClinic.db.repository;

import lombok.RequiredArgsConstructor;
import org.infinispan.Cache;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class EmitterRepositoryImpl implements EmitterRepository {
    // 생성된 EventStream 목록을 저장하기 위한 로컬 캐시
    private final Cache<String, SseEmitter> sseEmitterCache;
    // 전송된 Event 목록을 임시 저장하기 위한 분산 캐시
    private final Cache<String, Object> sseEventCache;

    @Override
    public SseEmitter save(String emitterId, SseEmitter sseEmitter) {
        sseEmitterCache.put(emitterId, sseEmitter);
        return sseEmitter;
    }

    @Override
    public void saveEventCache(String eventCacheId, Object event) {
        sseEventCache.put(eventCacheId, event);
    }

    @Override
    public Map<String, SseEmitter> findAllEmitterStartWithByUserId(int userId) {
        return sseEmitterCache.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(String.valueOf(userId)))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    @Override
    public Map<String, Object> findAllEventCacheStartWithByUserId(int userId) {
        return sseEventCache.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(String.valueOf(userId)))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    @Override
    public void deleteById(String id) {
        sseEmitterCache.remove(id);
    }

    @Override
    public void deleteAllEmitterStartWithUserId(int userId) {
        sseEmitterCache.forEach(
                (key, emitter) -> {
                    if (key.startsWith(String.valueOf(userId))) {
                        sseEmitterCache.remove(key);
                    }
                }
        );
    }

    @Override
    public void deleteAllEventCacheStartWithUserId(int userId) {
        sseEventCache.forEach(
                (key, emitter) -> {
                    if (key.startsWith(String.valueOf(userId))) {
                        sseEventCache.remove(key);
                    }
                }
        );
    }

    @Override
    public int getConcurrentUsers() {
        Set<String> emails = new HashSet<>();
        sseEmitterCache.forEach(
                (key, emitter) -> {
                    StringTokenizer stk = new StringTokenizer(key, "_");
                    emails.add(stk.nextToken());
                }
        );
        return emails.size();
    }
}