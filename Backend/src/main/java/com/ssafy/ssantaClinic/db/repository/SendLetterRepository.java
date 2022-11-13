package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.SendLetter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SendLetterRepository extends JpaRepository<SendLetter, Integer> {

}
