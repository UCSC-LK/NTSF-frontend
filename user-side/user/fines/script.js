import { getFinesByNic } from "user-side/service/fineService.js";

window.addEventListener("load", () => {
  console.log("callback");
  
  // Store NIC no
  getFinesByNic("996129039V", "DRIVER", fineDataHTMLoutput);
  getFinesByNic("996129039V", "VEHICLE", fineDataHTMLoutput);
  getFinesByNic("996129039V", "PEDESTRIAN", fineDataHTMLoutput);
});

function fineDataHTMLoutput(finesDatArray, fineType) {
  let finesTable;
  switch (fineType) {
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
      fineNo,
      imposedDateTime,
      dueDate,
      amount,
      paymentStatus,
    }) => {
      const dataRow = finesTable.insertRow();

      const dataCellArray = [];

      for (let i = 0; i < 5; i++) {
        const dataCell = dataRow.insertCell(i);
        dataCellArray.push(dataCell);
      }

      dataCellArray[0].innerHTML = fineNo;
      dataCellArray[1].innerHTML = imposedDateTime;
      dataCellArray[2].innerHTML = dueDate;
      dataCellArray[3].innerHTML = amount;
      dataCellArray[4].innerHTML = paymentStatus;
    }
  );
}
