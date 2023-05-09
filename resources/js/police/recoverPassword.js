const form = document.getElementById("form");


form.addEventListener('submit', e => {
	e.preventDefault();
    sendOTP();
});

function sendOTP(){
    const recoverPoliceID = document.getElementById("police_id").value;
    console.log(recoverPoliceID);
    console.log("sendOTP");
    //Check if the police ID is valid or not on submit
    checkPoliceIDValidity(recoverPoliceID);
}


function checkPoliceIDValidity(recoverPoliceID){
    let alert = false;
    console.log("checkPoliceIDValidity");
    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkPoliceIDValidityData(this))
            {
                alert = true;
            }
            else
            {
                alert =  false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman_login", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.send("action=checkLoginUsername" + "&username=" + recoverPoliceID);

    function checkPoliceIDValidityData(httpReq)
    {
        console.log("checkPoliceIDValidityData");
        let jsonCheckPoliceIDValidityResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckPoliceIDValidityResponse);
        let jsonCheckPoliceIDValidityResponseAlert = jsonCheckPoliceIDValidityResponse.alert;
        console.log(jsonCheckPoliceIDValidityResponseAlert);

        if(jsonCheckPoliceIDValidityResponseAlert == true){ //returns true then the username is valid as it means duplicate data exist
            console.log("Valid Police ID");
            // setSuccessFor(document.getElementById("police_id"));
            sendingOTP(recoverPoliceID);
            return true;
        }
        else{
            console.log("Invalid Police ID");
            // setErrorFor(document.getElementById("police_id"), "Invalid Police ID");
            return false;
        }
    }
}

function sendingOTP(recoverPoliceID){
    //sendOTP  to the mail linked with the account
    let httpReq = new XMLHttpRequest();
    httpReq.onreadystatechange = function ()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(sendOTPStatus(this)){
                getMessage(true);
                console.log("OTP Sent Successfully");
                //Show the OTP input field
                document.getElementById("otp").style.display = "block";
                document.getElementById("otp").focus();
                document.getElementById("otp").required = true;
                document.getElementById("otp").placeholder = "Enter OTP";   

                //Change the Send OTP button to Verify OTP button
                document.getElementById("button").innerHTML = "Verify OTP";
                document.getElementById("button").setAttribute("onclick", "verifyOTP()"); 
                return true;
            }
            else{
                getMessage(false);
                console.log("OTP Sending Failed");
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman_login", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.send("action=sendOTP" + "&police_id=" + recoverPoliceID);

    function sendOTPStatus(httpReq){
        console.log("sendOTPStatus");
        let jsonSendOTPResponse = JSON.parse(httpReq.responseText);
        console.log(jsonSendOTPResponse);
        let jsonSendOTPResponseAlert = jsonSendOTPResponse.alert;
        console.log(jsonSendOTPResponseAlert);
        return jsonSendOTPResponseAlert;
    }

}



function getMessage(otpStatus) {
    let message = document.createElement("div");
    message.className = "message";

    if (otpStatus == false) {
        message.classList.add("danger");
        message.textContent = "OTP Sending Failed!!";

        document.body.appendChild(message);

        // deleteMessage(message);
    }
    else {
        message.classList.add("success");
        message.textContent = "OTP Sent Successfully";

        document.body.appendChild(message);

        // deleteMessage(message);
    }

}
