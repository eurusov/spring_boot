package eurusov.spring_boot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Table(name = "authorities")
@ToString
@Getter
@Setter
@NoArgsConstructor
public class Authority implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "authority_id")
    @Setter(AccessLevel.NONE)
    private Long authorityId;

    @Column(name = "authority")
    private String authority;

    @ManyToOne
    @JoinColumn(name = "username")
    @ToString.Exclude
    @JsonIgnore
    private User user;

    // Constructor (?)
//    public Authority(User user) {
//        this.user = user;
//        authority = user.getRole().getAuthorityString();
//    }

    // Constructor
    public Authority(User user, Role role) {
        this.user = user;
        this.authority = role.getAuthorityString();
    }
}
