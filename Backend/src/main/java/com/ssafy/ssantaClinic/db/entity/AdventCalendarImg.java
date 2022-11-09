package com.ssafy.ssantaClinic.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "advent_calendar_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AdventCalendar adventCalendar;

    @Column(length = 300, name = "img_url")
    @NotBlank
    private String imgUrl;

    @Builder
    public AdventCalendarImg(int imageId, AdventCalendar adventCalendar, String imgUrl) {
        this.imageId = imageId;
        this.adventCalendar = adventCalendar;
        this.imgUrl = imgUrl;
    }
}
