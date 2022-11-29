package com.ssafy.ssantaClinic.api.response;

import com.ssafy.ssantaClinic.db.entity.ReplyLetter;
import com.ssafy.ssantaClinic.db.entity.SendLetter;
import com.ssafy.ssantaClinic.db.entity.columnEnum.LetterType;
import lombok.*;

import javax.validation.constraints.NotBlank;
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
        @NotBlank(message = "보낸 편지 갯수가 없습니다.")
        int sendLetterCount;
        @NotBlank(message = "받은 편지 갯수가 없습니다.")
        int replyLetterCount;

        @NotBlank(message = "보낸 편지가 없습니다.")
        List<SendLetterResponse> send;

        @NotBlank(message = "받은 편지가 없습니다.")
        List<ReplyLetterResponse> reply;
    }
}
