package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.ReplyLetter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ReplyLetterRepository extends JpaRepository<ReplyLetter, Integer> {

    List<ReplyLetter> findAllByUser_UserId(int userId);
}
