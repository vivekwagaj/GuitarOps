package guitarclass;// GuitarShopApplication.java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Import;

@SpringBootApplication
//@Import(value=org.springframework.security.web.method.annotation.CurrentSecurityContextArgumentResolver.class)
public class GuitarShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(GuitarShopApplication.class, args);
    }
}
