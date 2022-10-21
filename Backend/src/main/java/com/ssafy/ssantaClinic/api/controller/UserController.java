package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.service.UserService;
import com.ssafy.ssantaClinic.common.util.SuccessResponseResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "user-controller", tags={"user-controller"})
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    public UserService userService;

    @ApiOperation(value = "설문조사 내용 업데이트", notes="회원가입에 성공하면 success, 아니면 fail", httpMethod = "POST")
    @PostMapping("/join")
    public SuccessResponseResult join(){

        return new SuccessResponseResult();
    }
}
