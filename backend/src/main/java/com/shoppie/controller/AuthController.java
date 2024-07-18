package com.shoppie.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shoppie.payload.SigninRequest;
import com.shoppie.payload.SignupRequest;
import com.shoppie.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody SignupRequest req) {
        return ResponseEntity.ok(authService.register(req));
    }
    
    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(@RequestBody SigninRequest req) {
        return ResponseEntity.ok(authService.authenticate(req));
    }
}