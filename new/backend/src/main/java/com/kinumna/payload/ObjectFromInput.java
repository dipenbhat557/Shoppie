package com.kinumna.payload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Address;
import com.kinumna.model.Category;
import com.kinumna.model.Payment;
import com.kinumna.model.Product;
import com.kinumna.model.ProductOption;
import com.kinumna.model.ProductOptionGroup;
import com.kinumna.model.Sale;
import com.kinumna.model.Store;
import com.kinumna.model.User;
import com.kinumna.model.Wishlist;
import com.kinumna.payload.requests.AddressInput;
import com.kinumna.payload.requests.CategoryInput;
import com.kinumna.payload.requests.PaymentInput;
import com.kinumna.payload.requests.ProductOptionInput;
import com.kinumna.payload.requests.SaleInput;
import com.kinumna.payload.requests.StoreInput;
import com.kinumna.payload.requests.UserInput;
import com.kinumna.payload.requests.WishlistInput;
import com.kinumna.repo.CategoryRepo;
import com.kinumna.repo.ProductOptionGroupRepo;
import com.kinumna.repo.ProductRepo;
import com.kinumna.repo.UserRepo;
import com.kinumna.service.UserService;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ObjectFromInput {

    @Autowired
    @Lazy
    private UserService userService;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ProductOptionGroupRepo productOptionGroupRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private UserRepo userRepo;
   
    public Address getAddress(Address address, AddressInput input){
        
        address.setHouseNo(input.getHouseNo());
        address.setStreet(input.getStreet());
        address.setCity(input.getCity());
        address.setDistrict(input.getDistrict());
        address.setState(input.getState());
        address.setPinCode(input.getPinCode());
        address.setLandmark(input.getLandmark());
        address.setPrimary(input.isPrimary());
        
        User user = userService.findById(input.getUserId());
        address.setUser(user);

        return address;
    }

    public User getUser(User user, UserInput input, MultipartFile profilePicture){
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setEmail(input.getEmail());
        user.setPhoneNo(input.getPhoneNumber());
        user.setPassword(input.getPassword());
        user.setDob(input.getDob());
        user.setGender(input.getGender());

        if(profilePicture != null){
            try {
                user.setProfile(profilePicture.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return user;
    }

    public Category getCategory(Category category, CategoryInput input, MultipartFile image){
        category.setCategoryName(input.getName());
        category.setParentCategory(this.categoryRepo.findById(input.getParentCategoryId()).orElseThrow(()->new ResourceNotFoundException("category can't be found")));
        
        if(image != null){
            try {
                category.setImage(image.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return category;
    }

    public Payment getPayment(Payment payment, PaymentInput input){
        payment.setPaymentDate(LocalDateTime.now());
        payment.setAmount(input.getAmount());
        payment.setStatus(input.getStatus());
        payment.setReferenceId(input.getReferenceId());
        payment.setMethod(input.getMethod());

        return payment;
    }

    public ProductOption getProductOption(ProductOption productOption, ProductOptionInput input){
        productOption.setName(input.getName());

        ProductOptionGroup productOptionGroup = this.productOptionGroupRepo.findById(input.getProductOptionGroupId())
        .orElseThrow(() -> new ResourceNotFoundException("Product option group not found"));

        // Add product option to group (managed bidirectionally)
        productOption.setProductOptionGroup(productOptionGroup);
        productOptionGroup.getProductOptions().add(productOption);
        
        return productOption;
    }

    
    public Sale getSale(Sale sale, SaleInput input, MultipartFile file){
        sale.setDescription(input.getDescription());
        sale.setStartDate(input.getStartDate());
        sale.setEndDate(input.getEndDate());
        sale.setDiscount(input.getDiscount());
        sale.setIsPercentage(input.isPercentage());
        sale.setProducts(input.getProductIds().stream().map(pId -> this.productRepo.findById(pId).orElseThrow(()->new ResourceNotFoundException("Product not found"))).collect(Collectors.toList()));
        if(file != null){
            try {
                sale.setImage(file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return sale;
    }

    public Store getStore(Store store, StoreInput input){
        store.setName(input.getName());
        store.setLocation(input.getLocation());
        store.setContact(input.getContact());

        return store;

    }

    public Wishlist getWishlist(Wishlist wishlist, WishlistInput input){
        List<Product> products = input.getProductIds().stream()
        .map(id -> this.productRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product with ID " + id + " not found for wishlist"))
        ).collect(Collectors.toList());
    
        // Add the fetched products to the wishlist
        wishlist.getProducts().addAll(products);
        wishlist.setUser(this.userRepo.findById(input.getUserId()).orElseThrow(()->new ResourceNotFoundException("User not found")));
        return wishlist;
    }

}
