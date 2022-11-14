package com.ssafy.ssantaClinic.api.response;

import com.ssafy.ssantaClinic.db.entity.ReplyLetter;
import com.ssafy.ssantaClinic.db.entity.SendLetter;
import com.ssafy.ssantaClinic.db.entity.columnEnum.LetterType;
import lombok.*;

import java.util.List;

public class LetterResponse {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SendLetterResponse {
        int sendLetterId;
        int userId;
        String title;
        String message;
        String sendAt;
        LetterType type;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReplyLetterResponse{
        int replyLetterId;
        int sendLetterId;
        String title;
        String message;
        boolean isRead;
        String receivedAt;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LetterListResponse{
        int sendLetterCount;
        int replyLetterCount;
        List<SendLetterResponse> send;
        List<ReplyLetterResponse> reply;
    }
}
