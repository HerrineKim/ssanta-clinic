package com.ssafy.ssantaClinic.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@DynamicUpdate
@Table(name = "ADVENT_CALENDAR_IMAGE")
public class AdventCalendarImg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private int imageId;

    @ManyToOne
    @JoinColumn(name = "advent_calendar_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AdventCalendar adventCalendar;

    @Column(length = 300, name = "img_url", nullable = false)
    private String imgUrl;
}
