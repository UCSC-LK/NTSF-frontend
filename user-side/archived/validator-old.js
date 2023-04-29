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
