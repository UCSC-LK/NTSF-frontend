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
 *
 * @param {nic/password/email/mobile number} elementId
 * @param {validateNIC/validatePassword/validateEmail/validateMobileNo} validateFn
 * @returns
 */
function validateInputField(elementId, validateFn) {
  const inputElement = document.getElementById(elementId);

  if (!validateFn(inputElement.value)) {
    console.log(`Provided ${elementId} is invalid`);
    inputElement.classList.add("invalid");
    return false;
  }

  inputElement.classList.remove("invalid");
  return true;
}

/**
 * Validate the login form
 */
window.validateSignUpForm = function validateSignUpForm() {
  const isNICValid = validateInputField("nic", validateNIC);
  const isEmailValid = validateInputField("email", validateEmail);
  const isMobileNoValid = validateInputField("mobile-no", validateMobileNo);
  const isPasswordValid = validateInputField("password", validatePassword);
  const rePassword = validateInputField("re-password", validatePassword);

  if (
    isNICValid &&
    isPasswordValid &&
    isEmailValid &&
    isMobileNoValid &&
    rePassword
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * Check whether the password and re enter password fields match
 */
passwordMatch = function passwordsMatch() {
  const password = document.getElementById("password").value;
  const rePassword = document.getElementById("re-password").value;

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
    return true;
  } else {
    return false;
  }
};

/**
 * Enable or disable the submit button
 */
submitButtonControl = function submitButtonControl() {
  const submitButtonElement = document.getElementById("submit-btn");

  if (passwordMatch() && validateSignUpForm()) {
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
