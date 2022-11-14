package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> getUserByUserId(int userId);
    User getUserByEmail(String email);
    Optional<User> findByEmail(String email);
    Optional<User> findByNickName(String nickname);
    Optional<User> findByFindPasswordNum(String findPasswordNum);
    List<User> findTop10ByOrderByLastLoginAtDesc();
    @Query(value = "SELECT u.tree_url FROM user u WHERE u.user_id NOT LIKE 3 AND tree_url NOT LIKE \"\" ORDER BY RAND() limit 5", nativeQuery = true)
    List<String> findRandomUserId(int userId);
}
