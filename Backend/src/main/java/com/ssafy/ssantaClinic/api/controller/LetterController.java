package com.ssafy.ssantaClinic.api.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "산타 편지 관련 API", tags = {"LetterController"})
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/letter")
@RequiredArgsConstructor
public class LetterController {

}
