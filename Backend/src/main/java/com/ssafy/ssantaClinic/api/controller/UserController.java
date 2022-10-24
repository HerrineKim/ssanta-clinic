package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.request.UserRequest;
import com.ssafy.ssantaClinic.api.response.UserResponse;
import com.ssafy.ssantaClinic.api.service.UserService;
import com.ssafy.ssantaClinic.common.util.SuccessResponseResult;
import com.ssafy.ssantaClinic.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

/**
 * @FileName : UserController
 * @Class 설명 : 회원 관리를 담당하는 Controller
 */
@Api(value = "user-controller", tags={"user-controller"})
@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    public UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "회원가입", notes="회원가입에 성공하면 success, 아니면 fail", httpMethod = "POST")
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserRequest.JoinRequest formRequest){
//        log.info("회원가입 시작");
        User user = User.builder()
                .email(formRequest.getEmail())
                .password(formRequest.getPassword())
                .nickName(formRequest.getNickName())
                .build();

        userService.save(user);
//        log.info("회원가입 완료");

        return ResponseEntity
                .created(URI.create("/detail/"+ user.getUserId()))
                .body(UserResponse.GetUserResponse.builder()
                        .userId(user.getUserId())
                        .email(user.getEmail())
                        .nickName(user.getNickName())
                        .build());
    }

    @ApiOperation(value = "유저 상세정보", notes="유저 상세정보를 제공한다.", httpMethod = "GET")
    @GetMapping("/detail/{userId}")
    public ResponseEntity<?> getUser(@PathVariable int userId){
        User user = userService.getUserByUserId(userId);

        return ResponseEntity.ok().body(user);
    }
}
