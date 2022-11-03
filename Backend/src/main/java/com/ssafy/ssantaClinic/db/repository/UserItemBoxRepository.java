package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.UserItemBox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserItemBoxRepository extends JpaRepository<UserItemBox, Integer> {
}
