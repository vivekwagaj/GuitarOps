package guitarclass.controller;

import guitarclass.dto.CheckoutRequest;
import guitarclass.entity.*;
import guitarclass.repository.CustomerRepository;
import guitarclass.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/{customerId}/add")
    public ResponseEntity<Map<String, String>> addToCart(@PathVariable Long customerId, @RequestBody CartItem item) {
        try {
            System.out.println("🔥 Received Cart Item: " + item.getGuitar());
            cartService.addToCart(customerId, item);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Item added to cart");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to add item to cart");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<Cart> getCart(@PathVariable Long customerId) {
        try {

            Cart cart = cartService.getCartByCustomerId(customerId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/{customerId}/remove")
    public ResponseEntity<String> removeFromCart(@PathVariable Long customerId, @RequestBody CartItem item) {
        try {
            cartService.removeFromCart(customerId, item.getId());
            return ResponseEntity.ok("Item removed from cart");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to remove from cart: " + e.getMessage());
        }
    }

    @PostMapping("/checkout/{customerId}")
    public ResponseEntity<String> checkout(@PathVariable Long customerId,@RequestBody CheckoutRequest checkoutRequest) {
        try {
            Customer customer = customerRepository.findById(customerId)
                    .orElseThrow(() -> new RuntimeException("Customer not found"));

            // Update phone number during checkout
            customer.getPhoneNumbers().clear();
            customer.getAddresses().clear();

            // Update phone numbers and addresses during checkout
            for (PhoneNumber phoneNumber : checkoutRequest.getPhoneNumbers()) {
                phoneNumber.setCustomer(customer);  // ✅ Associate with customer
                customer.getPhoneNumbers().add(phoneNumber);
            }

            // Associate new addresses
            for (Address address : checkoutRequest.getAddresses()) {
                address.setCustomer(customer);  // ✅ Associate with customer
                customer.getAddresses().add(address);
            }
            customerRepository.save(customer);

            cartService.checkout(customerId);
            return ResponseEntity.ok("Checkout successful");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Checkout failed: " + e.getMessage());
        }
    }


    @DeleteMapping("/{customerId:[0-9]+}/clear")
    public ResponseEntity<String> clearCart(@PathVariable Long customerId) {
        System.out.println("Starting now");
        cartService.clearCart(customerId);
        return ResponseEntity.ok("Cart cleared successfully");
    }

}

