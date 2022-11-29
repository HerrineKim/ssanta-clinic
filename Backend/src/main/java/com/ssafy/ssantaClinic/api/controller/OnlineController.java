package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.response.CalendarResponse;
import com.ssafy.ssantaClinic.api.response.OnlineResponse;
import com.ssafy.ssantaClinic.api.service.OnlineService;
import com.ssafy.ssantaClinic.common.auth.util.JwtUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @FileName : OnlineController
 * @Class 설명 : 실시간 접속자 수 요청을 처리하는 Controller
 */
@Api(value = "실시간 접속자 수 API", tags = {"OnlineController"})
@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/online")
@RequiredArgsConstructor
public class OnlineController {
    private final OnlineService onlineService;
    @ApiOperation(value = "현재 접속자 수 조회", notes = "현재 접속자 수를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping
    public ResponseEntity<OnlineResponse> countCurrentOnlineUser() {
        /**
         * @Method Name : countCurrentOnlineUser
         * @Method 설명 : 현재 접속자 수를 조회한다.
         */
        return ResponseEntity.ok(onlineService.countOnlineUser());
    }
}
