package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.response.SimpleMessageResponse;
import com.ssafy.ssantaClinic.api.service.NotiService;
import com.ssafy.ssantaClinic.common.auth.util.JwtUtil;
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
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


/**
 * @FileName : NotiController
 * @Class 설명 : 알림 관련 요청을 처리하는 Controller
 */
@Api(value = "알림 관련 API", tags = {"NotiController"})
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
    @GetMapping(value = "/sub/{userId}",
                produces= MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> subscribe(
            @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId,
            @PathVariable int userId) {
        /**
         * @Method Name : subscribe
         * @Method 설명 : SSE 서버에 접속한다.
         */
        SseEmitter sseEmitter = notiService.subscribe(userId, lastEventId);
        // 헤더 설정
        var headers = new HttpHeaders();
        headers.set("Content-Type", "text/event-stream");
        headers.set("Cache-Control", "no-cache");
        // 리버스 프록시에서의 오동작을 방지
        headers.set("X-Accel-Buffering", "no");
        return ResponseEntity.ok().headers(headers).body(sseEmitter);
    }

    @ApiOperation(value = "미개봉 상자 알림", notes = "어드벤트 캘린더 알림 얻기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping("/list/{userId}")
    public ResponseEntity<SseEmitter> getAdventCalendarAlarm(@PathVariable int userId) {
        /**
         * @Method Name : getAdventCalendarAlarm
         * @Method 설명 : 어드벤트 캘린더 알림 얻기
         */
        notiService.sendUnOpenedBoxNotification(userId);
        return ResponseEntity.ok().header("X-Accel-Buffering", "no").build();
    }

    @ApiOperation(value = "알림 읽음 처리", notes = "알림 읽음 처리하기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @PatchMapping("/read/{userId}")
    public ResponseEntity<SimpleMessageResponse> readAlarm(@PathVariable int userId) {
        /**
         * @Method Name : readAlarm
         * @Method 설명 : 알림 읽음 처리하기
         */
        notiService.readAllNotification(userId);
        return ResponseEntity.ok().body(SimpleMessageResponse.builder().Result("success").build());
    }
}
