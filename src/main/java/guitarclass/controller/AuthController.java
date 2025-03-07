package guitarclass.controller;

import org.springframework.web.bind.annotation.*;
import guitarclass.dto.JwtRequest;
import guitarclass.dto.JwtResponse;
import guitarclass.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public JwtResponse login(@RequestBody JwtRequest request) {
        return authService.authenticate(request);
    }
}
