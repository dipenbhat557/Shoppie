package com.kinumna.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kinumna.model.Brand;

public interface BrandService {
   Brand create(String name, MultipartFile file);
   Brand getById(int id);
   List<Brand> getAll();
   Brand update(int id, String name, MultipartFile file);
   void delete(int id); 
}
