package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.response.StoreResponse;
import com.ssafy.ssantaClinic.common.auth.util.JwtUtil;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.db.entity.Item;
import com.ssafy.ssantaClinic.db.entity.User;
import com.ssafy.ssantaClinic.db.entity.UserItemBox;
import com.ssafy.ssantaClinic.db.repository.ItemRepository;
import com.ssafy.ssantaClinic.db.repository.PositionItemRepository;
import com.ssafy.ssantaClinic.db.repository.UserItemBoxRepository;
import com.ssafy.ssantaClinic.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @FileName : StoreServiceImpl
 * @Class 설명 : 아이템/가게 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@RequiredArgsConstructor
@Service
public class StoreServiceImpl implements StoreService{

    private final ItemRepository itemRepository;
    private final PositionItemRepository positionItemRepository;
    private final UserItemBoxRepository userItemBoxRepository;
    private final UserRepository userRepository;

    @Override
    public List<Item> getItemList() {
        /**
         * @Method Name : getItemList
         * @Method 설명 : store에서 전시할 모든 아이템 목록을 가져온다.
         */
        return itemRepository.findAll();
    }

    @Override
    public int buyItem(int userId, int itemId, int count) {
        /**
         * @Method Name : buyItem
         * @Method 설명 : store에서 아이템을 구매한다. => 회원 아이템 목록에 구매한 아이템을 추가하고 회원 잔고를 갱신한다.
         */
        // 1. jwt로 userId 알아낸다.

        // 1-1. 현재 로그인한 user와 사려는 user가 다르면 error 반환


        // 2. 아이템 개당 가격을 가져와서 회원 잔고를 갱신 -(count * price)
        Item item = itemRepository.getItemByItemId(itemId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ITEM_INFO));

        // 총 가격 계산
        int totalPrice = count*item.getPrice();

        // 회원 잔고 계산
        User user = userRepository.getUserByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));

        int leftMoney = user.getMoney() - totalPrice;
        System.out.println(user.getMoney());
        System.out.println(totalPrice);
        System.out.println(leftMoney);
        // 잔고가 0보다 작으면 살 수 없으므로 Error, 아니면 회원 잔고 갱신
        if ( leftMoney >= 0) {
            user.changeMoney(leftMoney);
        } else {
            throw new CustomException(ErrorCode.NOT_ENOUGH_MONEY_ERROR);
        }

        // 3. userId를 이용하여 해당 유저가 이미 가지고 있는 아이템인지 확인. 이미 가지고 있다면 count ++ 아니면 새롭게 행 추가
        // userId와 itemId에 일치하는 데이터 가져오기
        Optional<UserItemBox> userItemBox = userItemBoxRepository.findByUser_UserIdAndItem_ItemId(userId, itemId);

        if (userItemBox.isEmpty()) {
            // 만약 회원이 해당 종류 아이템이 없었으면 새롭게 행 추가(유저-아이템)
            userItemBoxRepository.save(UserItemBox.builder()
                    .user(userRepository.getUserByUserId(userId)
                            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO)))
                    .item(itemRepository.getItemByItemId(itemId)
                            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ITEM_INFO)))
                    .count(count)
                    .build());
        } else {
            // 기존에 가지고 있는 아이템에 count ++
            userItemBox.get().changeCount(userItemBox.get().getCount() + count);
        }

        return leftMoney;
    }

    @Override
    public List<StoreResponse.UserItemListResponse> getUserItemList(int userId) {
        /**
         * @Method Name : getUserItemList
         * @Method 설명 : 개인이 보유하고 있는 아이템 목록을 조회한다.
         */

        // jwt로 조회한 userId와 요청보낸 userId가 다르면 error 발생

        // item 목록 형변환, serialize
        // 할 일) item 이미지 url도 responseDto에 추가해야함
        List<UserItemBox> userItemBoxes = userItemBoxRepository.findAllByUser_UserId(userId);
        List<StoreResponse.UserItemListResponse> userItemList = userItemBoxes.stream()
                .map(UserItemBox::EntityToDto)
                .collect(Collectors.toList());

        return userItemList;
    }
}
