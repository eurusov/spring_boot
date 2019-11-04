package eurusov.spring_boot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Set;

@Entity
@Table(name = "authorities")
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@NoArgsConstructor
public class Authority implements GrantedAuthority {
    @Id
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    @Column(name = "authority_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotEmpty
//    @EqualsAndHashCode.Include
    @Column(name = "authority", unique = true, nullable = false)
    private String authority;

    @Column(name = "sort_order", unique = true, nullable = false)
    private Integer sortOrder;

    @JsonIgnore
    @ToString.Exclude
    @ManyToMany(mappedBy = "authorities", fetch = FetchType.LAZY)
    private Set<User> users;

    public Authority(String authority, Integer sortOrder) {
        this.authority = authority;
        this.sortOrder = sortOrder;
    }
}
