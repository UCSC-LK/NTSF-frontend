import { getPointsByNic } from "/user-side/service/pointSystemService.js";
import { displayImageFromSessionStorage } from "/user-side/component/profilePicture/script.js";

window.addEventListener("load", () => {
  console.log("callback");

  // Getting name from the session storage
  document.getElementById("profile-username").innerHTML =
    sessionStorage.getItem("name");

  // displayImageFromSessionStorage("profilePicture");

  // Getting nic from the session storage
  const nic = sessionStorage.getItem("nic");
  console.log(nic);

  /**
   * Get points data from the API
   */
  if (!getPointsByNic(nic, dashboardDataHTMLoutput)) {
    alert("Login Expired");
    window.location.href = "/user-side/user/login/index.html";
  }
});

function dashboardDataHTMLoutput(pointsData) {
  document.getElementById("current-points").innerHTML =
    pointsData.currentPoints;
  // Getting remaining points
  document.getElementById("remaining-points").innerHTML =
    pointsData.initialPoints - pointsData.currentPoints;
  document.getElementById("max-recovery-date").innerHTML =
    pointsData.maxRecoveryDate;

  // Constants
  document.getElementById("max-point-limit").innerHTML =
    pointsData.maxPointLimit;
  document.getElementById("min-point-limit").innerHTML =
    pointsData.minPointLimit;
  document.getElementById("initial-points").innerHTML =
    pointsData.initialPoints;
}
