package guitarclass.config;

import guitarclass.security.JwtAuthenticationFilter;
import guitarclass.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;


@Configuration
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter; // 🔥 Inject JWT Filter

    public SecurityConfig(CustomUserDetailsService userDetailsService, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(authProvider);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOriginPatterns(List.of("http://localhost:3000")); // ✅ Use Allowed Origin Patterns
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // ✅ Allow all methods
                    config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Access-Control-Allow-Origin", "*")); // ✅ Allow all headers
                    config.setExposedHeaders(List.of("Authorization")); // ✅ Expose the Authorization header to the frontend
                    config.setAllowCredentials(true);
                    return config;
                }))
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for APIs
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/login", "POST")).permitAll() // Public access to login
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/register", "POST")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/cart/**", "POST")).permitAll()// Public access to cart
                        .requestMatchers(new AntPathRequestMatcher("/api/cart", "GET")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/cart/**", "PUT")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/cart/**", "DELETE")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/cart/checkout/**", "POST")).permitAll()// Public access to cart
                        .requestMatchers(new AntPathRequestMatcher("/api/guitars", "GET")).permitAll() // Allow browsing guitars
                        .requestMatchers(new AntPathRequestMatcher("/api/guitars/**", "POST")).hasAuthority("ROLE_ADMIN") // Admins can add guitars
                        .requestMatchers(new AntPathRequestMatcher("/api/guitars/**", "PUT")).hasAuthority("ROLE_ADMIN") // Admins can update guitars
                        .requestMatchers(new AntPathRequestMatcher("/api/guitars/**", "DELETE")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(new AntPathRequestMatcher("/api/parts", "GET")).permitAll() // Allow browsing guitars
                        .requestMatchers(new AntPathRequestMatcher("/api/parts/**", "POST")).hasAuthority("ROLE_ADMIN") // Admins can add guitars
                        .requestMatchers(new AntPathRequestMatcher("/api/parts/**", "PUT")).hasAuthority("ROLE_ADMIN") // Admins can update guitars
                        .requestMatchers(new AntPathRequestMatcher("/api/parts/**", "DELETE")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(new AntPathRequestMatcher("/api/customers/**", "POST")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(new AntPathRequestMatcher("/api/repairs","POST")).hasAuthority("ROLE_USER") // Only Users can create repair requests
                        .requestMatchers(new AntPathRequestMatcher("/api/repairs","GET")).hasAnyAuthority("ROLE_USER", "ROLE_TECHNICIAN", "ROLE_ADMIN") // Users, Technicians, and Admins can view repair requests
                        .requestMatchers(new AntPathRequestMatcher("/api/repairs/**","PUT")).hasAuthority("ROLE_TECHNICIAN") // Only Technicians can update repair status
                        .anyRequest().authenticated() // Protect all other endpoints
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // JWT-based authentication

        return http.build();

    }
}

