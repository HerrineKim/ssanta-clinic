package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.request.CalendarRequest;
import com.ssafy.ssantaClinic.api.response.CalendarResponse;
import com.ssafy.ssantaClinic.api.service.CalendarService;
import com.ssafy.ssantaClinic.common.util.SuccessResponseResult;
import com.ssafy.ssantaClinic.db.entity.AdventCalendar;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.List;

/**
 * @FileName : CalendarController
 * @Class 설명 : 어드벤트 캘린더 관련 요청을 처리하는 Controller
 */
@Api(value = "어드벤트 캘린더 관련 API", tags = {"CalendarController"}, description = "어드벤트 캘린더 관련 컨트롤러")
@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;

    @ApiOperation(value = "상자 목록 조회", notes = "오늘 열람가능한 상자 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 204, message = "조회할 상자 없음"),
            @ApiResponse(code = 404, message = "회원 정보 조회 오류"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping
    public ResponseEntity<?> getTodayBoxList(HttpServletRequest request) {
        /**
         * @Method Name : getTodayBoxList
         * @Method 설명 : 오늘 열람가능한 상자 목록을 조회한다.
         */
        int userId = 1; // temp
        List<CalendarResponse.GetBoxResponse> boxes = calendarService.findAllTodayBoxes(userId);
        if(boxes.isEmpty())
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.ok(new SuccessResponseResult(boxes));
    }

    @ApiOperation(value = "상자 조회", notes = "상자 상세 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 403, message = "접근 권한 없음"),
            @ApiResponse(code = 404, message = "조회 오류"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping
    public ResponseEntity<?> getBox(HttpServletRequest request,
                                    @RequestParam(value = "boxId") int boxId) {
        /**
         * @Method Name : getBox
         * @Method 설명 : 상자 상세 정보를 조회한다.
         */
        int userId = 1; //temp
        CalendarResponse.GetBoxDetailResponse box = calendarService.findBox(userId, boxId);
        return ResponseEntity.ok(new SuccessResponseResult(box));
    }

//    @ApiOperation(value = "상자 속 음성 재생", notes = "상자의 음성 메세지를 재생한다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "조회 성공"),
//            @ApiResponse(code = 500, message = "서버 에러 발생")
//    })
//    @GetMapping("/{boxId}/play")
//    public ResponseEntity<?> playVoiceMessage(HttpServletRequest request, @PathVariable int boxId) {
//        /**
//         * @Method Name : playVoiceMessage
//         * @Method 설명 : 상자의 음성 메세지를 재생한다.
//         */
//    }

    @ApiOperation(value = "상자 선물하기", notes = "상자를 선물한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 400, message = "날짜 형식 오류"),
            @ApiResponse(code = 404, message = "조회 오류"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @PostMapping
    public ResponseEntity<?> sendBox(HttpServletRequest request,
                                     @RequestBody CalendarRequest.sendRequest boxRequest) {
        /**
         * @Method Name : sendBox
         * @Method 설명 : 상자를 선물한다.
         */
        AdventCalendar box = calendarService.saveBox(boxRequest);
        return ResponseEntity.created(URI.create("/"+box.getAdventCalendarId())).build();
    }

    @ApiOperation(value = "어드벤트 캘린더 전체 조회", notes = "회원의 어드벤트 캘린더 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "조회 오류"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping
    public ResponseEntity<?> getAdventCalendarInfo(HttpServletRequest request,
                                     @RequestParam(value = "userId") int userId) {
        /**
         * @Method Name : getAdventCalendarInfo
         * @Method 설명 : 회원의 어드벤트 캘린더 정보를 조회한다.
         */
        List<CalendarResponse.GetCalendarResponse> calendarInfo = calendarService.findAdventCalendarByUserId(userId);
        return ResponseEntity.ok(new SuccessResponseResult(calendarInfo));
    }

    @ApiOperation(value = "해당 날짜 상자 목록 조회", notes = "해당 날짜의 회원의 어드벤트 캘린더 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 204, message = "조회할 상자 없음"),
            @ApiResponse(code = 403, message = "접근 권한 없음"),
            @ApiResponse(code = 404, message = "조회 오류"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping
    public ResponseEntity<?> getBoxListByDate(HttpServletRequest request,
                                                   @RequestParam(value = "date") String date) {
        /**
         * @Method Name : getBoxListByDate
         * @Method 설명 : 해당 날짜의 회원의 어드벤트 캘린더 정보를 조회한다.
         */
        int userId = 1; //temp
        List<CalendarResponse.GetBoxResponse> boxes = calendarService.findAllBoxesByDate(userId, date);
        if(boxes.isEmpty())
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.ok(new SuccessResponseResult(boxes));
    }
}
