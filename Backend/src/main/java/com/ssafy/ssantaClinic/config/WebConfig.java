package com.ssafy.ssantaClinic.config;

import com.ssafy.ssantaClinic.common.auth.util.JwtManager;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final JwtManager jwtManager;
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .exposedHeaders("Origin","Accept","X-Requested-With","Content-Type","Access-Control-Request-Method",
                        "Access-Control-Request-Headers","Authorization","Access-Control-Allow-Origin")
                .allowedHeaders("Origin","Accept","X-Requested-With","Content-Type","Access-Control-Request-Method",
                        "Access-Control-Request-Headers","Authorization","Access-Control-Allow-Origin");
    }
}
