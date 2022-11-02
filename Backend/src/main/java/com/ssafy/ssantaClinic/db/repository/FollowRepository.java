package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.Follow;
import com.ssafy.ssantaClinic.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {
}
