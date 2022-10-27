package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.AdventCalendarImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdventCalendarImgRepository extends JpaRepository<AdventCalendarImg, Integer> {
    List<AdventCalendarImg> findAllByAdventCalendarId(int calendarId);
}
