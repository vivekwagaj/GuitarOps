package guitarclass.service;// CustomerService.java
import guitarclass.entity.Address;
import guitarclass.entity.Customer;
import guitarclass.entity.Guitar;
import guitarclass.repository.AddressRepository;
import guitarclass.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {


    private final CustomerRepository customerRepository;


    private final AddressRepository addressRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository, AddressRepository addressRepository) {
        this.customerRepository = customerRepository;
        this.addressRepository = addressRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long id) {
        return (Customer) customerRepository.findById(id).orElse(null);
    }

    public Customer getCustomerByEmail(String email) {
        return customerRepository.findByEmail(email)
                .map(customer -> {
            customer.getPhoneNumbers().size(); // Force initialization
            customer.getAddresses().size();    // Force initialization
            return customer;
        })
                .orElse(null);
    }

    public Customer getCustomerProfile(String email) {
        return customerRepository.findByEmail(email).orElse(null);
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    public Customer updateCustomer(Long id, Customer updatedCustomer) {
        Customer existingCustomer = (Customer) customerRepository.findById(id).orElse(null);
        if (existingCustomer != null) {
            // Update the existing guitar with the new data
            existingCustomer.setFirstName(updatedCustomer.getFirstName());
            existingCustomer.setLastName(updatedCustomer.getLastName());
            existingCustomer.setEmail(updatedCustomer.getEmail());
            existingCustomer.setPhoneNumbers(updatedCustomer.getPhoneNumbers());
            // Update other properties as needed
        if (updatedCustomer.getAddresses() != null) {
            existingCustomer.getAddresses().clear();
            existingCustomer.getAddresses().addAll(updatedCustomer.getAddresses());
            for (Address address : existingCustomer.getAddresses()) {
                address.setCustomer(existingCustomer); // Associate each address with the customer
            }
        }
            // Save the updated guitar
            return customerRepository.save(existingCustomer);
        } else {
            return null; // Guitar not found
        }
    }


    // Other methods as needed

}
