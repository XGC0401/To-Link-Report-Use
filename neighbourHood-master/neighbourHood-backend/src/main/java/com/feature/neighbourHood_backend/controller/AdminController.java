package com.feature.neighbourHood_backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.feature.neighbourHood_backend.model.CustomUserDetails;
import com.feature.neighbourHood_backend.model.DTO.ApiResponse;
import com.feature.neighbourHood_backend.model.DTO.UpdateEmailRequestDTO;
import com.feature.neighbourHood_backend.model.entity.User;
import com.feature.neighbourHood_backend.service.UserService;
import com.feature.neighbourHood_backend.util.jwtUtil;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    public final UserService userService;
    private final jwtUtil jwtUtil;

    public AdminController(UserService userService, jwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // 只有 ADMIN 角色才能访问
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/info")
    public ApiResponse<String> adminInfo() {
        return new ApiResponse(true, "");
    }

    // 任意登录用户都能访问
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user")
    public ApiResponse<String> userInfo(@AuthenticationPrincipal CustomUserDetails userDetails) {
        User user = userService.getUser(userDetails.getEmail());
        return new ApiResponse(true, user, "");
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/user/email")
    public ApiResponse<String> updateEmail(@AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody UpdateEmailRequestDTO request) {
        try {
            User updated = userService.updateEmail(userDetails.getUuid(), request.getEmail());
            CustomUserDetails refreshed = new CustomUserDetails(updated, updated.getRoles());
            String token = jwtUtil.createToken(refreshed);
            return new ApiResponse(true, token, "email updated");
        } catch (IllegalArgumentException ex) {
            return new ApiResponse(false, ex.getMessage());
        }
    }
}