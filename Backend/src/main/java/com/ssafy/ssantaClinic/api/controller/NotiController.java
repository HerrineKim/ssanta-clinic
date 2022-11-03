package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.response.CalendarResponse;
import com.ssafy.ssantaClinic.api.service.NotiService;
import com.ssafy.ssantaClinic.common.auth.util.JwtUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

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
    private SseEmitter sseEmitter;

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
        String email = JwtUtil.getCurrentUserEmail().isPresent() ? JwtUtil.getCurrentUserEmail().get() : "anonymousUser";
        notiService.subscribe(email, lastEventId);
        return ResponseEntity.ok().build();
    }

}
