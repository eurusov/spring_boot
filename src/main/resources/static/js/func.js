export function fillPrincipalTable(user) {
    let table = $('#principalTable');
    table.find('#loggedUserId').text(user.userId);
    table.find('#loggedUsername').text(user.username);
    table.find('#loggedUserFirstName').text(user.firstName);
    table.find('#loggedUserLastName').text(user.lastName);
    table.find('#loggedUserEmail').text(user.email);
    table.find('#loggedUserRole').text(user.role);
}
