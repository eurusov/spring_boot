package eurusov.spring_boot.service;

import eurusov.spring_boot.model.User;
import eurusov.spring_boot.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("userService")
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Transactional
    @Override
    public boolean addUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return false;
        }
        userRepository.save(user);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    @Transactional(readOnly = true)
    public User getOneWithAuthorities(Long userId) {
        return userRepository.existsById(userId)
                ? userRepository.getOneWithAuthorities(userId)
                : null;
    }


    @Override
    @Transactional(readOnly = true)
    public User getUserWithAuthorities(String username) {
        return userRepository.existsByUsername(username)
                ? userRepository.getUserWithAuthorities(username)
                : null;
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getUserList() {
        return userRepository.getUserList();
    }

    @Override
    @Transactional
    public boolean updateUser(User user) {
        Long userId = user.getId();
        if (!userRepository.existsById(userId)) {
            return false;
        }
        User persistent = userRepository.getOne(userId);
        persistent.setEmail(user.getEmail());
        persistent.setFirstName(user.getFirstName());
        persistent.setLastName(user.getLastName());
        persistent.setAuthorities(user.getAuthorities());
        return true;
    }

    @Override
    @Transactional
    public boolean deleteUser(Long userId) {
        userRepository.deleteById(userId);
        return true;
    }
}
