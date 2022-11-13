package com.ssafy.ssantaClinic.db.entity;

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

    @NotBlank
    private String title;
    @NotBlank
    private String message;

    @Column(name = "is_read")
    @Builder.Default
    boolean isRead = false;

    @Column(name = "is_received")
    @Builder.Default
    private LocalDateTime isReceived = LocalDateTime.now().plusHours(2);
}
