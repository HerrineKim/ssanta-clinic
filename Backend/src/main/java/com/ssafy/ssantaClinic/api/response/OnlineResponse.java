package com.ssafy.ssantaClinic.api.response;

import lombok.Builder;
import lombok.Data;

/**
 * @FileName : OnlineResponse
 * @Class 설명 : 실시간 온라인 접속자 수 반환
 */
@Data
@Builder
public class OnlineResponse {
    private int cnt;
}
