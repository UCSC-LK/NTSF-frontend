window.validateNICInput = function validateNICInput() {
  return validateInputField("nic", validateNIC);
};

window.validatePasswordInput = function validatePasswordInput() {
  return validateInputField("password", validatePassword);
};

window.validateLoginForm = function validateLoginForm() {
  const submitButtonElement = document.getElementById("submit-btn");

  if (window.validatePasswordInput() && window.validateNICInput()) {
    submitButtonElement.disabled = false;
  } else {
    submitButtonElement.disabled = true;
  }
};

window.validateLoginForm = function validateLoginForm() {
  // Get the whole element
  const nicElement = document.getElementById("nic");
  const passwordElement = document.getElementById("password");
  const submitButtonElement = document.getElementById("submit-btn");

  if (!validateNIC(nicElement.value)) {
    console.log("Provided NIC is invalid");
    nicElement.classList.add("invalid");
    submitButtonElement.disabled = true;
  } else {
    nicElement.classList.remove("invalid");
  }

  if (!validatePassword(passwordElement.value)) {
    passwordElement.classList.add("invalid");
    submitButtonElement.disabled = true;
  } else {
    passwordElement.classList.remove("invalid");
  }

  if (
    validateNIC(nicElement.value) &&
    validatePassword(passwordElement.value)
  ) {
    submitButtonElement.disabled = false;
  }
};

/**
 * Validate the sign up form (Old version)
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
