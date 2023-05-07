import {
  validateTitle,
  validateDescription,
} from "/user-side/util/validator.js";
import { displayMessage } from "/user-side/component/message/script.js";
import { validateInputField } from "/user-side/util/validator.js";
import { redirectToViewComplaints } from "/user-side/util/navigation.js";

// JQuery
var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

/**
 * Get the fine no from the url and set it to the fine no input field
 */
window.addEventListener("load", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const fineNo = urlParams.get("fineNo");

  const fineNoElement = document.getElementById("fineNo");
  if (fineNo) {
    fineNoElement.value = fineNo;
    fineNoElement.disabled = true;
  }
});

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

  if (isTitleValid && isDescriptionValid) {
    submitButtonElement.disabled = false;
  } else {
    submitButtonElement.disabled = true;
  }
};

/**
 * Submit the sign up form
 */
window.addComplaint = function addComplaint() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const fineNo = document.getElementById("fineNo").value;

  const userId = 107;
  // const userId = sessionStorage.getItem("userId");

  console.log("called");

  const query = $.param({
    title,
    description,
    fine_no: fineNo,
    user_id: userId,
  });

  const settings = {
    url: `http://localhost:8080/ntsf_backend_war/complaint?action=createComplaint&&${query}`,
    method: "POST",
  };

  $.ajax(settings)
    .done(complaintSuccessCallback)
    .fail(complaintUnsuccessCallback);
};

function complaintSuccessCallback(data) {
  // alert("Complaint added successfully");

  console.log("Complaint added successfully");

  displayMessage("Complaint added successfully", true, () => {
    redirectToViewComplaints();
  });
}

function complaintUnsuccessCallback() {
  // alert("The complaint was not added successfully");

  console.log("The complaint was not added successfully");
  displayMessage("The complaint was not added successfully", false);
}
