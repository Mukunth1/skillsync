package com.skillsync.security;

import com.skillsync.entity.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class AuthPrincipal implements UserDetails {

    private final Long id;
    private final String email;
    private final Role role;
    private final String passwordHash;
    private final boolean active;

    public AuthPrincipal(Long id, String email, Role role, String passwordHash, boolean active) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.passwordHash = passwordHash;
        this.active = active;
    }

    public Long getId() { return id; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override public String getPassword() { return passwordHash; }
    @Override public String getUsername() { return email; }
    @Override public boolean isAccountNonExpired() { return active; }
    @Override public boolean isAccountNonLocked() { return active; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return active; }
}
