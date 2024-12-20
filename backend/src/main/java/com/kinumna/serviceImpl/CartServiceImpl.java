package com.kinumna.serviceImpl;

import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Cart;
import com.kinumna.model.CartItem;
import com.kinumna.model.ProductVariant;
import com.kinumna.model.User;
import com.kinumna.payload.ResponseFromObject;
import com.kinumna.payload.requests.CartItemRequestInput;
import com.kinumna.payload.responses.CartResponse;
import com.kinumna.repo.CartRepo;
import com.kinumna.repo.ProductVariantRepo;
import com.kinumna.repo.UserRepo;
import com.kinumna.service.CartService;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ResponseFromObject responseFromObject;

    @Autowired
    private ProductVariantRepo productVariantRepo;


    public CartResponse addCartItem(CartItemRequestInput request, Integer userId) {
        // Fetch user
        User user = userRepo.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Fetch product variant
        ProductVariant productVariant = productVariantRepo.findById(request.getProductVariantId())
            .orElseThrow(() -> new ResourceNotFoundException("Product variant not found"));

        // Fetch or create cart
        Cart cart = this.cartRepo.findByUser(user);
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
        }

        List<CartItem> cartItems = cart.getItems();
        AtomicBoolean itemExists = new AtomicBoolean(false);

        // Update existing item or add new one
        cartItems.forEach(cartItem -> {
            if (cartItem.getProductVariant().getVariantId().equals(productVariant.getVariantId())) {
                cartItem.setQuantity(request.getQuantity());
                cartItem.setTotalPrice(productVariant.getPrice() * request.getQuantity());
                itemExists.set(true);
            }
        });

        if (!itemExists.get()) {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProductVariant(productVariant);
            newItem.setQuantity(request.getQuantity());
            newItem.setTotalPrice(productVariant.getPrice() * request.getQuantity());
            cartItems.add(newItem);
        }

        cartRepo.save(cart);

        // Build response DTO
        return this.responseFromObject.getCartResponse(cart);
    }

    @Override
    public CartResponse getById(int id) {
        return this.responseFromObject.getCartResponse(this.cartRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("cart not found")));
    }

    @Override
    public CartResponse getCartByUserId(Integer userId) {
        User user = userRepo.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Cart cart = cartRepo.findByUser(user);

        return this.responseFromObject.getCartResponse(cart);
    }

    @Override
    public CartResponse update(int id, int userId) {
        Cart cart = this.cartRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("cart not found"));

        cart.setUser(this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException( "user not found for cart")));

        return this.responseFromObject.getCartResponse(cart);
    }

    @Override
    public List<CartResponse> getAll() {
        return this.cartRepo.findAll()
            .stream().map(c -> 
                this.responseFromObject.getCartResponse(c))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(int id) {
        this.cartRepo.deleteById(id);
    }
    
}
