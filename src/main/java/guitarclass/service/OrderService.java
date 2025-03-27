package guitarclass.service;

import guitarclass.entity.Order;
import guitarclass.entity.enums.OrderStatus;
import guitarclass.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus(OrderStatus.PENDING);
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByCustomerId(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public Order updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId).orElseThrow(() ->
                new RuntimeException("Order not found with ID: " + orderId));
        order.setOrderStatus(status);
        return orderRepository.save(order);
    }
}
