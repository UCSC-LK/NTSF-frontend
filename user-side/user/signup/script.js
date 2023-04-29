import {
  validateNIC,
  validatePassword,
  validateEmail,
  validateMobileNo,
} from "/user-side/util/validator.js";

var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

/**
 * Validate the sign up form
 */
window.validateSignUpForm = function validateSignUpForm() {
  // Get the whole element
  const nicElement = document.getElementById("nic");
  const passwordElement = document.getElementById("password");
  const emailElement = document.getElementById("email");
  const mobileNoElement = document.getElementById("mobile-no");
  // Get the whole submit button element
  const submitButtonElement = document.getElementById("submit-btn");

  if (!validateNIC(nicElement.value)) {
    console.log("Provided NIC is invalid");
    nicElement.classList.add("invalid");
    submitButtonElement.disabled = true;
  } else if (!validatePassword(passwordElement.value)) {
    passwordElement.classList.add("invalid");
    submitButtonElement.disabled = true;
  } else if (!validateEmail(emailElement.value)) {
    emailElement.classList.add("invalid");
    submitButtonElement.disabled = true;
  } else if (!validateMobileNo(mobileNoElement.value)) {
    mobileNoElement.classList.add("invalid");
    submitButtonElement.disabled = true;
  } else {
    nicElement.classList.remove("invalid");
    passwordElement.classList.remove("invalid");
    emailElement.classList.remove("invalid");
    mobileNoElement.classList.remove("invalid");
    submitButtonElement.disabled = false;
  }
};

/**
 * Check whether the password and re enter password fields match
 */
window.passwordMatch = function passwordsMatch() {
  const password = document.getElementById("password").value;
  const rePassword = document.getElementById("re-password").value;
  // Get the whole submit button element
  const submitButtonElement = document.getElementById("submit-btn");

  const inputFields = document
    .getElementById("submit-form")
    .getElementsByTagName("input");

  let isAllFilled = true;

  Array.from(inputFields).forEach((element) => {
    if (!element.value) {
      isAllFilled = false;
    }
  });

  if (password == rePassword && isAllFilled) {
    submitButtonElement.disabled = false;
  } else {
    submitButtonElement.disabled = true;
  }
};

/**
 * Submit the sign up form
 */
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
