var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

function submitLogin() {
  var userType = 1; // Driver
  const licenceNo = document.getElementById("licenceNo").value;
  const password = document.getElementById("password").value;

  var query = $.param({
    user_type: userType,
    login_id: licenceNo,
    password,
  });

  var settings = {
    url: `http://localhost:8080/ntsf/login?${query}`,
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    // console.log("Hello");
    console.log(response);
    sessionStorage.setItem("user_type", "1");
    sessionStorage.setItem("user_id", "68");
  });

  loginStatus();
}

function loginStatus() {
  if ((licenceNo = "licenceNo" && password == "password")) {
    window.location.assign("#");
    alert("Login successful");
  } else {
    alert("Login unsuccessful");
    return;
  }
}

// const loginId = document.getElementById("loginId");

// function submitLogin() {
//   const licenseNo = document.getElementById("licenceNo").value;
//   const password = document.getElementById("password").value;
//   var data = "";

//   var xhr = new XMLHttpRequest();
//   xhr.withCredentials = true;

//   xhr.addEventListener("readystatechange", function () {
//     if (this.readyState === 4) {
//       console.log(this.responseText);
//     }
//   });
//   xhr.open(
//     "GET",
//     `http://localhost:8080/ntsf/login?login_id=${licenceNo}&password=${password}&user_type=1`
//     // "http://localhost:8080/ntsf/login?login_id=1234&password=password&user_type=0"
//   );
//   xhr.setRequestHeader("Access-Control-Allow-Origin", " *,");
//   //   xhr.setRequestHeader(
//   //     "Access-Control-Allow-Methods",
//   //     " GET,PUT,POST,DELETE,PATCH,OPTIONS,"
//   //   );
//   xhr.send(data);

//   loginStatus();

//   // location.href=""
// }

// function loginStatus() {
//   if ((licenceNo = "licenceNo" && password == "password")) {
//     window.location.assign("#");
//     alert("Login successful");
//   } else {
//     alert("Login unsuccessful");
//     return;
//   }
// }
