package guitarclass.dto;

import lombok.Getter;


public class JwtResponse {
    @Getter
    private String token;

    public JwtResponse(String token) { this.token = token; }
}
