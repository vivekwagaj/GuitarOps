package guitarclass.service;

import guitarclass.entity.*;
import guitarclass.repository.CartRepository;
import guitarclass.repository.CustomerRepository;
import guitarclass.repository.GuitarPartRepository;
import guitarclass.repository.GuitarRepository;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CustomerRepository customerRepository;
    private final GuitarRepository guitarRepository;
    private final GuitarPartRepository partRepository;

    public CartService(CartRepository cartRepository, CustomerRepository customerRepository,
                       GuitarRepository guitarRepository, GuitarPartRepository partRepository) {
        this.cartRepository = cartRepository;
        this.customerRepository = customerRepository;
        this.guitarRepository = guitarRepository;
        this.partRepository = partRepository;
    }

    public Cart addToCart(Long customerId, Long itemId, int quantity, boolean isPart) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Cart cart = cartRepository.findByCustomer(customer).orElse(new Cart());
        cart.setCustomer(customer);

        CartItem cartItem = new CartItem();
        cartItem.setQuantity(quantity);

        if (isPart) {
            GuitarPart part = partRepository.findById(itemId)
                    .orElseThrow(() -> new RuntimeException("Part not found"));
            cartItem.setGuitarpart(part);
            cartItem.setPrice(part.getPrice() * quantity);
        } else {
            Guitar guitar = guitarRepository.findById(itemId)
                    .orElseThrow(() -> new RuntimeException("Guitar not found"));
            cartItem.setGuitar(guitar);
            cartItem.setPrice(guitar.getPrice() * quantity);
        }

        cart.getItems().add(cartItem);
        cart.setTotalPrice(cart.getItems().stream().mapToDouble(CartItem::getPrice).sum());
        return cartRepository.save(cart);
    }

    public Cart getCart(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return cartRepository.findByCustomer(customer).orElse(new Cart());
    }

    public void clearCart(Long customerId) {
        Cart cart = getCart(customerId);
        cart.getItems().clear();
        cart.setTotalPrice(0);
        cartRepository.save(cart);
    }

    public void checkout(Long customerId) {
        Cart cart = getCart(customerId);

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Optionally, you can save the order to an order table here

        // Clear the cart and reset total price
        cart.getItems().clear();
        cart.setTotalPrice(0);
        cartRepository.save(cart);
    }
}
