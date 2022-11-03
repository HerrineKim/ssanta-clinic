package com.ssafy.ssantaClinic.api.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SimpleMessageResponse {
    private String Result;
}
