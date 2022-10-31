package com.ssafy.ssantaClinic.common.auth.securityConfig;

import lombok.RequiredArgsConstructor;
import com.ssafy.ssantaClinic.common.auth.util.JwtManager;
import com.ssafy.ssantaClinic.common.auth.filter.JwtFilter;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @FileName : JwtSecurityConfig
 * @Class 설명 : Spring Security JWT 설정. Jwt 필터들을 등록한다.
 */
@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private final JwtManager jwtManager;

    /**
     * @Method Name :  configure(override)
     * @Method 설명 :  Jwt 필터들을 등록한다.
     */
    @Override
    public void configure(HttpSecurity http) {
        http.addFilterBefore(
                new JwtFilter(jwtManager),
                UsernamePasswordAuthenticationFilter.class
        );

    }
}
