package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.Item;
import com.ssafy.ssantaClinic.db.entity.UserItemBox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserItemBoxRepository extends JpaRepository<UserItemBox, Integer> {

    Optional<UserItemBox> findByUser_UserIdAndItem_ItemId(int userId, int itemId);

    List<UserItemBox> findAllByUser_UserId(int userId);

    void deleteAllByUserUserId(int userId);
}
