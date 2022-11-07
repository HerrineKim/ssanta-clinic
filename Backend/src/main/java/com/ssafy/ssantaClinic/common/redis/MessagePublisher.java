package com.ssafy.ssantaClinic.common.redis;

public interface MessagePublisher {
    void publish(final RedisNotificationPayload message);
}
