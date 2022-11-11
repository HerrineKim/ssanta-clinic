package com.ssafy.ssantaClinic.db.entity;

import com.ssafy.ssantaClinic.common.util.CryptoConverter;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
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

    @Column(length = 100)
    @NotBlank
    private String sender;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "receiver_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User receiver;

    @Column(length = 1000)
    @Convert(converter = CryptoConverter.class)
    private String content;

    @Column(name = "is_read")
    private boolean isRead;

    private int day;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(length = 300)
    @Convert(converter = CryptoConverter.class)
    private String audioUrl;

    @OneToMany(mappedBy = "adventCalendar", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<AdventCalendarImg> imgList;

    @Builder
    public AdventCalendar(int adventCalendarId, String sender, User receiver, String content, Boolean isRead, int day, LocalDateTime createdAt, String audioUrl, List<AdventCalendarImg> imgList) {
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

    public void isOpened() {
        this.isRead = true;
    }
}
