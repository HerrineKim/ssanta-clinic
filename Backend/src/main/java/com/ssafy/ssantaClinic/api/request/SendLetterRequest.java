package com.ssafy.ssantaClinic.api.request;

import com.ssafy.ssantaClinic.db.entity.columnEnum.LetterType;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class SendLetterRequest {
    @NotBlank(message = "제목을 입력해주세요.")
    private String title;

    @NotBlank(message = "내용을 입력해주세요.")
    private String message;

    // Enum은 @NotBlank를 사용하지 않습니다.
    private LetterType type;
}
