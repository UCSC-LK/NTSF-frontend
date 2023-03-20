import { getUserByNic } from "/user_service/service/policeService.js";

window.addEventListener("load", () => {
  console.log("callback");
  // Store NIC no
  getUserByNic("996129039V", userDataHTMLoutput);
});

function userDataHTMLoutput() {
    
    
  }