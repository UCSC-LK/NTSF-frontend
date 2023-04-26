import { HOST_NAME } from "./constants.js";

export const getPointsByNic = (nic, callback) => {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
      const responseBody = this.responseText;
      console.log(responseBody);
      if (this.status === 200) {
        callback(JSON.parse(responseBody));
      } else {
      }
    }
  };

  const queryString = `nic=${nic}`;

  httpRequest.open("GET", `${HOST_NAME}/point_system?${queryString}`, true);
  httpRequest.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  httpRequest.send();
};
