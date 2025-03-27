package guitarclass.dto;

import guitarclass.entity.Address;
import guitarclass.entity.PhoneNumber;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutRequest {
    private List<PhoneNumber> phoneNumbers;
    private List<Address> addresses;
}
