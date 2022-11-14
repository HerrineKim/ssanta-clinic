package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.request.CoinRequest;
import com.ssafy.ssantaClinic.api.response.CalendarResponse;
import com.ssafy.ssantaClinic.api.response.CoinResponse;
import com.ssafy.ssantaClinic.api.service.CoinService;
import com.ssafy.ssantaClinic.common.auth.util.JwtUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @FileName : CoinController
 * @Class 설명 : 게임 머니 관련 요청을 처리하는 Controller
 */
@Api(value = "게임 머니 관련 API", tags = {"CoinController"})
@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/coin")
@RequiredArgsConstructor
public class CoinController {
    private final CoinService coinService;
    @ApiOperation(value = "코인 획득", notes = "게임 성공 시 코인 획득")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @PatchMapping
    public ResponseEntity<CoinResponse> updateCoin(@RequestBody CoinRequest coinRequest) {
        /**
         * @Method Name : updateCoin
         * @Method 설명 : 게임 성공 시 코인 획득
         */
        // 현재 로그인한 유저의 아이디 가져오기
        int userId = JwtUtil.getCurrentUserId();
        return ResponseEntity.ok().body(coinService.earnMoney(userId, coinRequest.getCoin()));
    }
    @ApiOperation(value = "게임 머니 정보 반환", notes = "유저의 게임 머니 정보를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping
    public ResponseEntity<CoinResponse> getCoinInfo() {
        /**
         * @Method Name : getCoinInfo
         * @Method 설명 : 유저의 게임 머니 정보를 반환한다.
         */
        // 현재 로그인한 유저의 아이디 가져오기
        int userId = JwtUtil.getCurrentUserId();
        return ResponseEntity.ok().body(coinService.getMoneyInfo(userId));
    }
}
