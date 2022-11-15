package com.ssafy.ssantaClinic.db.entity;

import com.ssafy.ssantaClinic.api.response.StoreResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;

    @Column(length=50 ,unique = true)
    private String itemName;

    @NotNull
    private int price;

    public static StoreResponse.StoreItemListResponse EntityToDto(Item item) {
        return StoreResponse.StoreItemListResponse.builder()
                .itemId(item.getItemId())
                .itemName(item.getItemName())
                .price(item.getPrice())
                .build();
    }

}
