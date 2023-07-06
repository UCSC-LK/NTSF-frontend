import { HOST_NAME } from "./constants.js";
import { attachAuthorizationHeader } from "./jwtHandler.js";
import { redirectToLogin } from "/user-side/util/navigation.js";

export const getFinesByNic = (nic, callback) => {
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

  const queryString = `nic=${nic}`;

  httpRequest.open("GET", `${HOST_NAME}/fine?${queryString}`, true);
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
