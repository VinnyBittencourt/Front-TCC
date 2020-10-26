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

    $("#signinbtn").click(function (e) {
        e.preventDefault();

        var email = $("#email").val();
        var password = $("#password").val();

        const dataUser = {
            email,
            password,
        };

        postData("http://localhost:3333/auth/authenticate", dataUser).then(
            (response) => {
                console.log(response);
                localStorage.setItem("userToken", response.token);
            }
        );
    });

    async function postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
});
