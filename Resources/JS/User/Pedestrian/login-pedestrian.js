// const loginId = document.getElementById("loginId");

function submitLogin() {
  const licenseNo = document.getElementById("licenceNo").value;
  const password = document.getElementById("password").value;
  var data = "";

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  xhr.open(
    "GET",
    `http://localhost:8080/ntsf/login?login_id=${licenceNo}&password=${password}&user_type=0`
    // "http://localhost:8080/ntsf/login?login_id=1234&password=password&user_type=0"
  );
  xhr.setRequestHeader("Access-Control-Allow-Origin", " *,");
  //   xhr.setRequestHeader(
  //     "Access-Control-Allow-Methods",
  //     " GET,PUT,POST,DELETE,PATCH,OPTIONS,"
  //   );
  xhr.send(data);

  loginStatus();

  // location.href=""
}

function loginStatus() {
  if ((licenceNo = "licenceNo" && password == "password")) {
    alert("Login successful");
  } else {
    alert("Login unsuccessful");
  }
}
