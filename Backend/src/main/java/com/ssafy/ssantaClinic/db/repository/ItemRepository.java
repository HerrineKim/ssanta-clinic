package com.ssafy.ssantaClinic.db.repository;

import com.ssafy.ssantaClinic.db.entity.Item;
import com.ssafy.ssantaClinic.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

    Optional<Item> getItemByItemId(int itemId);
}
