package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.PositionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionItemRepository extends JpaRepository<PositionItem, Integer> {
}
