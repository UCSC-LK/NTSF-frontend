import { getFinesByNic } from "/user_service/service/fineService.js";

window.addEventListener("load", () => {
  console.log("callback");
  // Store NIC no
  getFinesByNic("996129039V", "DRIVER", fineDataHTMLoutput);
  getFinesByNic("996129039V", "VEHICLE", fineDataHTMLoutput);
  getFinesByNic("996129039V", "PEDESTRIAN", fineDataHTMLoutput);
});

function fineDataHTMLoutput(finesDatArray, offenceType) {
  let finesTable;
  switch (offenceType) {
    case "DRIVER":
      finesTable = document.getElementById("table-driver");
      break;
    case "VEHICLE":
      finesTable = document.getElementById("table-vehicle");
      break;
    case "PEDESTRIAN":
      finesTable = document.getElementById("table-pedestrian");
    default:
      break;
  }

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
      const dataRow = finesTable.insertRow();

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
