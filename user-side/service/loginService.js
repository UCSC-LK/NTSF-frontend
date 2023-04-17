import { HOST_NAME } from "./constants.js";

export const submitLogin = (nic, password, callback) => {
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

  const queryString = `nic=${nic}, password=${password}`;

  httpRequest.open("POST", `${HOST_NAME}/user_login?${queryString}`, true);
  httpRequest.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  httpRequest.send();
};
