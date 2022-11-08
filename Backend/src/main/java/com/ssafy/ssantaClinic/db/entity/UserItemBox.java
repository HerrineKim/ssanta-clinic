package com.ssafy.ssantaClinic.db.entity;

import com.ssafy.ssantaClinic.api.response.StoreResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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

    @NotNull
    private int count;

    public void changeCount(int count){
        this.count = count;
    }

    public static int EntityToDto(UserItemBox userItemBox) {
        return userItemBox.getItem().getItemId();
    }
}
