var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

document.addEventListener("DOMContentLoaded", getUserFineData, false); // get_json_data is the function name that will fire on page load

function getUserFineData() {
  // document.cookie = "username=John Doe";
  // sessionStorage.setItem("user_type", "1");
  // sessionStorage.setItem("user_id", "68");

  const userId = sessionStorage.getItem("user_id");

  var settings = {
    url: `http://localhost:8080/ntsf/fine?&user_id=${userId}`,
    method: "GET",
  }; 

  

  $.ajax(settings).done(function (response) {
    console.log(response);

    var table = document.getElementById("finesTable");

    response.forEach((fine) => {
      var row = table.insertRow(table.rows.length);
      row.insertCell(0).innerHTML = fine.ticketNo;
      row.insertCell(1).innerHTML = fine.fineNo;
      row.insertCell(2).innerHTML = fine.date;
      row.insertCell(3).innerHTML = fine.dueDate;
      row.insertCell(4).innerHTML = fine.fineAmount;
      row.insertCell(5).innerHTML = fine.paymentStatus;
    });
  });
}
