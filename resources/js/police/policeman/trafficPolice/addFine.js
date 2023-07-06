var latitude;
var longitude;

//Dynamically setting up the input coloumn for user_id based on offence_type
var offence_type = sessionStorage.getItem("offence_type");
console.log("offence_type: " + offence_type);

if(offence_type == "driver"){
    document.getElementById("addFineType").innerHTML = "Add Driver Fine";
    document.getElementById("user_id").placeholder = "Enter License No";
    document.querySelector('label[for="user_id"]').innerHTML = "License No:";
}
else if(offence_type == "vehicle"){
    document.getElementById("addFineType").innerHTML = "Add Vehicle Fine";
    document.getElementById("user_id").placeholder = "Enter Vehicle No";
    document.querySelector('label[for="user_id"]').innerHTML = "Vehicle No:";

    document.getElementById("driven_vehicle_div").setAttribute("hidden", true); //Make the drivenVehicle input coloumn invisible
}
else if(offence_type == "pedestrian"){
    document.getElementById("addFineType").innerHTML = "Add Pedestrian Fine";
    document.getElementById("user_id").placeholder = "Enter NIC";
    document.querySelector('label[for="user_id"]').innerHTML = "NIC:";

    document.getElementById("driven_vehicle_div").setAttribute("hidden", true); //Make the drivenVehicle input coloumn invisible
}
else
{
    console.log("Error in setting up the input coloumn for user_id based on offence_type");
}


const form = document.getElementById('form');
const user_id = document.getElementById('user_id');
const driven_vehicle = document.getElementById('driven_vehicle');
const offence_no = document.getElementById('offence_no');
const spot_description = document.getElementById('spot_description');

var police_idSession = sessionStorage.getItem("user_police_id");
var police_stationSession = sessionStorage.getItem("user_police_station");
console.log("Printing below the police_id from session storage");
console.log("police_idSession: " + police_idSession);
console.log("police_stationSession: " + police_stationSession);


document.getElementById('user_id').addEventListener('blur', function(){
    console.log("user_id blur event");
    let user_idValue = user_id.value.trim();
    if(user_idValue !== ''){
        if(offence_type == "driver")
        {
            checkUser_IDasLicenseNo(user_idValue);
            console.log("user_idValue: " + user_idValue);

        }
        else if(offence_type == "vehicle")
        {
            checkUser_IDasVehicleNo(user_idValue);
            console.log("user_idValue: " + user_idValue);

        }
        else if(offence_type == "pedestrian")
        {
            checkUser_IDasNIC(user_idValue);
            console.log("user_idValue: " + user_idValue);

        }
    }
});



function getCoordinates() {
    return new Promise(function(resolve, reject) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            resolve({ latitude, longitude }); // Resolve the promise with the coordinates object
          },
          function(error) {
            reject(error); // Reject the promise with the error object
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser.")); // Reject the promise if geolocation is not supported
      }
    });
  }
  
  // Usage
  getCoordinates()
    .then(function(coordinates) {
       latitude = coordinates.latitude;
      longitude = coordinates.longitude;
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
    })
    .catch(function(error) {
      console.log("Error:", error.message);
    });  


form.addEventListener('submit', e => {
	e.preventDefault();
    const footage = document.getElementById('footage');
    const footageFile = footage.files[0];
    checkInputs(footageFile);
});

//Input validating
function checkInputs(footageFile) {
    
	// trim to remove the leading and trailing whitespaces
    //Enter here the code to validate offence_type
    const user_idValue = user_id.value.trim();
    const offence_noValue = offence_no.value.trim();
    const spot_descriptionValue = spot_description.value.trim();
    const driven_vehicleValue = driven_vehicle.value.trim();

    console.log("user_idValue: " + user_idValue);
    console.log("offence_noValue: " + offence_noValue);
    console.log("spot_descriptionValue: " + spot_descriptionValue);
    console.log("driven_vehicleValue: " + driven_vehicleValue);

	let flagUser_id = 1; //error exists
    let flagOffence_no = 1; //error exists
    let flagSpot_description = 1; //error exists
    let flagDriven_vehicle = 0; //error doesnt exists

    if(offence_type == "driver"){
        //user_id is license_no
        if(user_idValue === '') {
            setErrorFor(user_id, 'License No cannot be blank');
            flagUser_id = 1;
        }
        else if (!/^B\d{7}$/.test(user_idValue)) {
            setErrorFor(user_id, 'License No should start with B and contain 7 digits');
            flagUser_id = 1;
        }
        else {
            setSuccessFor(user_id);
            flagUser_id = 0;
        }   
    }
    else if(offence_type == "vehicle"){
        //user_id is vehicle_no
        if(user_idValue === '') {
            setErrorFor(user_id, 'Vehicle No cannot be blank');
            flagUser_id = 1;
        }
        else if((user_idValue.match(/^([a-zA-Z]{1,3}|((?!0*-)[0-9]{1,3}))-[0-9]{4}(?<!0{4})/m)) == null){
            setErrorFor(user_id, 'Vehicle No Invalid');
            flagUser_id = 1;
        }
        else {
            setSuccessFor(user_id);
            flagUser_id = 0;
        }
    }
    else if(offence_type == "pedestrian"){
        //user_id is nic
        if(user_idValue === '') {
            setErrorFor(user_id, 'NIC cannot be blank');
            flagUser_id = 1;
        }
        else if((nicValidate(user_idValue) == false)){
            setErrorFor(user_id, 'Invalid NIC');
            flagUser_id = 1;
        }
        else {
            setSuccessFor(user_id);
            flagUser_id = 0;
        }
    }
    else{
        console.log("Error in validating user_id based on offence_type");
    }

    //driven_vehicle number is validated here
    // if(driven_vehicleValue === '') {
    //     setErrorFor(driven_vehicle, 'Driven Vehicle No cannot be blank');
    //     flagDriven_vehicle = 1;
    // }

    // else if((driven_vehicleValue.match(/^([a-zA-Z]{1,3}|((?!0*-)[0-9]{1,3}))-[0-9]{4}(?<!0{4})/m)) == null){
    //     setErrorFor(driven_vehicle, 'Driven Vehicle No Invalid');
    //     flagDriven_vehicle = 1;
    // }

    // else {
    //     setSuccessFor(driven_vehicle);
    //     flagDriven_vehicle = 0;
    // }

    if(offence_noValue === '') {
        setErrorFor(offence_no, 'Offence No cannot be blank');
        flagOffence_no = 1;
    }
    else if((offence_noValue.match(/^[0-9]+$/)) == null){
        setErrorFor(offence_no, 'Offence No should contain only numbers');
        flagOffence_no = 1;
    }
    else if(offence_noValue.length > 3){
        setErrorFor(offence_no, 'Offence No must have 3 or less digits, refer to manual.');
        flagOffence_no = 1;
    }
    else {
        setSuccessFor(offence_no);
        flagOffence_no = 0;
    }

    if(spot_descriptionValue === '') {
        setErrorFor(spot_description, 'Spot Description cannot be blank');
        flagSpot_description = 1;
    }
    else if((spot_descriptionValue.match(/^[a-zA-Z0-9 ]+$/)) == null){
        setErrorFor(spot_description, 'Spot Description should contain only letters and numbers');
        flagSpot_description = 1;
    }
    else if(spot_descriptionValue.length < 10){
        setErrorFor(spot_description, 'Spot Description should contain at least 10 characters');
        flagSpot_description = 1;
    }
    else if(spot_descriptionValue.length > 200){
        setErrorFor(spot_description, 'Spot Description should contain at most 200 characters');
        flagSpot_description = 1;
    }
    else {
        setSuccessFor(spot_description);
        flagSpot_description = 0;
    }

    console.log("flagUser_id: " + flagUser_id);
    console.log("flagOffence_no: " + flagOffence_no);
    console.log("flagSpot_description: " + flagSpot_description);
    console.log("flagDriven_vehicle: " + flagDriven_vehicle);

    if(flagUser_id === 0 && flagDriven_vehicle === 0 && flagOffence_no === 0 && flagSpot_description === 0){
        console.log('came until js function for event listener of submit button');
        console.log(user_idValue, offence_noValue, spot_descriptionValue);
        // let latitude = getLatitude();
        console.log(latitude);
        // let longitude = getLongitude();
        console.log(longitude);
        addFine(user_idValue, driven_vehicleValue , offence_noValue, spot_descriptionValue, police_idSession, police_stationSession, footageFile, latitude, longitude);
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

const addFine = function(user_idValue, driven_vehicleValue, offence_noValue, spot_descriptionValue, police_id, police_station, footageFile, latitude, longitude)
{
    console.log('came until js function for addFine which sends data to backend');
    
    console.log("user_id: " + user_idValue);
    console.log("offence_no: " + offence_noValue);   
    console.log("spot_description: " + spot_descriptionValue);

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
    // httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/fine", true);
    // httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    // httpReq.send("action=addFine" + "&offence_type=" + offence_type + "&user_id=" + user_idValue + "&driven_vehicle" + driven_vehicle + "&offence_no=" + offence_noValue + "&spot_description=" + spot_descriptionValue + "&police_id=" + police_id + "&police_station=" + police_station);

    const form_data = new FormData();
    form_data.append("action", "addFine");
    form_data.append("offence_type", offence_type);
    form_data.append("user_id", user_idValue);
    form_data.append("driven_vehicle", driven_vehicleValue);
    form_data.append("offence_no", offence_noValue);
    form_data.append("spot_description", spot_descriptionValue);
    form_data.append("police_id", police_id);
    form_data.append("police_station", police_station);
    form_data.append("footage_file", footageFile); //footage file is not validated
    form_data.append("latitude", latitude); ///not validated
    form_data.append("longitude", longitude); //not validated   

    console.log(latitude);
    console.log(longitude);

    console.log(form_data.get("footageFile"));

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/fine", true);
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send(form_data);

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

function deleteMessage(el) {
    setTimeout(() => {
        document.body.removeChild(el);
    }, 6000);
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
        console.log("NIC is invalid in nicValidation.js!!");
        return false;
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
        console.log(nicNumber,"NIC of 12 digits is valid");
        setErrorFor(user_id, 'NIC of 12 digits is valid');
    } else {
        result = false;
        console.log("NIC is invalid not 10 or 12");
        setErrorFor(user_id, 'NIC is invalid not 10 or 12');
    }
    return result;
}

function deleteMessage(el) {
    setTimeout(() => {
        document.body.removeChild(el);
    }, 6000);
}


const checkUser_IDasLicenseNo = function(license_no) //returns true if duplicate data exists
{
    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkUser_IDasLicenseNoData(this))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=checkUser_IDasLicenseNo" + "&license_no=" + license_no);

    function checkUser_IDasLicenseNoData(httpReq)
    {
        console.log("checkUser_IDasLicenseNoData");
        let jsonCheckUser_IDasLicenseNoResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckUser_IDasLicenseNoResponse);
        let jsonCheckUser_IDasLicenseNoResponseAlert = jsonCheckUser_IDasLicenseNoResponse.alert;
        console.log(jsonCheckUser_IDasLicenseNoResponseAlert);

        if(jsonCheckUser_IDasLicenseNoResponseAlert == false)
        {
            console.log("License NO doesnt exist");
            setErrorFor(document.getElementById('user_id'), 'License No does not exist');
            return true; //returns true if duplicate entry exists
        }
        else
        {
            
            return false;
        }
    }
}

const checkUser_IDasNIC = function(nic) //returns true if duplicate data exists
{
    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkUser_IDasNICData(this))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=checkUser_IDasNIC" + "&nic=" + nic);

    function checkUser_IDasNICData(httpReq)
    {
        console.log("checkUser_IDasNICData");
        let jsonCheckUser_IDasNICResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckUser_IDasNICResponse);
        let jsonCheckUser_IDasNICResponseAlert = jsonCheckUser_IDasNICResponse.alert;
        console.log(jsonCheckUser_IDasNICResponseAlert);

        if(jsonCheckUser_IDasNICResponseAlert == false)
        {
            console.log("NIC doesnt exist");
            setErrorFor(document.getElementById('user_id'), 'NIC does not exist');
            return true; //returns true if duplicate entry exists
        }
        else
        {
            
            return false;
        }
    }
}

const checkUser_IDasVehicleNo = function(vehicle_no) //returns true if duplicate data exists
{
    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkVehicleNoData(this))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=checkUser_IDasVehicleNo" + "&vehicle_no=" + vehicle_no);

    function checkVehicleNoData(httpReq)
    {
        console.log("checkVehicleNoData");
        let jsonCheckVehicleNoResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckVehicleNoResponse);
        let jsonCheckVehicleNoResponseAlert = jsonCheckVehicleNoResponse.alert;
        console.log(jsonCheckVehicleNoResponseAlert);

        if(jsonCheckVehicleNoResponseAlert == false)
        {
            console.log("Vehicle No doesnt exist");
            setErrorFor(document.getElementById('user_id'), 'Vehicle No does not exist');
            return true; //returns true if duplicate entry exists
        }
        else
        {
            
            return false;
        }
    }
}