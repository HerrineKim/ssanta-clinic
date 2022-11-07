package com.ssafy.ssantaClinic.common.auth;

import com.ssafy.ssantaClinic.common.auth.util.JwtManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestConstructor;

import static org.assertj.core.api.Assertions.assertThat;

// Spring 2.7 이상부터는 Junit5 => import org.junit.Test 사용x
import org.junit.jupiter.api.*;

@Slf4j
@SpringBootTest
@RequiredArgsConstructor
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
public class SecurityTest {

    final private JwtManager jwtManager;
    @Test
    public void JwtUtilTest() {
        final String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrc2dnMUBuYXZlci5jb20iLCJ1c2VySWQiOjEsIm5pY2tOYW1lIjoiYWZkcyIsImF1dGgiOiIiLCJleHAiOjE2Njc4MDQzNDF9.G4ERplSbVPBsrLRbV4vKTUF3dHh67hjryZwmGn63NIRtHMfLwspiWYleJF_HQtDHf34-UzoCNAq_CdfOKU-n5g";

        assertThat(jwtManager.getUserId(token)).isEqualTo(1);
        assertThat(jwtManager.getNickName(token)).isEqualTo("afds");
        assertThat(jwtManager.getEmail(token)).isEqualTo("ksgg1@naver.com");
    }
}
