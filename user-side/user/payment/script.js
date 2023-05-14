import md5 from 'crypto-js/md5';

function loadInformation(){

    const urlParams = new URLSearchParams(window.location.search);
    fineNo = urlParams.get("fineNo");
    nic = sessionStorage.getItem("nic");

    // fetch information from the fine table using fine no

    // fetch information from the user table using nic



let merchantSecret  = 'MTUyMDQxNjMxNjMwOTY2MjU0MzAxMjYzMzQwNzk4Mzc0NTIyMjQzOQ==';
let merchantId      = '1223182';
let orderId         = '101'; //fine_no
let amount          = 1000;
let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
let amountFormated  = parseFloat( amount ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
let currency        = 'LKR';
let hash            = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();

document.getElementById('hash').value = hash;

document.getElementById('merchantId').value = merchantId;
document.getElementById('orderId').value = orderId;
document.getElementById('amount').value = amountFormated;
document.getElementById('currency').value = currency;
d



}

