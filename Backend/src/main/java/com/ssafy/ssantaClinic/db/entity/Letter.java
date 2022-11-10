package com.ssafy.ssantaClinic.db.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Letter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "letter_id")
    private int letterId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "santa_letter_id")
    private SantaLetter santaLetter;

    @NotBlank
    private String title;
    @NotBlank
    private String message;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime regDate = LocalDateTime.now();

    @Column(name = "is_read")
    @Builder.Default
    boolean isRead = false;

    @Column(name = "is_received")
    @Builder.Default
    private LocalDateTime isReceived = LocalDateTime.now().plusHours(2);
}
