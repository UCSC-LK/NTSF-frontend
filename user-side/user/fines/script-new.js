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
 * Append rows to the table
 * @param {*} finesDataArray | Array of fines data
 * @returns 
 */
function createTable(finesDataArray) {
    // Creates a new table element using the document.createElement method
    const table = document.createElement("table");
    createTableHeader(table);
    const { unpaidRows, paidRows } = processFinesData(finesDataArray);
    appendRowsToTable(table, unpaidRows);
    appendRowsToTable(table, paidRows, "paid-row");
    return table;
  }
  
  /**
   * Create table header
   * @param {*} table 
   */
  function createTableHeader(table) {
    // Creates a new table header element using the createTHead method
    const tableHeader = table.createTHead();
    // Creates a new row element using the insertRow method
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
  
    headers.forEach((headerText) => {
      const headerCell = document.createElement("th");
      headerCell.classList.add("table-header");
      headerCell.textContent = headerText;
      headerRow.appendChild(headerCell);
    });
  }
  
  function processFinesData(finesDataArray) {
    const unpaidRows = [];
    const paidRows = [];
  
    finesDataArray.forEach((fineData) => {
      const { paymentStatus, fineNo } = fineData;
      const row = createTableRow(fineData);
      if (paymentStatus === "unpaid") {
        unpaidRows.push(row);
      } else if (paymentStatus === "paid") {
        row.classList.add("paid-row");
        paidRows.push(row);
      }
    });
  
    return { unpaidRows, paidRows };
  }
  
  function createTableRow(fineData) {
    const row = document.createElement("tr");
    const cells = createTableCells(fineData);
    cells.forEach((cell) => {
      row.appendChild(cell);
    });
    return row;
  }
  
  function createTableCells(fineData) {
    const { fineNo, description, imposedDateTime, dueDateTime, amount, demerit_points: demeritPoints, paymentStatus } = fineData;
    const cells = [
      createTableCell(fineNo),
      createTableCell(description),
      createTableCell(imposedDateTime),
      createTableCell(dueDateTime),
      createTableCell(amount),
      createTableCell(demeritPoints),
      createTableCell(paymentStatus),
      createPaymentStatusButton(paymentStatus, fineNo),
      createAddComplaintButton(paymentStatus, fineNo),
    ];
    return cells;
  }
  
  function createTableCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
  }
  
  function createPaymentStatusButton(paymentStatus, fineNo) {
    if (paymentStatus === "unpaid") {
      return displayButton("Pay", "paymentStatusButton", () => {
        redirectToPayment(fineNo);
      });
    } else {
      const emptyCell = document.createElement("td");
      emptyCell.textContent = " ";
      return emptyCell;
    }
  }
  
  function createAddComplaintButton(paymentStatus, fineNo) {
    if (paymentStatus === "unpaid") {
      return displayButton("Add", "addButton", () => {
        if (fineNo) redirectToAddComplaint(fineNo);
      });
    } else {
      const emptyCell = document.createElement("td");
      emptyCell.textContent = " ";
      return emptyCell;
    }
  }
  
  function appendRowsToTable(table, rows, rowClass) {
    rows.forEach((row) => {
      if (rowClass) {
        row.classList.add(rowClass);
      }
      table.appendChild(row);
    });
  }
  