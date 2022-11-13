package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.SendLetter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SendLetterRepository extends JpaRepository<SendLetter, Integer> {

    List<SendLetter> findAllByUser_UserId(int userId);
}
