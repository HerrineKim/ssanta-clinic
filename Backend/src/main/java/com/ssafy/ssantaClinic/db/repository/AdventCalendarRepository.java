package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.AdventCalendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdventCalendarRepository extends JpaRepository<AdventCalendar, Integer> {
    List<AdventCalendar> findAllByReceiverUserIdAndDay(int userId, int day);
    List<AdventCalendar> findAllByReceiverUserIdAndIsReadIsFalse(int userId);
    long countByReceiverUserIdAndDay(int userId, int day);
}
