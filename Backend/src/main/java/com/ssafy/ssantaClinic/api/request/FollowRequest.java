package com.ssafy.ssantaClinic.api.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class FollowRequest {
    private int userId;
}
