package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.BoxRequest;
import com.ssafy.ssantaClinic.api.response.CalendarResponse;
import com.ssafy.ssantaClinic.db.entity.AdventCalendar;

import java.util.List;

public interface CalendarService {
    List<CalendarResponse.GetBoxResponse> findAllTodayBoxes(int userId);
    CalendarResponse.GetBoxDetailResponse findBox(int userId, int boxId);
    AdventCalendar saveBox(BoxRequest box);
    List<CalendarResponse.GetCalendarResponse> findAdventCalendarByUserId(int userId);
    List<CalendarResponse.GetBoxResponse> findAllBoxesByDate(int userId, String date);
}
