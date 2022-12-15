var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

function submitSignup() {
  var userType = 1; // Driver
  const licenceNo = document.getElementById("licenceNo").value;
  const nic = document.getElementById("nic").value;
  const email = document.getElementById("email").value;
  const mobileNo = document.getElementById("mobileNo").value;
  const password = document.getElementById("password").value;

  // var query = $.param({
  //   user_type: userType,
  //   licence_no: licenceNo,
  //   nic,
  //   email,
  //   mobile_no: mobileNo,
  //   password,
  // });

  // var settings = {
  //   url: `http://localhost:8080/ntsf/signup?${query}`,
  //   method: "POST",
  //   timeout: 0,
  // };

  // $.ajax(settings).done(function (response) {
  //   console.log(response);
  // });

  if (matchPassword() == TRUE) {
    var query = $.param({
      user_type: userType,
      licence_no: licenceNo,
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
  } else {
    alert("Sign Up Unsuccessful");
  }
}

function matchPassword() {
  const password = document.getElementById("password").value;
  const rePassword = document.getElementById("rePassword").value;

  if (password == rePassword) {
    return TRUE;
    alert("Password created successfully");
  } else {
    return FALSE;
    alert("Password did not match");
  }
}
