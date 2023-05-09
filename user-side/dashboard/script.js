import { getPointsByNic } from "/user-side/service/pointSystemService.js";

window.addEventListener("load", () => {
  console.log("callback");
  // Get NIC from session storage here
  if (!getUserProfileInfo("996129039V", dashboardDataHTMLoutput)) {
    alert("Login Expired");
    window.location.href = "/user-side/user/login/index.html";
  }
});

function dashboardDataHTMLoutput(pointsData) {
  document.getElementById("total-points").innerHTML = pointsData.points;
  /**
   * Reminder
   */
  // You can't get total fines and complaints from the API
  // Re check with the backend team
  document.getElementById("total-fines").innerHTML = pointsData.fines;
  document.getElementById("total-complaints").innerHTML = pointsData.complaints;
}
