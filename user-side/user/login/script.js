import { validateNIC, validatePassword } from "/user-side/util/validator.js";

// Adding jquery to the page
var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

window.validateLoginForm = function validateLoginForm() {
  // Get the whole element
  const nicElement = document.getElementById("nic");
  const passwordElement = document.getElementById("password");
  const submitButtonElement = document.getElementById("submit-btn");

  if (!validateNIC(nicElement.value)) {
    console.log("Provided NIC is invalid");
    nicElement.classList.add("invalid");
    submitButtonElement.disabled = true;
  } else if (!validatePassword(passwordElement.value)) {
    passwordElement.classList.add("invalid");
    submitButtonElement.disabled = true;
  } else {
    nicElement.classList.remove("invalid");
    passwordElement.classList.remove("invalid");
    submitButtonElement.disabled = false;
  }
};

export function submitLogin() {
  console.log("called");
  const nic = document.getElementById("nic").value;
  const password = document.getElementById("password").value;
  const submitButtonElement = document.getElementById("submit-btn");

  if (validateNIC(nic) && validatePassword(password)) {
    const query = $.param({
      nic,
      password,
    });

    const settings = {
      url: `http://localhost:8080/ntsf_backend_war/user_login?${query}`,
      method: "GET",
    };

    $.ajax(settings).done(loginSuccessCallback).fail(loginUnsuccessCallback);
  }

  function loginSuccessCallback(data) {
    let userId = null;
    if (data.loggedIn) {
      alert("Login successful");
      sessionStorage.setItem("userId", data.userId);
      window.location.href = "user_service/index.html";
    } else {
      alert("Incorrect nic or password!");
    }
  }

  function loginUnsuccessCallback() {
    alert("Login Unsuccessful!");
  }
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
