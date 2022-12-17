function gotoProfile() {
  var settings = {
    url: "http://localhost:8080/ntsf/user?user_type=1&user_id=68",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}
