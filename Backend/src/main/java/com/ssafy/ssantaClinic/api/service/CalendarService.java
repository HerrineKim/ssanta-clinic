package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.BoxRequest;
import com.ssafy.ssantaClinic.api.response.BoxDetailResponse;
import com.ssafy.ssantaClinic.api.response.BoxResponse;
import com.ssafy.ssantaClinic.api.response.CalendarResponse;
import com.ssafy.ssantaClinic.db.entity.AdventCalendar;

import java.util.List;

public interface CalendarService {
    List<BoxResponse> findAllTodayBoxes(int userId);
    BoxDetailResponse findBox(int userId, int boxId);
    AdventCalendar saveBox(BoxRequest box);
    List<CalendarResponse> findAdventCalendarByUserId(int userId);
    List<BoxResponse> findAllBoxesByDate(int userId, String date);
}
