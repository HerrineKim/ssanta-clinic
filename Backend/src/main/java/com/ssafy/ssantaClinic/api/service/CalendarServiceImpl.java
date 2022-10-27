package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.CalendarRequest;
import com.ssafy.ssantaClinic.api.response.CalendarResponse;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.db.entity.AdventCalendar;
import com.ssafy.ssantaClinic.db.entity.AdventCalendarImg;
import com.ssafy.ssantaClinic.db.entity.User;
import com.ssafy.ssantaClinic.db.repository.AdventCalendarImgRepository;
import com.ssafy.ssantaClinic.db.repository.AdventCalendarRepository;
import com.ssafy.ssantaClinic.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @FileName : CalendarServiceImpl
 * @Class 설명 : 어드벤트 캘린더 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService{
    private final UserRepository userRepository;
    private final AdventCalendarRepository calendarRepository;
    private final AdventCalendarImgRepository imgRepository;
    static Calendar now = Calendar.getInstance();
    static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    static final int D_MONTH = 10 - 1;
    @Override
    public List<CalendarResponse.GetBoxResponse> findAllTodayBoxes(int userId) {
        /**
         * @Method Name : findAllTodayBoxes
         * @Method 설명 : 오늘 날짜에 열 수 있는 상자 목록을 조회한다.
         */
        // 존재하는 회원인지 확인
        userRepository.findById(userId).orElseThrow(()-> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        int month = now.get(Calendar.MONTH);
        if(month != D_MONTH){
            throw new CustomException(ErrorCode.D_DAY_IS_NOT_COMING);
        }
        int day = now.get(Calendar.DATE);
        List<CalendarResponse.GetBoxResponse> boxes = calendarRepository.findAllByReceiverUserIdAndDay(userId, day)
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
        AdventCalendar box = calendarRepository.findById(boxId)
                .orElseThrow(()-> new CustomException(ErrorCode.BOX_NOT_FOUND));
        // 개봉 날짜가 지났는지 확인
        int day = now.get(Calendar.DATE);
        if(day < box.getDay()){
            throw new CustomException(ErrorCode.D_DAY_IS_NOT_COMING);
        }
        // 접근 권한 확인
        if(box.getReceiver().getUserId() != userId){
            throw new CustomException(ErrorCode.BOX_OPEN_WRONG_ACCESS);
        }
        // 상자 열림 표시
        box.isOpened();
        calendarRepository.save(box);
        List<String> imges = imgRepository.findAllByAdventCalendarId(boxId).stream()
                .map(AdventCalendarImg::getImgUrl).collect(Collectors.toList());
        return CalendarResponse.GetBoxDetailResponse.builder().
                content(box.getContent()).audioUrl(box.getAudioUrl()).imges(imges).sender(box.getSender().getNickName()).build();
    }

    @Override
    public AdventCalendar saveBox(List<String> imgUrls, String audioUrl, CalendarRequest.sendRequest box) throws IOException {
        /**
         * @Method Name : saveBox
         * @Method 설명 : 상자를 등록한다.
         */
        // 존재하는 회원인지 확인
        User receiver = userRepository.findById(box.getReceiverId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        User sender = userRepository.findByNickName(box.getSender())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        // String -> LocalDateTime
        LocalDateTime createdAt;
        try {
            createdAt = LocalDateTime.parse(box.getCreatedAt(), formatter);
        } catch (Exception e){
            throw new CustomException(ErrorCode.FORMAT_NOT_MATCH);
        }
        // 어드벤트 캘린더 객체 저장
        AdventCalendar calendar = AdventCalendar.builder().content(box.getContent()).audioUrl(audioUrl)
                .sender(sender).createdAt(createdAt).receiver(receiver).isRead(false).day(box.getDay())
                .build();
        calendarRepository.save(calendar);
        // 이미지 객체 저장
        if(!imgUrls.isEmpty()){
            for (String url : imgUrls) {
                AdventCalendarImg img = AdventCalendarImg.builder().adventCalendar(calendar).imgUrl(url).build();
                imgRepository.save(img);
            }
        }
        return calendar;
    }

    @Override
    public List<CalendarResponse.GetCalendarResponse> findAdventCalendarByUserId(int userId) {
        /**
         * @Method Name : findAdventCalendarByUserId
         * @Method 설명 : 회원이 보유한 어드벤트 캘린더 정보를 반환한다.
         */
        // 존재하는 회원인지 확인
        userRepository.findById(userId).orElseThrow(()-> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        List<CalendarResponse.GetCalendarResponse> result = new ArrayList<>();
        for(int i = 1; i <= 25; i++){
            int cnt = (int) calendarRepository.countByReceiverUserIdAndDay(userId, i);
            result.add(CalendarResponse.GetCalendarResponse.builder().date(i).cnt(cnt).build());
        }
        return result;
    }

    @Override
    public List<CalendarResponse.GetBoxResponse> findAllBoxesByDate(int userId, String date) {
        /**
         * @Method Name : findAllBoxesByDate
         * @Method 설명 : 해당 날짜에 회원이 보유한 상자 목록을 반환한다.
         */
        // 존재하는 회원인지 확인
        userRepository.findById(userId).orElseThrow(()-> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        // 날짜 변환
        int day = Integer.parseInt(date);
        // 개봉 날짜가 지났는지 확인
        int nowDate = now.get(Calendar.DATE);
        if(nowDate < day){
            throw new CustomException(ErrorCode.D_DAY_IS_NOT_COMING);
        }
        List<CalendarResponse.GetBoxResponse> boxes = calendarRepository.findAllByReceiverUserIdAndDay(userId, day)
                .stream().map(CalendarResponse.GetBoxResponse::new).collect(Collectors.toList());
        return boxes;
    }
}
