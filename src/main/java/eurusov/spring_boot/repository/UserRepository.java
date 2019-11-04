package eurusov.spring_boot.repository;

import eurusov.spring_boot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select distinct u from User u left join fetch u.authorities a order by u.id")
    List<User> getUserList();

    @Query("select u from User u left join fetch u.authorities a where u.username = :username")
    User getUserWithAuthorities(@Param("username") String username);

    @Query("select u from User u left join fetch u.authorities a where u.id = :userId")
    User getOneWithAuthorities(@Param("userId") Long userId);

    boolean existsByUsername(String username);

}
