package com.ssafy.ssantaClinic.common.event;

import com.ssafy.ssantaClinic.db.entity.Type;
import com.ssafy.ssantaClinic.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

import javax.validation.constraints.NotBlank;

/**
 * @FileName : NotifyEvent
 * @Class 설명 : 이벤트 발생시키기 위한 클래스
 */
@Builder
@AllArgsConstructor
@Getter
public class NotifyEvent{
    /**
     * 이벤트를 발생 시키려면 아래와 같은 코드를 작성하면 된다.
     * @Autowired or @RequiredArgsConstructor
     * private final ApplicationEventPublisher applicationEventPublisher;
     * void method() {
     *     applicationEventPublisher.publishEvent(notifyEvent);
     * }
     */
    @NotBlank
    private User receiver;

    @NotBlank
    private Type type;

    @NotBlank
    private String message;

    @NotBlank
    private int id;
}
