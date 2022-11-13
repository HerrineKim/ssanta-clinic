package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, Integer> {
}
