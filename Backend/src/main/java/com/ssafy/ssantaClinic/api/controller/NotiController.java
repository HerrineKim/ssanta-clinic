package com.ssafy.ssantaClinic.api.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 * @FileName : NotiController
 * @Class 설명 : 알림 관련 요청을 처리하는 Controller
 */
@Api(value = "알림 관련 API", tags = {"NotiController"}, description = "알림 관련 컨트롤러")
@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/noti")
@RequiredArgsConstructor
public class NotiController {

}
