var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

function submitSignup() {
  var userType = 2; // Vehicle
  const licenceNo = document.getElementById("vehicleNo").value;
  const nic = document.getElementById("nic").value;
  const email = document.getElementById("email").value;
  const mobileNo = document.getElementById("mobileNo").value;
  const password = document.getElementById("password").value;

  // const name = document.getElementById("name").value;
  // const address = document.getElementById("address").value;

  var query = $.param({
    user_type: userType,
    licence_no: vehicleNo,
    nic,
    email,
    mobile_no: mobileNo,
    password,
  });

  var settings = {
    url: `http://localhost:8080/ntsf/signup?${query}`,
    method: "POST",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });

  alert("Sign Up Successful");
  window.location.assign("#");
}
