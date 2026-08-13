package com.skillsync.security;

import com.skillsync.entity.AccountStatus;
import com.skillsync.entity.User;
import com.skillsync.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository users;

    public UserDetailsServiceImpl(UserRepository users) {
        this.users = users;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User u = users.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("Not found: " + email));
        boolean active = u.getStatus() == AccountStatus.ACTIVE;
        return new AuthPrincipal(u.getId(), u.getEmail(), u.getRole(), u.getPasswordHash(), active);
    }
}
