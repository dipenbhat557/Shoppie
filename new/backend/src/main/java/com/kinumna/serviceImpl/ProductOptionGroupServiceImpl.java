package com.kinumna.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kinumna.model.ProductOptionGroup;
import com.kinumna.repo.ProductOptionGroupRepo;
import com.kinumna.service.ProductOptionGroupService;

import java.util.List;

@Service
public class ProductOptionGroupServiceImpl implements ProductOptionGroupService {

    @Autowired
    private ProductOptionGroupRepo optionGroupRepository;

    @Override
    public ProductOptionGroup createOptionGroup(ProductOptionGroup optionGroup) {
        return optionGroupRepository.save(optionGroup);
    }

    @Override
    public ProductOptionGroup getOptionGroupById(Integer id) {
        return optionGroupRepository.findById(id).orElse(null);
    }

    @Override
    public List<ProductOptionGroup> getAllOptionGroups() {
        return optionGroupRepository.findAll();
    }

    @Override
    public ProductOptionGroup updateOptionGroup(Integer id, ProductOptionGroup optionGroup) {
        ProductOptionGroup existingGroup = optionGroupRepository.findById(id).orElse(null);
        if (existingGroup != null) {
            existingGroup.setName(optionGroup.getName());
            return optionGroupRepository.save(existingGroup);
        }
        return null;
    }

    @Override
    public void deleteOptionGroup(Integer id) {
        optionGroupRepository.deleteById(id);
    }
}
