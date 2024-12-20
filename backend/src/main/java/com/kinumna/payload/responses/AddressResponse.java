package com.kinumna.payload.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressResponse {
    private int id;
    private int houseNo;
    private String street;
    private String city;
    private String district;
    private String state;
    private String pinCode;
    private String landmark;
    private boolean isPrimary;
    private Integer userId; 
}