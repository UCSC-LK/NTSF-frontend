import { getFinesByUserId } from "/service/fineService.js";

window.addEventListener("load", () => {
  console.log("callback");
  getFinesByUserId(68, fineDataHTMLoutput);
});

function fineDataHTMLoutput(finesDatArray) {
  const finesTable = document.getElementById("table");

  // Add contents
  finesDatArray.map(
    ({
      ticketNo,
      fineNo,
      date,
      dueDate,
      fineAmount,
      fineType,
      paymentStatus,
    }) => {
      const dataRow = table.insertRow();

      const dataCellArray = [];

      for (let i = 0; i < 7; i++) {
        const dataCell = dataRow.insertCell(i);
        dataCellArray.push(dataCell);
      }

      dataCellArray[0].innerHTML = ticketNo;
      dataCellArray[1].innerHTML = fineNo;
      dataCellArray[2].innerHTML = date;
      dataCellArray[3].innerHTML = dueDate;
      dataCellArray[4].innerHTML = fineAmount;
      dataCellArray[5].innerHTML = fineType;
      dataCellArray[6].innerHTML = paymentStatus;
    }
  );
}

// const model = {
//   userId: "68",
//   ticketNo: 41,
//   fineNo: 101,
//   date: "Dec 22, 2022",
//   dueDate: "Jan 1, 2023",
//   fineAmount: 200.0,
//   paymentStatus: "PAY",
// };
