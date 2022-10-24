package com.ssafy.ssantaClinic.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@DynamicUpdate
@Table(name = "ADVENT_CALENDAR")
public class AdventCalendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "advent_calendar_id")
    private int adventCalendarId;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User Sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User Receiver;

    @Column(length = 200)
    private String content;

    @Column(nullable = false, name = "is_read")
    private Boolean isRead;

    private int day;

    @Column(nullable = false, name = "created_at")
    private LocalDateTime createdAt;

    @Column(length = 300)
    private String audioUrl;

    @Builder
    public AdventCalendar(int adventCalendarId, User sender, User receiver, String content, Boolean isRead, int day, LocalDateTime createdAt, String audioUrl) {
        this.adventCalendarId = adventCalendarId;
        Sender = sender;
        Receiver = receiver;
        this.content = content;
        this.isRead = isRead;
        this.day = day;
        this.createdAt = createdAt;
        this.audioUrl = audioUrl;
    }


    public void setReceiver(User Receiver) {
        this.Receiver = Receiver;
    }

    public void setSender(User Sender) {
        this.Sender = Sender;
    }
}
