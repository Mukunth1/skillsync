package com.skillsync.service;

import com.skillsync.dto.AuthDtos;
import com.skillsync.entity.AccountStatus;
import com.skillsync.entity.Role;
import com.skillsync.entity.User;
import com.skillsync.entity.UserStats;
import com.skillsync.exception.ApiException;
import com.skillsync.repository.UserRepository;
import com.skillsync.repository.UserStatsRepository;
import com.skillsync.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository users;
    private final UserStatsRepository stats;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public UserService(UserRepository users, UserStatsRepository stats,
                       PasswordEncoder encoder, JwtService jwt) {
        this.users = users;
        this.stats = stats;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    @Transactional
    public AuthDtos.AuthResponse register(AuthDtos.RegisterRequest req) {
        String email = req.email().trim().toLowerCase();
        if (users.existsByEmailIgnoreCase(email)) {
            throw ApiException.conflict("Email already registered");
        }
        Role role = Boolean.TRUE.equals(req.admin()) ? Role.ADMIN : Role.USER;

        User u = new User();
        u.setEmail(email);
        u.setFullName(req.fullName());
        u.setPasswordHash(encoder.encode(req.password()));
        u.setRole(role);
        u.setStatus(AccountStatus.ACTIVE);
        u = users.save(u);

        UserStats s = new UserStats(u.getId());
        s = stats.save(s);

        String token = jwt.generate(u.getId(), u.getEmail(), u.getRole().name());
        return new AuthDtos.AuthResponse(token, toDto(u), toStatsDto(s));
    }

    @Transactional
    public AuthDtos.AuthResponse login(AuthDtos.LoginRequest req) {
        String email = req.email().trim().toLowerCase();
        User u = users.findByEmailIgnoreCase(email)
                .orElseThrow(() -> ApiException.unauthorized("Invalid email or password"));
        if (u.getStatus() != AccountStatus.ACTIVE) {
            throw ApiException.forbidden("Account suspended");
        }
        if (!encoder.matches(req.password(), u.getPasswordHash())) {
            throw ApiException.unauthorized("Invalid email or password");
        }
        UserStats s = stats.findById(u.getId()).orElseGet(() -> stats.save(new UserStats(u.getId())));
        String token = jwt.generate(u.getId(), u.getEmail(), u.getRole().name());
        return new AuthDtos.AuthResponse(token, toDto(u), toStatsDto(s));
    }

    public AuthDtos.MeResponse me(Long userId) {
        User u = users.findById(userId).orElseThrow(() -> ApiException.notFound("User not found"));
        UserStats s = stats.findById(userId).orElseGet(() -> new UserStats(userId));
        return new AuthDtos.MeResponse(toDto(u), toStatsDto(s));
    }

    public AuthDtos.UserDto toDto(User u) {
        return new AuthDtos.UserDto(u.getId(), u.getEmail(), u.getFullName(),
                u.getRole().name(), u.getStatus().name());
    }

    public AuthDtos.UserStatsDto toStatsDto(UserStats s) {
        return new AuthDtos.UserStatsDto(
                s.getXp(),
                s.getStreak(),
                s.getRankLabel(),
                JsonUtil.readStringList(s.getCompletedMilestones())
        );
    }
}
