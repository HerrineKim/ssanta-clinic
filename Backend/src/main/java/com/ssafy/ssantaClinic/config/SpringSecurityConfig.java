package com.ssafy.ssantaClinic.config;

import com.ssafy.ssantaClinic.common.auth.util.JwtManager;
import com.ssafy.ssantaClinic.common.auth.exceptionHandler.JwtAccessDeniedHandler;
import com.ssafy.ssantaClinic.common.auth.exceptionHandler.JwtAuthenticationEntryPoint;
import com.ssafy.ssantaClinic.common.auth.securityConfig.JwtSecurityConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

/**
 * @FileName : SpringSecurityConfig
 * @Class 설명 : Spring Security 설정
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SpringSecurityConfig {
    private final JwtManager jwtManager;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    // WebConfig에 동일한 내용이 있음.
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//
//        configuration.addAllowedOrigin("*");
//        configuration.addAllowedHeader("*");
//        configuration.addAllowedMethod("*");
//        configuration.addExposedHeader("*");
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }

//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring().antMatchers("/api/user/login", "/api/user/join");
//    }

    private static final String[] PERMIT_URL_ARRAY = {
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**"
    };
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // session도 비활성화
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

//               // cors 허용
//               .and()
//               .cors().configurationSource(corsConfigurationSource())

                // 아래 3개 api는 permit, 나머지는 인증 필요
                .and()
                .authorizeRequests()
                .antMatchers(PERMIT_URL_ARRAY).permitAll()
                .antMatchers(HttpMethod.OPTIONS).permitAll() // CORS Preflight 방지
                .antMatchers("/user/login").permitAll()
                .antMatchers("/user/join").permitAll()
                .antMatchers("/user/check/nickname").permitAll()
                .antMatchers("/user/find/password").permitAll()
                .antMatchers("/user/find/password/url").permitAll()
                .antMatchers("/user/find/password/update").permitAll()
                .antMatchers("/user/check/email").permitAll()
                .antMatchers("/noti/**").permitAll()
                .antMatchers("/resources/**").permitAll()
                .anyRequest().authenticated()
                // 차후 관리자, 일반 유저 권한 구분하려면 아래 기능 사용
                //.anyRequest().access("hasRole('ADMIN') or hasRole('USER')")

                .and()
                .apply(new JwtSecurityConfig(jwtManager));

        return http.build();
    }
}
