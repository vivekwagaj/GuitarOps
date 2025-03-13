package guitarclass.service;

import guitarclass.dto.RegisterRequest;
import guitarclass.entity.Cart;
import guitarclass.entity.Customer;
import guitarclass.entity.User;
import guitarclass.repository.CartRepository;
import guitarclass.repository.CustomerRepository;
import guitarclass.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import guitarclass.dto.JwtRequest;
import guitarclass.dto.JwtResponse;
import guitarclass.security.JwtUtil;
import org.springframework.security.core.GrantedAuthority;


import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    private final CartRepository cartRepository;

    private final CustomUserDetailsService customUserDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, CustomerRepository customerRepository, CartRepository cartRepository, CustomUserDetailsService customUserDetailsService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.cartRepository = cartRepository;
        this.customUserDetailsService = customUserDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String authenticate(JwtRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // Load user details from the database
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(request.getEmail());

            // Extract roles from UserDetails
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
            ensureUserCartExists(request.getEmail());
            // Generate the token including roles
            return jwtUtil.generateToken(userDetails.getUsername(), roles);
        } catch (Exception e) {
            throw new RuntimeException("Invalid credentials");
        }
    }


    public void registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRoles(Set.of("ROLE_USER")); // Default role for new users

        userRepository.save(newUser);

        Customer newCustomer = new Customer();
        newCustomer.setFirstName(request.getFirstName()); // Can be updated later
        newCustomer.setLastName(request.getLastName());
        newCustomer.setEmail(request.getEmail()); // Username as email
        newCustomer.setUser(newUser); // Link to the user

        customerRepository.save(newCustomer); // Save customer

        Cart cart = new Cart();
        cart.setCustomer(newCustomer);
        cart.setTotalPrice(0.0);
        cartRepository.save(cart);

    }

    public void ensureUserCartExists(String email) {
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isPresent()) {
            Customer customer = customerOpt.get();
            if (!cartRepository.existsByCustomer(customer)) {
                Cart cart = new Cart();
                cart.setCustomer(customer);
                cart.setTotalPrice(0.0);
                cartRepository.save(cart);
                System.out.println("🛒 Cart created for user: " + email);
            }
        }
    }
}

