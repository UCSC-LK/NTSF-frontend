import { getPointsByNic } from "/user-side/service/pointSystemService.js";
import { displayImageFromSessionStorage } from "/user-side/component/profilePicture/script.js";
import { displayMessage } from "/user-side/component/message/script.js";

/********** ADD EVENT LISTENER STARTS HERE**********/
window.addEventListener("load", () => {
  console.log("callback");

  // Getting name from the session storage
  document.getElementById("profile-username").innerHTML =
    sessionStorage.getItem("name");

  displayImageFromSessionStorage("profilePicture", "profile-picture-container");

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
/********** ADD EVENT LISTENER ENDS HERE**********/

const currentPoints = document.getElementById("current-points");
const totalReducedPoints = document.getElementById("total-reduced-points");
const maxRecoveryDate = document.getElementById("max-recovery-date");
const maxPointLimit = document.getElementById("max-point-limit");
const minPointLimit = document.getElementById("min-point-limit");
const initialPoints = document.getElementById("initial-points");

/**
 * Getting points data from the API and display it in the dashboard
 * @param {*} pointsData | Points data object
 */
function dashboardDataHTMLoutput(pointsData) {
  // Constants
  maxPointLimit.innerHTML = pointsData.maxPointLimit;
  minPointLimit.innerHTML = pointsData.minPointLimit;
  initialPoints.innerHTML = pointsData.initialPoints;

  // currentPointsValidation((currentPoints.innerHTML = pointsData.currentPoints));

  currentPoints.innerHTML = pointsData.currentPoints;

  // Getting remaining points
  totalReducedPoints.innerHTML =
    pointsData.initialPoints - pointsData.currentPoints;
  maxRecoveryDate.innerHTML = pointsData.maxRecoveryDate;
}

// function currentPointsValidation() {
//   switch (currentPoints.value) {
//     case (currentPoints.value = minPointLimit.value):
//       currentPoints.classList.add("invalid");
//       currentPoints.style.color = "red";
//       break;

//     case currentPoints.value < minPointLimit.value:
//       currentPoints.classList.add("invalid");
//       currentPoints.style.color = "red";
//       displayMessage(
//         "Current points cannot be less than minimum point limit",
//         false
//       );
//       break;
//   }
// }
