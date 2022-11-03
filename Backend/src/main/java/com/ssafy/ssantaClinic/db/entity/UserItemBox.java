package com.ssafy.ssantaClinic.db.entity;

import com.ssafy.ssantaClinic.api.response.StoreResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class UserItemBox {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userItemBoxId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="item_id")
    private Item item;

    private int count;

    public void changeCount(int count){
        this.count = count;
    }

    public static StoreResponse.UserItemListResponse EntityToDto(UserItemBox userItemBox) {
        return StoreResponse.UserItemListResponse.builder()
                .ItemId(userItemBox.getItem().getItemId())
                .count(userItemBox.getCount())
                .build();
    }
}
