package com.ssafy.ssantaClinic.config;

import lombok.RequiredArgsConstructor;
import org.infinispan.Cache;
import org.infinispan.configuration.cache.CacheMode;
import org.infinispan.configuration.cache.ConfigurationBuilder;
import org.infinispan.configuration.global.GlobalConfigurationBuilder;
import org.infinispan.configuration.parsing.ConfigurationBuilderHolder;
import org.infinispan.manager.DefaultCacheManager;
import org.infinispan.manager.EmbeddedCacheManager;
import org.infinispan.marshaller.protostuff.ProtostuffMarshaller;
import org.infinispan.transaction.LockingMode;
import org.infinispan.transaction.TransactionMode;
import org.infinispan.util.concurrent.IsolationLevel;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.concurrent.TimeUnit;

@Configuration
@RequiredArgsConstructor
public class CacheConfig {
    private final Environment environment;

    @Bean
    public EmbeddedCacheManager cacheManager() {
        /**
         * @Method Name : cacheManager
         * @Method 설명 : 캐시를 총괄하는 매니저 빈 생성
         */
        GlobalConfigurationBuilder global = new GlobalConfigurationBuilder().transport()
                .defaultTransport().clusterName("noti-api-local").defaultCacheName("default-cache");
        global.serialization().marshaller(new ProtostuffMarshaller());
        return new DefaultCacheManager(new ConfigurationBuilderHolder(Thread.currentThread().getContextClassLoader(), global), true);
    }

    @Bean
    public Cache<String, SseEmitter> sseEmitterCache(
            @Qualifier("cacheManager") EmbeddedCacheManager cacheManager) {
        /**
         * @Method Name : sseEmitterCache
         * @Method 설명 : 로컬 캐시 빈 생성
         */
        ConfigurationBuilder config = new ConfigurationBuilder();
        config.expiration().lifespan(10, TimeUnit.MINUTES);
        config.clustering().cacheMode(CacheMode.LOCAL);
        config.locking()
                .isolationLevel(IsolationLevel.READ_COMMITTED)
                .useLockStriping(false)
                .lockAcquisitionTimeout(10, TimeUnit.SECONDS);
        config.transaction()
                .lockingMode(LockingMode.OPTIMISTIC)
                .transactionMode(TransactionMode.NON_TRANSACTIONAL);
        cacheManager.defineConfiguration("sse-emitter-cache", config.build());
        return cacheManager.getCache("sse-emitter-cache");
    }

    @Bean
    public Cache<String, Object> sseEventCache(
            @Qualifier("cacheManager") EmbeddedCacheManager cacheManager) {
        /**
         * @Method Name : sseEventCache
         * @Method 설명 : 전송할 Event 데이터를 저장할 분신 캐시 빈 생성
         */
        ConfigurationBuilder config = new ConfigurationBuilder();
        config.expiration().lifespan(1, TimeUnit.MINUTES);
        config.clustering().cacheMode(CacheMode.REPL_ASYNC);
        config.locking().isolationLevel(IsolationLevel.READ_COMMITTED)
                .useLockStriping(false)
                .lockAcquisitionTimeout(10, TimeUnit.SECONDS);
        config.transaction()
                .lockingMode(LockingMode.OPTIMISTIC)
                .transactionMode(TransactionMode.NON_TRANSACTIONAL);
        cacheManager.defineConfiguration("sse-event-cache", config.build());
        return cacheManager.getCache("sse-event-cache");
    }
}
