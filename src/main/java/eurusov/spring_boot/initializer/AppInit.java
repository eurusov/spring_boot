package eurusov.spring_boot.initializer;

import eurusov.spring_boot.model.Authority;
import eurusov.spring_boot.model.Role;
import eurusov.spring_boot.model.User;
import eurusov.spring_boot.repository.AuthorityRepository;
import eurusov.spring_boot.service.AuthorityService;
import eurusov.spring_boot.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class AppInit {

    private UserService userSrv;
    private AuthorityService authSrv;
    private AuthorityRepository authorityRepository;

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent ignored) {
        Authority authAdmin, authManager, authUser;
        authAdmin = authorityRepository.existsByAuthority(Role.ADMIN.authorityString())
                ? authorityRepository.findByAuthority(Role.ADMIN.authorityString())
                : authSrv.createNew(Role.ADMIN.authorityString(), 1);
        authManager = authorityRepository.existsByAuthority(Role.MANAGER.authorityString())
                ? authorityRepository.findByAuthority(Role.MANAGER.authorityString())
                : authSrv.createNew(Role.MANAGER.authorityString(), 2);
        authUser = authorityRepository.existsByAuthority(Role.USER.authorityString())
                ? authorityRepository.findByAuthority(Role.USER.authorityString())
                : authSrv.createNew(Role.USER.authorityString(), 3);

        if (!userSrv.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(new BCryptPasswordEncoder().encode("1"));
            admin.getAuthorities().add(authAdmin);
            userSrv.addUser(admin);
        }
        if (!userSrv.existsByUsername("manager")) {
            User manager = new User();
            manager.setUsername("manager");
            manager.setPassword(new BCryptPasswordEncoder().encode("2"));
            manager.getAuthorities().add(authManager);
            userSrv.addUser(manager);
        }
        if (!userSrv.existsByUsername("user")) {
            User user = new User();
            user.setUsername("user");
            user.setPassword(new BCryptPasswordEncoder().encode("2"));
            user.getAuthorities().add(authUser);
            userSrv.addUser(user);
        }
        if (!userSrv.existsByUsername("test")) {
            User test = new User();
            test.setUsername("test");
            test.setPassword(new BCryptPasswordEncoder().encode("2"));
            test.getAuthorities().add(authUser);
            userSrv.addUser(test);
        }
    }
}
