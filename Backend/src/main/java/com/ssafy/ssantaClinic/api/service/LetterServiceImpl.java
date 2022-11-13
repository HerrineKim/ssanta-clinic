package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.LetterRequest;
import com.ssafy.ssantaClinic.db.entity.SendLetter;
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
        SendLetter letter = SendLetter.builder().title(letterRequest.getTitle())
                .message(letterRequest.getMessage()).build();
        letterRepository.save(letter);
    }

    @Override
    public List<SendLetter> getLetterList(int userId) {
        return null;
    }

    @Override
    public SendLetter getLetter(int letterId) {
        return null;
    }
}
