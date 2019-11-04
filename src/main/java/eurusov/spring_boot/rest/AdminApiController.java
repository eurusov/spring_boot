package eurusov.spring_boot.rest;

import eurusov.spring_boot.model.Authority;
import eurusov.spring_boot.model.User;
import eurusov.spring_boot.service.AuthorityService;
import eurusov.spring_boot.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AdminApiController {

    private UserService userService;
    private AuthorityService authorityService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/list")
    public List<User> getUserList() {
        return userService.getUserList();
    }

    @GetMapping("/user")
    public User getPrincipal(Principal principal) {
        return userService.getUserWithAuthorities(principal.getName());
    }

    @GetMapping("/authorities")
    public List<Authority> getAuthorities() {
        return authorityService.getAll();
    }

    @GetMapping("user/{userId}")
    public User getUser(@PathVariable Long userId) {
        return userService.getOneWithAuthorities(userId);
    }

    @PostMapping("/add")
    public List<User> addNewUser(@RequestBody User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userService.addUser(user);
        return userService.getUserList();
    }

    @PutMapping("/update")
    public List<User> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return userService.getUserList();
    }

    @DeleteMapping("delete/{userId}")
    public List<User> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return userService.getUserList();
    }
}
