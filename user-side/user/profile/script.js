import { getUserProfileInfo } from "/user-side/service/profileService.js";

window.addEventListener("load", () => {
  console.log("callback");
  //Enter user id here
  getUserProfileInfo("996129039V", profileDataHTMLoutput);
});

function profileDataHTMLoutput(profileData) {
  const userId = profileData.user.userId;
  console.log(userId);
  document.getElementById("user-id").innerHTML = "User Id: " + userId;
}
