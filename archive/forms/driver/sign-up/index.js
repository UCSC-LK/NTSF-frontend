var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

function submitSignUp() {
  const licenceNo = document.getElementById("licenceNo");
  const nic = document.getElementById("nic");
  const name = document.getElementById("name");
  const address = document.getElementById("address");
  const email = document.getElementById("email");
  const mobileNo = document.getElementById("mobileNo");
  const password = document.getElementById("password");

  var userId = 1;

  var settings = {
    url: `http://localhost:8080/ntsf/signup?user_type=
  ${userId}&nic=${nic}&email=${email}&mobile_no=${mobileNo}&password=${password}&licence_no=${licenceNo}&name=${name}&address=${address}`,
    method: "POST",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });

  return alert("Sign Up Successful");
}
