export function fillPrincipalTable(user) {
    let table = $('#principalTable');
    parseAuthToRoles(user);
    table.find('#loggedUserId').text(user.userId);
    table.find('#loggedUsername').text(user.username);
    table.find('#loggedUserFirstName').text(user.firstName);
    table.find('#loggedUserLastName').text(user.lastName);
    table.find('#loggedUserEmail').text(user.email);
    table.find('#loggedUserRole').text(user.roles);
}

export function parseAuthToRoles(user) {
    let roles = [];
    for (let i = 0, len = user.authorities.length; i < len; i++) {
        roles[i] = roleFromAuthority(user.authorities[i]);
    }
    user.roles = roles.join(', ');

    // console.log("=========== parseAuthToRoles : after : ")
    // console.log(user);
}

export function roleFromAuthority(authority) {
    return authority.authority.replace(/^ROLE_/, '');
}
