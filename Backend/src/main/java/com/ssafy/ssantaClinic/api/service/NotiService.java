package com.ssafy.ssantaClinic.api.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotiService {
    SseEmitter subscribe(String email, String lastEventId);
}
