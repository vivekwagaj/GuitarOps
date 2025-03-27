package guitarclass.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cart_id")  // 🔥 Link back to Cart
    @JsonBackReference
    private Cart cart;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)  // 🔥 Either guitar or part
    @JoinColumn(name = "guitar_id")
    private Guitar guitar;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)  // 🔥 Either guitar or part
    @JoinColumn(name = "part_id")
    private GuitarPart guitarpart;

    private String name;  // 🔥 Store item name directly
    private double price; // 🔥 Store item price directly
    private int quantity;

    // Utility method to set item details
    public void setItemDetails(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    // Getters, setters, constructors
}
