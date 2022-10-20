package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotiRepository extends JpaRepository<Notification, Integer> {
}
