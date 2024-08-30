package com.shoppie.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shoppie.payload.SigninRequest;
import com.shoppie.payload.SignupRequest;
import com.shoppie.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    
    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(@RequestBody SigninRequest req) {
        return ResponseEntity.ok(authService.authenticate(req));
    }

    @PostMapping(value="/signup",consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> create(@RequestParam("req") String signupReq, @RequestParam("file") MultipartFile file) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            SignupRequest req = objectMapper.readValue(signupReq, SignupRequest.class);
            return new ResponseEntity<>(this.authService.register(req, file),HttpStatus.CREATED);
        } catch (JsonProcessingException e) {

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}