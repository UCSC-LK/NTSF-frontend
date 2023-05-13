import { getUserProfileInfo } from "/user-side/service/profileService.js";
import dataModel from "./profileData.js";
import { displayImageFromSessionStorage } from "/user-side/component/profilePicture/script.js";

window.addEventListener("load", () => {
  console.log("callback");

  // Getting name from the session storage
  document.getElementById("profile-username").innerHTML =
    sessionStorage.getItem("name");

  displayImageFromSessionStorage("profilePicture", "profile-picture-container");
  // displayImageFromSessionStorage("profilePicture", "img-container");

  // Getting nic from the session storage
  const nic = sessionStorage.getItem("nic");
  console.log(nic);

  if (!getUserProfileInfo(nic, profileDataHTMLoutput)) {
    alert("Login Expired");
    window.location.href = "/user-side/user/login/index.html";
  }
});

/**
 * Create cards for each data model
 * There are 4 data models
 * So 4 cards will be created
 * 1. user
 * 2. driver
 * 3. vehicle
 * 4. people
 * @param {*} profileData | HTML response from getUserProfileInfo() in profileService.js
 */
function profileDataHTMLoutput(profileData) {
  if (profileData) {
    // Create card for user data model
    // Call createProfileDataCard() to create card for user data model
    if (profileData.user) {
      createProfileDataCard("user-info-card", dataModel.user, profileData.user);
    }
    // Call createProfileDataCard() to create card for driver data model
    if (profileData.driver) {
      createProfileDataCard(
        "driver-info-card",
        dataModel.driver,
        profileData.driver
      );
    }
    // Call createProfileDataCard() to create card for vehicle data model
    if (profileData.vehicle) {
      createProfileDataCard(
        "vehicle-info-card",
        dataModel.vehicle,
        profileData.vehicle
      );
    }
    // Call createProfileDataCard() to create card for people data model
    if (profileData.people) {
      createProfileDataCard(
        "personal-info-card",
        dataModel.people,
        profileData.people
      );
    }
    // Display username in the profile header
    if (profileData.people) {
      document.getElementById("profile-username").innerHTML =
        profileData.people.name;
      displayImageFromSessionStorage(
        "profilePicture",
        "personal-info-card-img"
      );
    } else {
      // If profile data is not available
      document.getElementById("profile-data-container").remove();
    }
  }
}

/**
 *
 * @param {*} id | Id of the card
 * @param {*} dataModel | Data model for the card (Get from profileData.js)
 * @param {*} profileData | Data for the card (Get from getUserProfileInfo() in profileService.js
 */
function createProfileDataCard(id, dataModel, profileData) {
  // Get the card element
  const profileCard = document.getElementById(id);

  // Create info fields for each data model
  Object.entries(dataModel).map(([key, value]) => {
    // Call createInfoField() to create info field for each data model
    const infoField = createInfoField(value, profileData[key]);
    if (infoField) {
      // Append info field to profile card
      profileCard.appendChild(infoField);
    }
  });
}

/**
 * Create info field for each data model
 * Create key value pair for each info field | (key = labelName, value = value)
 * @param {*} labelName | Label name for the info field
 * @param {*} value | Value for the info field
 * @returns
 */
function createInfoField(labelName, value) {
  let infoField = null;
  if (labelName && value) {
    // Create info field
    infoField = document.createElement("div");
    // Add classes to info field
    infoField.classList.add("info-field");

    // Create info field label and value
    const infoFieldLabel = document.createElement("span");
    // Add classes to info field label
    infoFieldLabel.classList.add("info-field-label");
    // Set label name
    infoFieldLabel.innerHTML = labelName;

    // Create info field value
    const infoFieldValue = document.createElement("span");
    // Add classes to info field value
    infoFieldValue.classList.add("info-field-value");
    // Set value
    infoFieldValue.innerHTML = ` : ${value}`;

    // Append label and value to info field
    infoField.appendChild(infoFieldLabel);
    infoField.appendChild(infoFieldValue);
  }
  // Return info field
  return infoField;
}
