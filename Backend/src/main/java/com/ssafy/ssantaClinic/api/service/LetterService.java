package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.LetterRequest;
import com.ssafy.ssantaClinic.db.entity.SendLetter;

import java.util.List;

public interface LetterService {
    void save(LetterRequest letterRequest);
    List<SendLetter> getLetterList(int userId);
    SendLetter getLetter(int letterId);
}
