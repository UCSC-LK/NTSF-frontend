form.addEventListener('submit', e => {
	e.preventDefault();
  loginAuthorizing();
});

function loginAuthorizing(){
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
        // sessionStorage.setItem('username', username);
        return true;
      } else {
        return false;
      }
    }
  }

  httpReq.open('POST', 'http://localhost:8080/ntsf_backend_war/policeman_login', true);
  httpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  httpReq.send('action=login' + '&username=' + username + '&password=' + password);

  function checkloginAuthorizingBackend(httpReq) {
    console.log('checkloginAuthorizingBackend');
    let jsonLoginResponse = JSON.parse(httpReq.responseText);
    console.log(jsonLoginResponse);
    let jwt = jsonLoginResponse.jwt;
    console.log(jwt);
    let firstTimeLogin = jsonLoginResponse.firstTimeLogin;
    console.log(firstTimeLogin);

    if(jwt === "LoginUnsuccessful")
    {
      console.log("Login Unsuccessful");
      getMessage(false);
      return false;
    }
    else
    {
      console.log("Login Successful");  
      sessionStorage.setItem('jwt', jwt);
      var parts = jwt.split('.');
      var header = parts[0];
      var payload = parts[1];
      var signature = parts[2];
      console.log(header);
      console.log(payload);
      console.log(signature);
      var headerDecoded = atob(header);
      var payloadDecoded = atob(payload);
      console.log(headerDecoded);
      console.log(payloadDecoded);
      var headerDecodedJSON = JSON.parse(headerDecoded);
      var payloadDecodedJSON = JSON.parse(payloadDecoded);
      console.log(headerDecodedJSON);
      console.log(payloadDecodedJSON);
      var police_id = payloadDecodedJSON.police_id;
      var police_name = payloadDecodedJSON.police_name;
      var rank = payloadDecodedJSON.rank;
      var position = payloadDecodedJSON.position;
      var police_station = payloadDecodedJSON.police_station;
      console.log(police_id);
      console.log(police_name);
      console.log(rank);
      console.log(position);
      console.log(police_station);
      sessionStorage.setItem('user_police_id', police_id);
      sessionStorage.setItem('user_police_name', police_name);

      if(firstTimeLogin === true)
      {
        console.log("First Time Login");
        window.location.href = "../../../police/changePassword.html";
      }
      else{
        if (rank === 'igp') {
          console.log('Redirecting to IGP page');
          getMessage(true);
          sessionStorage.setItem('rank', rank);
          window.location.href = "../../../police/igp/dashboard.html";
        } else if (rank === 'oic') {
          console.log('Redirecting to OIC page');
          getMessage(true);
          sessionStorage.setItem('rank', rank);
          sessionStorage.setItem('user_police_station', police_station)
          window.location.href = "../../../police/oic/dashboard.html";
        } else if (rank === 'policeman') {
          console.log('Redirecting to Policeman page');
          getMessage(true);
          sessionStorage.setItem('rank', rank);
          sessionStorage.setItem('position', position);
          sessionStorage.setItem('user_police_station', police_station)
          window.location.href = "../../../police/policeman/dashboard.html";
        }
      }
      return true;
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

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman_login", true);
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

 