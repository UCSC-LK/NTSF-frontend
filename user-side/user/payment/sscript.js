


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






