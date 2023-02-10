//jquery
var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

function submitLogin() {
  // const userType = 1; // Driver
  console.log("called");
  const nic = document.getElementById("nic").value;
  const password = document.getElementById("password").value;

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
    // sessionStorage.setItem("user_type", "1");
    sessionStorage.setItem("userId", data.userId);
    window.location.href = "/index.html";
  } else {
    alert("Incorrect nic or password!");
  }
}

function loginUnsuccessCallback() {
  alert("Login Unsuccessful!");
}
