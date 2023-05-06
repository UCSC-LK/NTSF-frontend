import { getFinesByNic } from "/user-side/service/fineService.js";

window.addEventListener("load", () => {
  console.log("callback");
  // Get NIC from session storage here
  if (!getFinesByNic("996129039V", fineDataHTMLoutput)) {
    alert("Login Expired");
    window.location.href = "/user-side/user/login/index.html";
  }
});

/**
 * Display fines data in HTML
 * @param {JSON object} finesDataArray
 */
function fineDataHTMLoutput(finesDataArray) {
  displayFines(finesDataArray.driver, "Driver Fines", "table-driver");
  displayFines(finesDataArray.vehicle, "Vehicle Fines", "table-vehicle");
  displayFines(
    finesDataArray.pedestrian,
    "Pedestrian Fines",
    "table-pedestrian"
  );
}

function displayFines(finesDataArray, headingText, tableId) {
  if (finesDataArray != null) {
    const h2 = document.createElement("h2");
    h2.textContent = headingText;
    document.body.appendChild(h2);

    const table = createTable(finesDataArray);
    document.getElementById(tableId).appendChild(table);
  }
}

/**
 * Create table for fines data
 * @param {JSON object} finesDataArray | HTML response from getFinesByNic() in fineService.js
 * @returns
 */
function createTable(finesDataArray) {
  const table = document.createElement("table");

  if (finesDataArray.length > 0) {
    finesDataArray.forEach(
      ({
        fineNo,
        imposedDateTime,
        dueDateTime,
        paymentStatus,
        offence: { amount, description },
      }) => {
        const row = table.insertRow();

        const cells = [
          fineNo,
          description,
          imposedDateTime,
          dueDateTime,
          amount,
          paymentStatus,
        ];

        cells.forEach((cellData) => {
          const cell = row.insertCell();
          cell.innerHTML = cellData;
        });
      }
    );
  }

  return table;
}
