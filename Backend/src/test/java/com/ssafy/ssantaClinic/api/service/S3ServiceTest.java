package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.config.S3ConfigTest;
import io.findify.s3mock.S3Mock;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@Import(S3ConfigTest.class)
public class S3ServiceTest {

    @Autowired
    S3Service s3Service;
    @Autowired
    S3Mock s3Mock;
    
    @Test
    public void 이미지업로드() throws IOException {
        // given
        String path = "test.png";
        String contentType = "image/png";
        String dirName = "test";
        
        MockMultipartFile file = new MockMultipartFile("test", path, contentType, "test".getBytes());
        
        // when
        String urlPath = s3Service.upload(file);
    }

    @AfterEach
    public void tearDown() {
        s3Mock.stop();
    }
}