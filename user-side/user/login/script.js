import { validateNIC, validatePassword } from "/user-side/util/validator.js";

// Adding jquery to the page
var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

// document
//   .getElementById("login-form")
//   .addEventListener("oninput", validateLoginForm);

/**
 * Common function for validate the input field
 * @param {string} elementId (`nic | password`)
 * @param {Function}} validateFn (`validateNIC | validatePassword`)
 * @returns if input field is valid
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
window.validateLoginForm = function validateLoginForm() {
  const submitButtonElement = document.getElementById("submit-btn");
  const isNICValid = validateInputField("nic", validateNIC);
  const isPasswordValid = validateInputField("password", validatePassword);

  // Enable the submit button if all the input fields are valid
  if (isNICValid && isPasswordValid) {
    submitButtonElement.disabled = false;
  } else {
    submitButtonElement.disabled = true;
  }
};

window.submitLogin = function submitLogin() {
  console.log("called");
  const nic = document.getElementById("nic").value;
  const password = document.getElementById("password").value;
  const submitButtonElement = document.getElementById("submit-btn");

  const query = $.param({
    nic,
    password,
  });

  const settings = {
    url: `http://localhost:8080/ntsf_backend_war/user_login?${query}`,
    method: "GET",
  };

  $.ajax(settings).done(loginSuccessCallback).fail(loginUnsuccessCallback);
};

function loginSuccessCallback(data) {
  let userId = null;
  if (data.loggedIn) {
    alert("Login successful");
    sessionStorage.setItem("userId", data.userId);
    // sessionStorage.setItem("jwt", data.jwt);
    // Retrieve the JWT token from the sessionStorage using the getItem()
    sessionStorage.setItem("jwt", data.jwt);
    window.location.href = "/user-side/user/fines/index.html";
  } else {
    alert("Incorrect nic or password!");
  }
}

function loginUnsuccessCallback() {
  alert("Login Unsuccessful!");
}

// Toggle password visibility
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#id_password");

togglePassword.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  // toggle the eye slash icon
  this.classList.toggle("fa-eye-slash");
});
