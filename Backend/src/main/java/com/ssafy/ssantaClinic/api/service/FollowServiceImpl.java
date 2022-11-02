package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.db.entity.Follow;
import com.ssafy.ssantaClinic.db.entity.User;
import com.ssafy.ssantaClinic.db.repository.FollowRepository;
import com.ssafy.ssantaClinic.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class FollowServiceImpl implements FollowService {
    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void save(int parentId, int childId) {
        User parent = userRepository.findById(parentId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
        User child = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        Follow follow = Follow.builder()
                .parent(parent)
                .child(child)
                .build();

        parent.getFollowers().add(follow);
        parent.getFollowings().add(follow);

        followRepository.save(follow);
    }

    @Override
    public List<User> getFollowerList(int userId) {
        return null;
    }

    @Override
    public List<User> getFollowerList(String email) {
        return null;
    }

    @Override
    public List<User> getFollowingList(int userId) {
        return null;
    }

    @Override
    public List<User> getFollowingList(String email) {
        return null;
    }
}
