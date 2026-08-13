package com.skillsync.repository;

import com.skillsync.entity.Role;
import com.skillsync.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailIgnoreCase(String email);
    boolean existsByEmailIgnoreCase(String email);
    List<User> findByRoleOrderByCreatedAtAsc(Role role);
    long countByRole(Role role);
}
