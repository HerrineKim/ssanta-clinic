package com.ssafy.ssantaClinic.api.response;

import com.ssafy.ssantaClinic.db.entity.User;
import lombok.*;

/**
 * @FileName : FriendResponse
 * @Class 설명 : 팔로잉/팔로워/추천 친구 목록 조회 응답
 */
@Data
@Builder
public class FriendResponse {
    private int userId;
    private String nickName;
}
