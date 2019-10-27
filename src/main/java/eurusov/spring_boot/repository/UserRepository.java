package eurusov.spring_boot.repository;

import eurusov.spring_boot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    @Query("select u from User u join fetch u.authorities a order by u.userId")
    List<User> getUserList();

    @Query("select u from User u join fetch u.authorities a where u.username = :username")
    User getOneWithAuthorities(@Param("username") String username);

}
