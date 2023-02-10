import { getComplaintByUserId } from "/service/complaintService.js";

window.addEventListener("load", () => {
  console.log("callback");
  //Enter user id here
  getComplaintByUserId(65, complaintDataHTMLoutput);
});

function complaintDataHTMLoutput(complaintDatArray) {
  const complaintTable = document.getElementById("table");

  // Add contents
  complaintDatArray.map(({ complaintNo, title, description }) => {
    const dataRow = table.insertRow();

    const dataCellArray = [];

    for (let i = 0; i < 3; i++) {
      const dataCell = dataRow.insertCell(i);
      dataCellArray.push(dataCell);
    }

    dataCellArray[0].innerHTML = complaintNo;
    dataCellArray[1].innerHTML = title;
    dataCellArray[2].innerHTML = description;
  });
}

// const model = {
//   userId: "68",
//   complaintNo: 41,
//   title: 101,
//   description: "Dec 22, 2022",
//   status: "Jan 1, 2023",s
// };
