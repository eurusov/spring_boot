package eurusov.spring_boot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Iterator;
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

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private Role role;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Authority> authorities = new HashSet<>();

    /* Used in view representation of user */
    public Role getRole() {
        if (role == null) {
            role = authorities.stream()
                    .anyMatch(authority -> authority.getAuthority()
                            .equals(Role.ADMIN.getAuthorityString())) ? Role.ADMIN : Role.USER;
        }
        return role;
    }

    /*
     * Used when a user object is retrieved from view. Setting up authorities.
     * This method is called automatically before the AdminApiController gets the User object from the view.
     * */
    public void setRole(Role role) {
        this.role = role;
        authorities = new HashSet<>();
        authorities.add(new Authority(this, role));
    }

    /* (?) */
    public void setAuthorities(Set<Authority> authorities) {
//        authorities.forEach(authority -> authority.setUser(this));
        Iterator<Authority> iterOld = this.authorities.iterator();
        Iterator<Authority> iterNew = authorities.iterator();

        while (iterOld.hasNext() && iterNew.hasNext()) {
            iterOld.next().setAuthority(iterNew.next().getAuthority());
        }
        while (iterOld.hasNext()) {
            iterOld.remove();
        }

        role = authorities.stream()
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
