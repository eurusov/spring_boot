package eurusov.spring_boot.rest;

import eurusov.spring_boot.model.User;
import eurusov.spring_boot.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/user-api")
@AllArgsConstructor
public class UserApiController {

    private UserService userService;

    @GetMapping
    public User getPrincipal(Principal principal) {
        return userService.getUserWithAuthorities(principal.getName());
    }
}
