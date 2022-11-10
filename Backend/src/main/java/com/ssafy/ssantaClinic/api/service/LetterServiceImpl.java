package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.LetterRequest;
import com.ssafy.ssantaClinic.db.entity.Letter;
import com.ssafy.ssantaClinic.db.repository.LetterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class LetterServiceImpl implements LetterService {
    private final LetterRepository letterRepository;

    @Override
    public void save(LetterRequest letterRequest) {
        Letter.builder().title(letterRequest.getTitle())
                .message(letterRequest.getMessage());
    }

    @Override
    public List<Letter> getLetterList(int userId) {
        return null;
    }

    @Override
    public Letter getLetter(int letterId) {
        return null;
    }
}
