import { getComplaintByUserId } from "/user-side/service/complaintService.js";
import { displayButton } from "/user-side/component/button/script.js";

window.addEventListener("load", () => {
  console.log("callback");
  //Enter user id here
  const userId = sessionStorage.getItem("userId");
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

    /**
     * Add button "Add Footage" to each row
     */
    const button = displayButton("Add Footage", "addButton", () => {});
    dataRow.appendChild(button);
  });
}
