package com.ssafy.ssantaClinic.api.response;

import com.sun.xml.bind.v2.runtime.property.StructureLoaderBuilder;
import lombok.*;

import java.util.List;

public class LetterResponse {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LetterDetailResponse{
        int letterId;
        String title;
        String message;
        Boolean isRead;
        String regDate;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LetterListResponse{
        List<LetterDetailResponse> send;
        List<LetterDetailResponse> receive;
    }



}
