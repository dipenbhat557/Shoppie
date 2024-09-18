package com.kinumna.payload.responses;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WishlistResponse {
   private int id;
   private List<Integer> productIds;
   private int userId; 
}
