import {
  validateEmail,
  validateInputField,
  validateMobileNo,
  validateNIC,
  validatePassword,
} from "/user-side/util/validator.js";

var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

/**
 * Validate the login form
 */
window.validateSignUpForm = function validateSignUpForm() {
  const submitButtonElement = document.getElementById("submit-btn");
  const isNICValid = validateInputField("nic", validateNIC);
  const isEmailValid = validateInputField("email", validateEmail);
  const isMobileNoValid = validateInputField("mobile-no", validateMobileNo);
  const isPasswordValid = validateInputField("password", validatePassword);
  const isRePasswordValid = validateInputField("re-password", validatePassword);
  const password = document.getElementById("password").value;
  const rePassword = document.getElementById("re-password").value;

  if (
    isNICValid &&
    isEmailValid &&
    isMobileNoValid &&
    isPasswordValid &&
    isRePasswordValid &&
    password == rePassword
  ) {
    submitButtonElement.disabled = false;
  } else {
    submitButtonElement.disabled = true;
  }
};

/**
 * Submit the sign up form
 */
window.submitSignup = function submitSignup() {
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
};

function signUpSuccessCallback(data) {
  alert("SignUp successful");

  window.location.href = "../login/index.html";
}

function signUpUnsuccessCallback() {
  alert("Sign Up Unsuccessful!");
}

/**
 * Check whether the password and re enter password fields match
 */
// window.passwordMatch = function passwordsMatch() {
//   const password = document.getElementById("password").value;
//   const rePassword = document.getElementById("re-password").value;

//   const inputFields = document
//     .getElementById("submit-form")
//     .getElementsByTagName("input");

//   let isAllFilled = true;

//   Array.from(inputFields).forEach((element) => {
//     if (!element.value) {
//       isAllFilled = false;
//     }
//   });

//   if (password == rePassword && isAllFilled) {
//     return true;
//   } else {
//     return false;
//   }
// };
