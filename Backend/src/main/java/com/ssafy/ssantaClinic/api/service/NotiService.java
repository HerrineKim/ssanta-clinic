package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.db.entity.Notification;
import com.ssafy.ssantaClinic.db.entity.Type;
import com.ssafy.ssantaClinic.db.entity.User;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotiService {
    SseEmitter subscribe(int userId, String lastEventId);
    void sendToClient(SseEmitter emitter, String eventId, String emitterId, Object data);
    void send(User receiver, Type type, String message, int id);
    Notification createNotification(User receiver, Type type, String message, int id);
    void sendUnOpenedBoxNotification(int userId);
    void readAllNotification(int userId);
}
