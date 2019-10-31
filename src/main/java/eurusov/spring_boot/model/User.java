package eurusov.spring_boot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
public class User implements UserDetails {
    // ~ Instance fields
    // ================================================================================================
    @Column(name = "user_id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long userId;

    @Id
    @Column(name = "username", unique = true, nullable = false)
    @EqualsAndHashCode.Include
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "enabled", nullable = false)
    private boolean enabled = true;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Authority> authorities = new HashSet<>();

    /* Used in views */
    public Role getRole() {
        return authorities.stream()
                .anyMatch(authority -> authority.getAuthority()
                        .equals(Role.ADMIN.getAuthorityString())) ? Role.ADMIN : Role.USER;
    }

    // ~ Implements UserDetails
    // ================================================================================================

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
