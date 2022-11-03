package com.ssafy.ssantaClinic.db.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
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

    @Column(length=100, nullable = false, unique = true)
    private String email;

    @Column(length=100, nullable = false)
    @JsonIgnore
    private String password;

    @Column(length=30, nullable = false)
    private String nickName;

    @Builder.Default
    @Column(length=30, nullable = false)
    @JsonIgnore
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @Column(length=64)
    @JsonIgnore
    private String findPasswordNum;

    @OneToMany(mappedBy = "parent")
    @JsonIgnore
    List<Follow> followers;

    @OneToMany(mappedBy = "child")
    @JsonIgnore
    List<Follow> followings;
    public void changePassword(String password) {
        this.password = password;
    }

}