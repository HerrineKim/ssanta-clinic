package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.SendLetterRequest;
import com.ssafy.ssantaClinic.api.response.LetterResponse;
import com.ssafy.ssantaClinic.db.entity.ReplyLetter;
import com.ssafy.ssantaClinic.db.entity.SendLetter;

import java.util.List;

public interface LetterService {
    void save(SendLetterRequest letterRequest);
    List<SendLetter> getSendLetterList(int userId);
    List<ReplyLetter> getReplyLetterList(int userId);
    LetterResponse.LetterListResponse getLetterList(int userId);
    LetterResponse.SendLetterResponse getSendLetter(int letterId);
    LetterResponse.ReplyLetterResponse getReplyLetter(int letterId);
}
