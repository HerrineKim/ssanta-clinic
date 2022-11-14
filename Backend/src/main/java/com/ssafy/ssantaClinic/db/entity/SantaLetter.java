package com.ssafy.ssantaClinic.db.entity;

import com.ssafy.ssantaClinic.db.entity.columnEnum.LetterType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SantaLetter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "santa_letter_id")
    private int id;

    @NotNull(message = "편지 타입은 필수 입니다.")
    @Enumerated(EnumType.STRING)
    private LetterType type;

    @NotBlank(message = "편지 제목이 필요합니다.")
    private String title;

    @NotBlank(message = "편지 내용은 필수 입니다.")
    private String content;

}
