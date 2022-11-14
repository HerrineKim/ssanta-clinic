package com.ssafy.ssantaClinic.db.entity;

import com.ssafy.ssantaClinic.api.response.LetterResponse;
import com.ssafy.ssantaClinic.db.entity.columnEnum.LetterType;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SendLetter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "send_letter_id")
    private int sendLetterId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotBlank(message = "제목을 입력해주세요.")
    private String title;

    @NotBlank(message = "내용을 입력해주세요.")
    private String message;

    @Column(name = "send_at")
    @Builder.Default
    private LocalDateTime sendAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    LetterType type;

    public LetterResponse.SendLetterResponse toSendLetterResponse() {
        return LetterResponse.SendLetterResponse.builder()
                .sendLetterId(sendLetterId)
                .userId(user.getUserId())
                .title(title)
                .message(message)
                .sendAt(sendAt.toString())
                .type(type)
                .build();
    }
}
