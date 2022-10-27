package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.request.UserRequest;
import com.ssafy.ssantaClinic.api.response.UserResponse;
import com.ssafy.ssantaClinic.api.service.UserService;
import com.ssafy.ssantaClinic.common.util.SuccessResponseResult;
import com.ssafy.ssantaClinic.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;

/**
 * @FileName : UserController
 * @Class 설명 : 회원 관리를 담당하는 Controller
 */
@Api(value = "user-controller", tags={"user-controller"})
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @ApiOperation(value = "회원가입", notes="회원가입에 성공하면 success, 아니면 fail", httpMethod = "POST")
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserRequest.JoinRequest formRequest){
        /**
         * @Method Name : join
         * @Method 설명 : 회원정보를 받아 가입시키고 JWT 토큰을 반환한다.
         */
        User user = User.builder()
                .email(formRequest.getEmail())
                .password(formRequest.getPassword())
                .nickName(formRequest.getNickName())
                .build();

        userService.save(user);

        return ResponseEntity
                .created(URI.create("/detail/"+ user.getUserId()))
                .body("JWT Token");
    }

    @ApiOperation(value = "유저 상세정보", notes="유저 상세정보를 제공한다.", httpMethod = "GET")
    @GetMapping("/detail/{userId}")
    public ResponseEntity<?> getUser(@PathVariable int userId){
        /**
         * @Method Name : getUser
         * @Method 설명 : userId를 받아 회원 상세정보를 반환한다.
         */
        User user = userService.getUserByUserId(userId);

        return ResponseEntity.ok().body(user);
    }
    @ApiOperation(value = "닉네임 중복체크", notes="중복이면 true, 아니면 false", httpMethod = "POST")
    @PostMapping("/check/nickname")
    public ResponseEntity<?> checkDuplicateNickname(@RequestBody UserRequest.CheckDuplicateNicknameRequest formRequest){
        /**
         * @Method Name : checkDuplicateNickname
         * @Method 설명 : nickname을 받아서 중복된 nickname이 존재하는지 확인한다.
         */
        Optional<User> user = userService.findByNickName(formRequest.getNickName());

        // 닉네임으로 찾아온 user가 empty면 중복이 아니므로 false, 아니면 true
        if (user.isEmpty()){
            return ResponseEntity.ok().body(
                    UserResponse.DuplicatedResponse.builder()
                    .duplicated(false)
                    .build());
        } else {
            return ResponseEntity.ok().body(
                    UserResponse.DuplicatedResponse.builder()
                            .duplicated(true)
                            .build());
        }
    }

    @ApiOperation(value = "이메일 중복체크", notes="중복이면 true, 아니면 false", httpMethod = "POST")
    @PostMapping ("/check/email")
    public ResponseEntity<?> checkDuplicateEmail(@RequestBody UserRequest.CheckDuplicateEmailRequest formRequest){
        /**
         * @Method Name : checkDuplicateEmail
         * @Method 설명 : email을 받아서 중복된 email이 존재하는지 확인한다.
         */
        Optional<User> user = userService.findByEmail(formRequest.getEmail());

        // 이메일로 찾아온 user가 empty면 중복이 아니므로 false, 아니면 true
        if (user.isEmpty()){
            return ResponseEntity.ok().body(
                    UserResponse.DuplicatedResponse.builder()
                            .duplicated(false)
                            .build());
        } else {
            return ResponseEntity.ok().body(
                    UserResponse.DuplicatedResponse.builder()
                            .duplicated(true)
                            .build());
        }
    }
}
