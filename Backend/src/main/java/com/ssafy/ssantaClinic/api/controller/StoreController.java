package com.ssafy.ssantaClinic.api.controller;

import com.ssafy.ssantaClinic.api.request.StoreRequest;
import com.ssafy.ssantaClinic.api.response.StoreResponse;
import com.ssafy.ssantaClinic.api.service.StoreService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @FileName : StoreController
 * @Class 설명 : 가게/아이템 관련 요청을 처리하는 Controller
 */
@Api(value = "store-controller", tags={"store-controller"})
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/store")
public class StoreController {

    private final StoreService storeService;

    @ApiOperation(value = "아이템목록", notes="store에서 파는 아이템 목록 받아오기", httpMethod = "GET")
    @GetMapping("/items")
    public ResponseEntity<List<StoreResponse.StoreItemListResponse>> getItemList() {
        /**
         * @Method Name : getItemList
         * @Method 설명 : store에 전시할 아이템 목록을 조회한다.
         */
        return  ResponseEntity.ok().body(storeService.getItemList());
    }

    @ApiOperation(value = "아이템구매", notes="store에서 파는 아이템 구매하기", httpMethod = "POST")
    @PostMapping("/buy")
    public ResponseEntity<StoreResponse.BuyItemResponse> buyItem(@RequestBody StoreRequest.BuyItemRequest formRequest) {
        /**
         * @Method Name : buyItem
         * @Method 설명 : store에서 아이템을 구매한다. 유저 아이템 테이블 갱신, 유저 잔고 갱신
         */
        return  ResponseEntity.ok().body(storeService.buyItem(formRequest.getUserId(), formRequest.getItemId(), formRequest.getCount()));
    }

    @ApiOperation(value = "개인 아이템 조회", notes="개인이 보유하고 있는 아이템 목록 조회", httpMethod = "GET")
    @GetMapping("/items/{userId}")
    public ResponseEntity<StoreResponse.UserItemListResponse> getUserItemList(@PathVariable int userId) {
        /**
         * @Method Name : getUserItemList
         * @Method 설명 : 개인이 보유하고 있는 아이템 목록을 조회한다.
         */
        return  ResponseEntity.ok().body(storeService.getUserItemList(userId));
    }

}
