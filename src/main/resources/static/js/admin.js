$(document).ready(loadUserList);

function loadUserList() {
    $.ajax({
        url: '/api/list',
        method: "GET",
        success: function (result) {
            fillUserTable(result);
        }
    });
}

function loadUser(username, callback) {
    $.ajax({
        url: '/api/user/' + username,
        method: "GET",
        success: callback
    })
}

function fillModalFields(user) {
    var modalDiv = $("#modalEditDialog");
    modalDiv.find('#modalUserId').val(user.userId);
    modalDiv.find('#hiddenUsername').val(user.username);
    modalDiv.find('#modalUsername').val(user.username);
    modalDiv.find('#modalFirstName').val(user.firstName);
    modalDiv.find('#modalLastName').val(user.lastName);
    modalDiv.find('#modalEmail').val(user.email);
    modalDiv.find('#modalRole').val(user.role);
}

function onEditClick() {
    var username = this.getAttribute('data-id');
    var modalDiv = $("#modalEditDialog");
    modalDiv.on('show.bs.modal', function () {
        loadUser(username, fillModalFields);
    });

    modalDiv.modal();
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
        table.append("<tr><td>"
            + value.userId
            + "</td><td>"
            + value.username
            + "</td><td>"
            + value.firstName
            + "</td><td>"
            + value.lastName
            + "</td><td>"
            + value.email
            + "</td><td>"
            + value.role
            + "</td><td class='px-0' style='width: 64px'>"
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
