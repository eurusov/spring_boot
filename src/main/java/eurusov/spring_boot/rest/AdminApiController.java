package eurusov.spring_boot.rest;

import eurusov.spring_boot.model.User;
import eurusov.spring_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminApiController {

    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/list")
    public List<User> getUserList() {
        return userService.getUserList();
    }

    @GetMapping("/user")
    public User getPrincipal(Principal principal) {
        return userService.getUserByUsername(principal.getName());
    }

    @GetMapping("user/{username}")
    public User getUser(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @PostMapping("/add")
    public User addNewUser(@RequestBody User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        if (userService.addUser(user)) {
            return userService.getUserByUsername(user.getUsername());
        }
        return null;  // User with the same name already exist.
    }

    @PutMapping("/update")
    public User updateUser(@RequestBody User user) {
        if (userService.updateUser(user)) {
            return userService.getUserByUsername(user.getUsername());
        }
        return null;  // Can not update non-existing user.
    }

    @DeleteMapping("delete/{username}")
    public boolean deleteUser(@PathVariable String username) {
        return userService.deleteUser(username);
    }

}
