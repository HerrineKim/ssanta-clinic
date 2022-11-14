package com.ssafy.ssantaClinic.db.entity;

import com.ssafy.ssantaClinic.api.response.LetterResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReplyLetter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ReplyLetterId;

    @OneToOne
    @JoinColumn(name = "send_letter_id")
    private SendLetter sendLetter;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotBlank(message = "제목을 입력해주세요.")
    private String title;
    @NotBlank(message = "내용을 입력해주세요.")
    private String message;

    @Column(name = "is_read")
    @Builder.Default
    boolean isRead = false;

    @Column(name = "is_received")
    @Builder.Default
    private LocalDateTime isReceived = LocalDateTime.now().plusHours(2);

    public void read() {
        isRead = true;
    }
    public LetterResponse.ReplyLetterResponse toReplyLetterResponse() {
        return LetterResponse.ReplyLetterResponse.builder()
                .replyLetterId(ReplyLetterId)
                .sendLetterId(sendLetter.getSendLetterId())
                .title(title)
                .message(message)
                .isRead(isRead)
                .receivedAt(isReceived.plusHours(9).toString())
                .build();
    }
}
