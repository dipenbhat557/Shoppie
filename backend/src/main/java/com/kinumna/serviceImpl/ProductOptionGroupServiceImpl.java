package com.kinumna.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Category;
import com.kinumna.model.ProductOptionGroup;
import com.kinumna.payload.ResponseFromObject;
import com.kinumna.payload.responses.ProductOptionGroupResponse;
import com.kinumna.repo.CategoryRepo;
import com.kinumna.repo.ProductOptionGroupRepo;
import com.kinumna.service.ProductOptionGroupService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductOptionGroupServiceImpl implements ProductOptionGroupService {

    @Autowired
    private ProductOptionGroupRepo optionGroupRepository;

    @Autowired
    private ResponseFromObject responseFromObject;

    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public ProductOptionGroupResponse createOptionGroup(String optionGroupName) {
        ProductOptionGroup productOptionGroup = new ProductOptionGroup();

        productOptionGroup.setName(optionGroupName);

        return this.responseFromObject.getOptionGroup( optionGroupRepository.save(productOptionGroup));
    }

    @Override
    public ProductOptionGroupResponse getOptionGroupById(Integer id) {
        return this.responseFromObject.getOptionGroup(optionGroupRepository.findById(id).orElse(null));
    }

    @Override
    public List<ProductOptionGroupResponse> getAllOptionGroups() {
        return optionGroupRepository.findAll().stream().map(option->this.responseFromObject.getOptionGroup(option)).collect(Collectors.toList());
    }

    @Override
    public ProductOptionGroupResponse updateOptionGroup(Integer id, String optionGroupName) {
        ProductOptionGroup existingGroup = optionGroupRepository.findById(id).orElse(new ProductOptionGroup());
        if (existingGroup != null) {
            existingGroup.setName(optionGroupName);
            return this.responseFromObject.getOptionGroup( optionGroupRepository.save(existingGroup));
        }
        return null;
    }

    @Override
    public void deleteOptionGroup(Integer id) {
        optionGroupRepository.deleteById(id);
    }

    @Override
    public List<ProductOptionGroupResponse> getByCategory(Integer categoryId) {
        Category category = this.categoryRepo.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("category not found"));
        List<ProductOptionGroup> productOptionGroups = category.getProductOptionGroups();

        return productOptionGroups.stream().map(option -> this.responseFromObject.getOptionGroup(option)).collect(Collectors.toList());
    }


}
