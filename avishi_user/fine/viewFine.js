const loadFineDetails = function () {
  var table = document.getElementById("table");

  console.log("I was called onload");
  let httpreq = new XMLHttpRequest();
  httpreq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      completeLoad(this);
    }
  };

  httpreq.open(
    "POST",
    "http://localhost:8080/ntsf_backend_war/fineServlet",
    true
  );
  httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpreq.send("action=fineServlet");

  function completeLoad(httpreq) {
    let jsonFineData = JSON.parse(httpreq.responseText);
    console.log(jsonFineData);

    if (
      jsonFineData.serverResponse === "null session" ||
      jsonFineData.serverResponse === "Not Allowed"
    ) {
      window.location.href = "http://localhost:8080/ntsf_backend_war/login"; //Redirect to login page
      console.log("Redirecting to login page");
    } else if (jsonFineData.serverResponse === "Allowed") {
      console.log("Allowed");

      const fineData = document.getElementById("fineData");
      fineData.innerHTML = "";

      let count = jsonFineData.List.length - 1;
      for (i = 0; i <= count; i++) {
        fineDataHTMLoutput(
          jsonFineData.List[i].ticketNo,
          jsonFineData.List[i].fineNo,
          jsonFineData.List[i].date,
          jsonFineData.List[i].dueDate,
          jsonFineData.List[i].fineAmount,
          jsonFineData.List[i].fineType,
          jsonFineData.List[i].fineStatus
        );
      }
    } else {
      alert("Something went wrong");
    }
  }
  return jsonFineData;
};

function fineDataHTMLoutput(
  ticketNo,
  fineNo,
  date,
  dueDate,
  fineAmount,
  fineType,
  fineStatus
) {
  console.log(ticketNo);
  console.log(fineNo);
  console.log(date);
  console.log(dueDate);
  console.log(fineAmount);
  console.log(fineType);
  console.log(fineStatus);

  // create table data row
  var dataRow = table.insertRow();
  var dataCell1 = dataRow.insertCell(0);
  var dataCell2 = dataRow.insertCell(1);
  var dataCell3 = dataRow.insertCell(2);
  var dataCell4 = dataRow.insertCell(3);
  var dataCell5 = dataRow.insertCell(4);
  var dataCell6 = dataRow.insertCell(5);
  var dataCell7 = dataRow.insertCell(6);

  //Add content to the table data cells
  dataCell1.innerHTML = ticketNo;
  dataCell2.innerHTML = fineNo;
  dataCell3.innerHTML = date;
  dataCell4.innerHTML = dueDate;
  dataCell5.innerHTML = fineAmount;
  dataCell6.innerHTML = fineType;
  dataCell7.innerHTML = fineStatus;
}
