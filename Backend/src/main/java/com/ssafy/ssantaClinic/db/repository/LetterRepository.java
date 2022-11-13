package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.SendLetter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LetterRepository extends JpaRepository<SendLetter, Integer> {

}
