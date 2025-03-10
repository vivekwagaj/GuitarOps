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

        config.setAllowCredentials(true); // ✅ Allow credentials
        config.addAllowedOriginPattern("*"); // ✅ Use pattern to match any origin
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Access-Control-Allow-Origin")); // ✅ Allow necessary headers
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // ✅ Allow all methods

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
