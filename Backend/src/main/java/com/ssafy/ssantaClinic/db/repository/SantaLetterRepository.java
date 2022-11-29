package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.SantaLetter;
import com.ssafy.ssantaClinic.db.entity.columnEnum.LetterType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SantaLetterRepository extends JpaRepository<SantaLetter, Integer> {
    List<SantaLetter> findAllByType(LetterType type);
}
