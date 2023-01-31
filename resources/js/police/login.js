form.addEventListener('submit', e => {
	e.preventDefault();
    loginAuthenticating();
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
    if (this.readyState == 4 && this.status == 200) 
    {
      if (checkloginAuthorizingBackend(this)) {
        return true;
      } else {
        return false;
      }
    }
  }

  httpReq.open('POST', 'http://localhost:8080/ntsf_backend_war/policemanLogin', true);
  httpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  httpReq.send('username=' + username + '&password=' + password);
    
  function checkloginAuthorizingBackend(httpReq) {
    console.log('checkloginAuthorizingBackend');
    let jsonCheckloginAuthorizingBackendResponse = JSON.parse(httpReq.responseText);
    console.log(jsonCheckloginAuthorizingBackendResponse);
    let checkloginAuthorizingBackendResponseAuthorization = jsonCheckloginAuthorizingBackendResponse.authorization;
    if (checkloginAuthorizingBackendResponseAuthorization === 'true') {
      let checkloginAuthorizingBackendResponseRank = jsonCheckloginAuthorizingBackendResponse.rank;
      if (checkloginAuthorizingBackendResponseRank === 'igp') {
        window.location.href = 'http://localhost:8080/ntsf_frontend_war/igp.html';
      } else if (checkloginAuthorizingBackendResponseRank === 'oic') {
        window.location.href = 'http://localhost:8080/ntsf_frontend_war/oic.html';
      } else if (checkloginAuthorizingBackendResponseRank === 'policeman') {
        window.location.href = 'http://localhost:8080/ntsf_frontend_war/policeman.html';
      }
      return true;
    } else {
      return false;
    }
  }
}