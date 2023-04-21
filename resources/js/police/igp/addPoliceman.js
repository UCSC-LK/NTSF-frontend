const form = document.getElementById('form');
const name = document.getElementById('name');
const police_id = document.getElementById('police_id');
const nic = document.getElementById('nic');
const mobile_number = document.getElementById('mobile_number');
const email = document.getElementById('email');

document.getElementById('user_name').innerHTML = sessionStorage.getItem('user_police_name');

var police_idSession = sessionStorage.getItem("user_police_id");
console.log("police_idSession: " + police_idSession);

let rankOptions = document.getElementById("rankOptions");
let rankOptionList = ["oic", "policeman"];

const police_stationOptions = document.getElementById('police_stationOptions');
// let police_stationOptionList = ["Dehiwala", "Wellewatte", "Bambalapitya"];
let police_stationOptionList = [];

/*Dynamically load the policestation option list*/
function loadPoliceStationOptionsListOnLoad(){
    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            if(loadPoliceStationOptionsList(this))
            {
                console.log("Loading PoliceStation information dynamiclly SUCCESS!!!");
            }
            else
            {
                console.log("Loading PoliceStation information dynamiclly FAILED!!!");
            }
        }
        else
        {
            console.log("Loading PoliceStation information dynamiclly FAILED!!!");
        }
    }

    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/policeStation", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=loadPoliceStationOptionsList");

    function loadPoliceStationOptionsList(httpreq) 
    {
        let jsonPoliceStationData = JSON.parse(httpreq.responseText);
        console.log(jsonPoliceStationData);
        
        if(jsonPoliceStationData.serverResponse === "null session" || jsonPoliceStationData.serverResponse === "Not Allowed")
        {
            // window.location.href = "http://localhost:8080/ntsf_backend_war/login"; //Redirect to login page
            // console.log("Redirecting to login page");
        }
        else if(jsonPoliceStationData.serverResponse === "Allowed")
        {
            console.log("Allowed");
            let count =  jsonPoliceStationData.List.length - 1;
            for(i=0; i<= count; i++)
            {
                console.log("Here onwards entering the police station list into array")
                console.log(jsonPoliceStationData.List[i].police_station);
                police_stationOptionList.push(jsonPoliceStationData.List[i].police_station);    
            }
            console.log("Entering the police station list into array is done");
            return true;
        }
        else
        {
            console.log("Something went wrong");
            return false;
        }
    }

}


form.addEventListener('submit', e => {
	e.preventDefault();
    checkInputs();
});

//Checking whether data already exisiting

document.getElementById('police_id').addEventListener('blur', function(){
    let police_idValue = police_id.value.trim();
    if(police_idValue !== ''){
        checkPolicemanPolice_ID(police_idValue);
    }
});

document.getElementById('nic').addEventListener('blur', function(){
    let nicValue = nic.value.trim();
    if(nicValue !== ''){
        checkPolicemanNic(nicValue);
    }
});

document.getElementById('mobile_number').addEventListener('blur', function(){
    let mobile_numberValue = mobile_number.value.trim();
    if(mobile_numberValue !== ''){
        checkPolicemanMobile_Number(mobile_numberValue);
    }
});

document.getElementById('email').addEventListener('blur', function(){
    let emailValue = email.value.trim();
    if(emailValue !== ''){
        checkPolicemanEmail(emailValue);
    }
});

//email validation
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

//Input validating
function checkInputs() {
	// trim to remove the leading and trailing whitespaces
	const nameValue = name.value.trim();
	const police_idValue = police_id.value.trim();
	const nicValue = nic.value.trim();
    const mobile_numberValue = mobile_number.value.trim();
    const emailValue = email.value.trim();
	
    let flagName = 1 //error exists
    let flagPolice_ID = 1 //error exists
    let flagNic = 1 //error exists
    let flagMobile_Number = 1 //error exists
    let flagEmail = 1 //error exists
    let flagRank = 1 //error exists
    let flagPolice_Station = 1 //error exists

	if(nameValue === '') {
		setErrorFor(name, 'Name cannot be blank');
        flagName = 1;
	} 
    else if((nameValue.match(/^[a-zA-Z ]+$/)) == null){
        setErrorFor(name, 'Name should contain only letters');
        flagName = 1;
    }
    else if(nameValue.length < 3){
        setErrorFor(name, 'Name should contain at least 3 letters');
        flagName = 1;
    }
    else if(nameValue.length > 20){
        setErrorFor(name, 'Name should contain at most 20 letters');
        flagName = 1;
    }
    else {
		setSuccessFor(name);
       flagName = 0;
	}
	
	if(police_idValue === '') {
		setErrorFor(police_id, 'Police ID cannot be blank');
        flagPolice_ID = 1;
    }
    else if((police_idValue.match(/^[0-9]+$/)) == null){
        setErrorFor(police_id, 'Police ID should contain only numbers');
        flagPolice_ID = 1;
    }
    else if(police_idValue.length !== 10){
        setErrorFor(police_id, 'Police ID should contain 10 numbers');
        flagPolice_ID = 1;
    }   
	else {
		setSuccessFor(police_id);
        flagPolice_ID = 0;
	}
	
	if(nicValue === '') {
		setErrorFor(nic, 'NIC cannot be blank');
        flagNic = 1;
        
	}
    else if(nicValidate(nicValue) == false){
        setErrorFor(nic, 'Invalid NIC');
        flagNic = 1;
    }
    else {
		setSuccessFor(nic);
        flagNic = 0;
	}

    if(mobile_numberValue === '') {
        setErrorFor(mobile_number, 'Mobile Number cannot be blank');
        flagMobile_Number = 1;
    }
    else if((mobile_numberValue.match(/^[0-9]+$/)) == null){
        setErrorFor(mobile_number, 'Mobile Number should contain only numbers');
        flagMobile_Number = 1;
    }
    else if(mobile_numberValue.length !== 10){
        setErrorFor(mobile_number, 'Mobile Number should contain 10 numbers');
        flagMobile_Number = 1;
    }
    else {
        setSuccessFor(mobile_number);
        flagMobile_Number = 0;
    }

    if(emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        flagEmail = 1;
    }
    else if(!isEmail(emailValue)){
        setErrorFor(email, 'Email is not valid');
        flagEmail = 1;
    }
    else {
        setSuccessFor(email);
        flagEmail = 0;
    }   

    let rank = checkRankFill();
    if(rank){
        setSuccessFor(rankOptions);
        var rankValue = rank;
        flagRank = 0;
    }
    else {
        setErrorFor(rankOptions, 'A Rank should be  selected');
        flagRank = 1;
        
    }

    let police_station = checkPolice_stationFill();

    if(police_station){
        setSuccessFor(police_stationOptions);
        var police_stationValue = police_station;
        flagPolice_Station = 0;
    } else {
        setErrorFor(police_stationOptions, 'A Police Station should be  selected');
        flagPolice_Station = 1;
    }

    if(flagName === 0 && flagPolice_ID === 0 && flagNic === 0 && flagMobile_Number === 0 && flagEmail === 0 && flagRank === 0 && flagPolice_Station === 0){
        console.log('came until js function for event listener of submit button');
        console.log(nameValue, police_idValue, nicValue, mobile_numberValue, emailValue, rankValue, police_stationValue);
        addPoliceman(nameValue, police_idValue, nicValue, mobile_numberValue, emailValue, rankValue, police_stationValue);
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


let isOpen = false;

function checkRankFill() {
    if (rankOptions.firstElementChild.classList.contains("hide-option")) {
        return false;
    }
    else {
        let selectedRank = rankOptions.firstElementChild.textContent;
        console.log(selectedRank);
        return selectedRank;
    }
}

function checkPolice_stationFill() {
    if (police_stationOptions.firstElementChild.classList.contains("hide-option")) {
        return false;
    }
    else {
        let selectedPolice_station = police_stationOptions.firstElementChild.textContent;
        console.log(selectedPolice_station);
        return selectedPolice_station;
    }
}

rankOptions.addEventListener("click", addToUIOptionsRank);
police_stationOptions.addEventListener("click", loadPoliceStationOptionsListOnLoad());
police_stationOptions.addEventListener("click", addToUIOptionspolice_station);


//e.target refers to the clicked element
//adding UI options to rank
function addToUIOptionsRank(e) {
    if (e.target.classList.contains("hide-option")) {
        controlOptionsRank(e);
    }
    else {
        const pickedOption = e.target;

        if (rankOptions.firstElementChild.classList.contains("hide-option")) {
            rankOptions.removeChild(rankOptions.firstElementChild);
        }
        rankOptions.insertAdjacentElement("afterbegin", pickedOption);

        deleteOptionsRank();
        controlOptionsRank(e);
    }
}

function controlOptionsRank(e) {
    if (isOpen === false) {
        createOptionsRank();
        rankOptions.classList.add("opened");
        isOpen = true;
    }
    else {
        deleteOptionsRank();
        rankOptions.classList.remove("opened");
        isOpen = false;
    }
}

function deleteOptionsRank() {
    while (rankOptions.childElementCount > 1) {
        rankOptions.removeChild(rankOptions.lastElementChild);
    }
}

function createOptionsRank() {
    rankOptionList.forEach(element => {
        if (rankOptions.firstElementChild.textContent !== element) {
            let rankOption = document.createElement("div");
            rankOption.className = "option";
            rankOption.textContent = element;

            rankOptions.firstElementChild.insertAdjacentElement("afterend", rankOption);
        }
    });
};

//adding UI options to police_station
function addToUIOptionspolice_station(e) {
    if (e.target.classList.contains("hide-option")) {
        controlOptionspolice_station(e);
        console.log(e);
    }
    else {
        const pickedOption = e.target;

        if (police_stationOptions.firstElementChild.classList.contains("hide-option")) {
            police_stationOptions.removeChild(police_stationOptions.firstElementChild);
        }
        police_stationOptions.insertAdjacentElement("afterbegin", pickedOption);

        deleteOptionspolice_station();
        controlOptionspolice_station(e);
    }
}

function controlOptionspolice_station(e) {
    if (isOpen === false) {
        createOptionspolice_station();
        police_stationOptions.classList.add("opened");
        isOpen = true;
    }
    else {
        deleteOptionspolice_station();
        police_stationOptions.classList.remove("opened");
        isOpen = false;
    }
}

function deleteOptionspolice_station() {
    while (police_stationOptions.childElementCount > 1) {
        police_stationOptions.removeChild(police_stationOptions.lastElementChild);
    }
}

function createOptionspolice_station() {
    police_stationOptionList.forEach(element => {
        if (police_stationOptions.firstElementChild.textContent !== element) {
            let police_stationOption = document.createElement("div");
            police_stationOption.className = "option";
            police_stationOption.textContent = element;

            police_stationOptions.firstElementChild.insertAdjacentElement("afterend", police_stationOption);
        }
    });
};


//Sending data to backend
// const addPolicemanButton = document.getElementById("addPolicemanButton");

const addPoliceman = function(name, police_id, nic, mobile_number, email,  rank, police_station)
{
    console.log('came until js function for addPoliceman which sends data to backend');

    let httpReq = new XMLHttpRequest();
    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            policemanAdditionStatus = false;
            if(addPolicemanData(this))
            {
                console.log("Policeman added successfully");
                policemanAdditionStatus = true;
            }
            else
            {
                console.log("Policeman added failed");
                policemanAdditionStatus = false;
            }
            getMessage(policemanAdditionStatus);
        }
    }
    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/igp", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=addPoliceman" + "&name=" + name + "&police_id=" + police_id + "&nic=" + nic + "&mobile_number=" + mobile_number + "&email=" + email + "&rank=" + rank + "&police_station=" + police_station);

    function addPolicemanData(httpReq)
    {
        let jsonAddPolicemanResponse = JSON.parse(httpReq.responseText);
        console.log(jsonAddPolicemanResponse);
        let addPolicemanResponse = jsonAddPolicemanResponse.alert;
        console.log(addPolicemanResponse);
        return addPolicemanResponse;
    }
    
}

//Database data duplication error checking

const checkPolicemanPolice_ID = function(police_id) //Returns true if duplicate data exists
{
    console.log("checkPolicemanPolice_ID");
    console.log(police_id);

    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkPolicemanPolice_IDData(this))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/igp", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=checkPoliceman_ID" + "&police_id=" + police_id);

    function checkPolicemanPolice_IDData(httpReq)
    {
        console.log("checkPolicemanPolice_IDData");
        let jsonCheckPolicemanResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckPolicemanResponse);
        let jsonCheckPolicemanResponseAlert = jsonCheckPolicemanResponse.alert;
        console.log(jsonCheckPolicemanResponseAlert);

        if(jsonCheckPolicemanResponseAlert == true)
        {
            console.log("Police_ID already exists");
            setErrorFor(document.getElementById('police_id'), 'Police_ID already exists');
            return true; //returns true if duplicate entry exists
        }
        else
        {
            
            return false;
        }
    }
    
}

const checkPolicemanNic = function(nic) //Returns true if duplicate data exists
{
    console.log("checkPolicemanNic");
    console.log(nic);

    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkPolicemanNicData(this))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/igp", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=checkNIC" + "&nic=" + nic);

    function checkPolicemanNicData(httpReq)
    {
        console.log("checkPolicemanNicData");
        let jsonCheckPolicemanResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckPolicemanResponse);
        let jsonCheckPolicemanResponseAlert = jsonCheckPolicemanResponse.alert;
        console.log(jsonCheckPolicemanResponseAlert);

        if(jsonCheckPolicemanResponseAlert == true)
        {
            console.log("NIC already exists");
            setErrorFor(document.getElementById('nic'), 'NIC already exists');
            return true; //returns true if duplicate entry exists
        }
        else
        {
            
            return false;
        }
    }
}

const checkPolicemanMobile_Number = function(mobile_number) //Returns true if duplicate data exists
{
    console.log("checkPolicemanMobile_Number");
    console.log(mobile_number);

    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkPolicemanMobile_NumberData(this))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/igp", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=checkMobile_Number" + "&mobile_number=" + mobile_number);

    function checkPolicemanMobile_NumberData(httpReq)
    {
        console.log("checkPolicemanMobile_NumberData");
        let jsonCheckPolicemanResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckPolicemanResponse);
        let jsonCheckPolicemanResponseAlert = jsonCheckPolicemanResponse.alert;
        console.log(jsonCheckPolicemanResponseAlert);

        if(jsonCheckPolicemanResponseAlert == true)
        {
            console.log("Mobile_Number already exists");
            setErrorFor(document.getElementById('mobile_number'), 'Mobile_Number already exists');
            return true; //returns true if duplicate entry exists
        }
        else
        {
            
            return false;
        }
    }
}

const checkPolicemanEmail = function(email) //Returns true if duplicate data exists
{
    console.log("checkPolicemanEmail");
    console.log(email);

    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkPolicemanEmailData(this))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/igp", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=checkEmail" + "&email=" + email);

    function checkPolicemanEmailData(httpReq)
    {
        console.log("checkPolicemanEmailData");
        let jsonCheckPolicemanResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckPolicemanResponse);
        let jsonCheckPolicemanResponseAlert = jsonCheckPolicemanResponse.alert;
        console.log(jsonCheckPolicemanResponseAlert);

        if(jsonCheckPolicemanResponseAlert == true)
        {
            console.log("Email already exists");
            setErrorFor(document.getElementById('email'), 'Email already exists');
            return true; //returns true if duplicate entry exists
        }
        else
        {
            return false;
        }
    }
}

function getMessage(policemanAdditionStatus) {
    let message = document.createElement("div");
    message.className = "message";

    if (policemanAdditionStatus == false) {
        message.classList.add("danger");
        message.textContent = "Policeman Addition Failed!!";

        document.body.appendChild(message);

        deleteMessage(message);
    }
    else {
        message.classList.add("success");
        message.textContent = "Policeman Added Successfully";

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






