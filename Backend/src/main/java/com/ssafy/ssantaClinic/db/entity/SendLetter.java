package com.ssafy.ssantaClinic.db.entity;

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

    @NotBlank
    private String title;

    @NotBlank
    private String message;

    @Column(name = "send_at")
    @Builder.Default
    private LocalDateTime regDate = LocalDateTime.now();

    @NotBlank
    @Enumerated(EnumType.STRING)
    LetterType type;
}
