package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.request.TreeRequest;
import com.ssafy.ssantaClinic.api.response.SimpleMessageResponse;
import com.ssafy.ssantaClinic.api.response.TreeResponse;
import com.ssafy.ssantaClinic.api.service.S3Service;
import com.ssafy.ssantaClinic.api.service.TreeService;
import com.ssafy.ssantaClinic.common.auth.util.JwtUtil;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * @FileName : TreeController
 * @Class 설명 : 트리 관련 요청을 처리하는 Controller
 */
@Api(value = "트리 관련 API", tags = {"TreeController"})
@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/tree")
@RequiredArgsConstructor
public class TreeController {
    private final S3Service s3Service;
    private final TreeService treeService;
    @ApiOperation(value = "트리 3D 파일 받아오기", notes = "클라이언트로부터 3D을 받아온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @PostMapping(
            consumes = { MediaType.MULTIPART_FORM_DATA_VALUE },
            produces = { MediaType.APPLICATION_JSON_VALUE }
    )
    public ResponseEntity<SimpleMessageResponse> getTreeInfo (@RequestPart(required = false) MultipartFile glbfile,
                                                              @RequestPart String item) throws IOException {
        /**
         * @Method Name : getTreeInfo
         * @Method 설명 : 클라이언트로부터 트리정보를 받아온다.
         */
        // 현재 로그인한 유저의 아이디 가져오기
        int userId = JwtUtil.getCurrentUserId();
        // S3 업로드
        var url = s3Service.uploadGlb(glbfile);
        if(url.isBlank()) throw new CustomException(ErrorCode.FILE_NAME_BLANK_ERROR);
        // db에 url 저장
        String orgUrl = treeService.saveTreeImage(userId, url);
        // 기존 파일 존재했으면 삭제
        if(orgUrl != null) {
            s3Service.delete(orgUrl);
        }
        // 유저 아이템 업데이트 하기
        treeService.updateUserItemBox(userId, item);
        return ResponseEntity.ok().body(SimpleMessageResponse.builder().Result("success").build());
    }
    @ApiOperation(value = "트리 3D 파일 받아오기", notes = "클라이언트로부터 3D을 받아온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping
    public ResponseEntity<TreeResponse.GetTreeListResponse> getRandomTree() {
        /**
         * @Method Name : getRandomTree
         * @Method 설명 : 랜덤 트리 10개를 가져온다.
         */
        // 현재 로그인한 유저의 아이디 가져오기
        int userId = JwtUtil.getCurrentUserId();
        return ResponseEntity.ok()
                            .body(TreeResponse.GetTreeListResponse.builder()
                                            .tree(treeService.getRandomTree(userId))
                                            .build());
    }
    @ApiOperation(value = "트리 주소 전송", notes = "트리 주소 전송")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    @GetMapping("/{userId}")
    public ResponseEntity<TreeResponse.GetTreeResponse> getTreeInfo(@PathVariable int userId) {
        /**
         * @Method Name : getTreeInfo
         * @Method 설명 : 트리 주소 전송
         */
        return ResponseEntity.ok()
                .body(TreeResponse.GetTreeResponse.builder()
                        .tree(treeService.getTreeInfo(userId))
                        .build());
    }
}
