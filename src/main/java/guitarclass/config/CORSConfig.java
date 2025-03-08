package guitarclass.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CORSConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true); // ✅ Important: Allow credentials (Authorization headers)
        config.setAllowedOrigins(List.of("http://localhost:3000")); // ✅ Allow React frontend
        config.setAllowedHeaders(List.of("Authorization", "Content-Type")); // ✅ Explicitly allow Authorization header
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // ✅ Allow necessary methods

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
