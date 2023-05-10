import {
  validateTitle,
  validateDescription,
} from "/user-side/util/validator.js";
import { displayMessage } from "/user-side/component/message/script.js";
import { validateInputField } from "/user-side/util/validator.js";
import { redirectToViewComplaints } from "/user-side/util/navigation.js";
import { displayImageFromSessionStorage } from "/user-side/component/profilePicture/script.js";

// JQuery
var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

/**
 * Get the fine no from the URL and set it to the fine no input field
 */
window.addEventListener("load", () => {
  // Getting name from the session storage
  document.getElementById("profile-username").innerHTML =
    sessionStorage.getItem("name");

  // Allows to access and manipulate the query parameters of the current URL
  const urlParams = new URLSearchParams(window.location.search);

  // Retrieves the value of the "fineNo" parameter from the query string
  const fineNo = urlParams.get("fineNo");

  const fineNoElement = document.getElementById("fineNo");
  if (fineNo) {
    fineNoElement.value = fineNo;
    fineNoElement.disabled = true;
  }
});

/**
 * Validate the complaint form
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
 * Submit the complaint form
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
    // redirectToViewComplaints();
  });
}

function complaintUnsuccessCallback() {
  // alert("The complaint was not added successfully");

  console.log("The complaint was not added successfully");
  displayMessage("The complaint was not added successfully", false);
}

/**
 * Get the footage file and upload it
 */
document.getElementById("complaintForm").addEventListener("submit", (event) => {
  // Prevent the default form submission
  event.preventDefault();

  const footage = document.getElementById("footage");
  const footageFile = footage.files[0];

  if (footageFile) {
    const formData = new FormData();
    formData.append("footage", footageFile);

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const fineNo = document.getElementById("fineNo").value;
    const userId = 107; // Replace with the actual user ID

    formData.append("title", title);
    formData.append("description", description);
    formData.append("fine_no", fineNo);
    formData.append("user_id", userId);

    const uploadSettings = {
      url: "http://localhost:8080/ntsf_backend_war/complaint?action=createComplaint",
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,

      // Callback functions
      // Anonymous functions that will be executed if the AJAX request is successful or not
      success: function () {
        complaintSuccessCallback();
      },
      error: function () {
        complaintUnsuccessCallback();
      },
    };

    $.ajax(uploadSettings);
  } else {
    addComplaint();
  }
});
