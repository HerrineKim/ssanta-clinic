package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.common.util.SuccessResponseResult;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/swagger")
@RequiredArgsConstructor
public class SwaggerController {
    @ApiOperation(value = "테스트", notes = "테스트", httpMethod = "GET")
    @GetMapping
    public SuccessResponseResult test() {

        return new SuccessResponseResult();
    }
}
