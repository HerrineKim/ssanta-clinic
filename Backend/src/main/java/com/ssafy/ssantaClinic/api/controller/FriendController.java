package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.request.FollowRequest;
import com.ssafy.ssantaClinic.api.response.FriendResponse;
import com.ssafy.ssantaClinic.api.response.SimpleMessageResponse;
import com.ssafy.ssantaClinic.api.service.FollowService;
import com.ssafy.ssantaClinic.api.service.UserService;
import com.ssafy.ssantaClinic.common.auth.util.JwtUtil;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @FileName : FriendController.java
 * @Class 설명 : 팔로우/팔로잉 관련 컨트롤러
 */
@Api(value = "팔로우/팔로잉 관련 API", tags = {"FriendController"})
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/friend")
@RequiredArgsConstructor
public class FriendController {
    private final UserService userService;
    private final FollowService followService;

    @ApiOperation(value = "팔로잉 목록 조회", notes = "유저의 팔로잉 목록을 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "팔로잉 정보 조회 성공"),
            @ApiResponse(code = 404, message = "팔로잉 정보 조회 오류"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping("/followings")
    public ResponseEntity<List<FriendResponse>> getFollowingList(HttpServletRequest request) {
        /**
         * @Method Name : getFollowingList
         * @Method 설명 : 유저 자신이 팔로잉 하고 있는 유저 목록들을 반환한다.
         */
        String email = JwtUtil.getCurrentUserEmail().orElseThrow(() -> new CustomException(ErrorCode.JWT_TOKEN_NOT_FOUND));
        return ResponseEntity.ok(followService.getFollowingList(email).stream().map(User::getFriendResponse).collect(Collectors.toList()));
    }

    @ApiOperation(value = "팔로워 목록 조회", notes = "유저의 팔로워 목록을 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "팔로워 정보 얻기 성공"),
            @ApiResponse(code = 404, message = "팔로워 정보 조회 오류"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping("/followers")
    public ResponseEntity<List<FriendResponse>> getFollowerList() {
        /**
         * @Method Name : getFollowerList
         * @Method 설명 : 해당 유저를 팔로잉 하는 사람들 목록들을 반환한다.
         */
        String email = JwtUtil.getCurrentUserEmail().orElseThrow(() -> new CustomException(ErrorCode.JWT_TOKEN_NOT_FOUND));
        return ResponseEntity.ok(followService.getFollowerList(email).stream().map(User::getFriendResponse).collect(Collectors.toList()));
    }


    @ApiOperation(value = "추천 친구 리스트 조회", notes = "추천 친구 리스트를 받아온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "추천 친구 정보 얻기 성공"),
            @ApiResponse(code = 404, message = "추천 친구 정보 조회 오류"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping("/recommend")
    public ResponseEntity<List<FriendResponse>> getRecommendFriendList(HttpServletRequest request) {
        // 추천 친구 리스트를 받아온다.
        return ResponseEntity.ok(followService.getRecommendFriendList());
    }


    @ApiOperation(value = "팔로우 신청", notes = "요청한 유저를 팔로우한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "팔로잉 성공"),
            @ApiResponse(code = 404, message = "팔로잉 실패"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @PostMapping("/follow")
    public ResponseEntity<SimpleMessageResponse> requestFollow(@RequestBody @Valid FollowRequest followRequest) {
        /**
         * @Method Name : follow
         * @Method 설명 : 해당 유저를 자신의 팔로잉 목록에 추가한다.
         */
        int parentId = followRequest.getUserId();
        String email = JwtUtil.getCurrentUserEmail().orElseThrow(() -> new CustomException(ErrorCode.JWT_TOKEN_NOT_FOUND));
        followService.follow(parentId, userService.getUserByEmail(email).getUserId());
        return ResponseEntity.ok(SimpleMessageResponse.builder().Result("success").build());
    }

    @ApiOperation(value = "팔로우 취소", notes = "요청한 유저를 팔로잉 목록에서 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 404, message = "삭제 실패"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @DeleteMapping("/follow")
    public ResponseEntity<SimpleMessageResponse> requestUnfollow(@RequestBody @Valid FollowRequest followRequest) {
        /**
         * @Method Name : removeFollowing
         * @Method 설명 : 해당 유저를 자신의 팔로잉 목록에서 삭제한다.
         */
        int parentId = followRequest.getUserId();
        String email = JwtUtil.getCurrentUserEmail().orElseThrow(() -> new CustomException(ErrorCode.JWT_TOKEN_NOT_FOUND));
        followService.unfollow(parentId, userService.getUserByEmail(email).getUserId());
        return ResponseEntity.ok(SimpleMessageResponse.builder().Result("success").build());
    }
}
