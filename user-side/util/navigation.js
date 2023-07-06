function redirect(url) {
  window.location.href = url;
}

export function redirectToLogin() {
  redirect("/user-side/user/login/index.html");
}

export function redirectToViewFines() {
  window.location.href = "/user-side/user/fines/index.html";
}

// export function redirectToAddComplaint() {
//   window.location.href = "/user-side/user/complaint/add/index.html";
// }

/**
 * Redirect to the Add Complaint form with the fine number as a query parameter
 * @param {Integer} fineNo
 */
export function redirectToAddComplaint(fineNo) {
  const complaintFormURL = "/user-side/user/complaint/add/index.html";
  const redirectURL = `${complaintFormURL}?fineNo=${fineNo}`;
  window.location.href = redirectURL;
}

export function redirectToViewComplaints() {
  window.location.href = "/user-side/user/complaint/view/index.html";
}

export function redirectToPayment(fineNo) {
  const paymentFormURL = "/user-side/user/payment/index.html";
  const redirectURL = `${paymentFormURL}?fineNo=${fineNo}`;
  window.location.href = redirectURL;
}
