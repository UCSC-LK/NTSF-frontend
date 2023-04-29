var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

// Password and re-password validation
function validateFormContents() {
  const password = document.getElementById("password").value;
  const rePassword = document.getElementById("re-password").value;
  const signUpBtn = document.getElementById("signup-btn");

  const inputFields = document
    .getElementById("signup-form")
    .getElementsByTagName("input");

  let isAllFilled = true;

  Array.from(inputFields).forEach((element) => {
    if (!element.value) {
      isAllFilled = false;
    }
  });

  if (password == rePassword && isAllFilled) {
    signUpBtn.disabled = false;
  } else {
    signUpBtn.disabled = true;
  }
}

function submitSignup() {
  const nic = document.getElementById("nic").value;
  const email = document.getElementById("email").value;
  const mobileNo = document.getElementById("mobile-no").value;
  const password = document.getElementById("password").value;

  console.log("called");

  var query = $.param({
    nic,
    email,
    mobile_no: mobileNo,
    password,
  });

  var settings = {
    url: `http://localhost:8080/ntsf_backend_war/user_signup?${query}`,
    method: "POST",
  };

  $.ajax(settings).done(signUpSuccessCallback).fail(signUpUnsuccessCallback);
}

function signUpSuccessCallback(data) {
  alert("SignUp successful");

  window.location.href = "../login.html";
}

function signUpUnsuccessCallback() {
  alert("Sign Up Unsuccessful!");
}
