package eurusov.spring_boot.service;

import eurusov.spring_boot.model.Authority;
import eurusov.spring_boot.model.User;
import eurusov.spring_boot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    @Override
    public boolean addUser(User user) {
        if (userRepository.existsById(user.getUsername())) {
            return false;
        }
        userRepository.save(user);
        return true;
    }

    @Transactional(readOnly = true)
    @Override
    public User getUserByUsername(String username) {
        if (!userRepository.existsById(username)) {
            return null;
        }
        return userRepository.getOneWithAuthorities(username);
    }

    @Transactional(readOnly = true)
    @Override
    public List<User> getUserList() {
        return userRepository.getUserList();
    }

    @Transactional
    @Override
    public boolean updateUser(User user) {
        String username = user.getUsername();
        if (!userRepository.existsById(username)) {
            return false;
        }
        User persistent = userRepository.getOne(username);
        persistent.setEmail(user.getEmail());
        persistent.setFirstName(user.getFirstName());
        persistent.setLastName(user.getLastName());
        persistent.setAuthorities(user.getAuthorities());
        return true;
    }

    @Transactional
    @Override
    public boolean deleteUser(String username) {
        if (!userRepository.existsById(username)) {
            return false;
        }
        userRepository.deleteById(username);
        return true;
    }
}
