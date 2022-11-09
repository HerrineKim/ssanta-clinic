package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.SantaLetter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SantaLetterRepository extends JpaRepository<SantaLetter, Integer> {

}
