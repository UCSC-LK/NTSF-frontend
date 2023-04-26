import {
  validateTitle,
  validateDescription,
  validateParams,
} from "../../../util/validator";

function addComplaint() {
  // let user_id = sessionStorage.getItem("user_id");
  const user_id = "65";
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  validateTitle(title);
  validateDescription(description);

  let validateStatusCode = validateParams(title, description);

  switch (validateStatusCode) {
    case 0:
      let httpReq = new XMLHttpRequest();
      httpReq.onreadystatechange = function () {
        if (this.readyState === 4) {
          addComplaintData(this); //This is where we get the response when the request was successfully send and a successful response was received
        }
      };

      httpReq.open(
        "POST",
        `http://localhost:8080/ntsf_backend_war/complaint?action=createComplaint&user_id=${user_id}&title=${title}&description=${true}`,
        true
      );
      httpReq.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      httpReq.send();

      function addComplaintData(httpReq) {
        let jsonAddComplaintResponse = JSON.parse(
          httpReq.responseText
        ); /* Here when we receive the response from the server, we convert it to JSON format as it */

        if (httpReq.status === 200) {
          alert("Complaint Added Successfully");
          window.location.href = "#";
        } else {
          alert("Complaint Not Added");
        }
        console.log(jsonAddComplaintResponse);
      }
      break;

    case 1:
      alert("Title is invalid");
      break;
    case 2:
      alert("Description is invalid");
      break;
  }
}
