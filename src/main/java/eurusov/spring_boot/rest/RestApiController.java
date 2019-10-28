package eurusov.spring_boot.rest;

import eurusov.spring_boot.model.User;
import eurusov.spring_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RestApiController {
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

    @DeleteMapping("delete/{username}")
    public boolean deleteUser(@PathVariable String username) {
        return userService.deleteUser(username);
    }

}
