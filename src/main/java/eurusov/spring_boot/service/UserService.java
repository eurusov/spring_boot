package eurusov.spring_boot.service;

import eurusov.spring_boot.model.User;

import java.util.List;

public interface UserService {

    boolean addUser(User user);

    boolean existsByUsername(String username);

    User getOneWithAuthorities(Long userId);

    User getUserWithAuthorities(String username);

    List<User> getUserList();

    boolean updateUser(User user);

    boolean deleteUser(Long userId);

}
