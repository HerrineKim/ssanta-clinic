package com.ssafy.ssantaClinic.api.response;

import lombok.Builder;
import lombok.Data;

/**
 * @FileName : CoinResponse
 * @Class 설명 : 게임머니 조회 응답
 */
@Data
@Builder
public class CoinResponse {
    private int coin;
}
