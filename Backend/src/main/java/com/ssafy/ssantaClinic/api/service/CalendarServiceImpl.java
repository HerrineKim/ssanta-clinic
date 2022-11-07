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

import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.LineEvent;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
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
    private final S3Service s3Service;
    static Calendar now = Calendar.getInstance();
    static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    static final int D_MONTH = Calendar.DECEMBER;
    @Override
    public List<CalendarResponse.GetBoxResponse> findAllTodayBoxes(String email) {
        /**
         * @Method Name : findAllTodayBoxes
         * @Method 설명 : 오늘 날짜에 열 수 있는 상자 목록을 조회한다.
         */
        // 존재하는 회원인지 확인
        userRepository.findByEmail(email).orElseThrow(()-> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        int month = now.get(Calendar.MONTH);
        if(month != D_MONTH){
            throw new CustomException(ErrorCode.D_DAY_IS_NOT_COMING);
        }
        int day = now.get(Calendar.DATE);
        List<CalendarResponse.GetBoxResponse> boxes = calendarRepository.findAllByReceiverEmailAndDay(email, day)
                .stream().map(CalendarResponse.GetBoxResponse::new).collect(Collectors.toList());
        return boxes;
    }

    @Override
    public CalendarResponse.GetBoxDetailResponse findBox(String email, int boxId) {
        /**
         * @Method Name : findBox
         * @Method 설명 : 상자를 상세 조회한다.
         */
        // 존재하는 회원인지 확인
        userRepository.findByEmail(email).orElseThrow(()-> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        // 존재하는 상자인지 확인
        AdventCalendar box = calendarRepository.findById(boxId)
                .orElseThrow(()-> new CustomException(ErrorCode.BOX_NOT_FOUND));
        // 개봉 날짜가 지났는지 확인
        int day = now.get(Calendar.DATE);
        if(day < box.getDay()){
            throw new CustomException(ErrorCode.D_DAY_IS_NOT_COMING);
        }
        // 접근 권한 확인
        if(!box.getReceiver().getEmail().equals(email)){
            throw new CustomException(ErrorCode.NOT_YOUR_BOX);
        }
        // 상자 열림 표시
        box.isOpened();
        calendarRepository.save(box);
        List<String> imges = imgRepository.findAllByAdventCalendarId(boxId).stream()
                .map(AdventCalendarImg::getImgUrl).collect(Collectors.toList());
        return CalendarResponse.GetBoxDetailResponse.builder().
                content(box.getContent()).audioUrl(box.getAudioUrl()).imges(imges).sender(box.getSender()).build();
    }

    @Override
    public AdventCalendar saveBox(String email, List<String> imgUrls, String audioUrl, CalendarRequest.sendRequest box) throws IOException {
        /**
         * @Method Name : saveBox
         * @Method 설명 : 상자를 등록한다.
         */
        // 존재하는 회원인지 확인
        User receiver = userRepository.findById(box.getReceiverId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        // 자기 자신에게 선물하면 오류
        if(receiver.getEmail().equals(email)){
            throw new CustomException(ErrorCode.SELF_GIFT_ERROR);
        }
        // String -> LocalDateTime
        LocalDateTime createdAt;
        try {
            createdAt = LocalDateTime.parse(box.getCreatedAt(), formatter);
        } catch (Exception e){
            throw new CustomException(ErrorCode.FORMAT_NOT_MATCH);
        }
        // 1일~25일 외 날짜로 선물 요청이 들어오면 오류
        if(box.getDay() > 25 || box.getDay() < 1) {
            throw new CustomException(ErrorCode.CHRISTMAS_IS_OVER);
        }
        // 어드벤트 캘린더 객체 저장
        AdventCalendar calendar = AdventCalendar.builder().content(box.getContent()).audioUrl(audioUrl)
                .sender(box.getSender()).createdAt(createdAt).receiver(receiver).isRead(false).day(box.getDay())
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
    public List<CalendarResponse.GetCalendarResponse> findAdventCalendarByUserId(String email) {
        /**
         * @Method Name : findAdventCalendarByUserId
         * @Method 설명 : 회원이 보유한 어드벤트 캘린더 정보를 반환한다.
         */
        // 존재하는 회원인지 확인
        userRepository.findByEmail(email).orElseThrow(()-> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        List<CalendarResponse.GetCalendarResponse> result = new ArrayList<>();
        for(int i = 1; i <= 25; i++){
            int cnt = (int) calendarRepository.countByReceiverEmailAndDay(email, i);
            result.add(CalendarResponse.GetCalendarResponse.builder().date(i).cnt(cnt).build());
        }
        return result;
    }

    @Override
    public List<CalendarResponse.GetBoxResponse> findAllBoxesByDate(String email, String date) {
        /**
         * @Method Name : findAllBoxesByDate
         * @Method 설명 : 해당 날짜에 회원이 보유한 상자 목록을 반환한다.
         */
        // 존재하는 회원인지 확인
        userRepository.findByEmail(email).orElseThrow(()-> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        // 날짜 변환
        int day = Integer.parseInt(date);
        // 개봉 날짜가 지났는지 확인
        int nowDate = now.get(Calendar.DATE);
        if(nowDate < day){
            throw new CustomException(ErrorCode.D_DAY_IS_NOT_COMING);
        }
        List<CalendarResponse.GetBoxResponse> boxes = calendarRepository.findAllByReceiverEmailAndDay(email, day)
                .stream().map(CalendarResponse.GetBoxResponse::new).collect(Collectors.toList());
        return boxes;
    }

    @Override
    public void playAudio(String email, int boxId) {
        /**
         * @Method Name : playAudio
         * @Method 설명 : 상자에 있는 음성을 재생한다.
         */
        // 존재하는 상자인지 확인
        AdventCalendar box = calendarRepository.findById(boxId).orElseThrow(() -> new CustomException(ErrorCode.BOX_NOT_FOUND));
        // 존재하는 회원인지 확인
        User user = userRepository.findByEmail(email).orElseThrow(()-> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        // 열람 권한 확인
        if(user.getUserId() != box.getReceiver().getUserId())
            throw new CustomException(ErrorCode.NOT_YOUR_BOX);
        // 오디오 주소 가져오기
        String audioUrl = box.getAudioUrl();
        // 오디오 재생
        File audio;
        AudioInputStream stream;
        try {
            audio = s3Service.downloadFile(audioUrl, boxId + " audio");
            Clip clip = AudioSystem.getClip();
            clip.addLineListener(event -> {
                if(LineEvent.Type.STOP.equals(event.getType())) {
                    clip.close();
                }
            });
            stream = AudioSystem.getAudioInputStream(audio);
            clip.open(stream);
            clip.start();
            while(clip.getMicrosecondLength() != clip.getMicrosecondPosition()){
                //waiting for sound to be finished
            }
            stream.close();
            clip.close();
            audio.delete();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
