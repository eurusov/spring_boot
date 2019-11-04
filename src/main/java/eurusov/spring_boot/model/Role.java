package eurusov.spring_boot.model;

public enum Role {
    ADMIN("ROLE_ADMIN"),
    MANAGER("ROLE_MANAGER"),
    USER("ROLE_USER");

    private String authorityString;

    Role(String role) {
        authorityString = role;
    }

    public String authorityString() {
        return authorityString;
    }
}
