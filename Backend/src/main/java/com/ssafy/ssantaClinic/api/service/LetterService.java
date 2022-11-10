package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.LetterRequest;
import com.ssafy.ssantaClinic.db.entity.Letter;

import java.util.List;

public interface LetterService {
    void save(LetterRequest letterRequest);
    List<Letter> getLetterList(int userId);
    Letter getLetter(int letterId);
}
