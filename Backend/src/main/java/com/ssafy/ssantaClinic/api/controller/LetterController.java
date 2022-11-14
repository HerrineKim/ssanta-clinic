package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.request.SendLetterRequest;
import com.ssafy.ssantaClinic.api.response.LetterResponse;
import com.ssafy.ssantaClinic.api.response.SimpleMessageResponse;
import com.ssafy.ssantaClinic.api.service.ClovaService;
import com.ssafy.ssantaClinic.api.service.LetterService;
import com.ssafy.ssantaClinic.common.auth.util.JwtUtil;
import com.ssafy.ssantaClinic.db.entity.SendLetter;
import com.ssafy.ssantaClinic.db.entity.columnEnum.Emotion;
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
    private final ClovaService clovaService;

    @ApiOperation(value = "편지 내역 리스트 반환", notes="사용자의 편지 수신, 발신 리스트 반환", httpMethod = "GET")
    @GetMapping
    public ResponseEntity<LetterResponse.LetterListResponse> getLetterList(){
        /**
         * @Method Name : getLetterList
         * @Method 설명 : 사용자의 편지 수신, 발신 리스트 반환
         */
        return ResponseEntity.ok(letterService.getLetterList(JwtUtil.getCurrentUserId()));
    }

    @ApiOperation(value = "편지 보내기", notes="산타에게 편지 보내기", httpMethod = "POST")
    @PostMapping
    public ResponseEntity<SimpleMessageResponse> sendLetter(@RequestBody @Valid SendLetterRequest letter){
        /**
         * @Method Name : sendLetter
         * @Method 설명 : 산타에게 편지 보내기
         */
        SendLetter sendLetter = letterService.save(letter);
        Emotion emotion = clovaService.getEmotion(sendLetter.getMessage());
        letterService.makeReplyLetter(JwtUtil.getCurrentUserId(), sendLetter, emotion, sendLetter.getType());
        return ResponseEntity.ok().body(SimpleMessageResponse.builder().Result("편지가 성공적으로 전송되었습니다.").build());
    }

    @ApiOperation(value = "보낸 편지 보기", notes="보낸 편지 상세보기", httpMethod = "GET")
    @GetMapping("/send/{letterId}")
    public ResponseEntity<LetterResponse.SendLetterResponse> getSendLetterDetail(@PathVariable int letterId){
        /**
         * @Method Name : getSendLetterDetail
         * @Method 설명 : 보낸 편지 상세보기
         */
        return ResponseEntity.ok(letterService.getSendLetter(letterId));
    }

    @ApiOperation(value = "받은 편지 보기", notes="받은 편지 상세보기", httpMethod = "GET")
    @GetMapping("/reply/{letterId}")
    public ResponseEntity<LetterResponse.ReplyLetterResponse> getReplyLetterDetail(@PathVariable int letterId){
        /**
         * @Method Name : getReplyLetterDetail
         * @Method 설명 : 받은 편지 상세보기
         */
        return ResponseEntity.ok(letterService.getReplyLetter(letterId));
    }
}
