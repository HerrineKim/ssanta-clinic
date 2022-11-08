package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotiRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findAllByUserUserId(int userId);
}
