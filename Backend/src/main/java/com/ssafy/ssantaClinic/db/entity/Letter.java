package com.ssafy.ssantaClinic.db.entity;

import lombok.*;

import javax.persistence.*;
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

    String title;
    String message;

    @Column(name = "created_at")
    Date createAt;

    @Column(name = "is_read")
    boolean isRead;

    @Column(name = "is_received")
    Date isReceived;
}
