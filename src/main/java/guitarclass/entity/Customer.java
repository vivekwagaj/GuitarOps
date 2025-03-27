package guitarclass.entity;// Customer.java
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.springframework.security.core.Authentication;

import java.util.ArrayList;
import java.util.List;

@Entity

@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Customer {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PhoneNumber> phoneNumbers = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Address> addresses = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)
    private User user;

    public Customer(Long customerId) {
        this.id=customerId;
    }






    // Constructors, getters, setters, and other methods

}
