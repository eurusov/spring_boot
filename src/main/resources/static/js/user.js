$.getScript('/js/func.js', function () {
});

$(document).ready(function () {
        $.ajax({
            url: '/user-api',
            success: fillPrincipalTable // function from func.js
        });
    }
);
