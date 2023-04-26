import { getPointsByNic } from "service/pointSystemService.js";

window.addEventListener("load", () => {
  console.log("callback");
  //Enter nic here
  getPointsByNic("996129039V", complaintDataHTMLoutput);
});

function complaintDataHTMLoutput(complaintDatArray) {
  const complaintTable = document.getElementById("table");

}
