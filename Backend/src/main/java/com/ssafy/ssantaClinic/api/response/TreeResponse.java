package com.ssafy.ssantaClinic.api.response;

import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
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
    private TreeResponse() {
        throw new CustomException(ErrorCode.UTILITY_CLASS_ERROR);
    }

    @Data
    @Builder
    public static class GetTreeListResponse {
        private List<String> tree;

    }

    @Data
    @Builder
    public static class GetTreeResponse {
        private String tree;

    }
}
