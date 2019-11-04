package eurusov.spring_boot.model;

import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
public class User implements UserDetails {
    @Id
    @Setter(AccessLevel.NONE)
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @EqualsAndHashCode.Include
    @Column(name = "username", unique = true)
    private String username;

    @NotEmpty
    @Column(name = "password")
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_authorities",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id"))
    private Set<Authority> authorities = new HashSet<>();

    @Transient
    @Setter(AccessLevel.NONE)
    private boolean enabled = true;
    @Transient
    @Setter(AccessLevel.NONE)
    private boolean accountNonExpired = true;
    @Transient
    @Setter(AccessLevel.NONE)
    private boolean accountNonLocked = true;
    @Transient
    @Setter(AccessLevel.NONE)
    private boolean credentialsNonExpired = true;
}
