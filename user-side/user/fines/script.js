import { getFinesByNic } from "/user-side/service/fineService.js";
import { displayButton } from "/user-side/component/button/script.js";
import { redirectToAddComplaint } from "/user-side/util/navigation.js";
import { displayMessage } from "/user-side/component/message/script.js";
import { redirectToLogin } from "/user-side/util/navigation.js";
import { displayImageFromSessionStorage } from "/user-side/component/profilePicture/script.js";
import { redirectToPayment } from "/user-side/util/navigation.js";

// Adding jquery to the page
var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

window.addEventListener("load", () => {
  console.log("callback");

  // Getting name from the session storage
  document.getElementById("profile-username").innerHTML =
    sessionStorage.getItem("name");

  displayImageFromSessionStorage("profilePicture", "profile-picture-container");

  // Getting nic from the session storage
  const nic = sessionStorage.getItem("nic");
  console.log(nic);

  if (!getFinesByNic(nic, fineDataHTMLoutput)) {
    alert("Session Expired");
    // displayMessage("Login Expired", true, () => {});

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
    // Creates a new div element using the document.createElement method
    // And assigns it to the variable tableHeading
    const tableHeading = document.createElement("div");

    // Adds the CSS class "tableheading" to the div element using the classList.add method
    tableHeading.classList.add("tableheading");

    // Create heading
    const h2 = document.createElement("h2");
    h2.textContent = headingText;

    tableHeading.appendChild(h2);

    document.getElementById(tableId).appendChild(tableHeading);
    document.getElementById(tableId).appendChild(table);
  }
}

/**
 * Create table
 * @param {*} finesDataArray 
 * @returns 
 */
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
    "Pay",
    "Complaint",
  ];

  // Create table header cells
  headers.forEach((headerText) => {
    // Create table header cell
    const headerCell = document.createElement("th");
    // Add CSS class to the header cell
    headerCell.classList.add("table-header");
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });

  if (finesDataArray.length > 0) {
    // Define two types of rows as an array
    const unpaidRows = [];
    const paidRows = [];

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
          "",
        ];

        cells.forEach((cellData, index) => {
          const cell = row.insertCell();

          // Payment status cell
          if (index === 7) {
            /*************** UNPAID CONDITION ***************/
            if (paymentStatus === "unpaid") {
              /**
               * Add button "pay" to each UNPAID row
               */
              const paymentStatusButton = displayButton(
                "Pay",
                "paymentStatusButton",
                () => {
                  redirectToPayment(fineNo);
                },
                fineNo // Pass the fine number as a parameter to the onClick function
              );

              /**
               * Add button "Add Complaint" to each UNPAID row
               */
              const addButton = displayButton(
                "Add",
                "addButton",
                () => {
                  if (fineNo) redirectToAddComplaint(fineNo);
                },
                fineNo // Pass the fine number as a parameter to the onClick function
              );

              cell.appendChild(paymentStatusButton);

              const addButtonCell = row.insertCell();
              addButtonCell.appendChild(addButton);

              /*************** PAID CONDITION ***************/
            } else if (paymentStatus === "paid") {
              row.classList.add("paid-row");
              paidRows.push(row);

              const emptyCell = row.insertCell();
              emptyCell.textContent = " "; // Add any desired content or styling to the empty cell
            }
          } else {
            cell.textContent = cellData;
          }
        });

        if (paymentStatus === "unpaid") {
          unpaidRows.push(row);
        }
      }
    );

    // Append unpaid rows first
    unpaidRows.forEach((row) => {
      table.appendChild(row);
    });

    // Append paid rows at the bottom of the table
    paidRows.forEach((row) => {
      table.appendChild(row);
    });
  }

  return table;
}
