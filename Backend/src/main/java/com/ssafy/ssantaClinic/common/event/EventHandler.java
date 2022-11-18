package com.ssafy.ssantaClinic.common.event;

import com.ssafy.ssantaClinic.api.service.NotiService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventHandler{
    private final NotiService notiService;

    @EventListener
    @Async
    public void onApplicationEvent(NotifyEvent event) throws InterruptedException {
        Thread.sleep(10000);
        notiService.send(event.getReceiver(), event.getType(), event.getMessage(), event.getId());
    }
}
