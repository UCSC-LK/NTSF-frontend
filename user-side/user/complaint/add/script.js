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

window.addEventListener("load", () => {
  //  Getting name from the session storage
  document.getElementById("profile-username").innerHTML =
    sessionStorage.getItem("name");

  displayImageFromSessionStorage("profilePicture", "profile-picture-container");

  // Get the fine no from the url and set it to the fine no input field
  const urlParams = new URLSearchParams(window.location.search);
  const fineNo = urlParams.get("fineNo");

  const fineNoElement = document.getElementById("fineNo");
  if (fineNo) {
    fineNoElement.value = fineNo;
    fineNoElement.disabled = true;
  }
});

// /**
//  * Get footage file from the form
//  */
// form.addEventListener("submit", () => {
//   // const enctype = form.enctype;
//   // console.log(enctype);

//   const footage = document.getElementById("footage");

//   const footage_file = footage.files[0];

//   console.log(footage_file);

//   // checkInputs(footage_file);
// });

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
 * Submit the sign up form
 */
window.addComplaint = function addComplaint() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const fineNo = document.getElementById("fineNo").value;

  /**
   * Get the user id from the session storage | userId = 107
   */
  const userId = sessionStorage.getItem("userId");
  console.log(userId);

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
