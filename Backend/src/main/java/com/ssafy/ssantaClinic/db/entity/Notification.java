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
@Table(name = "NOTIFICATION")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private int notiId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(length = 300, nullable = false)
    private String url;

    @Column(length = 200, nullable = false)
    private String message;

    @Column(length=20, nullable = false)
    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(name = "is_read")
    private boolean isRead ;

    @Column(name = "crated_at", nullable = false)
    private LocalDateTime createdAt;

    @Builder
    public Notification(int notiId, User user, String url, String message, Type type, boolean isRead, LocalDateTime createdAt) {
        this.notiId = notiId;
        this.user = user;
        this.url = url;
        this.message = message;
        this.type = type;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }
}
