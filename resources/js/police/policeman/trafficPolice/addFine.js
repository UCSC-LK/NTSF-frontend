//Dynamically setting up the input coloumn for user_id based on fine_type
var fine_type = sessionStorage.getItem("fine_type");
console.log("fine_type: " + fine_type);

if(fine_type == "driver"){
    document.getElementById("user_id").placeholder = "Enter License No";
    document.querySelector('label[for="user_id"]').innerHTML = "License No:";
}
else if(fine_type == "vehicle"){
    document.getElementById("user_id").placeholder = "Enter Vehicle No";
    document.querySelector('label[for="user_id"]').innerHTML = "Vehicle No:";

    document.getElementById("driven_vehicle").setAttribute("hidden", true); //Make the drivenVehicle input coloumn visible
}
else if(fine_type == "pedestrian"){
    document.getElementById("user_id").placeholder = "Enter NIC";
    document.querySelector('label[for="user_id"]').innerHTML = "NIC:";

    document.getElementById("driven_vehicle").setAttribute("hidden", true); //Make the drivenVehicle input coloumn visible
}
else
{
    console.log("Error in setting up the input coloumn for user_id based on fine_type");
}

const form = document.getElementById('form');
const user_id = document.getElementById('user_id').value;
console.log("user_id: " + user_id)
const driven_vehicle = document.getElementById('driven_vehicle').value;
console.log("driven_vehicle: " + driven_vehicle)
const offence_no = document.getElementById('offence_no').value;
console.log("offence_no: " + offence_no)
const spot_description = document.getElementById('spot_description').value;
console.log("spot_description: " + spot_description)


var police_idSession = sessionStorage.getItem("user_police_id");
var police_stationSession = sessionStorage.getItem("user_police_station");
console.log("Printing below the police_id from session storage");
console.log("police_idSession: " + police_idSession);
console.log("police_stationSession: " + police_stationSession);

form.addEventListener('submit', e => {
	e.preventDefault();
    checkInputs();
});

//Input validating
function checkInputs() {
    
	// trim to remove the whitespaces
    //Enter here the code to validate fine_type
	const user_id = user_id.value.trim();
    const offence_no = offence_no.value.trim();
    const spot_description = spot_description.value.trim();

	let flagUser_id = 0;
    let flagOffence_no = 0;
    let flagSpot_description = 0;

    if(fine_type == "driver"){
        //user_id is license_no
        if(user_id === '') {
            setErrorFor(user_id, 'License No cannot be blank');
            flagUser_id = 1;
        }
        else if((user_id.match(/^[0-9]+$/)) == null){
            setErrorFor(user_id, 'License No should contain only numbers');
            flagUser_id = 1;
        }
        else if(user_id.length !== 10){
            setErrorFor(user_id, 'License No should contain 10 numbers');
            flagUser_id = 1;
        }
        else {
            setSuccessFor(user_id);
            flagUser_id = 0;
        }
    }
    else if(fine_type == "vehicle"){
        //user_id is vehicle_no
        if(user_id === '') {
            setErrorFor(user_id, 'Vehicle No cannot be blank');
            flagUser_id = 1;
        }
        else if((user_id.match(/^[a-zA-Z0-9]+$/)) == null){
            setErrorFor(user_id, 'Vehicle No should contain only letters and numbers');
            flagUser_id = 1;
        }
        else if(user_id.length < 6){
            setErrorFor(user_id, 'Vehicle No should contain at least 6 letters and numbers');
            flagUser_id = 1;
        }
        else if(user_id.length > 7){
            setErrorFor(user_id, 'Vehicle No should contain at most 7 letters and numbers');
            flagUser_id = 1;
        }
        else {
            setSuccessFor(user_id);
            flagUser_id = 0;
        }
    }
    else if(fine_type == "pedestrian"){
        //user_id is nic
        if(user_id === '') {
            setErrorFor(user_id, 'NIC cannot be blank');
            flagUser_id = 1;
        }
        else if((nicValidate(user_id) == false)){
            setErrorFor(user_id, 'Invalid NIC');
            flagUser_id = 1;
        }
        else {
            setSuccessFor(user_id);
            flagUser_id = 0;
        }
    }
    else{
        console.log("Error in validating user_id based on fine_type");
    }

    if(offence_no === '') {
        setErrorFor(offence_no, 'Offence No cannot be blank');
        flagOffence_no = 1;
    }
    else if((offence_no.match(/^[0-9]+$/)) == null){
        setErrorFor(offence_no, 'Offence No should contain only numbers');
        flagOffence_no = 1;
    }
    else if(offence_no.length !== 3){
        setErrorFor(offence_no, 'Offence No should contain 3 numbers, check the manual for offence no');
        flagOffence_no = 1;
    }
    else {
        setSuccessFor(offence_no);
        flagOffence_no = 0;
    }

    if(spot_description === '') {
        setErrorFor(spot_description, 'Spot Description cannot be blank');
        flagSpot_description = 1;
    }
    else if((spot_description.match(/^[a-zA-Z0-9]+$/)) == null){
        setErrorFor(spot_description, 'Spot Description should contain only letters and numbers');
        flagSpot_description = 1;
    }
    else if(spot_description.length < 10){
        setErrorFor(spot_description, 'Spot Description should contain at least 10 characters');
        flagSpot_description = 1;
    }
    else if(spot_description.length > 200){
        setErrorFor(spot_description, 'Spot Description should contain at most 200 characters');
        flagSpot_description = 1;
    }
    else {
        setSuccessFor(spot_description);
        flagSpot_description = 0;
    }

    if(flagUser_id === 0 && flagOffence_no === 0 && flagSpot_description === 0){
        console.log('came until js function for event listener of submit button');
        console.log(user_id, offence_no, spot_description);
        addFine(user_id, offence_no, spot_description);
    }
    else{
        return false;
    }
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

//Sending data to backend
// const addFineButton = document.getElementById("addFineButton");

const addFine = function(user_id, offence_no, spot_description)
{
    console.log('came until js function for addFine which sends data to backend');
    
    console.log("user_id: " + user_id);
    console.log("offence_no: " + offence_no);   
    console.log("spot_description: " + spot_description);

    let httpReq = new XMLHttpRequest();
    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            fineAdditionStatus = false;
            if(addFineData(this))
            {
                console.log("Fine added successfully");
                fineAdditionStatus = true;
            }
            else
            {
                console.log("Fine added failed");
                fineAdditionStatus = false;
            }
            getMessage(fineAdditionStatus);
        }
    }
    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/fine", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=addFine" + "&fine_type" + fine_type + "&user_id=" + user_id + "&driven_vehicle" + driven_vehicle + "&offence_no=" + offence_no + "&spot_description=" + spot_description + "&police_id=" + police_id + "&police_station=" + police_station);

    function addFineData(httpReq)
    {
        let jsonAddFineResponse = JSON.parse(httpReq.responseText);
        console.log(jsonAddFineResponse);
    }
    
}

function getMessage(fineAdditionStatus) {
    let message = document.createElement("div");
    message.className = "message";

    if (fineAdditionStatus == true) {
        message.classList.add("danger");
        message.textContent = "Oh no! It is cannot be blank";

        document.body.appendChild(message);

        deleteMessage(message);
    }
    else {
        message.classList.add("success");
        message.textContent = "Fine Added Successfully";

        document.body.appendChild(message);

        deleteMessage(message);
    }

}

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
        console.log("NIC is invalid in nicValidation.js!!");
    }
}

/* If Valid returns True */
function validation(nicNumber) {
    var result = false;
    if (nicNumber.length === 10 && !isNaN(nicNumber.substr(0, 9)) && isNaN(nicNumber.substr(9, 1).toLowerCase()) && ['x', 'v'].includes(nicNumber.substr(9, 1).toLowerCase())) {
        result = true;
        console.log("NIC of 10 digits is valid");
        setErrorFor(document.getElementById('nic'), 'NIC of 10 digits is valid');
    } else if (nicNumber.length === 12 && !isNaN(nicNumber)) {
        result = true;
        console.log(nic,"NIC of 12 digits is valid");
        setErrorFor(nic, 'NIC of 12 digits is valid');
    } else {
        result = false;
        console.log("NIC is invalid not 10 or 12");
        setErrorFor(nic, 'NIC is invalid not 10 or 12');
    }
    return result;
}






