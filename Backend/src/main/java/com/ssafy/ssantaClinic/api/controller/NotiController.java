package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.response.CalendarResponse;
import com.ssafy.ssantaClinic.api.response.NotiResponse;
import com.ssafy.ssantaClinic.api.service.NotiService;
import com.ssafy.ssantaClinic.api.service.UserService;
import com.ssafy.ssantaClinic.common.auth.util.JwtUtil;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
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
import java.net.URI;
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
        String email = JwtUtil.getCurrentUserEmail().orElseThrow(() -> new CustomException(ErrorCode.JWT_TOKEN_NOT_FOUND));
        notiService.subscribe(email, lastEventId);
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value = "알림 리스트 조회", notes = "개인의 알림 리스트를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping
    public ResponseEntity<?> getAlarmList(HttpServletRequest request) {
        /**
         * @Method Name : getAlarmList
         * @Method 설명 : 개인의 알림 리스트를 조회한다.
         */
        // 현재 로그인한 유저의 이메일 가져오기
        String email = JwtUtil.getCurrentUserEmail().orElseThrow(() -> new CustomException(ErrorCode.JWT_TOKEN_NOT_FOUND));
        List<NotiResponse.GetNotiResponse> notiResponseList = notiService.getNotiListByEmail(email);
        return ResponseEntity.ok().body(notiResponseList);
    }

    @ApiOperation(value = "알림 정보 조회", notes = "알림에 해당하는 url로 이동한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @PostMapping(params = {"notiId"})
    public ResponseEntity<?> getNotiInfo (HttpServletRequest request, @RequestParam(value = "notiId") int notiId) {
        /**
         * @Method Name : getNotiInfo
         * @Method 설명 : 알림에 해당하는 url로 이동한다.
         */
        // 현재 로그인한 유저의 이메일 가져오기
        String email = JwtUtil.getCurrentUserEmail().orElseThrow(() -> new CustomException(ErrorCode.JWT_TOKEN_NOT_FOUND));
        NotiResponse.GetNotiResponse noti = notiService.getNotiById(notiId);
        return ResponseEntity.created(URI.create(noti.getUrl())).build();
    }

}
