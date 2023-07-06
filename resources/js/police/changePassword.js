let username = sessionStorage.getItem('user_police_id');
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    let newpassword = document.getElementById('newpassword').value;
    let confirmnewpassword = document.getElementById('confirmnewpassword').value;

    e.preventDefault(); //CSS not linked
    if (newpassword == '') {
        console.log('Please enter a newpassword');
       // setErrorFor(newpassword, "Please enter a new password");
    } else if (confirmnewpassword == '') {
        console.log('Please confirm your newpassword');
      //  setErrorFor(confirmnewpassword, "Please confirm your new password");
    } else if (newpassword != confirmnewpassword) {
        alert("Passwords do not match!");
    }
    else {
        changeFirstTimePassword(newpassword);
    }
});

function changeFirstTimePassword(newpassword) {
    console.log('changeFirstTimePassword');
    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            passwordChangeStatus = false;

            if(changeFirstTimePasswordData(this)) {
                console.log('Password changed successfully');
                passwordChangeStatus = true;
            }
            else {
                console.log('Password change failed');
                passwordChangeStatus  = false;
            }
            getMessage(passwordChangeStatus);
        }
    }

    httpReq.open('POST', 'http://localhost:8080/ntsf_backend_war/policeman_login', true);
    httpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpReq.send('action=changeFirstTimePassword' + '&username=' + username + '&newpassword=' + newpassword);

    function changeFirstTimePasswordData(httpReq) {
        console.log('changeFirstTimePasswordData');
        let jsonChangeFirstTimePasswordResponse = JSON.parse(httpReq.responseText);
        console.log(jsonChangeFirstTimePasswordResponse);
        let jsonChangeFirstTimePasswordResponseAlert = jsonChangeFirstTimePasswordResponse.alert;
        console.log(jsonChangeFirstTimePasswordResponseAlert);

        if(jsonChangeFirstTimePasswordResponseAlert === true) {
            return true;
        }
        else {
            return false;
        }
    }
}

// function setErrorFor(input, message) {
// 	const formControl = input.parentElement;
// 	const small = formControl.querySelector('small');
// 	formControl.className = 'form-control error';
// 	small.innerText = message;
// }

// function setSuccessFor(input) {
// 	const formControl = input.parentElement;
// 	formControl.className = 'form-control success';
// }

function getMessage(passwordChangeStatus) {
    let message = document.createElement("div");
    message.className = "message";

    if (passwordChangeStatus == false) {
        message.classList.add("danger");
        message.textContent = "Password Change Failed!!";

        document.body.appendChild(message);

        deleteMessage(message);
    }
    else {
        message.classList.add("success");
        message.textContent = "Password changed Successfully";

        document.body.appendChild(message);

        deleteMessage(message);
    }

}


