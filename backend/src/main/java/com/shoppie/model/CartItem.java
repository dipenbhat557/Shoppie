package com.shoppie.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartItem {
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Id
    private int id;

    private int productId;

    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Cart cart;
}
