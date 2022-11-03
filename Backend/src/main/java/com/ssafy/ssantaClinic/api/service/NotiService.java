package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.db.entity.Notification;
import com.ssafy.ssantaClinic.db.entity.Type;
import com.ssafy.ssantaClinic.db.entity.User;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotiService {
    SseEmitter subscribe(String email, String lastEventId);
    void sendToClient(SseEmitter emitter, String id, Object data);
    void send(User receiver, Type type, String message);
    Notification createNotification(User receiver, Type type, String message);
}
