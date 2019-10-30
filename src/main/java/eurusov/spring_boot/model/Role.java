package eurusov.spring_boot.model;

public enum Role {
    ADMIN("ROLE_ADMIN"),
    USER("ROLE_USER");

    private String authorityString;

    Role(String role) {
        authorityString = role;
    }

    public String getAuthorityString() {
        return authorityString;
    }

    public Authority getAuthority() {
        return new Authority(authorityString);
    }
}
