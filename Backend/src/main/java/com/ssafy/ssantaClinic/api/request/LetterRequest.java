package com.ssafy.ssantaClinic.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LetterRequest {
    enum LetterType {
        WORK, STUDY, CHRISTMAS
    }

    @NotBlank
    private String title;

    @NotBlank
    private String message;

    @NotBlank
    private LetterType keyword;
}
