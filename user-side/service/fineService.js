import { HOST_NAME } from "./constants.js";

export const getFinesByNic = (nic, fineType, callback) => {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
      const responseBody = this.responseText;
      console.log(responseBody);
      if (this.status === 200) {
        callback(JSON.parse(responseBody), fineType);
      } else {
      }
    }
  };

  const queryString = `nic=${nic}&fineType=${fineType}`;

  httpRequest.open("GET", `${HOST_NAME}/fine?${queryString}`, true);
  httpRequest.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  httpRequest.send();
};
