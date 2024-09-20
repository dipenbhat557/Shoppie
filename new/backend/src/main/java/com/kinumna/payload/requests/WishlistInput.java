package com.kinumna.payload.requests;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WishlistInput {
 private List<Integer> productIds;
 private int userId;   
}
