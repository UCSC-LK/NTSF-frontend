import { displayMessage } from "/user-side/component/message/script.js";

// JQuery
var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

window.addEventListener("load", () => {
  //  Getting name from the session storage
  document.getElementById("profile-username").innerHTML =
    sessionStorage.getItem("name");

  // Get the fine no from the url and set it to the fine no input field
  const urlParams = new URLSearchParams(window.location.search);
  const fineNo = urlParams.get("fineNo");

  const fineNoElement = document.getElementById("fineNo");
  if (fineNo) {
    fineNoElement.value = fineNo;
    fineNoElement.disabled = true;
  }
});
