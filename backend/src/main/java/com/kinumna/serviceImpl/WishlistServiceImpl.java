package com.kinumna.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.User;
import com.kinumna.model.Wishlist;
import com.kinumna.payload.ObjectFromInput;
import com.kinumna.payload.ResponseFromObject;
import com.kinumna.payload.requests.WishlistInput;
import com.kinumna.payload.responses.WishlistResponse;
import com.kinumna.repo.UserRepo;
import com.kinumna.repo.WishlistRepo;
import com.kinumna.service.WishlistService;

import java.util.stream.Collectors;

@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private WishlistRepo wishlistRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ObjectFromInput objectFromInput;

    @Autowired
    private ResponseFromObject responseFromObject;

    @Override
    public WishlistResponse create(WishlistInput input) {
        Wishlist wishlist = new Wishlist();

        wishlist = this.objectFromInput.getWishlist(wishlist, input);

        return this.responseFromObject.getWishlistResponse(this.wishlistRepo.save(wishlist));
    }

    @Override
    public WishlistResponse getById(int id) {
        return this.responseFromObject.getWishlistResponse(this.wishlistRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("wishlist not found")));
    }

    @Override
    public List<WishlistResponse> getAll() {
        return this.wishlistRepo.findAll().stream().map(wishlist->this.responseFromObject.getWishlistResponse(wishlist)).collect(Collectors.toList());
    }

    @Override
    public WishlistResponse getByUser(int userId) {
        User user = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("user not found"));

        Wishlist wishlist = this.wishlistRepo.findByUser(user);

        return this.responseFromObject.getWishlistResponse(wishlist);
    }

    @Override
    public WishlistResponse update(int id, WishlistInput input) {
        Wishlist wishlist = this.wishlistRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("wishlist not found"));

        wishlist = this.objectFromInput.getWishlist(wishlist, input);

        return this.responseFromObject.getWishlistResponse(this.wishlistRepo.save(wishlist));
    }

    @Override
    public void delete(int id) {
        this.wishlistRepo.deleteById(id);
    }
    
}
