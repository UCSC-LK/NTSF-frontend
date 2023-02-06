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
      let checkloginAuthorizingBackendResponseRank = jsonCheckloginAuthorizingBackendResponse.loginResponse[0].rank;
      console.log(checkloginAuthorizingBackendResponseRank);
      if (checkloginAuthorizingBackendResponseRank === 'igp') {
        console.log('Redirecting to IGP page');
        window.location.href = "../../../police/igp/viewPoliceman.html";
      } else if (checkloginAuthorizingBackendResponseRank === 'OIC') {
        console.log('Redirecting to OIC page');
        window.location.href = "../../../police/oic/viewPoliceman.html";
      } else if (checkloginAuthorizingBackendResponseRank === 'Policeman') {
        console.log('Redirecting to Policeman page');
        window.location.href = "../../../police/policeman/viewPoliceman.html";
      }
      return true;
    } else {
      return false;
    }
  }
}

function getMessage(policemanAdditionStatus) {
  let message = document.createElement("div");
  message.className = "message";

  if (policemanAdditionStatus == true) {
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
