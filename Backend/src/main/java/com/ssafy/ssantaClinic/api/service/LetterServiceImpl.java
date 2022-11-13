package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.SendLetterRequest;
import com.ssafy.ssantaClinic.api.response.LetterResponse;
import com.ssafy.ssantaClinic.db.entity.ReplyLetter;
import com.ssafy.ssantaClinic.db.entity.SendLetter;
import com.ssafy.ssantaClinic.db.repository.SendLetterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class LetterServiceImpl implements LetterService {
    private final SendLetterRepository letterRepository;

    @Override
    public void save(SendLetterRequest letterRequest) {
        SendLetter letter = SendLetter.builder().title(letterRequest.getTitle())
                .message(letterRequest.getMessage()).build();
        letterRepository.save(letter);
    }

    @Override
    public List<SendLetter> getSendLetterList(int userId) {
        return null;
    }

    @Override
    public List<ReplyLetter> getReplyLetterList(int userId) {
        return null;
    }

    @Override
    public LetterResponse.LetterListResponse getLetterList(int userId) {
        return null;
    }

    @Override
    public LetterResponse.SendLetterResponse getSendLetter(int letterId) {
        return null;
    }

    @Override
    public LetterResponse.ReplyLetterResponse getReplyLetter(int letterId) {
        return null;
    }

}
