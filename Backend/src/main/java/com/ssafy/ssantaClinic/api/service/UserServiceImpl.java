package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.db.entity.User;
import com.ssafy.ssantaClinic.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public User getUserByUserId(int userId) {
        User user = userRepository.getUserByUserId(userId);
        return user;
    }
}
