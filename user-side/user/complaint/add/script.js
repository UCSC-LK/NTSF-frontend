import { addComplaintByUserId } from "service/complaintService.js";

window.addEventListener("load", () => {
  console.log("callback");
  //Enter user id here
  addComplaintByUserId(65, complaintDataHTMLinput);
});

function complaintDataHTMLinput() {
  const user_id = "65";
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  console.log(user_id);
  console.log(title);
  console.log(description);
}
