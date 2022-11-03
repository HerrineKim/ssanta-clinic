package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.request.CalendarRequest;
import com.ssafy.ssantaClinic.api.service.S3Service;
import com.ssafy.ssantaClinic.common.auth.util.JwtUtil;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.db.entity.AdventCalendar;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {
    private final S3Service s3Service;
    @PostMapping(
            consumes = { MediaType.MULTIPART_FORM_DATA_VALUE },
            produces = { MediaType.APPLICATION_JSON_VALUE }
    )
    public ResponseEntity<?> sendBox(HttpServletRequest request,
                                     @RequestPart(required = false) MultipartFile glbfile) throws IOException {

        // S3 업로드
        String url = "";
        if(url != null){
            log.info(glbfile.getOriginalFilename());
            url = s3Service.upload(glbfile);
        }
        return ResponseEntity.ok().build();
    }
}
