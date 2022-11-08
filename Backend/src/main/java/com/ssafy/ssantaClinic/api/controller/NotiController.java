package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.service.NotiService;
import com.ssafy.ssantaClinic.common.auth.util.JwtUtil;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @FileName : NotiController
 * @Class 설명 : 알림 관련 요청을 처리하는 Controller
 */
@Api(value = "알림 관련 API", tags = {"NotiController"}, description = "알림 관련 컨트롤러")
@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/noti")
@RequiredArgsConstructor
public class NotiController {
    private final NotiService notiService;

    @ApiOperation(value = "SSE 구독", notes = "SSE 서버에 접속한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping(value = "/sub",
                produces= MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<?> subscribe(HttpServletRequest request,
                                       @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        /**
         * @Method Name : subscribe
         * @Method 설명 : SSE 서버에 접속한다.
         */
        // 현재 로그인한 유저의 이메일 가져오기
        String email = JwtUtil.getCurrentUserEmail().orElseThrow(() -> new CustomException(ErrorCode.JWT_TOKEN_NOT_FOUND));
        notiService.subscribe(email, lastEventId);
        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "text/event-stream");
        headers.set("Cache-Control", "no-cache");
        // 리버스 프록시에서의 오동작을 방지
        headers.set("X-Accel-Buffering", "no");
        return ResponseEntity.ok().headers(headers).build();
    }
}
