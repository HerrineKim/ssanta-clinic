package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.BoxRequest;
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

import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService{
    private final UserRepository userRepository;
    private final AdventCalendarRepository calendarRepository;
    static Calendar now = Calendar.getInstance();
    @Override
    public List<CalendarResponse.GetBoxResponse> findAllTodayBoxes(int userId) {
        User user = userRepository.findById(userId).orElseThrow(()-> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        int day = now.get(Calendar.DATE);
        List<CalendarResponse.GetBoxResponse> boxes = calendarRepository.findAllByReceiverIdAndDay(userId, day)
                .stream().map(CalendarResponse.GetBoxResponse::new).collect(Collectors.toList());
        return boxes;
    }

    @Override
    public CalendarResponse.GetBoxDetailResponse findBox(int userId, int boxId) {
        return null;
    }

    @Override
    public AdventCalendar saveBox(BoxRequest box) {
        return null;
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
