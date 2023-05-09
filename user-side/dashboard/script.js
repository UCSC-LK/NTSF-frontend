import { getPointsByNic } from "/user-side/service/pointSystemService.js";

window.addEventListener("load", () => {
  console.log("callback");
  
  // Getting name from the session storage
  document.getElementById("profile-username").innerHTML =
    sessionStorage.getItem("name");

  
  // Getting nic from the session storage 
  const nic = sessionStorage.getItem("nic");
  console.log(nic);

  if (!getUserProfileInfo(nic, dashboardDataHTMLoutput)) {
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
