package com.ssafy.ssantaClinic.common.auth;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
public class UserSecurity extends User {
    private final int userId;
    private final String nickName;

    public UserSecurity(int userId, String nickName, String email, String password,Collection<? extends GrantedAuthority> authorities) {
        super(email, password, authorities);
        this.userId = userId;
        this.nickName = nickName;
    }
    public UserSecurity(int userId, String nickName, String email, String password, boolean enabled, boolean accountNonExpired,
                       boolean credentialsNonExpired, boolean accountNonLocked,
                       Collection<? extends GrantedAuthority> authorities) {
        super(email, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        this.userId = userId;
        this.nickName = nickName;
    }
}
