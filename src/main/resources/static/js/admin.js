$(document).ready(loadUserList);

function loadUserList() {
    $.ajax({
        url: '/api/list',
        method: "GET",
        success: fillUserTable
    });
}

function loadUser(username, callback) {
    $.ajax({
        url: '/api/user/' + username,
        method: "GET",
        success: callback
    });
}

function showModal(user) {
    var modalDiv = $("#modalEditDialog");
    modalDiv.on('show.bs.modal', function () {
        modalDiv.find('#modalUserId').val(user.userId);
        modalDiv.find('#hiddenUsername').val(user.username);
        modalDiv.find('#modalUsername').val(user.username);
        modalDiv.find('#modalFirstName').val(user.firstName);
        modalDiv.find('#modalLastName').val(user.lastName);
        modalDiv.find('#modalEmail').val(user.email);
        modalDiv.find('#modalRole').val(user.role);
    });
    modalDiv.modal('show');
}

function onEditClick() {
    var username = this.getAttribute('data-id');
    loadUser(username, showModal);
}

function onDeleteClick() {
    var username = this.getAttribute('data-id');
    var row = $(this).parent().parent();
    $.ajax({
        url: '/api/delete/' + username,
        method: "DELETE",
        success: function () {
            row.remove();
        }
    });
}

function fillUserTable(users) {
    var table = $('#userTable');
    table.hide();
    table.find("tbody tr").remove();
    $.each(users, function (index, value) {
        table.append("<tr id='_tr_" + value.username + "'>"
            + "<td id='_td_userId_" + value.username + "'>"
            + value.userId
            + "</td><td id='_td_username_" + value.username + "'>"
            + value.username
            + "</td><td id='_td_firstName_" + value.username + "'>"
            + value.firstName
            + "</td><td id='_td_lastName_" + value.username + "'>"
            + value.lastName
            + "</td><td id='_td_email_" + value.username + "'>"
            + value.email
            + "</td><td id='_td_role_" + value.username + "'>"
            + value.role
            + "</td>"
            + "<td class='px-0' style='width: 64px'>"
            + "<button type='button' class='btn btn-link btn-block py-0 usrEditBtn' data-id='" + value.username
            + "'><i class='fa fa-edit'></i></button>"
            + "</td><td class='pl-0' style='width: 64px'>"
            + "<button type='button' class='btn btn-link btn-block py-0 usrDeleteBtn' data-id='" + value.username
            + "'><i class='fa fa-trash'></i></button>"
            + "</td></tr>"
        );
    });
    $('.usrEditBtn').click(onEditClick);
    $('.usrDeleteBtn').click(onDeleteClick);
    table.show();
}

function updateUser(user, callback) {
    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: "/api/update",
        data: JSON.stringify(user),
        dataType: 'json',
        success: callback
        // dataType: JSON
    });
}

function onModalSubmitBtn() {
    var modalDiv = $("#modalEditDialog");
    var user = {
        userId: modalDiv.find('#modalUserId').val(),
        username: modalDiv.find('#modalUsername').val(),
        firstName: modalDiv.find('#modalFirstName').val(),
        lastName: modalDiv.find('#modalLastName').val(),
        email: modalDiv.find('#modalEmail').val(),
        role: modalDiv.find('#modalRole').val()
    };
    modalDiv.modal('hide');
    updateUser(user, onUpdateUserSuccess);
}

function onUpdateUserSuccess(user) {
    var table = $('#userTable');
    table.find('#_td_userId_' + user.username).text(user.userId);
    // table.find('#_td_username_' + user.username).text(user.username);
    table.find('#_td_firstName_' + user.username).text(user.firstName);
    table.find('#_td_lastName_' + user.username).text(user.lastName);
    table.find('#_td_email_' + user.username).text(user.email);
    table.find('#_td_role_' + user.username).text(user.role);
}

