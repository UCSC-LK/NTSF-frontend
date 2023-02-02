const doPost = () => {
  httpReq.onreadystatechange = () => {
    if (this.readyState == 4 && this.status == 200) {
      if (checkloginAuthorizingBackend(this)) {
        return true;
      } else {
        return false;
      }
    }
  };

  httpReq.open(
    "POST",
    "http://localhost:8080/ntsf_backend_war/policemanLogin",
    true
  );
  httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpReq.send("username=" + username + "&password=" + password);

  function checkloginAuthorizingBackend(httpReq) {
    console.log("checkloginAuthorizingBackend");
    let jsonCheckloginAuthorizingBackendResponse = JSON.parse(
      httpReq.responseText
    );
    console.log(jsonCheckloginAuthorizingBackendResponse);
    let checkloginAuthorizingBackendResponseAuthorization =
      jsonCheckloginAuthorizingBackendResponse.authorization;
    if (checkloginAuthorizingBackendResponseAuthorization === "true") {
      let checkloginAuthorizingBackendResponseRank =
        jsonCheckloginAuthorizingBackendResponse.rank;
      if (checkloginAuthorizingBackendResponseRank === "igp") {
        window.location.href =
          "http://localhost:8080/ntsf_frontend_war/igp.html";
      } else if (checkloginAuthorizingBackendResponseRank === "oic") {
        window.location.href =
          "http://localhost:8080/ntsf_frontend_war/oic.html";
      } else if (checkloginAuthorizingBackendResponseRank === "policeman") {
        window.location.href =
          "http://localhost:8080/ntsf_frontend_war/policeman.html";
      }
      return true;
    } else {
      return false;
    }
  }
};
