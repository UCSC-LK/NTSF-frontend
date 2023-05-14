/**********AVISHI */
import { displayMessage } from "/user-side/component/message/script.js";
import { displayImageFromSessionStorage } from "/user-side/component/profilePicture/script.js";

//JQUERY
var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

/************SURAIF */
/* md5 algorithm */
// Import the MD5 function from the crypto-js library
const { MD5 } = CryptoJS;
// Calculate the MD5 hash
// const input = 'Hello, World!';
// const hash = MD5(input).toString();

/** to upper case function defined */

function toUpperCase(str) {
return str.toUpperCase();
}
      


/************AVISHI */
window.addEventListener("load", () => {
    //  Getting name from the session storage
    document.getElementById("profile-username").innerHTML =
      sessionStorage.getItem("name");
    
  
    displayImageFromSessionStorage("profilePicture", "profile-picture-container");
  
    // Get the fine no from the url and set it to the fine no input field
    const urlParams = new URLSearchParams(window.location.search);
    // fineNo = urlParams.get("fineNo");
    nic = sessionStorage.getItem("nic");

});




  /* Mission PAyment Gateway Begins from here */
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


// Show the payhere.js popup, when "PayHere Pay" is clicked
document.getElementById('payhere-payment').onclick = function (e) {
    let merchant_secret = "MTUyMDQxNjMxNjMwOTY2MjU0MzAxMjYzMzQwNzk4Mzc0NTIyMjQzOQ==";
    let merchant_id  = "1223182";
    let return_url = "";
    let cancel_url = "";
    let notify_url = "";
    let first_name = "Saman";
    let last_name = "Perera";
    let email = "";
    let phone = "0771234567";
    let address = "No.1, Galle Road";
    let city = "Colombo";
    let country = "Sri Lanka";
    let order_id = "ItemNo12345";
    let items = "Door bell wireles";
    let currency = "LKR";
    let amount  =  "1000.00";
    let hash = toUpperCase(MD5(merchant_id + order_id + amount + currency + toUpperCase(MD5(merchant_secret).toString())).toString());
    console.log(hash);
  
    //Payment object we are going to send to the payhere
    var payment = {
        "sandbox": true,
        "merchant_id": "1223182",    // Replace your Merchant ID
        "return_url": "http://localhost:5501/user-side/user/payment/return.html",     // Important - Change this to your success page URL
        "cancel_url": "http://localhost:5501/user-side/user/payment/cancel.html",     // Important - Change this to your cancel page URL
        "notify_url": "http://localhost:5501/user-side/user/payment/notify.html",
        "order_id": "ItemNo12345",
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
        "custom_1": "ewewe",
        "custom_2": "ewewew"
    };

    console.log(payment);


    payhere.startPayment(payment);
}


  