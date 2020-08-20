$(document).ready(function () {
    var switchdrop = false;

    $("#drop-sub").click(function () {
        if (switchdrop == false) {
            $(".sub").css("display", "block");
            switchdrop = true;
        } else {
            $(".sub").css("display", "none");
            switchdrop = false;
        }
    });
});
