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
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
      const responseBody = this.responseText;
      console.log(responseBody);
      if (this.status === 200) {
        callback(JSON.parse(responseBody));
      } else if (this.status === 401) {
        redirectToLogin();
      }
    }
  };

  const queryString = `user_id=${userId}`;

  httpRequest.open("GET", `${HOST_NAME}/complaint?${queryString}`, true);
  httpRequest.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  if (attachAuthorizationHeader(httpRequest)) {
    httpRequest.send();
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
      } else {
        // handle error response
        alert("Complaint Not Added");
      }
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
