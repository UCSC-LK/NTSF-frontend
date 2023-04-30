import { HOST_NAME } from "./constants.js";

export const getFinesByNic = (nic, offenceType, callback) => {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
      const responseBody = this.responseText;
      const offenceType = this.getResponseHeader("offence_type");
      const amount = this.getResponseHeader("amount");
      console.log(responseBody);
      if (this.status === 200) {
        callback(JSON.parse(responseBody), offenceType, amount);
      } else {
      }
    }
  };

  const queryString = `nic=${nic}`;

  httpRequest.open("GET", `${HOST_NAME}/fine?${queryString}`, true);
  httpRequest.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  httpRequest.send();
};
