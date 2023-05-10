import { validateNIC, validatePassword } from "/user-side/util/validator.js";
import { displayMessage } from "/user-side/component/message/script.js";
import { redirectToViewFines } from "/user-side/util/navigation.js";
import { validateInputField } from "/user-side/util/validator.js";
import { saveImageToSessionStorage } from "/user-side/component/profilePicture/script.js";
import { togglePasswordVisibility } from "/user-side/component/togglePassword/script.js";

// JQuery
var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

/**
 * Add event listeners in window load event
 * This is done to make sure that the functions are available in the window scope
 * This is done because the functions are imported from other files
 */
window.addEventListener("load", () => {
  window.togglePasswordVisibility = togglePasswordVisibility;
});

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
    console.log("Login Successful");
    displayMessage("Login Successful", true, () => {
      // Store variables in the sessionStorage
      storeInSessionStorage(data);

      redirectToViewFines();
    });
  } else {
    displayMessage("Incorrect nic or password!", false);
  }
}

function loginUnsuccessCallback() {
  console.log("Login Unsuccessful");
  displayMessage("Login Unsuccessful", false);
}

/**
 * Function to store variables in the sessionStorage
 */
function storeInSessionStorage(data) {
  sessionStorage.setItem("userId", data.userId);
  console.log(data.userId);

  sessionStorage.setItem("jwt", data.jwt);
  console.log(data.jwt);

  sessionStorage.setItem("nic", data.nic);
  console.log(data.nic);

  const name = data.people.name;
  console.log(name);
  sessionStorage.setItem("name", name);

  const profilePicture = data.people.profilePicture;
  saveImageToSessionStorage("profilePicture", profilePicture);
}

/**********JS Modules***/
// document
//   .getElementById("login-form")
//   .addEventListener("oninput", validateLoginForm);
