import {fillPrincipalTable} from "/js/func.js";
import {parseAuthToRoles} from "/js/func.js";
import {roleFromAuthority} from "/js/func.js";

// (function() {
//     'use strict';
//     window.addEventListener('load', function() {
//         // Fetch all the forms we want to apply custom Bootstrap validation styles to
//         let forms = document.getElementsByClassName('needs-validation');
//         // Loop over them and prevent submission
//         let validation = Array.prototype.filter.call(forms, function(form) {
//             form.addEventListener('submit', function(event) {
//                 if (form.checkValidity() === false) {
//                     event.preventDefault();
//                     event.stopPropagation();
//                 }
//                 form.classList.add('was-validated');
//             }, false);
//         });
//     }, false);
// })();

let _authorities_global;

$(document).ready(function () {
        // register the function that intercepts a 'new user' form submit event
        $("#newUserForm").on("submit", function (event) {
            event.preventDefault();
            if (this.checkValidity() === true) {
                onSaveNewClick();
            }
            this.classList.add("was-validated");
        });

        // register the function that intercepts a 'edit user' form submit event
        $("#editUserForm").on("submit", function (event) {
            event.preventDefault();
            if (this.checkValidity() === true) {
                onModalSubmitClick();
            }
            this.classList.add("was-validated");
        });

        ajaxGetAllUsersAndRedrawTable();
        ajaxGetAllAuthorities(completeCheckboxes);

        $.ajax({
            url: '/api/user',
            success: fillPrincipalTable // function from func.js
        });
    }
);

function ajaxGetAllAuthorities(onSuccess) {
    $.ajax({
        url: '/api/authorities',
        success: onSuccess
    });
}

function ajaxGetAllUsersAndRedrawTable() {
    $.ajax({
        url: '/api/list',
        success: redrawTable
    });
}

function ajaxGetUserById(userId, onSuccess) {
    $.ajax({
        url: '/api/user/' + userId,
        success: onSuccess
    });
}

function ajaxSaveNewUser(user, onSuccess) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/add",
        data: JSON.stringify(user),
        dataType: 'json',
        success: onSuccess
    });
}

function ajaxUpdateUser(user, onSuccess) {
    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: "/api/update",
        data: JSON.stringify(user),
        dataType: 'json',
        success: onSuccess
    });
}

function ajaxDeleteUser(userId, onSuccess) {
    $.ajax({
        url: '/api/delete/' + userId,
        method: "DELETE",
        success: onSuccess
    });
}

function onEditClick() {
    let userId = this.getAttribute('data-userId');
    ajaxGetUserById(userId, showModal);
}

function onDeleteClick() {
    let userId = this.getAttribute('data-userId');
    ajaxDeleteUser(userId, redrawTable);
}

function onModalSubmitClick() {
    let form = $("#editUserForm");
    let user = getUserFromForm(form);
    $("#modalEditDialog").modal("hide");
    ajaxUpdateUser(user, function (users) {
        redrawTable(users);
        form[0].reset();
        form.removeClass("was-validated");
    });
}

function onSaveNewClick() {
    let form = $("#newUserForm");
    let user = getUserFromForm(form);
    ajaxSaveNewUser(user, function (users) {
        redrawTable(users);
        form[0].reset();
        form.removeClass("was-validated");
    });
    $('#userListTab').tab('show');
}

function redrawTable(users) {
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

function completeCheckboxes(authorities) {
    let form = $("#authSelectorModal");
    form.find("div").remove();
    $.each(authorities, function (index, authority) {
        let role = roleFromAuthority(authority);
        let authId = authority.id;
        form.append(
            `<div class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input authCheckboxes" id="modalAuthCheck_${authId}"
           name="modalAuthCheck_${authId}" value="${authority.id}">
    <label class="custom-control-label" for="modalAuthCheck_${authId}">${role}</label>
</div>`)
    });
}

function getUserFromForm(form) {
    let checkboxes = form.find(".authCheckboxes").filter(function (idx, element) {
        return element.checked === true;
    });
    let auths = $.map(checkboxes, function (elem) {
        return {
            id: elem.getAttribute("value")
        }
    });
    let userData = {
        id: form.find("input[name='userId']").val(),
        username: form.find("input[name='username']").val(),
        password: form.find("input[name='password']").val(),
        firstName: form.find("input[name='firstName']").val(),
        lastName: form.find("input[name='lastName']").val(),
        email: form.find("input[name='email']").val(),
        authorities: auths
    };
    return userData;
}

function showModal(user) {
    let modalDiv = $("#modalEditDialog");
    modalDiv.on('show.bs.modal', function () {
        modalDiv.find('#modalUserId').val(user.id);
        modalDiv.find('#hiddenUsername').val(user.username);
        modalDiv.find('#modalUsername').val(user.username);
        modalDiv.find('#modalFirstName').val(user.firstName);
        modalDiv.find('#modalLastName').val(user.lastName);
        modalDiv.find('#modalEmail').val(user.email);
        modalDiv.find('#modalRole').val(user.role);

        modalDiv.find(".authCheckboxes").prop("checked", false);

        $.each(user.authorities, function (index, a) {
            let selector = "#modalAuthCheck_" + a.id;
            $(selector).prop("checked", true);
        });
    });
    modalDiv.modal('show');
}

function tableAppendRow(user) {
    parseAuthToRoles(user);
    let table = $('#userTable');
    table.append(
        `<tr id='_tr_${user.username}'>
    <td id='_td_userId_${user.username}'>${user.id}</td>
    <td id='_td_username_${user.username}'>${user.username}</td>
    <td id='_td_firstName_${user.username}'>${user.firstName}</td>
    <td id='_td_lastName_${user.username}'>${user.lastName}</td>
    <td id='_td_email_${user.username}'>${user.email}</td>
    <td id='_td_role_${user.username}'>${user.roles}</td>
    <td class='px-0' style='width: 64px'>
        <button type='button' class='btn btn-link btn-block py-0 usrEditBtn' data-userId='${user.id}'>
            <i class='fa fa-edit'></i>
        </button>
    </td>
    <td class='pl-0' style='width: 64px'>
        <button type='button' class='btn btn-link btn-block py-0 usrDeleteBtn' data-userId='${user.id}'>
            <i class='fa fa-trash'></i>
        </button>
    </td>
</tr>`
    );
}
