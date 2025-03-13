package guitarclass.service;

import guitarclass.entity.*;
import guitarclass.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private GuitarRepository guitarRepository;

    @Autowired
    private GuitarPartRepository partRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public Cart getOrCreateCart(Long customerId) {
        return cartRepository.findByCustomerId(customerId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setCustomer(new Customer(customerId));  // 🔥 Link to customer
                    newCart.setTotalPrice(0);
                    return cartRepository.save(newCart);
                });
    }

    @Transactional
    public void addToCart(Long customerId, CartItem item) {
        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new RuntimeException("Cart not found for customer ID: " + customerId));

    // ✅ Associate the cart with the item
        item.setCart(cart);
        System.out.println(cart.getItems());

        if (item.getGuitar() != null && item.getGuitar().getId() != null) {
           Guitar guitar = guitarRepository.findById(item.getGuitar().getId())
                    .orElseThrow(() -> new RuntimeException("Guitar not found with ID: " + item.getGuitar().getId()));
            item.setGuitar(guitar);
            System.out.println("Guitar " + guitar);
        }

        if (item.getGuitarpart() != null && item.getGuitarpart().getId() != null) {
            GuitarPart part = partRepository.findById(item.getGuitarpart().getId())
                    .orElseThrow(() -> new RuntimeException("Guitar Part not found with ID: " + item.getGuitarpart().getId()));
            item.setGuitarpart(part);
            System.out.println("Part " + part);
        }

        // ✅ Associate the cart with the item


    // Check if the item already exists in the cart
    Optional<CartItem> existingItem = cart.getItems().stream()
            .filter(cartItem -> (cartItem.getGuitar() != null && item.getGuitar() != null &&
                                 cartItem.getGuitar().getId().equals(item.getGuitar().getId())) ||
                                (cartItem.getGuitarpart() != null && item.getGuitarpart() != null &&
                                 cartItem.getGuitarpart().getId().equals(item.getGuitarpart().getId())))
            .findFirst();

        if (existingItem.isPresent()) {
        // Update quantity and price if item already exists
            System.out.println("Append");
            CartItem cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + item.getQuantity());
            cartItem.setPrice(cartItem.getPrice() + (item.getPrice() * item.getQuantity()));
            cartItem.setCart(cart);
        cartItemRepository.save(cartItem);  // ✅ Save the updated item
    } else {
        // Add the new item to the cart
            System.out.println("New Item: " + cart.getItems());
            item.setCart(cart);  // ✅ Make sure the cart is associated before saving
//            cart.getItems().add(item);  // ✅ Add item to the cart
            cartItemRepository.save(item);  // ✅ Save the new item
    }

        // Update total price
        cart.setTotalPrice(cart.getItems().stream()
                .mapToDouble(CartItem::getPrice)
                .sum());

        // 🔥 Save the cart with updated items
        cartRepository.save(cart);
}


    public void checkout(Long customerId) {
        Cart cart = getOrCreateCart(customerId);
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Clear the cart after checkout
        cart.getItems().clear();
        cart.setTotalPrice(0);
        cartRepository.save(cart);
    }

    public Cart getCart(Long customerId) {
        return getOrCreateCart(customerId);
    }

    public Cart getCartByCustomerId(Long customerId) {
        return cartRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new RuntimeException("Cart not found for customer ID: " + customerId));
    }

    public void removeFromCart(Long customerId, Long itemId) {
        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new RuntimeException("Cart not found for customer ID: " + customerId));

        Optional<CartItem> cartItemOpt = Optional.ofNullable(cart.getItems().stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not found in cart")));

        if (cartItemOpt.isPresent()) {
        CartItem cartItem = cartItemOpt.get();
        // Decrement quantity or remove item entirely
        if (cartItem.getQuantity() > 1) {
            // Decrement quantity and update price
            cartItem.setQuantity(cartItem.getQuantity() - 1);
            double unitPrice = 0.0;
            if (cartItem.getGuitar() != null) {
                unitPrice = cartItem.getGuitar().getPrice();
            } else if (cartItem.getGuitarpart() != null) {
                unitPrice = cartItem.getGuitarpart().getPrice();
            }
            cartItem.setPrice(cartItem.getPrice() - unitPrice);
            cartItemRepository.save(cartItem);
        } else {
            // If quantity is 1, remove the item entirely
            cart.getItems().remove(cartItem);

            cartItemRepository.delete(cartItem);
        }

        // Save the updated cart
        cart.setTotalPrice(cart.getItems().stream()
                .mapToDouble(CartItem::getPrice)
                .sum());
        cartRepository.save(cart);
    }
    else
        {

                throw new RuntimeException("Item not found in cart for ID: " + itemId);

        }
    }

    public void clearCart(Long customerId) {
        System.out.println("Inside Service class");
        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new RuntimeException("Cart not found for customer ID: " + customerId));

        cart.getItems().clear();  // Clear the items list
        System.out.println("Cart Cleared");
        cart.setTotalPrice(0);    // Reset the total price
        System.out.println("Total Price 0");

        cartRepository.save(cart);
        System.out.println("Updated cart saved");
    }
}
