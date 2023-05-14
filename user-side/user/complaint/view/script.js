import { getComplaintByUserId } from "/user-side/service/complaintService.js";
import { getUserProfileInfo } from "/user-side/service/profileService.js";
import { displayImageFromSessionStorage } from "/user-side/component/profilePicture/script.js";

window.addEventListener("load", () => {
  console.log("callback");

  // Getting name from the session storage
  document.getElementById("profile-username").innerHTML =
    sessionStorage.getItem("name");

  displayImageFromSessionStorage("profilePicture", "profile-picture-container");

  // Getting user Id from the session storage | User Id = 1
  const userId = sessionStorage.getItem("userId");
  console.log(userId);

  getComplaintByUserId(userId, complaintDataHTMLoutput);
});

/**
 *
 * @param {*} complaintDatArray | Array of complaint data
 */
function complaintDataHTMLoutput(complaintDatArray) {
  const complaintTable = document.getElementById("table");

  // Add contents
  // ComplaintNo is the first column. Accessed by Id
  complaintDatArray.map(({ complaintNo, fineNo, title, description }) => {
    // Insert a row at the end of the table
    const dataRow = table.insertRow();

    // Insert a cell in the row at index 0
    const dataCellArray = [];

    for (let i = 0; i < 4; i++) {
      // Insert a cell in the row at index 0
      const dataCell = dataRow.insertCell(i);
      dataCellArray.push(dataCell);
    }

    dataCellArray[0].innerHTML = complaintNo;
    dataCellArray[1].innerHTML = fineNo;
    dataCellArray[2].innerHTML = title;
    dataCellArray[3].innerHTML = description;
  });
}

// TASKS:
// Add one more column to the table
