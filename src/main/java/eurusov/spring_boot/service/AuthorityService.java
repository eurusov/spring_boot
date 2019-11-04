package eurusov.spring_boot.service;

import eurusov.spring_boot.model.Authority;

import java.util.List;

public interface AuthorityService {

    Authority createNew(String authority, Integer sortOrder);

    List<Authority> getAll();

}
