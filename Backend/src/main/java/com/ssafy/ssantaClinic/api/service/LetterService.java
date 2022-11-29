package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.SendLetterRequest;
import com.ssafy.ssantaClinic.api.response.LetterResponse;
import com.ssafy.ssantaClinic.db.entity.ReplyLetter;
import com.ssafy.ssantaClinic.db.entity.SendLetter;
import com.ssafy.ssantaClinic.db.entity.columnEnum.Emotion;
import com.ssafy.ssantaClinic.db.entity.columnEnum.LetterType;

import java.util.List;

public interface LetterService {
    SendLetter save(SendLetterRequest letterRequest);
    void makeReplyLetter(int userId, SendLetter letter, Emotion emotion, LetterType type);
    List<LetterResponse.SendLetterResponse> getSendLetterList(int userId);
    List<LetterResponse.ReplyLetterResponse> getReplyLetterList(int userId);
    LetterResponse.LetterListResponse getLetterList(int userId);
    LetterResponse.SendLetterResponse getSendLetter(int letterId);
    LetterResponse.ReplyLetterResponse getReplyLetter(int letterId);
}
