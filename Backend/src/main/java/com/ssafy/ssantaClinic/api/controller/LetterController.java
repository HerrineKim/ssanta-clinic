package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.request.LetterRequest;
import com.ssafy.ssantaClinic.api.response.LetterResponse;
import com.ssafy.ssantaClinic.api.response.SimpleMessageResponse;
import com.ssafy.ssantaClinic.api.service.LetterService;
import io.protostuff.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(value = "산타 편지 관련 API", tags = {"LetterController"})
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/letter")
@RequiredArgsConstructor
public class LetterController {
    private final LetterService letterService;
    @ApiOperation(value = "편지 내역 리스트 반환", notes="사용자의 편지 수신, 발신 리스트 반환", httpMethod = "GET")
    @GetMapping
    public ResponseEntity<LetterResponse.LetterListResponse> getLetterList(){
        return null;
    }

    @ApiOperation(value = "편지 보내기", notes="산타에게 편지 보내기", httpMethod = "POST")
    @PostMapping
    public ResponseEntity<SimpleMessageResponse> sendLetter(@RequestBody @Valid LetterRequest letter){


        return ResponseEntity.ok().body(SimpleMessageResponse.builder().Result("편지가 성공적으로 전송되었습니다.").build());
    }
}
