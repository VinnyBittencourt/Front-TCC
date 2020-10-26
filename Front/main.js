$(document).ready(function () {
    var switchdrop = false;

    // Button to open submenu on dashboard manu
    $("#drop-sub").click(function () {
        if (switchdrop == false) {
            $(".sub").css("display", "block");
            switchdrop = true;
        } else {
            $(".sub").css("display", "none");
            switchdrop = false;
        }
    });

    //Button to Authenticate user
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

                // if (!response.ok) {
                //     console.log("Deu ruim");
                //     throw new Error("Network response was not ok");
                // }
                localStorage.setItem("userToken", response.token);
                var url = "http://127.0.0.1:5500/dashboard.html";
                window.location = url;
            }
        );
    });

    //Button to exit dashboard and clean localStorage
    $("#btnsair").click(function (e) {
        e.preventDefault();
        localStorage.clear();
        var url = "http://127.0.0.1:5500/index.html";
        window.location = url;
    });

    //Button to register a user
    $("#btn-register").click(function (e) {
        e.preventDefault();
        console.log("Registro");
        var nameRegister = $("#registerName").val();
        var emailRegister = $("#registerEmail").val();
        var passwordRegister = $("#registerPassword").val();

        const dataRegister = {
            email: emailRegister,
            password: passwordRegister,
            name: nameRegister,
        };

        postData("http://localhost:3333/auth/register", dataRegister).then(
            (response) => {
                console.log(response);

                localStorage.setItem("userToken", response.token);
                var url = "http://127.0.0.1:5500/dashboard.html";
                window.location = url;
            }
        );
    });
});

//Function to postData
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
