package com.ssafy.ssantaClinic.api.request;

import com.ssafy.ssantaClinic.db.entity.columnEnum.LetterType;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class SendLetterRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String message;

    @NotBlank
    private LetterType keyword;
}
