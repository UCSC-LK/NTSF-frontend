import { HOST_NAME } from "./constants.js";

export const getComplaintByUserId = (userId, callback) => {
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

  const queryString = `user_id=${userId}`;

  httpRequest.open("GET", `${HOST_NAME}/complaint?${queryString}`, true);
  httpRequest.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  httpRequest.send();
};
