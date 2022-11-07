package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.CalendarRequest;
import com.ssafy.ssantaClinic.api.response.CalendarResponse;
import com.ssafy.ssantaClinic.db.entity.AdventCalendar;

import java.io.IOException;
import java.util.List;

public interface CalendarService {
    List<CalendarResponse.GetBoxResponse> findAllTodayBoxes(String email);
    CalendarResponse.GetBoxDetailResponse findBox(String email, int boxId);
    AdventCalendar saveBox(String email, List<String> imgUrls, String audioUrl, CalendarRequest.sendRequest box) throws IOException;
    List<CalendarResponse.GetCalendarResponse> findAdventCalendarByUserId(String email);
    List<CalendarResponse.GetBoxResponse> findAllBoxesByDate(String email, String date);
    void playAudio(String email, int boxId) throws Exception;
}
