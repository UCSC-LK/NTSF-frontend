let user_police_id = sessionStorage.getItem('user_police_id');
console.log("user_police_id: " + user_police_id);

const form = document.getElementById('form');
let branch_name = document.getElementById("branch_name");
let Updatebranch_name = sessionStorage.getItem("Updatebranch_name");
let address = document.getElementById("address");
let district = document.getElementById("district");
let province = document.getElementById("province");
let contact_number = document.getElementById("contact_number");
let email = document.getElementById("email");

function fetchPoliceStationDetails(){
    console.log("I was called onload");
    console.log("Printing below the branch_name from session storage");
    console.log("branch_nameSession: " + Updatebranch_name);

    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            if(fetchPoliceStationData(this))
            {
                console.log("PoliceStation fetched successfully");
            }
            else
            {
                console.log("PoliceStation fetch failed");
            }
        }
    }
  
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/policeStation", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=fetchPoliceStation" + "&branch_name=" +Updatebranch_name);

    function fetchPoliceStationData(httpreq)
    {
        console.log("I was called");
        let jsonPoliceStationData = JSON.parse(httpreq.responseText)
        console.log(jsonPoliceStationData);

        if(jsonPoliceStationData.serverResponse === "null session" || jsonPoliceStationData.serverResponse === "Not Allowed")
        {
            window.location.href = "http://localhost:8080/ntsf_backend_war/login"; //Redirect to login page
            console.log("Redirecting to login page");
        }
        else if(jsonPoliceStationData.serverResponse === "Allowed")
        {
            console.log("Allowed");
            branch_name.setAttribute("value", jsonPoliceStationData.List[0].branch_name);
            address.setAttribute("value", jsonPoliceStationData.List[0].address);
            contact_number.setAttribute("value", jsonPoliceStationData.List[0].contact_number);
            email.setAttribute("value", jsonPoliceStationData.List[0].email);
        }
        else
        {
            alert("Something went wrong");
        }
    }
}

let districtOptions = document.getElementById("districtOptions");
let districtOptionList = [  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"];

const provinceOptions = document.getElementById('provinceOptions');
let provinceOptionList = [  "Central Province", "Eastern Province", "North Central Province", "North Western Province", "Northern Province", "Sabaragamuwa Province", "Southern Province", "Uva Province", "Western Province"];


form.addEventListener('submit', e => {
	e.preventDefault();
    checkInputs();
});

//To show that branch_name cannot be altered
//temporarily to remove the error message
window.onclick = function(ev){
    if( ev.target.id == 'branch_name' ){
        setErrorFor(branch_name, 'Branch Name Cannot be Altered');
    }
    else{
        setSuccessFor(branch_name);
    }
};

//Checking whether data already exisiting
//Here javascript event listener is called only when the value in the input field is changed

document.getElementById('branch_name').addEventListener('input', function(){
    console.log('came until js function for event listener of policeID input coloumn changed');
    setErrorFor(branch_name, 'Police_ID Cannot be Altered');
    let branch_nameValue = branch_name.value.trim();
    if(branch_nameValue !== ''){
        checkPoliceStationBranchName(branch_nameValue);
    }
});

document.getElementById('address').addEventListener('input', function(){
    console.log('came until js function for event listener of name input coloumn changed');
    let addressValue = address.value.trim();
    if(addressValue !== ''){
        checkPoliceStationAddress(addressValue);
    }
});

document.getElementById('email').addEventListener('input', function(){
    console.log('came until js function for event listener of email input coloumn changed');
    let emailValue = email.value.trim();
    if(emailValue !== ''){
        checkPoliceStationEmail(emailValue);
    }
});

//email validation
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

//Input validating
function checkInputs() {
	// trim to remove the whitespaces
	const branch_nameValue = branch_name.value.trim();
	const addressValue = address.value.trim();
    const contact_numberValue = contact_number.value.trim();
    const emailValue = email.value.trim();

	
    let flagBranch_Name = 1 //error exists
    let flagAddress = 1 //error exists
    let flagContact_Number = 1 //error exists
    let flagEmail = 1 //error exists
    let flagDistrict = 1 //error exists
    let flagProvince = 1 //error exists


	// if(branch_nameValue === '') {
	// 	setErrorFor(branch_name, 'Branch Name cannot be blank');
    //     flagBranch_Name = 1;
	// } 
    // else if((branch_nameValue.match(/^[a-zA-Z]+$/)) == null){
    //     setErrorFor(branch_name, 'Branch Name should contain only letters');
    //     flagBranch_Name = 1;
    // }
    // else if(branch_nameValue.length < 3){
    //     setErrorFor(branch_name, 'Branch Name should contain at least 3 letters');
    //     flagBranch_Name = 1;
    // }
    // else if(branch_nameValue.length > 20){
    //     setErrorFor(branch_name, 'Branch Name should contain at most 20 letters');
    //     flagBranch_Name = 1;
    // }
    // else {
	// 	setSuccessFor(branch_name);
    //    flagBranch_Name = 0;
	// }

    //***Preventing branch_name from being altered****
	
    if(branch_nameValue != Updatebranch_name ) {
        console.log("Branch Name was altered");
        setErrorFor(branch_name, 'Branch Name Cannot be Altered');
        flagBranch_Name = 1;
    }
    else {
        setSuccessFor(branch_name);
        flagBranch_Name = 0;
    }

	if(addressValue === '') {
		setErrorFor(address, 'Address cannot be blank');
        flagAddress = 1;
    }
    else if(addressValue.length < 3){
        setErrorFor(address, 'Address should contain atleast 3 letters');
        flagAddress = 1;
    }
    else if(addressValue.length > 100){
        setErrorFor(address, 'Address should contain at most 100 letters');
        flagAddress = 1;
    }
	else{
		setSuccessFor(address);
        flagAddress = 0;
	}
	

    let district = checkDistrictFill();
    if(district){
        setSuccessFor(districtOptions);
        var districtValue = district;
        flagDistrict = 0;
    }
    else {
        setErrorFor(districtOptions, 'A District should be selected');
        flagDistrict = 1;
        
    }

    let province = checkProvinceFill();

    if(province){
        setSuccessFor(provinceOptions);
        var provinceValue = province;
        flagProvince = 0;
    } else {
        setErrorFor(provinceOptions, 'A Province should be  selected');
        flagProvince = 1;
    }

    if(contact_numberValue === '') {
        setErrorFor(contact_number, 'Contact Number cannot be blank');
        flagContact_Number = 1;
    }
    else if((contact_numberValue.match(/^[0-9]+$/)) == null){
        setErrorFor(contact_number, 'Contact Number should contain only numbers');
        flagContact_Number = 1;
    }
    else if(contact_numberValue.length !== 10){
        setErrorFor(contact_number, 'Contact Number should contain 10 numbers');
        flagContact_Number = 1;
    }
    else {
        setSuccessFor(contact_number);
        flagContact_Number = 0;
    }

    if(emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        flagEmail = 1;
    }
    else if((emailValue.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) == null){
        setErrorFor(email, 'Email should be in correct format');
        flagEmail = 1;
    }
    else {
        setSuccessFor(email);
        flagEmail = 0;
    }

    if(flagBranch_Name === 0 && flagAddress === 0 && flagDistrict === 0 && flagProvince === 0 && flagContact_Number === 0 && flagEmail === 0){
        console.log("Came until data sending to backend");
        updatePoliceStation(branch_nameValue, addressValue, districtValue, provinceValue, contact_numberValue, emailValue);
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

function checkDistrictFill() {
    if (districtOptions.firstElementChild.classList.contains("hide-option")) {
        return false;
    }
    else {
        let selectedDistrict = districtOptions.firstElementChild.textContent;
        console.log(selectedDistrict);
        return selectedDistrict;
    }
}

function checkProvinceFill() {
    if (provinceOptions.firstElementChild.classList.contains("hide-option")) {
        return false;
    }
    else {
        let selectedProvince = provinceOptions.firstElementChild.textContent;
        console.log(selectedProvince);
        return selectedProvince;
    }
}

districtOptions.addEventListener("click", addToUIOptionsDistrict);
provinceOptions.addEventListener("click", addToUIOptionsProvince);


//e.target refers to the clicked element
//adding UI options to District
function addToUIOptionsDistrict(e) {
    if (e.target.classList.contains("hide-option")) {
        controlOptionsDistrict(e);
    }
    else {
        const pickedOption = e.target;

        if (districtOptions.firstElementChild.classList.contains("hide-option")) {
            districtOptions.removeChild(districtOptions.firstElementChild);
        }
        districtOptions.insertAdjacentElement("afterbegin", pickedOption);

        deleteOptionsDistrict();
        controlOptionsDistrict(e);
    }
}

function controlOptionsDistrict(e) {
    if (isOpen === false) {
        createOptionsDistrict();
        districtOptions.classList.add("opened");
        isOpen = true;
    }
    else {
        deleteOptionsDistrict();
        districtOptions.classList.remove("opened");
        isOpen = false;
    }
}

function deleteOptionsDistrict() {
    while (districtOptions.childElementCount > 1) {
        districtOptions.removeChild(districtOptions.lastElementChild);
    }
}

function createOptionsDistrict() {
    districtOptionList.forEach(element => {
        if (districtOptions.firstElementChild.textContent !== element) {
            let districtOption = document.createElement("div");
            districtOption.className = "option";
            districtOption.textContent = element;

            districtOptions.firstElementChild.insertAdjacentElement("afterend", districtOption);
        }
    });
};

//adding UI options to Province
function addToUIOptionsProvince(e) {
    if (e.target.classList.contains("hide-option")) {
        controlOptionsProvince(e);
        console.log(e);
    }
    else {
        const pickedOption = e.target;

        if (provinceOptions.firstElementChild.classList.contains("hide-option")) {
            provinceOptions.removeChild(provinceOptions.firstElementChild);
        }
        provinceOptions.insertAdjacentElement("afterbegin", pickedOption);

        deleteOptionsProvince();
        controlOptionsProvince(e);
    }
}

function controlOptionsProvince(e) {
    if (isOpen === false) {
        createOptionsProvince();
        provinceOptions.classList.add("opened");
        isOpen = true;
    }
    else {
        deleteOptionsProvince();
        provinceOptions.classList.remove("opened");
        isOpen = false;
    }
}

function deleteOptionsProvince() {
    while (provinceOptions.childElementCount > 1) {
        provinceOptions.removeChild(provinceOptions.lastElementChild);
    }
}

function createOptionsProvince() {
    provinceOptionList.forEach(element => {
        if (provinceOptions.firstElementChild.textContent !== element) {
            let provinceOption = document.createElement("div");
            provinceOption.className = "option";
            provinceOption.textContent = element;

            provinceOptions.firstElementChild.insertAdjacentElement("afterend", provinceOption);
        }
    });
};

//Sending data to backend

const updatePoliceStation = function(branch_name, address, district, province, contact_number, email)
{
    console.log('came until js function for editPoliceStation which sends data to backend');
    console.log(branch_name);
    console.log(address);
    console.log(district);
    console.log(province);
    console.log(contact_number);
    console.log(email);

    let httpReq = new XMLHttpRequest();
    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            policestationUpdationStatus = false;
            if(updatePoliceStationData(this))
            {
                console.log("PoliceStation updated successfully");
                policestationUpdationStatus = true;
            }
            else
            {
                console.log("PoliceStation updated failed");
                policestationUpdationStatus = false;
            }
            getMessage(policestationUpdationStatus);
        }
    }
    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policeStation", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=updatePoliceStation" + "&branch_name=" + branch_name + "&address=" + address + "&district=" + district + "&province=" + province + "&contact_number=" + contact_number + "&email=" + email);
    function updatePoliceStationData(httpReq)
    {
        let jsonAddPoliceStationResponse = JSON.parse(httpReq.responseText);
        console.log(jsonAddPoliceStationResponse);
    }
    
}

//Database data duplication error checking

const checkPoliceStationBranch_Name = function(branch_name) //Returns true if duplicate data exists
{
    console.log("checkPoliceStationBranch_Name");
    console.log(branch_name);

    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkPoliceStationBranch_NameData(this))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policeStation", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=checkBranch_Name" + "&branch_name=" + branch_name);

    function checkPoliceStationBranch_NameData(httpReq)
    {
        console.log("checkPoliceStationBranch_NameData");
        let jsonCheckPoliceStationResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckPoliceStationResponse);
        let jsonCheckPoliceStationResponseAlert = jsonCheckPoliceStationResponse.alert;
        console.log(jsonCheckPoliceStationResponseAlert);

        if(jsonCheckPoliceStationResponseAlert == true)
        {
            console.log("Branch Name already exists");
            setErrorFor(document.getElementById('branch_name'), 'Branch Name already exists');
            return true; //returns true if duplicate entry exists
        }
        else
        {
            
            return false;
        }
    }
    
}

const checkPoliceStationContact_Number = function(contact_number) //Returns true if duplicate data exists
{
    console.log("checkPoliceStationContact_Number");
    console.log(contact_number);

    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkPoliceStationContact_NumberData(this))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policeStation", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=checkContact_Number" + "&contact_number=" + contact_number);

    function checkPoliceStationContact_NumberData(httpReq)
    {
        console.log("checkPoliceStationContact_NumberData");
        let jsonCheckPoliceStationResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckPoliceStationResponse);
        let jsonCheckPoliceStationResponseAlert = jsonCheckPoliceStationResponse.alert;
        console.log(jsonCheckPoliceStationResponseAlert);

        if(jsonCheckPoliceStationResponseAlert == true)
        {
            console.log("Contact_Number already exists");
            setErrorFor(document.getElementById('contact_number'), 'contact_number already exists');
            return true; //returns true if duplicate entry exists
        }
        else
        {
            
            return false;
        }
    }
    
}

const checkPoliceStationEmail = function(email) //Returns true if duplicate data exists
{
    console.log("checkPoliceStationEmail");
    console.log(email);

    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkPoliceStationEmailData(this))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policeStation", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=checkEmail" + "&email=" + email);

    function checkPoliceStationEmailData(httpReq)
    {
        console.log("checkPoliceStationEmailData");
        let jsonCheckPoliceStationResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckPoliceStationResponse);
        let jsonCheckPoliceStationResponseAlert = jsonCheckPoliceStationResponse.alert;
        console.log(jsonCheckPoliceStationResponseAlert);

        if(jsonCheckPoliceStationResponseAlert == true)
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

function getMessage(policestationUpdationStatus) {
    let message = document.createElement("div");
    message.className = "message";

    if (policestationUpdationStatus == true) {
        message.classList.add("danger");
        message.textContent = "Oh no! It is cannot be blank";

        document.body.appendChild(message);

        deleteMessage(message);
    }
    else {
        message.classList.add("success");
        message.textContent = "Police Station Updated Successfully";

        document.body.appendChild(message);

        deleteMessage(message);
    }

}


function deleteMessage(el) {
    setTimeout(() => {
        document.body.removeChild(el);
    }, 6000);
}











