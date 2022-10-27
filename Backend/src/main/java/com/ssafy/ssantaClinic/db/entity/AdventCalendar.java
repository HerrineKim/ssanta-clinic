package com.ssafy.ssantaClinic.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@DynamicUpdate
@Table(name = "ADVENT_CALENDAR")
public class AdventCalendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "advent_calendar_id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User receiver;

    @Column(length = 1000)
    private String content;

    @Column(nullable = false, name = "is_read")
    private Boolean isRead;

    private int day;

    @Column(nullable = false, name = "created_at")
    private LocalDateTime createdAt;

    @Column(length = 300)
    private String audioUrl;

    @OneToMany(mappedBy = "adventCalendar", cascade = CascadeType.ALL)
    List<AdventCalendarImg> imgList;

    @Builder
    public AdventCalendar(int adventCalendarId, User sender, User receiver, String content, Boolean isRead, int day, LocalDateTime createdAt, String audioUrl, List<AdventCalendarImg> imgList) {
        this.id = adventCalendarId;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.isRead = isRead;
        this.day = day;
        this.createdAt = createdAt;
        this.audioUrl = audioUrl;
        this.imgList = imgList;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public void isOpened() {
        this.isRead = true;
    }
}
