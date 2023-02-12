const loadComplaintDetails = function () {
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
    "http://localhost:8080/ntsf_backend_war/complaintServlet",
    true
  );
  httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpreq.send("action=complaintServlet");

  function completeLoad(httpreq) {
    let jsonComplaintData = JSON.parse(httpreq.responseText);
    console.log(jsonComplaintData);

    if (
      jsonComplaintData.serverResponse === "null session" ||
      jsonComplaintData.serverResponse === "Not Allowed"
    ) {
      window.location.href =
        "http://localhost:8080/ntsf_backend_war/userLoginServlet"; //Redirect to login page
      console.log("Redirecting to login page");
    } else if (jsonComplaintData.serverResponse === "Allowed") {
      console.log("Allowed");

      const complaintData = document.getElementById("complaintData");
      complaintData.innerHTML = "";

      let count = jsonComplaintData.List.length - 1;
      for (i = 0; i <= count; i++) {
        fineDataHTMLoutput(
          jsonComplaintData.List[i].complaintNo,
          jsonComplaintData.List[i].title,
          jsonComplaintData.List[i].date,
          jsonComplaintData.List[i].status
        );
      }
    } else {
      alert("Something went wrong");
    }
  }
  return jsonComplaintData;
};

function fineDataHTMLoutput(complaintNo, title, date, status) {
  console.log(complaintNo);
  console.log(title);
  console.log(date);
  console.log(status);

  // create table data row
  var dataRow = table.insertRow();
  var dataCell1 = dataRow.insertCell(0);
  var dataCell2 = dataRow.insertCell(1);
  var dataCell3 = dataRow.insertCell(2);
  var dataCell4 = dataRow.insertCell(3);

  //Add content to the table data cells
  dataCell1.innerHTML = complaintNo;
  dataCell2.innerHTML = title;
  dataCell3.innerHTML = date;
  dataCell4.innerHTML = status;
}

//   //Month Arrays -----------------------------------------------------------
// var monthsEnglish = ["January","February","March","April", "May", "June", "July", "August", "September","October","November","December"];
// var monthsSpanish = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre ","Octubre ","Noviembre","Diciembre"];
// //Static content ---------------------------------------------------------
// document.write("<table border='1' width='200'>")
// document.write("<tr><th>Month #</th><th>English</th><th>Spanish</th></tr>");
// //Dynamic content --------------------------------------------------------
// for(var i=0; i<12;i++)
// {
// 	document.write("<tr><td>" + (i+1) + "</td><td>" + monthsEnglish[i] + "</td><td>" + monthsSpanish[i] +"</td></tr>");
// }
// //Static content  --------------------------------------------------------
// document.write("</table>")
