package com.kinumna.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private String firstName;
    private String lastName;
    private String email;

    private String password;

    private boolean isVerified;

    private String phoneNo;

    private Date dob;

    private Gender gender;

    @Lob
    @Column(name = "profile", columnDefinition = "LONGBLOB")
    private byte[] profile;

}