form.addEventListener('submit', e => {
	e.preventDefault();
  loginAuthorizing();
});

function loginAuthorizing() {
  console.log('loginAuthorizing');
  let username = document.getElementById('username').value;
  console.log(username);
  let password = document.getElementById('password').value;
  console.log(password);

  if(username !=='' && password !==''){
    loginAuthorizingBackend(username, password);
  }
}

function loginAuthorizingBackend(username, password) {
  console.log('loginAuthorizingBackend');

  let httpReq = new XMLHttpRequest();

  httpReq.onreadystatechange = function()
  {
    console.log('loginAuthorizingBackend readyState');
    if (this.readyState == 4 && this.status == 200) 
    {
      console.log('loginAuthorizingBackend response');
      if (checkloginAuthorizingBackend(this)) {
        console.log('loginAuthorizingBackend response true');
        sessionStorage.setItem('username', username);
        return true;
      } else {
        return false;
      }
    }
  }

  httpReq.open('POST', 'http://localhost:8080/ntsf_backend_war/policeman', true);
  httpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  httpReq.send('action=login' + '&username=' + username + '&password=' + password);
    
  function checkloginAuthorizingBackend(httpReq) {
    console.log('checkloginAuthorizingBackend');
    let jsonCheckloginAuthorizingBackendResponse = JSON.parse(httpReq.responseText);
    console.log(jsonCheckloginAuthorizingBackendResponse);
    let checkloginAuthorizingBackendResponseAuthorization = jsonCheckloginAuthorizingBackendResponse.loginResponse[0].authorization;
    console.log(checkloginAuthorizingBackendResponseAuthorization);
    if (checkloginAuthorizingBackendResponseAuthorization == true) {
      getMessage(true);
      let checkloginAuthorizingBackendResponseRank = jsonCheckloginAuthorizingBackendResponse.loginResponse[0].rank;
      console.log(checkloginAuthorizingBackendResponseRank);
      if (checkloginAuthorizingBackendResponseRank === 'igp') {
        console.log('Redirecting to IGP page');
        getMessage(true);
        window.location.href = "../../../police/igp/viewPoliceman.html";
      } else if (checkloginAuthorizingBackendResponseRank === 'OIC') {
        console.log('Redirecting to OIC page');
        getMessage(true);
        window.location.href = "../../../police/oic/viewPoliceman.html";
      } else if (checkloginAuthorizingBackendResponseRank === 'Policeman') {
        console.log('Redirecting to Policeman page');
        getMessage(true);
        window.location.href = "../../../police/policeman/viewPoliceman.html";
      }
      return true;
    } else {
      getMessage(false);
      return false;
    }
  }
}

function getMessage(loginStatus) {
  let message = document.createElement("div");
  message.className = "message";

  if (loginStatus == false) {
      message.classList.add("danger");
      message.textContent = "Login Unsuccessful. Please try again or contact your administrator for assistance.";

      document.body.appendChild(message);

      deleteMessage(message);
  }
  else {
      message.classList.add("success");
      message.textContent = "Login Successful";

      document.body.appendChild(message);

      deleteMessage(message);
  }

}

function deleteMessage(el) {
    setTimeout(() => {
        document.body.removeChild(el);
    }, 6000);
}

//Checking if username is correct
document.getElementById('username').addEventListener('blur', function(){
  console.log('came until js function for event listener of Username blur');
  let usernameValue = username.value.trim();
  if(usernameValue !== ''){
      checkLoginUsername(usernameValue);
  }
});


const checkLoginUsername = function(username) //Returns true if duplicate data exists
{
    console.log("checkLoginUsername");
    console.log(username);

    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkLoginUsernameData(this))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.send("action=checkLoginUsername" + "&username=" + username);

    function checkLoginUsernameData(httpReq)
    {
        console.log("checkLoginUsernameData");
        let jsonCheckLoginUsernameResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckLoginUsernameResponse);
        let jsonCheckLoginUsernameResponseAlert = jsonCheckLoginUsernameResponse.alert;
        console.log(jsonCheckLoginUsernameResponseAlert);

        if(jsonCheckLoginUsernameResponseAlert == false)
        {
            console.log("Username is invalid");
            setErrorFor(document.getElementById('username'), 'Username is invalid');
            return true; //returns true if duplicate entry exists
        }
        else
        {
            
            return false;
        }
    }
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}
