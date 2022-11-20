package com.ssafy.ssantaClinic.db.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.ssantaClinic.api.response.FriendResponse;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @NotBlank(message = "최소 1개 이상의 문자로 이루어져야 합니다")
    @Column(length=100, unique = true)
    private String email;
    @NotBlank(message = "최소 1개 이상의 문자로 이루어져야 합니다")
    @Column(length=100)
    @JsonIgnore
    private String password;
    @NotBlank(message = "최소 1개 이상의 문자로 이루어져야 합니다")
    @Column(length=30)
    private String nickName;

    @Builder.Default
    @Column(length=30)
    @JsonIgnore
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @Column(length=64)
    @JsonIgnore
    private String findPasswordNum;

    @JsonIgnore
    @Builder.Default
    private LocalDateTime lastLoginAt = LocalDateTime.now();

    public void updateLastLoginAt() {
        this.lastLoginAt = LocalDateTime.now();
    }

    @Builder.Default
    private int money = 10000;

    @Column(name = "tree_url", length = 300)
    private String treeUrl;

    @OneToMany(mappedBy = "parent")
    @JsonIgnore
    List<Follow> followers;

    @OneToMany(mappedBy = "child")
    @JsonIgnore
    List<Follow> followings;

    @JsonIgnore
    public FriendResponse getFriendResponse(){
        return FriendResponse.builder().userId(userId).nickName(nickName).build();
    }

    public void changePassword(String password) {
        this.password = password;
    }
    
    public void changeMoney(int money) {
        this.money = money;
    }

    public void changeTree(String treeUrl) {
        this.treeUrl = treeUrl;
    }

    public void changeFindPasswordNum(String findPasswordNum) {
        this.findPasswordNum = findPasswordNum;
    }
}