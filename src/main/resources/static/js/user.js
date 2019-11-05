import {fillPrincipalTable} from '/js/func.js';

$(document).ajaxError(function (event, resp, settings, thrownError) {
    console.error("An error occurred while processing AJAX request!")
    console.error(resp.responseText);
});

$(document).ready(function () {
        $.ajax({
            url: '/user-api',
            success: fillPrincipalTable // function from func.js
        });
    }
);
