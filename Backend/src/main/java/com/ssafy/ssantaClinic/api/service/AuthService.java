package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.db.entity.User;
import com.ssafy.ssantaClinic.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetailsService.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component("userDetailsService")
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {
    final private UserRepository userRepository;

    /**
     * @Method Name : loadUserByUsername
     * @Method 설명 : 로그인 시 사용자 정보를 조회한다.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.getUserByEmail(username);
        try{
            return createUser(user.getNickName(), user);
        }catch (Exception e){
            throw new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다.");
        }
    }

    private org.springframework.security.core.userdetails.User createUser(String username, User user) {
        // 현재는 일반 사용자 <-> 관리자 구분이 없는 만큼, 이 부분은 주석 처리 했습니다.
//        List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
//                .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
//                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                new ArrayList<GrantedAuthority>());
    }
}
