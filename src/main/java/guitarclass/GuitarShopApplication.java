package guitarclass;// GuitarShopApplication.java
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
//import org.springframework.context.annotation.Import;

@SpringBootApplication
//@Import(value=org.springframework.security.web.method.annotation.CurrentSecurityContextArgumentResolver.class)
public class GuitarShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(GuitarShopApplication.class, args);
    }

}

