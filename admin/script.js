
document.querySelector("#signup").addEventListener("click", function () {

    let userName = document.querySelector("#username").value;
    let userEmail = document.querySelector("#useremail").value;
    let userPass = document.querySelector("#userpass").value;


    if (userName && userEmail && userPass) {

        let userDetails = { name: userName, email: userEmail, password: userPass };

        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        window.location.href = "login.html";

    } else {
        alert("please enter all the details");
    }

})