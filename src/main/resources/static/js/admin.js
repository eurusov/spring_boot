import {fillPrincipalTable} from "/js/func.js";

// $.getScript('/js/func.js', function () {
// });

// (function() {
//     'use strict';
//     window.addEventListener('load', function() {
//         // Fetch all the forms we want to apply custom Bootstrap validation styles to
//         let forms = document.getElementsByClassName('needs-validation');
//         // Loop over them and prevent submission
//         let validation = Array.prototype.filter.call(forms, function(form) {
//             form.addEventListener('submit', function(event) {
//                 console.log("submit");
//                 if (form.checkValidity() === false) {
//                     event.preventDefault();
//                     event.stopPropagation();
//                 }
//                 form.classList.add('was-validated');
//             }, false);
//         });
//     }, false);
// })();

// window.onSaveNewClick = onSaveNewClick;

$(document).ready(function () {
        $("#newUserForm").on("submit", function (event) {
            event.preventDefault();
            if (this.checkValidity() === true) {
                onSaveNewClick();
            }
            this.classList.add("was-validated");
        });

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
    console.log(user);
    let modalDiv = $("#modalEditDialog");
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
    let username = this.getAttribute('data-id');
    loadUser(username, showModal);
}

function onSaveNewClick() {
    let newUserForm = $("#newUserForm");
    let user = getUserFromForm(newUserForm);
    // console.log(user);
    saveNewUser(user, function (newUser) {
        tableAppendRow(newUser);
        $('.usrEditBtn').click(onEditClick);
        $('.usrDeleteBtn').click(onDeleteClick);
        newUserForm[0].reset();
        newUserForm.removeClass("was-validated");
    });
    $('#userListTab').tab('show');
}

function tableAppendRow(user) {
    let table = $('#userTable');
    table.append(
        `<tr id='_tr_${user.username}'>
    <td id='_td_userId_${user.username}'>${user.userId}</td>
    <td id='_td_username_${user.username}'>${user.username}</td>
    <td id='_td_firstName_${user.username}'>${user.firstName}</td>
    <td id='_td_lastName_${user.username}'>${user.lastName}</td>
    <td id='_td_email_${user.username}'>${user.email}</td>
    <td id='_td_role_${user.username}'>${user.role}</td>
    <td class='px-0' style='width: 64px'>
        <button type='button' class='btn btn-link btn-block py-0 usrEditBtn' data-id='${user.username}'>
            <i class='fa fa-edit'></i>
        </button>
    </td>
    <td class='pl-0' style='width: 64px'>
        <button type='button' class='btn btn-link btn-block py-0 usrDeleteBtn' data-id='${user.username}'>
            <i class='fa fa-trash'></i>
        </button>
    </td>
</tr>`
    );
}

function onDeleteClick() {
    let username = this.getAttribute('data-id');
    let row = $(this).parent().parent();
    $.ajax({
        url: '/api/delete/' + username,
        method: "DELETE",
        success: function () {
            row.remove();
        }
    });
}

function fillUserTable(users) {
    let table = $('#userTable');
    table.hide();
    table.find("tbody tr").remove();
    $.each(users, function (index, user) {
        tableAppendRow(user);
    });
    $('.usrEditBtn').click(onEditClick);
    $('.usrDeleteBtn').click(onDeleteClick);
    table.show();
}

function getUserFromForm(form) {
    return {
        userId: form.find("input[name='userId']").val(),
        username: form.find("input[name='username']").val(),
        password: form.find("input[name='password']").val(),
        firstName: form.find("input[name='firstName']").val(),
        lastName: form.find("input[name='lastName']").val(),
        email: form.find("input[name='email']").val(),
        role: form.find("select[name='role']").val()
    };
}

function onModalSubmitBtn() {
    let modalDiv = $("#modalEditDialog");
    let user = {
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
    let table = $('#userTable');
    table.find('#_td_userId_' + user.username).text(user.userId);
    // table.find('#_td_username_' + user.username).text(user.username);
    table.find('#_td_firstName_' + user.username).text(user.firstName);
    table.find('#_td_lastName_' + user.username).text(user.lastName);
    table.find('#_td_email_' + user.username).text(user.email);
    table.find('#_td_role_' + user.username).text(user.role);
}
