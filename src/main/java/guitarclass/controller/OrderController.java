package guitarclass.controller;

import guitarclass.entity.Order;
import guitarclass.entity.enums.OrderStatus;
import guitarclass.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @GetMapping("/customer/{customerId}")
    public List<Order> getOrdersByCustomerId(@PathVariable Long customerId) {
        return orderService.getOrdersByCustomerId(customerId);
    }

    @PatchMapping("/{orderId}/status")
    public Order updateOrderStatus(@PathVariable Long orderId, @RequestParam OrderStatus status) {
        return orderService.updateOrderStatus(orderId, status);
    }
}
