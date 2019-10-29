$.getScript('/js/func.js', function () {
});

$(document).ready(function () {
        loadUserList();
        $.ajax({
            url: '/api/user',
            success: fillPrincipalTable // function from func.js
        });
    }
);

function loadUserList() {
    $.ajax({
        url: '/api/list',
        success: fillUserTable
    });
}

function loadUser(username, callback) {
    $.ajax({
        url: '/api/user/' + username,
        success: callback
    });
}

function saveNewUser(user, callback) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/add",
        data: JSON.stringify(user),
        dataType: 'json',
        success: callback
    });
}

function updateUser(user, callback) {
    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: "/api/update",
        data: JSON.stringify(user),
        dataType: 'json',
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

function onSaveNewClick() {
    var form = $("#newUserForm");
    var user = {
        username: form.find('#username').val(),
        password: form.find('#password').val(),
        firstName: form.find('#firstName').val(),
        lastName: form.find('#lastName').val(),
        email: form.find('#email').val(),
        role: form.find('#role').val()
    };
    form.find('.formFields').val("");
    saveNewUser(user, function (newUser) {
        tableAppendRow(newUser);
        $('.usrEditBtn').click(onEditClick);
        $('.usrDeleteBtn').click(onDeleteClick);
    });
    $('#userListTab').tab('show');
}

function tableAppendRow(user) {
    var table = $('#userTable');
    table.append("<tr id='_tr_" + user.username + "'>"
        + "<td id='_td_userId_" + user.username + "'>"
        + user.userId
        + "</td><td id='_td_username_" + user.username + "'>"
        + user.username
        + "</td><td id='_td_firstName_" + user.username + "'>"
        + user.firstName
        + "</td><td id='_td_lastName_" + user.username + "'>"
        + user.lastName
        + "</td><td id='_td_email_" + user.username + "'>"
        + user.email
        + "</td><td id='_td_role_" + user.username + "'>"
        + user.role
        + "</td>"
        + "<td class='px-0' style='width: 64px'>"
        + "<button type='button' class='btn btn-link btn-block py-0 usrEditBtn' data-id='" + user.username
        + "'><i class='fa fa-edit'></i></button>"
        + "</td><td class='pl-0' style='width: 64px'>"
        + "<button type='button' class='btn btn-link btn-block py-0 usrDeleteBtn' data-id='" + user.username
        + "'><i class='fa fa-trash'></i></button>"
        + "</td></tr>"
    );
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
    $.each(users, function (index, user) {
        tableAppendRow(user);
    });
    $('.usrEditBtn').click(onEditClick);
    $('.usrDeleteBtn').click(onDeleteClick);
    table.show();
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

