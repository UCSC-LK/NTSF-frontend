const recoverPoliceID = document.getElementById("police_id");

function sendOTP(){
    console.log("sendOTP");
    const recoverPoliceIDValue = document.getElementById("police_id").value;
    console.log(recoverPoliceIDValue)

    //Check if the police ID is valid or not


    //Send OTP to the email linked with this account

    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function ()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            // otpSentStatus = false;
            if(sendOTPStatus(this) == true){
                // getMessage(true);
                console.log("OTP Sent Successfully");
                return true;
                // otpSentStatus = true;

                // //Show the OTP input field
                // document.getElementById("otp").style.display = "block";
                // document.getElementById("otp").focus();
                // document.getElementById("otp").required = true;
                // document.getElementById("otp").placeholder = "Enter OTP";   

                // //Change the Send OTP button to Verify OTP button
                // document.getElementById("button").innerHTML = "Verify OTP";
                // document.getElementById("button").setAttribute("onclick", "verifyOTP()"); 
                
            }
            else{
                // getMessage(false);
                console.log("OTP Sending Failed");
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman_login", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.send("action=sendOTP" + "&police_id=" + recoverPoliceIDValue);
    
    function sendOTPStatus(httpReq){
        console.log("sendOTPStatus");
        let jsonSendOTPResponse = JSON.parse(httpReq.responseText);
        console.log(jsonSendOTPResponse);
        let jsonSendOTPResponseAlert = jsonSendOTPResponse.alert;
        console.log(jsonSendOTPResponseAlert);
        
        return jsonSendOTPResponseAlert;
    }

}

// function verifyOTP(){
//     console.log("verifyOTP");
//     const otp = document.getElementById("otp").value;

//     //Verify the OTP
//     //If OTP is correct, show the Redirect to Change Password form
//     // window.location.href = "changePassword.html";

//     //If OTP is incorrect, show a message that OTP is incorrect

//     //If OTP is not entered, show a message that OTP is required

//     //count wrong OTP attempts for this account to be three and then disable the account


// }



// function getMessage(otpStatus) {
//     let message = document.createElement("div");
//     message.className = "message";

//     if (otpStatus == false) {
//         message.classList.add("danger");
//         message.textContent = "OTP Sending Failed!!";

//         document.body.appendChild(message);

//         deleteMessage(message);
//     }
//     else {
//         message.classList.add("success");
//         message.textContent = "OTP Sent Successfully";

//         document.body.appendChild(message);

//         deleteMessage(message);
//     }

// }