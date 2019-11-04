package eurusov.spring_boot.repository;

import eurusov.spring_boot.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Integer> {

    Authority findByAuthority(String authority);

    boolean existsByAuthority(String authority);
}
