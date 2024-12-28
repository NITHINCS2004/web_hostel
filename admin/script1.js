
document.querySelector("#login").addEventListener("click", function () {

    let username = document.querySelector('#useremail').value;
    let userPassword = document.querySelector('#userpass').value;

    if (username && userPassword) {

        let localStorageData = localStorage.getItem("userDetails");

        if (localStorageData) {

            localStorageData = JSON.parse(localStorageData);

            if (username === localStorageData.email && userPassword === localStorageData.password) {
                window.location.href = "/project/admin/studentdetails.html";


            } else {
                alert("username/password is incorrect");
            }

        }
        else {
            alert("please signup first, and login");
            window.location.href = "adminlogin.html"
        }



    } else {
        alert("please enter all the details.");
    }


})