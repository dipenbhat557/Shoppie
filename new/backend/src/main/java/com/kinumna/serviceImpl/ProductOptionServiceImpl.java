package com.kinumna.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.ProductOption;
import com.kinumna.payload.ObjectFromInput;
import com.kinumna.payload.requests.ProductOptionInput;
import com.kinumna.repo.ProductOptionGroupRepo;
import com.kinumna.repo.ProductOptionRepo;
import com.kinumna.service.ProductOptionService;

@Service
public class ProductOptionServiceImpl implements ProductOptionService {

    @Autowired
    private ProductOptionRepo productOptionRepo;

    @Autowired
    private ProductOptionGroupRepo productOptionGroupRepo;

    @Autowired
    private ObjectFromInput objectFromInput;

    @Override
    public ProductOption create(ProductOptionInput input) {
        ProductOption productOption = new ProductOption();

        productOption = this.objectFromInput.getProductOption(productOption,input);

        return this.productOptionRepo.save(productOption);
    }

    @Override
    public List<ProductOption> getAll() {
        return this.productOptionRepo.findAll();
    }

    @Override
    public ProductOption getById(int id) {
        return this.productOptionRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("product not found"));
    }

    @Override
    public List<ProductOption> getByOptionGroup(int optionGroupId) {
        return this.productOptionRepo.findByProductOptionGroup(this.productOptionGroupRepo.findById(optionGroupId).orElseThrow(()->new ResourceNotFoundException("option group not found")));
    }

    @Override
    public ProductOption update(int id, ProductOptionInput input) {
        ProductOption productOption = this.getById(id);

        productOption = this.objectFromInput.getProductOption(productOption,input);

        return this.productOptionRepo.save(productOption);
    }

    @Override
    public void deleteById(int id) {
        this.productOptionRepo.deleteById(id);
    }
    
}
