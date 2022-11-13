package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.request.SendLetterRequest;
import com.ssafy.ssantaClinic.api.response.LetterResponse;
import com.ssafy.ssantaClinic.common.auth.util.JwtUtil;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.db.entity.Quote;
import com.ssafy.ssantaClinic.db.entity.ReplyLetter;
import com.ssafy.ssantaClinic.db.entity.SantaLetter;
import com.ssafy.ssantaClinic.db.entity.SendLetter;
import com.ssafy.ssantaClinic.db.entity.columnEnum.Emotion;
import com.ssafy.ssantaClinic.db.entity.columnEnum.LetterType;
import com.ssafy.ssantaClinic.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class LetterServiceImpl implements LetterService {
    private final SendLetterRepository sendLetterRepository;
    private final ReplyLetterRepository replyLetterRepository;
    private final UserRepository userRepository;
    private final SantaLetterRepository santaLetterRepository;
    private final QuoteRepository quoteRepository;
    private final Random randomizer = new Random();

    @Override
    public SendLetter save(SendLetterRequest letterRequest) {
        SendLetter letter = SendLetter.builder()
                .user(userRepository.getUserByUserId(JwtUtil.getCurrentUserId()).get())
                .title(letterRequest.getTitle())
                .message(letterRequest.getMessage())
                .type(letterRequest.getType())
                .build();
        sendLetterRepository.save(letter);
        return letter;
    }

    @Override
    public void makeReplyLetter(Emotion emotion, LetterType type) {
        ReplyLetter.ReplyLetterBuilder replyLetter = ReplyLetter.builder();

        List<SantaLetter> santaLetterList = santaLetterRepository.findAllByType(type);
        SantaLetter santaLetter = santaLetterList.get(randomizer.nextInt(santaLetterList.size())); // type에 맞는 것 중 랜덤으로 선택

        replyLetter.title(santaLetter.getTitle());
        replyLetter.isRead(false);
        replyLetter.isReceived(LocalDateTime.now().plusHours(randomizer.nextInt(3))); // 1~3시간 후에 받을 수 있도록 설정

        // 부정적으로 판정되면 편지 + 명언 아닐경우 그냥 편지만
        if(emotion.equals(Emotion.Negative)){
            List<Quote> quoteList = quoteRepository.findAll();
            Quote quote = quoteList.get(randomizer.nextInt(quoteList.size()));
            replyLetter.message(santaLetter.getContent() + "\n\n" + quote.getQuote() + " - "+ quote.getSource());
        }else{
            replyLetter.message(santaLetter.getContent());
        }
        replyLetterRepository.save(replyLetter.build());
    }

    @Override
    public List<SendLetter> getSendLetterList(int userId) {
        return sendLetterRepository.findAllByUser_UserId(userId);
    }

    @Override
    public List<ReplyLetter> getReplyLetterList(int userId) {
        return replyLetterRepository.findAllByUser_UserId(userId);
    }

    @Override
    public LetterResponse.LetterListResponse getLetterList(int userId) {
        List<LetterResponse.SendLetterResponse> sendLetterList = sendLetterRepository.findAllByUser_UserId(userId).stream().map(SendLetter::toSendLetterResponse).collect(Collectors.toList());
        List<LetterResponse.ReplyLetterResponse> replyLetterList = replyLetterRepository.findAllByUser_UserId(userId).stream().map(ReplyLetter::toReplyLetterResponse).collect(Collectors.toList());

        return LetterResponse.LetterListResponse.builder().send(sendLetterList).reply(replyLetterList).build();
    }

    @Override
    public LetterResponse.SendLetterResponse getSendLetter(int letterId) {
        SendLetter letter = sendLetterRepository.findById(letterId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        return letter.toSendLetterResponse();
    }

    @Override
    public LetterResponse.ReplyLetterResponse getReplyLetter(int letterId) {
        ReplyLetter letter = replyLetterRepository.findById(letterId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        return letter.toReplyLetterResponse();
    }

}
