let Account = {
    email: "",
    password: ""
}
let email, password = "";
$(document).ready(function () {
    
    $("#kt_login_signin_submit").on("click", function () {
        email = $("input[name=email]").val();
        password = $("input[name=password]").val();
        Account["email"] = email;
        Account["password"] = password
        //console.log(JSON.stringify(Account))
        CheckLogin(email, password)
    })
})

function CheckLogin(email, password) {
    
    $.ajax({
        type: "GET",
        url: "/api/login/CheckLogin?email=" + email + '&password=' + password,
        headers: {
            'Authorization': 'Basic xxxxxxxxxxxxx',
            'X-CSRF-TOKEN': 'xxxxxxxxxxxxxxxxxxxx',
            'Content-Type': 'application/json'
        },
        success: function (response) {
            console.log(response,"Account")
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}