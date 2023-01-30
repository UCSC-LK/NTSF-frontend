/*Returns True if NIC is valid */
let nicValidate = function(nicNumber)
{
    var nicNumber = nicNumber;
    if (validation(nicNumber)) {
        console.log("NIC is valid!!");
        console.log(nicNumber);
        /*NIC Number is valid */
        return true;
    }
    else {
        /*NIC Number is invalid */
        return false;
    }
}

/* If Valid returns True */
function validation(nicNumber) {
    var result = false;
    if (nicNumber.length === 10 && !isNaN(nicNumber.substr(0, 9)) && isNaN(nicNumber.substr(9, 1).toLowerCase()) && ['x', 'v'].includes(nicNumber.substr(9, 1).toLowerCase())) {
        result = true;
    } else if (nicNumber.length === 12 && !isNaN(nicNumber)) {
        result = true;
    } else {
        result = false;
    }
    return result;
}



 