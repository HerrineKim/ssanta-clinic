package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface NotiRepository extends JpaRepository<Notification, Integer> {
    Optional<Notification> findByUserUserIdAndUrl(int userId, String url);
    Optional<Notification> findByUrlEndsWith(String url);
    List<Notification> findAllByUserUserId(int userId);
}
