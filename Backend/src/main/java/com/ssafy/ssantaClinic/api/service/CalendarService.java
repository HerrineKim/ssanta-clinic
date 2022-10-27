package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.CalendarRequest;
import com.ssafy.ssantaClinic.api.response.CalendarResponse;
import com.ssafy.ssantaClinic.db.entity.AdventCalendar;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CalendarService {
    List<CalendarResponse.GetBoxResponse> findAllTodayBoxes(int userId);
    CalendarResponse.GetBoxDetailResponse findBox(int userId, int boxId);
    AdventCalendar saveBox(List<MultipartFile> imges, MultipartFile audio, CalendarRequest.sendRequest box) throws IOException;
    List<CalendarResponse.GetCalendarResponse> findAdventCalendarByUserId(int userId);
    List<CalendarResponse.GetBoxResponse> findAllBoxesByDate(int userId, String date);
}
