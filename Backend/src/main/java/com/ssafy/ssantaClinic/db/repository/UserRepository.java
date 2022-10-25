package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User getUserByUserId(int userId);
    Optional<User> findByEmail(String email);
}
