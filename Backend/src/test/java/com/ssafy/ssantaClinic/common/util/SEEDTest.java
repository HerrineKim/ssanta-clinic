//package com.ssafy.ssantaClinic.common.util;
//
//import lombok.extern.slf4j.Slf4j;
//import org.assertj.core.api.Assertions;
//import org.junit.Test;
//
//import java.nio.charset.StandardCharsets;
//
//import static org.assertj.core.api.Assertions.assertThat;
//@Slf4j
//public class SEEDTest {
//    private final byte[] pbszUserKey = "testCrypt2020!@#".getBytes();
//    private final byte[] pbszIV = "1234567890123456".getBytes();
//
//    @Test
//    public void 암복호화_테스트() {
//        // given
//        String rawMessage = "테스트 데이터";
//        log.info("rawMessage = " + rawMessage);
//        // when
//        String encryptedMessage = SEED.encrypt(rawMessage);
//        log.info("암호화된 데이터 = "+ encryptedMessage);
//
//        String decryptedMessage = SEED.decrypt(encryptedMessage);
//        log.info("복호화된 데이터 = "+ decryptedMessage);
//        // then
//        assertThat(rawMessage).isEqualTo(decryptedMessage);
//        assertThat(rawMessage).isNotEqualTo(encryptedMessage);
//    }
//}
