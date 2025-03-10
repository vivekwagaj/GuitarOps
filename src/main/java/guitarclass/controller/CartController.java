package guitarclass.controller;

import guitarclass.entity.Cart;
import guitarclass.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestParam Long customerId, @RequestParam Long itemId, @RequestParam int quantity, @RequestParam boolean isPart) {
        return ResponseEntity.ok(cartService.addToCart(customerId, itemId, quantity, isPart));
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<Cart> getCart(@PathVariable Long customerId) {
        return ResponseEntity.ok(cartService.getCart(customerId));
    }

    @DeleteMapping("/clear/{customerId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long customerId) {
        cartService.clearCart(customerId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/checkout/{customerId}")
    public ResponseEntity<Void> checkout(@PathVariable Long customerId) {
        cartService.checkout(customerId);
        return ResponseEntity.ok().build();
    }
}

