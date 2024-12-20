package com.kinumna.service;

import org.springframework.web.multipart.MultipartFile;

import com.kinumna.payload.requests.SaleInput;
import com.kinumna.payload.responses.SaleResponse;

import java.util.List;

public interface SaleService {
   public SaleResponse create(SaleInput input, MultipartFile file);
   public List<SaleResponse> getAll();
   public SaleResponse getById(int saleId);
   public List<SaleResponse> getActiveSales();
   public SaleResponse update(int saleId, SaleInput input, MultipartFile file);
   public void delete(int saleId);
}
