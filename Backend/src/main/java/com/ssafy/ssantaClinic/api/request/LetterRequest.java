package com.ssafy.ssantaClinic.api.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LetterRequest {
    enum LetterType {
        WORK, STUDY, CHRISTMAS
    }
    private String regDate;
    private String title;
    private String message;
    private LetterType keyword;
}
