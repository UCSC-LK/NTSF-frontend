import { getFinesByNic } from "/user-side/service/fineService.js";

window.addEventListener("load", () => {
  console.log("callback");

  // Store NIC no
  if (!getFinesByNic("996129039V", fineDataHTMLoutput)) {
    alert("Login Expired");

    window.location.href = "/user-side/user/login/index.html";
  }
});

function fineDataHTMLoutput(finesDataArray) {
  addFinesToTable(
    finesDataArray.driver,
    document.getElementById("table-driver")
  );

  addFinesToTable(
    finesDataArray.vehicle,
    document.getElementById("table-vehicle")
  );

  addFinesToTable(
    finesDataArray.pedestrian,
    document.getElementById("table-pedestrian")
  );
}

function addFinesToTable(finesDataArray, finesTable) {
  if (finesDataArray.length > 0) {
    // Add contents
    finesDataArray.map(
      ({
        fineNo,
        imposedDateTime,
        dueDateTime,
        paymentStatus,
        offence: { amount, description },
      }) => {
        const dataRow = finesTable.insertRow();

        const dataCellArray = [];

        for (let i = 0; i < 6; i++) {
          const dataCell = dataRow.insertCell(i);
          dataCellArray.push(dataCell);
        }

        dataCellArray[0].innerHTML = fineNo;
        dataCellArray[1].innerHTML = description;
        dataCellArray[2].innerHTML = imposedDateTime;
        dataCellArray[3].innerHTML = dueDateTime;
        dataCellArray[4].innerHTML = amount;
        dataCellArray[5].innerHTML = paymentStatus;
      }
    );
  }
}
