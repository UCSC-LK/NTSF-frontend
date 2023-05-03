import {
  validateTitle,
  validateDescription,
} from "/user-side/util/validator.js";

/**
 *
 * @param {title/description} elementId
 * @param {validateTitle/validateDescription} validateFn
 * @returns
 */
function validateInputField(elementId, validateFn) {
  const inputElement = document.getElementById(elementId);

  if (!validateFn(inputElement.value)) {
    console.log(`Provided ${elementId} is invalid`);
    inputElement.classList.add("invalid");
    return false;
  }

  inputElement.classList.remove("invalid");
  return true;
}

/**
 * Validate the login form
 */
window.validateComplaintForm = function validateComplaintForm() {
  const submitButtonElement = document.getElementById("submit-btn");
  const isTitleValid = validateInputField("title", validateTitle);
  const isDescriptionValid = validateInputField(
    "description",
    validateDescription
  );

  // Enable the submit button if all the input fields are valid
  if (isTitleValid && isDescriptionValid) {
    submitButtonElement.disabled = false;
  } else {
    submitButtonElement.disabled = true;
  }
};

function addComplaint() {
  // let user_id = sessionStorage.getItem("user_id");
  // const user_id = "65";

  // Adding session storage to store the user id
  sessionStorage.setItem("userId", "65");
  const userId = sessionStorage.getItem("userId");

  let fineNo = document.getElementById("fineNo").value;
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  let httpReq = new XMLHttpRequest();
  httpReq.onreadystatechange = function () {
    if (this.readyState === 4) {
      addComplaintData(this); //This is where we get the response when the request was successfully send and a successful response was received
    }
  };

  httpReq.open(
    "POST",
    `http://localhost:8080/ntsf_backend_war/complaint?action=createComplaint&user_id=${userId}&fine_no=${fineNo}&title=${title}&description=${description}`,
    true
  );
  httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
}
