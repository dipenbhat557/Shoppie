package com.kinumna.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Brand;
import com.kinumna.repo.BrandRepo;
import com.kinumna.service.BrandService;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepo brandRepo;

    @Override
    public Brand create(String name, MultipartFile file) {
        Brand brand = new Brand();

        brand.setName(name);
        if(file != null){
            try {
                brand.setLogo(file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return this.brandRepo.save(brand);
    }

    @Override
    public Brand getById(int id) {
        return this.brandRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("brand not found"));
    }

    @Override
    public List<Brand> getAll() {
        return this.brandRepo.findAll();
    }

    @Override
    public Brand update(int id, String name, MultipartFile file) {
        Brand brand = this.getById(id);

        if(brand != null){
            brand.setName(name);
            if(file != null){
                try {
                    brand.setLogo(file.getBytes());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            return brand;
        }

        return null;
    }

    @Override
    public void delete(int id) {
        this.brandRepo.deleteById(id);
    }
    
}
