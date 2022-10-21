package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
