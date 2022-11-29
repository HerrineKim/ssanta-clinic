package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.response.FriendResponse;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import com.ssafy.ssantaClinic.db.entity.Follow;
import com.ssafy.ssantaClinic.db.entity.User;
import com.ssafy.ssantaClinic.db.repository.FollowRepository;
import com.ssafy.ssantaClinic.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FollowServiceImpl implements FollowService {
    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void follow(int parentId, int childId) {
        User parent = userRepository.findById(parentId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        User child = userRepository.findById(childId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));

        if(followRepository.findByParentAndChild(parent, child).isPresent())
            throw new CustomException(ErrorCode.ALREADY_FOLLOWED);

        Follow follow = Follow.builder()
                .parent(parent)
                .child(child)
                .build();
        
        followRepository.save(follow);
    }

    @Override
    @Transactional
    public void unfollow(int parentId, int childId) {
        User parent = userRepository.findById(parentId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));
        User child = userRepository.findById(childId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_INFO));

        Follow follow = followRepository.findByParentAndChild(parent, child).orElseThrow(() -> new CustomException(ErrorCode.FOLLOW_NOT_FOLLOWING));
        followRepository.delete(follow);
    }

    @Override
    @Transactional
    public List<User> getFollowerList(int userId) {
        User user = userRepository.getUserByUserId(userId).orElseThrow(() -> new CustomException(ErrorCode.FOLLOW_NOT_FOUND_USER_INFO));
        return user.getFollowers().stream().map(Follow::getChild).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<User> getFollowerList(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new CustomException(ErrorCode.FOLLOW_NOT_FOUND_USER_INFO));
        return user.getFollowers().stream().map(Follow::getChild).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<User> getFollowingList(int userId) {
        User user = userRepository.getUserByUserId(userId).orElseThrow(() -> new CustomException(ErrorCode.FOLLOW_NOT_FOUND_USER_INFO));
        return user.getFollowings().stream().map(Follow::getParent).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<User> getFollowingList(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new CustomException(ErrorCode.FOLLOW_NOT_FOUND_USER_INFO));
        return user.getFollowings().stream().map(Follow::getParent).collect(Collectors.toList());
    }

    @Override
    public List<FriendResponse> getRecommendFriendList() {
        return userRepository.findTop10ByOrderByLastLoginAtDesc()
                .stream().map(User::getFriendResponse).collect(Collectors.toList());
    }
}
