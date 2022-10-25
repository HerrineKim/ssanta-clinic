package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.CalendarRequest;
import com.ssafy.ssantaClinic.api.response.CalendarResponse;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.db.entity.AdventCalendar;
import com.ssafy.ssantaClinic.db.entity.User;
import com.ssafy.ssantaClinic.db.repository.AdventCalendarRepository;
import com.ssafy.ssantaClinic.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @FileName : CalendarServiceImpl
 * @작성자 : 허성은
 * @Class 설명 : 어드벤트 캘린더 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService{
    private final UserRepository userRepository;
    private final AdventCalendarRepository calendarRepository;
    static Calendar now = Calendar.getInstance();
    static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
    @Override
    public List<CalendarResponse.GetBoxResponse> findAllTodayBoxes(int userId) {
        /**
         * @Method Name : findAllTodayBoxes
         * @Method 설명 : 오늘 날짜에 열 수 있는 상자 목록을 조회한다.
         */
        // 존재하는 회원인지 확인
        userRepository.findById(userId).orElseThrow(()-> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        int day = now.get(Calendar.DATE);
        List<CalendarResponse.GetBoxResponse> boxes = calendarRepository.findAllByReceiverIdAndDay(userId, day)
                .stream().map(CalendarResponse.GetBoxResponse::new).collect(Collectors.toList());
        return boxes;
    }

    @Override
    public CalendarResponse.GetBoxDetailResponse findBox(int userId, int boxId) {
        /**
         * @Method Name : findBox
         * @Method 설명 : 상자를 상세 조회한다.
         */
        // 존재하는 회원인지 확인
        userRepository.findById(userId).orElseThrow(()-> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        // 존재하는 상자인지 확인
        AdventCalendar box = calendarRepository.findById(boxId).orElseThrow(()-> new CustomException(ErrorCode.BOX_NOT_FOUND));
        // 개봉 날짜가 지났는지 확인
        int day = now.get(Calendar.DATE);
        if(day < box.getDay()){
            throw new CustomException(ErrorCode.D_DAY_IS_NOT_COMING);
        }
        // 접근 권한 확인
        if(box.getReceiver().getUserId() != userId){
            throw new CustomException(ErrorCode.BOX_OPEN_WRONG_ACCESS);
        }
        return CalendarResponse.GetBoxDetailResponse.builder().
                content(box.getContent()).audioUrl(box.getAudioUrl()).sender(box.getSender().getNickName()).build();
    }

    @Override
    public AdventCalendar saveBox(CalendarRequest.sendRequest box) {
        /**
         * @Method Name : saveBox
         * @Method 설명 : 상자를 등록한다.
         */
        // 존재하는 회원인지 확인
        User receiver = userRepository.findById(box.getReceiverId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        User sender = userRepository.findByEmail(box.getSender()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        // String -> LocalDateTime
        LocalDateTime createdAt;
        try {
            createdAt = LocalDateTime.parse(box.getDate(), formatter);
        } catch (Exception e){
            throw new CustomException(ErrorCode.FORMAT_NOT_MATCH);
        }
        AdventCalendar calendar = AdventCalendar.builder().content(box.getContent())
                .sender(sender).createdAt(createdAt).receiver(receiver)
                .build();
        calendarRepository.save(calendar);
        return calendar;
    }

    @Override
    public List<CalendarResponse.GetCalendarResponse> findAdventCalendarByUserId(int userId) {
        return null;
    }

    @Override
    public List<CalendarResponse.GetBoxResponse> findAllBoxesByDate(int userId, String date) {
        return null;
    }
}
