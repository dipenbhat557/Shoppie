package com.kinumna.service;

import java.util.List;

import com.kinumna.model.ProductOption;
import com.kinumna.payload.requests.ProductOptionInput;

public interface ProductOptionService {
   public ProductOption create(ProductOptionInput input);
   public List<ProductOption> getAll();
   public ProductOption getById(int id);
   public List<ProductOption> getByOptionGroup(int optionGroupId);
   public ProductOption update(int id, ProductOptionInput input);
   public void deleteById(int id); 
}
