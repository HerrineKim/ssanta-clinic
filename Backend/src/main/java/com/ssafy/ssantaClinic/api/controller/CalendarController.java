package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.request.CalendarRequest;
import com.ssafy.ssantaClinic.api.response.CalendarResponse;
import com.ssafy.ssantaClinic.api.response.SimpleMessageResponse;
import com.ssafy.ssantaClinic.api.service.CalendarService;
import com.ssafy.ssantaClinic.api.service.S3Service;
import com.ssafy.ssantaClinic.common.auth.util.JwtUtil;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.db.entity.AdventCalendar;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

/**
 * @FileName : CalendarController
 * @Class 설명 : 어드벤트 캘린더 관련 요청을 처리하는 Controller
 */
@Api(value = "어드벤트 캘린더 관련 API", tags = {"CalendarController"})
@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;
    private final S3Service s3Service;

    @ApiOperation(value = "상자 목록 조회", notes = "오늘 열람가능한 상자 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 204, message = "조회할 상자 없음"),
            @ApiResponse(code = 404, message = "회원 정보 조회 오류"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping
    public ResponseEntity<List<CalendarResponse.GetBoxResponse>> getTodayBoxList() {
        /**
         * @Method Name : getTodayBoxList
         * @Method 설명 : 오늘 열람가능한 상자 목록을 조회한다.
         */
        // 현재 로그인한 유저의 아이디 가져오기
        int userId = JwtUtil.getCurrentUserId();
        List<CalendarResponse.GetBoxResponse> boxes = calendarService.findAllTodayBoxes(userId);
        if(boxes.isEmpty())
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.ok(boxes);
    }

    @ApiOperation(value = "상자 조회", notes = "상자 상세 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 403, message = "접근 권한 없음"),
            @ApiResponse(code = 404, message = "조회 오류"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping(params = {"boxId"})
    public ResponseEntity<CalendarResponse.GetBoxDetailResponse> getBox(@RequestParam(value = "boxId") int boxId) {
        /**
         * @Method Name : getBox
         * @Method 설명 : 상자 상세 정보를 조회한다.
         */
        // 현재 로그인한 유저의 아이디 가져오기
        int userId = JwtUtil.getCurrentUserId();
        CalendarResponse.GetBoxDetailResponse box = calendarService.findBox(userId, boxId);
        return ResponseEntity.ok(box);
    }

    @ApiOperation(value = "상자 속 음성 재생", notes = "상자의 음성 메세지를 재생한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping("/play")
    public ResponseEntity<SimpleMessageResponse> playVoiceMessage(@RequestParam(value = "boxId") int boxId) throws Exception {
        /**
         * @Method Name : playVoiceMessage
         * @Method 설명 : 상자의 음성 메세지를 재생한다.
         */
        // 현재 로그인한 유저의 아이디 가져오기
        int userId = JwtUtil.getCurrentUserId();
        calendarService.playAudio(userId, boxId);
        return ResponseEntity.ok(SimpleMessageResponse.builder().Result("success").build());
    }

    @ApiOperation(value = "상자 선물하기", notes = "상자를 선물한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 400, message = "형식 오류"),
            @ApiResponse(code = 404, message = "조회 오류"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @PostMapping(
            consumes = { MediaType.MULTIPART_FORM_DATA_VALUE },
            produces = { MediaType.APPLICATION_JSON_VALUE }
            )
    public ResponseEntity<SimpleMessageResponse> sendBox(@RequestParam(value = "userId") int userId,
                                     @RequestParam(value = "day") int day,
                                     @RequestPart(required = false) List<MultipartFile> imges,
                                     @RequestPart(required = false) MultipartFile audio,
                                     @RequestPart CalendarRequest.sendRequest boxRequest) throws IOException {
        /**
         * @Method Name : sendBox
         * @Method 설명 : 상자를 선물한다.
         */
        // 현재 로그인한 유저의 아이디 가져오기
        int currentUserId = JwtUtil.getCurrentUserId();
        // 자기 자신에게는 선물 불가능
        if(userId == currentUserId){
            throw new CustomException(ErrorCode.SELF_GIFT_ERROR);
        }
        // 오디오, 사진, 텍스트 모두 없을 시 오류
        if((boxRequest.getContent() == null || boxRequest.getContent().isBlank()) && audio == null && imges == null){
            throw new CustomException(ErrorCode.EMPTY_BOX_ERROR);
        }
        // 오디오 S3 업로드
        var audioUrl = "";
        if(audio != null){
            audioUrl = s3Service.upload(audio);
        }
        // 이미지 업로드
        List<String> imgUrls = new ArrayList<>();
        if(imges != null){
            imgUrls = s3Service.uploadImges(imges);
        }
        int boxId = calendarService.saveBox(userId, imgUrls, audioUrl, boxRequest);
        return ResponseEntity.created(URI.create("/"+boxId))
                .body(SimpleMessageResponse.builder().Result("success").build());
    }

    @ApiOperation(value = "어드벤트 캘린더 전체 조회", notes = "회원의 어드벤트 캘린더 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "조회 오류"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping(params = {"userId"})
    public ResponseEntity<List<CalendarResponse.GetCalendarResponse>> getAdventCalendarInfo
            (@RequestParam(value = "userId") int userId) {
        /**
         * @Method Name : getAdventCalendarInfo
         * @Method 설명 : 회원의 어드벤트 캘린더 정보를 조회한다.
         */
        List<CalendarResponse.GetCalendarResponse> calendarInfo = calendarService.findAdventCalendarByUserId(userId);
        return ResponseEntity.ok(calendarInfo);
    }

    @ApiOperation(value = "해당 날짜 상자 목록 조회", notes = "해당 날짜의 회원의 어드벤트 캘린더 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 204, message = "조회할 상자 없음"),
            @ApiResponse(code = 403, message = "접근 권한 없음"),
            @ApiResponse(code = 404, message = "조회 오류"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping(params = {"date"})
    public ResponseEntity<List<CalendarResponse.GetBoxResponse>> getBoxListByDate
            (@RequestParam(value = "date") String date) {
        /**
         * @Method Name : getBoxListByDate
         * @Method 설명 : 해당 날짜의 회원의 어드벤트 캘린더 정보를 조회한다.
         */
        // 현재 로그인한 유저의 아이디 가져오기
        int userId = JwtUtil.getCurrentUserId();
        List<CalendarResponse.GetBoxResponse> boxes = calendarService.findAllBoxesByDate(userId, date);
        if(boxes.isEmpty())
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.ok(boxes);
    }
}
