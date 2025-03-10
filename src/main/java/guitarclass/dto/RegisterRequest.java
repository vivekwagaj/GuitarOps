package guitarclass.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterRequest {
    private String email;      //  Email is used as username
    private String password;
    private String firstName;
    private String lastName;
}
