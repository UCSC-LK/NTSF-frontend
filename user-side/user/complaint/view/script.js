import { getComplaintByUserId } from "/user-side/service/complaintService.js";
import { getUserProfileInfo } from "/user-side/service/profileService.js";

window.addEventListener("load", () => {
  console.log("callback");

  /**
   * Getting name from the session storage
   */
  document.getElementById("profile-username").innerHTML =
    sessionStorage.getItem("name");

  /**
   * Getting user Id from the session storage | User Id = 107
   */
  const userId = sessionStorage.getItem("userId");
  console.log(userId);

  getComplaintByUserId(userId, complaintDataHTMLoutput);
});

function complaintDataHTMLoutput(complaintDatArray) {
  const complaintTable = document.getElementById("table");

  // Add contents
  // ComplaintNo is the first column. Accessed by Id
  complaintDatArray.map(({ complaintNo, fineNo, title, description }) => {
    const dataRow = table.insertRow();

    const dataCellArray = [];

    for (let i = 0; i < 4; i++) {
      const dataCell = dataRow.insertCell(i);
      dataCellArray.push(dataCell);
    }

    dataCellArray[0].innerHTML = complaintNo;
    dataCellArray[1].innerHTML = fineNo;
    dataCellArray[2].innerHTML = title;
    dataCellArray[3].innerHTML = description;
  });
}
