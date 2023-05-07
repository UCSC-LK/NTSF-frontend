import { getFinesByNic } from "/user-side/service/fineService.js";
import { displayButton } from "/user-side/component/button/script.js";
import { redirectToAddComplaint } from "/user-side/util/navigation.js";

// Adding jquery to the page
var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

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

/**
 *
 * @param {JSON object} finesDataArray | Array of fines data
 * @param {String} headingText | Heading text of the table
 * @param {String} tableId | Id of the table
 */
function displayFines(finesDataArray, headingText, tableId) {
  if (finesDataArray.length > 0) {
    const table = createTable(finesDataArray);

    // Create table heading
    const tableHeading = document.createElement("div");
    tableHeading.classList.add("tableheading");

    // Create heading
    const h2 = document.createElement("h2");
    h2.textContent = headingText;

    tableHeading.appendChild(h2);

    document.getElementById(tableId).appendChild(tableHeading);
    document.getElementById(tableId).appendChild(table);
  }
}

function createTable(finesDataArray) {
  const table = document.createElement("table");

  // Create table header
  const tableHeader = table.createTHead();
  const headerRow = tableHeader.insertRow();

  const headers = [
    "Fine No",
    "Description",
    "Imposed Date Time",
    "Due Date Time",
    "Amount",
    "Demerit Points",
    "Payment Status",
  ];

  headers.forEach((headerText) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });

  if (finesDataArray.length > 0) {
    finesDataArray.forEach(
      ({
        fineNo,
        imposedDateTime,
        dueDateTime,
        paymentStatus,
        offence: { amount, description, demerit_points: demeritPoints },
      }) => {
        const row = table.insertRow();

        const cells = [
          fineNo,
          description,
          imposedDateTime,
          dueDateTime,
          amount,
          demeritPoints,
          paymentStatus,
        ];

        cells.forEach((cellData, index) => {
          const cell = row.insertCell();
          cell.textContent = cellData;

          // Add the fine number as a data attribute to the row
          if (index === 0) {
            row.dataset.fineNo = cellData;
          }
        });

        /**
         * Add button "Add Complaint" to each row
         */
        const button = displayButton(
          "Add Complaint",
          "addButton",
          () => {
            if (fineNo) redirectToAddComplaint(fineNo);
          },
          fineNo // Pass the fine number as a parameter to the onClick function
        );
        row.appendChild(button);
      }
    );
  }

  return table;
}
