package com.kinumna.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private int houseNo;

    private String steet;

    private String city;

    private String district;

    private String state;

    private String pinCode;

    private String landmark;
    
    private boolean isPrimary;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
