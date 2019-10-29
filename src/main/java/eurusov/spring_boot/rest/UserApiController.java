package eurusov.spring_boot.rest;

import eurusov.spring_boot.model.User;
import eurusov.spring_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/user-api")
public class UserApiController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public User getPrincipal(Principal principal) {
        return userService.getUserByUsername(principal.getName());
    }
}
