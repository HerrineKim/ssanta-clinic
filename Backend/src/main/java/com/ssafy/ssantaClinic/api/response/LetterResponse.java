package com.ssafy.ssantaClinic.api.response;

import com.ssafy.ssantaClinic.db.entity.ReplyLetter;
import com.ssafy.ssantaClinic.db.entity.SendLetter;
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
        SendLetterResponse(SendLetter letter){
            this.sendLetterId = letter.getSendLetterId();
            this.userId = letter.getUser().getUserId();
            this.title = letter.getTitle();
            this.message = letter.getMessage();
            this.sendAt = letter.getRegDate().toString();
        }
    }

    public static class ReplyLetterResponse{
        int replyLetterId;
        int sendLetterId;
        String title;
        String message;
        boolean isRead;
        String receivedAt;
        ReplyLetterResponse(ReplyLetter letter){
            this.replyLetterId = letter.getReplyLetterId();
            this.sendLetterId = letter.getSendLetter().getSendLetterId();
            this.title = letter.getTitle();
            this.message = letter.getMessage();
            this.isRead = letter.isRead();
            this.receivedAt = letter.getIsReceived().toString();
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LetterListResponse{
        List<SendLetterResponse> send;
        List<ReplyLetterResponse> receive;
    }
}
