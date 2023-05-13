//function abc()


import { displayMessage } from "/user-side/component/message/script.js";
import { displayImageFromSessionStorage } from "/user-side/component/profilePicture/script.js";

/* md5 algorithm */
// Import the MD5 function from the crypto-js library
const { MD5 } = CryptoJS;

// Calculate the MD5 hash
// const input = 'Hello, World!';
// const hash = MD5(input).toString();



// JQuery
var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

window.addEventListener("load", () => {
  //  Getting name from the session storage
  document.getElementById("profile-username").innerHTML =
    sessionStorage.getItem("name");
  

  displayImageFromSessionStorage("profilePicture", "profile-picture-container");

  // Get the fine no from the url and set it to the fine no input field
  const urlParams = new URLSearchParams(window.location.search);
  const fineNo = urlParams.get("fineNo");
  const nic = sessionStorage.getItem("nic");

  /*****************DISABLED BELOW CODE SINCE IDK Y AVISHI INCLUDED */
  // const fineNoElement = document.getElementById("fineNo");
  // if (fineNo) {
  //   fineNoElement.value = fineNo;
  //   fineNoElement.disabled = true;
  // }


  /* Mission PAyment Gateway Begins from here */

  /* Required Parameters are written down */

  let merchant_id  = "1223021"
  let return_url = ""
  let cancel_url =""
  let notify_url = ""
  let first_name = "Sachin"
  let last_name ="Thilaka" 
  let email = "stk@gmail.com"
  let phone = "0744444444"
  let address = "11, jaywardanapura MW, Rajagiriya"
  let city = "Colombo"
  let country = "Sri Lanka"
  let order_id = "101" // This is the fine no
  let items = "Fine Payment"
  let currency = "LKR"
  let amount = "1000.00"
  let merchant_secret  = "NDEyMjk3MTcyMTM2MjgzMzQ4MDgyOTk5ODYzNjA3MzM2MDE0MzExMA=="
  // let hash = toUpperCase(md5(merchant_id + order_id + amount + currency + toUpperCase(md5(merchant_secret))));
  let hash = toUpperCase(MD5(merchant_id + order_id + amount + currency + toUpperCase(MD5(merchant_secret).toString())).toString());
  console.log(hash);

  /* Now we are going to send the request to payhere.js */

    // Payment completed. It can be a successful failure.
    payhere.onCompleted = function onCompleted(orderId) {
      console.log("Payment completed. OrderID:" + orderId);
      alert('msg');
      
      // Note: validate the payment and show success or failure page to the customer
  };

  // Payment window closed
  payhere.onDismissed = function onDismissed() {
      // Note: Prompt user to pay again or show an error page
      console.log("Payment dismissed");
      alert('dismissed');
  };

  // Error occurred
  payhere.onError = function onError(error) {
      // Note: show an error page
      console.log("Error:"  + error);
      alert('error');
  };

      // Put the payment variables here
      var payment = {
        "sandbox": true,
        "merchant_id": "1223021",    // Replace your Merchant ID
        "return_url": "http://localhost:5501/user-side/user/payment/return.html",     // Important - Change this to your success page URL
        "cancel_url": "http://localhost:5501/user-side/user/payment/cancel.html",     // Important - Change this to your cancel page URL
        "notify_url": "",
        "order_id": order_id,
        "items": "Door bell wireles",
        "amount": "1000.00",
        "currency": "LKR",
        "hash": hash, // *Replace with generated hash retrieved from backend
        "first_name": "Saman",
        "last_name": "Perera",
        "email": "samanp@gmail.com",
        "phone": "0771234567",
        "address": "No.1, Galle Road",
        "city": "Colombo",
        "delivery_address": "No. 46, Galle road, Kalutara South",
        "delivery_city": "Kalutara",
        "delivery_country": "Sri Lanka",
        "custom_1": "",
        "custom_2": ""
    };

      // Show the payhere.js popup, when "PayHere Pay" is clicked
        document.getElementById('payhere-payment').onclick = function (e) {
          payhere.startPayment(payment);
      };


      /** to upper case function defined */

      function toUpperCase(str) {
        return str.toUpperCase();
      }
      

});
