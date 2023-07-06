import { HOST_NAME } from "./constants.js";
import { attachAuthorizationHeader } from "./jwtHandler.js";
import { redirectToLogin } from "/user-side/util/navigation.js";

/**
 *
 * View complaints by user id
 * @param {*} userId
 * @param {*} callback
 */
export const getComplaintByUserId = (userId, callback) => {
  // Create a request
  const httpRequest = new XMLHttpRequest();
  // Attach a callback function to handle state change
  httpRequest.onreadystatechange = function () {
    // Request has been completed
    if (this.readyState === 4) {
      // this.responseText:
      // Retrieves the response data from the server as a string
      const responseBody = this.responseText;
      console.log(responseBody);
      // Successful response
      if (this.status === 200) {
        // JSON.parse(responseBody):
        // Converts the response data from a string to a JavaScript object
        callback(JSON.parse(responseBody));
        // Unauthorized response
      } else if (this.status === 401) {
        redirectToLogin();
      }
    }
  };

  const queryString = `user_id=${userId}`;

  // user_id and its value appended to the end of the URL
  //  (true) indicates that the request should be made asynchronously
  httpRequest.open("GET", `${HOST_NAME}/complaint?${queryString}`, true);
  httpRequest.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  // Attach authorization header
  if (attachAuthorizationHeader(httpRequest)) {
    // Send the request
    httpRequest.send();
    // Return true if the request has been sent successfully
    return true;
  }
  return false;
};

/**
 *
 * Add complaint by user id
 * @param {userId} userId
 * @param {Complaint title} title
 * @param {Complaint description} description
 * @param {Action} createComplaint
 * @param {Callback function} callback
 */
export const addComplaintByUserId = (
  userId,
  title,
  description,
  createComplaint,
  callback
) => {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
      const responseBody = this.responseText;
      console.log(responseBody);
      // 201 status code is commonly used for POST requests that create new resources on the server
      if (this.status === 201) {
        callback(JSON.parse(responseBody));
        alert("Complaint Added Successfully");
        window.location.href = "#";
      }
    } else if (this.status === 401) {
      redirectToLogin();
    } else {
      // handle error response
      alert("Complaint Not Added");
    }
  };

  const requestBody = {
    user_id: userId,
    title: title,
    description: description,
    action: createComplaint,
  };

  httpRequest.open("POST", `${HOST_NAME}/complaint`, true);
  httpRequest.setRequestHeader("Content-type", "application/json");
  httpRequest.send(JSON.stringify(requestBody));
};
