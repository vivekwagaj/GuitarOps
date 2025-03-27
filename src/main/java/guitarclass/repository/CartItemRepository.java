package guitarclass.repository;

import guitarclass.entity.CartItem;
import guitarclass.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Modifying
    @Query("UPDATE CartItem c SET c.quantity = :quantity, c.price = :price WHERE c.id = :id")
    void updateCartItem(@Param("id") Long id, @Param("quantity") int quantity, @Param("price") double price);

    @Query("SELECT COALESCE(SUM(ci.price * ci.quantity), 0) FROM CartItem ci WHERE ci.cart.id = :cartId")
    double calculateTotalPrice(@Param("cartId") Long cartId);

    Collection<CartItem> findByCartId(Long id);
}