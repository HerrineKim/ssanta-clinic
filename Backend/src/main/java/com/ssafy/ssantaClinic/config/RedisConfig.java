package com.ssafy.ssantaClinic.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisClientConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
/**
 * @FileName : RedisConfig
 * @Class 설명 : Redis 설정
 */
@Configuration
@RequiredArgsConstructor
public class RedisConfig {
    // 구독 상태의 알림을 수신하도록 구현하는 역할
    private final MessageListener messageListener;
    @Value("${spring.redis.host}")
    private String redisHost;
    @Value("${spring.redis.port}")
    private int redisPort;
    @Value("${spring.redis.topic}")
    private String redisTopic;

    @Bean
    public JedisConnectionFactory jedisConnectionFactory() {
        /**
         * @Method Name : jedisConnectionFactory
         * @Method 설명 : jedis를 생성하는 라이브러리를 반환하는 메서드. jedis는 java에서 redis를 쉽게 사용할 수 있게 도와주는 라이브러리이다.
         */
        RedisStandaloneConfiguration configuration = new RedisStandaloneConfiguration(redisHost, redisPort);
        JedisClientConfiguration jedisClientConfiguration = JedisClientConfiguration.builder().usePooling().build();
        JedisConnectionFactory factory = new JedisConnectionFactory(configuration, jedisClientConfiguration);
        factory.afterPropertiesSet();
        return factory;
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        /**
         * @Method Name : redisTemplate
         * @Method 설명 : Redis 데이터 액세스 코드를 단순화하는 thread-safe한 클래스를 반환한다.</br>
         *              지정된 개체와 Redis의 기본 데이터 간에 자동 직렬화/역직렬화를 수행한다.</br>
         */
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(jedisConnectionFactory());
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        return template;
    }

    @Bean
    public ChannelTopic topic() {
        /**
         * @Method Name : topic
         * @Method 설명 : 채널 구독을 위한 ChannelTopic 클래스를 생성한다.
         */
        return new ChannelTopic(redisTopic);
    }

    @Bean
    public MessageListenerAdapter newMessageListener() {
        /**
         * @Method Name : newMessageListener
         * @Method 설명 : 스프링에서 비동기 메시지를 지원하는 마지막 컴포넌트. 정해진 채널로 들어온 메시지를 처리할 action을 정의한다.
         */
        return new MessageListenerAdapter(messageListener);
    }

    @Bean
    public RedisMessageListenerContainer redisContainer() {
        /**
         * @Method Name : redisContainer
         * @Method 설명 : 구독 중 메세지가 발행(publish)되면 메세지를 처리해주는 Listner.
         */
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(jedisConnectionFactory());
        container.addMessageListener(newMessageListener(), topic());
        return container;
    }
}
