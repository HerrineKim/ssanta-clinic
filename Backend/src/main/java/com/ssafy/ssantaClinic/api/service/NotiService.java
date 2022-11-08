package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.response.NotiResponse;
import com.ssafy.ssantaClinic.db.entity.Notification;
import com.ssafy.ssantaClinic.db.entity.Type;
import com.ssafy.ssantaClinic.db.entity.User;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface NotiService {
    SseEmitter subscribe(String email, String lastEventId);
    void sendToClient(SseEmitter emitter, String id, Object data);
    void send(User receiver, Type type, String message, int id);
    Notification createNotification(User receiver, Type type, String message, int id);
}
