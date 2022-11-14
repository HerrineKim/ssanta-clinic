package com.ssafy.ssantaClinic.api.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;
/**
 * @FileName : TreeResponse
 * @Class 설명 : 메인화면 랜덤 트리 목록 조회 응답
 */
@Data
@Builder
public class TreeResponse {
    private List<String> tree;
}
