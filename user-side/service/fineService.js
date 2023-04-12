import { HOST_NAME } from "./constants.js";

export const getFinesByNic = (nic, offenceType, callback) => {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
      const responseBody = this.responseText;
      console.log(responseBody);
      if (this.status === 200) {
        callback(JSON.parse(responseBody), offenceType);
      } else {
      }
    }
  };

  const queryString = `nic=${nic}&offence_type=${offenceType}`;

  httpRequest.open("GET", `${HOST_NAME}/fine?${queryString}`, true);
  httpRequest.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  httpRequest.send();
};