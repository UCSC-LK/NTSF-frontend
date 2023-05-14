import md5 from 'crypto-js/md5';



function loadInformation(){

    let merchantSecret  = 'MTUyMDQxNjMxNjMwOTY2MjU0MzAxMjYzMzQwNzk4Mzc0NTIyMjQzOQ==';
let merchantId      = '1223182';
let orderId         = 'ItemNo12345';
let amount          = 1000;
let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
let amountFormated  = parseFloat( amount ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
let currency        = 'LKR';
let hash            = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();

document.getElementById('hash').value = hash;

}