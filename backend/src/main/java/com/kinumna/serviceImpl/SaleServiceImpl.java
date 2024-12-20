package com.kinumna.serviceImpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Sale;
import com.kinumna.payload.ObjectFromInput;
import com.kinumna.payload.ResponseFromObject;
import com.kinumna.payload.requests.SaleInput;
import com.kinumna.payload.responses.SaleResponse;
import com.kinumna.repo.SaleRepo;
import com.kinumna.service.SaleService;

@Service
public class SaleServiceImpl implements SaleService{

    @Autowired
    private SaleRepo saleRepo;

    @Autowired
    private ObjectFromInput objectFromInput;

    @Autowired
    private ResponseFromObject responseFromObject;

    @Override
    public SaleResponse create(SaleInput input, MultipartFile file) {
        Sale sale = new Sale();

        sale = this.objectFromInput.getSale(sale, input, file);

        sale = this.saleRepo.save(sale);

        return this.responseFromObject.getSaleResponse(sale);
    }

    @Override
    public List<SaleResponse> getAll() {
        return this.saleRepo.findAll().stream().map(sale -> this.responseFromObject.getSaleResponse(sale)).collect(Collectors.toList());
    }

    @Override
    public SaleResponse getById(int saleId) {
        return this.responseFromObject.getSaleResponse(this.saleRepo.findById(saleId).orElseThrow(()-> new ResourceNotFoundException("sale not found")));
    }

    @Override
    public List<SaleResponse> getActiveSales() {
       LocalDateTime now = LocalDateTime.now();
       
       List<Sale> sales = this.saleRepo.findAll().stream()
        .filter(sale -> sale.getStartDate().isBefore(now) && sale.getEndDate().isAfter(now))
        .collect(Collectors.toList());

       return sales.stream().map(sale->this.responseFromObject.getSaleResponse(sale)).collect(Collectors.toList());
    }

    @Override
    public SaleResponse update(int saleId, SaleInput input, MultipartFile file) {
        Sale sale = this.saleRepo.findById(saleId).orElseThrow(()->new ResourceNotFoundException("sale not found"));

        sale = this.objectFromInput.getSale(sale, input, file);

        sale = this.saleRepo.save(sale);

        return this.responseFromObject.getSaleResponse(sale);
    }

    @Override
    public void delete(int saleId) {
        this.saleRepo.deleteById(saleId);
    }
    
}
