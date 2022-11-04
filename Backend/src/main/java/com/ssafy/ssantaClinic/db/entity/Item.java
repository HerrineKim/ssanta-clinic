package com.ssafy.ssantaClinic.db.entity;

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

    @NotBlank
    @Column(length=50 ,unique = true)
    private String itemName;

    @NotBlank
    @Column(length=100)
    private String imgUrl;

    @NotNull
    private int price;

}
