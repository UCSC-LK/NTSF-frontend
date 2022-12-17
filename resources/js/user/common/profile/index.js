var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

document.addEventListener("DOMContentLoaded", getUserProfileData, false); // get_json_data is the function name that will fire on page load

function getUserProfileData() {
  // document.cookie = "username=John Doe";
  sessionStorage.setItem("user_type", "1");
  sessionStorage.setItem("user_id", "68");

  var settings = {
    url: `http://localhost:8080/ntsf/user?user_type=${sessionStorage.getItem(
      "user_type"
    )}&user_id=${sessionStorage.getItem("user_id")}`,
    method: "GET",
    timeout: 0,
  };

  console.log("called");

  $.ajax(settings).done(function (response) {
    console.log(response);

    document.getElementById("name").innerHTML = "Full Name : " + response.name;
    document.getElementById("mobile-no").innerHTML =
      "Mobile No : " + response.mobileNo;
    document.getElementById("nic").innerHTML = "NIC No : " + response.nic;
    document.getElementById("address").innerHTML =
      "Address : " + response.address;
  });
}
