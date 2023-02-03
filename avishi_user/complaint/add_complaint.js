const addComplaintButton = document.getElementById("addComplaintButton");

function checkInputs() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  let flag = 1;

  if (title === "") {
    setErrorFor(title, "Title cannot be blank");
    flag = 1;
  } else if (title.length < 5) {
    setErrorFor(title, "Title should contain at least 5 characters");
    flag = 1;
  } else if (title.length > 50) {
    setErrorFor(title, "Title should contain at most 50 characters");
    flag = 1;
  } else {
    setSuccessFor(title);
    flag = 0;
  }

  if (description === "") {
    setErrorFor(description, "Description cannot be blank");
    flag = 1;
  } else if (description.length < 5) {
    setErrorFor(
      description,
      "Description should contain at least 5 characters"
    );
    flag = 1;
  } else if (description.length > 100) {
    setErrorFor(
      description,
      "Description should contain at most 100 characters"
    );
    flag = 1;
  } else {
    setSuccessFor(description);
    flag = 0;
  }

  if (flag === 0) {
    addComplaint();
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

const addComplaint = function () {
  let userId = sessionStorage.getItem("userId");
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  console.log(userId);
  console.log(title);
  console.log(description);

  let httpReq = new XMLHttpRequest();
  httpReq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      addComplaintData(this); //This is where we get the response when the request was successfully send and a successful response was received
    }
  };

  httpReq.open(
    "POST",
    "http://localhost:8080/ntsf_backend_war/complaint",
    true
  );
  httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpReq.send(
    "action=createComplaint" +
      "&userId=" +
      userId +
      "&title=" +
      title +
      "&description=" +
      description
  );

  function addComplaintData(httpReq) {
    let jsonAddComplaintResponse = JSON.parse(
      httpReq.responseText
    ); /* Here when we recieve the response from the server, we convert it to JSON format as it 

    */

    if (jsonAddComplaintResponse.status === "success") {
      alert("Complaint Added Successfully");
      window.location.href =
        "http://localhost:8080/ntsf_frontend_war/user/complaints.html";
    } else {
      alert("Complaint Not Added");
    }
    console.log(jsonAddComplaintResponse);
  }
};
