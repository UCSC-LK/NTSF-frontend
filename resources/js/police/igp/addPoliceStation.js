const form = document.getElementById('form');
const branch_name = document.getElementById('branch_name');
const address = document.getElementById('address');
const contact_number = document.getElementById('contact_number');
const email = document.getElementById('email');

let districtOptions = document.getElementById("districtOptions");
let districtOptionList = [  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"];

const provinceOptions = document.getElementById('provinceOptions');
let provinceOptionList = [  "Central Province", "Eastern Province", "North Central Province", "North Western Province", "Northern Province", "Sabaragamuwa Province", "Southern Province", "Uva Province", "Western Province"];

form.addEventListener('submit', e => {
	e.preventDefault();
    checkInputs();
});

//Checking whether data already exisiting

document.getElementById('branch_name').addEventListener('blur', function(){
    console.log('came until js function for event listener');
    let branch_nameValue = branch_name.value.trim();
    if(branch_nameValue !== ''){
        checkPoliceStationBranch_Name(branch_nameValue);
    }
});


document.getElementById('contact_number').addEventListener('blur', function(){
    console.log('came until js function for event listener');
    let contact_numberValue = contact_number.value.trim();
    if(contact_numberValue !== ''){
        checkPoliceStationContact_Number(contact_numberValue);
    }
});

document.getElementById('email').addEventListener('blur', function(){
    console.log('came until js function for event listener');
    let emailValue = email.value.trim();
    if(emailValue !== ''){
        checkPoliceStationEmail(emailValue);
    }
});

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


	if(branch_nameValue === '') {
		setErrorFor(branch_name, 'Branch Name cannot be blank');
        flagBranch_Name = 1;
	} 
    else if((branch_nameValue.match(/^[a-zA-Z]+$/)) == null){
        setErrorFor(branch_name, 'Branch Name should contain only letters');
        flagBranch_Name = 1;
    }
    else if(branch_nameValue.length < 3){
        setErrorFor(branch_name, 'Branch Name should contain at least 3 letters');
        flagBranch_Name = 1;
    }
    else if(branch_nameValue.length > 20){
        setErrorFor(branch_name, 'Branch Name should contain at most 20 letters');
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
        addPoliceStation(branch_nameValue, addressValue, districtValue, provinceValue, contact_numberValue, emailValue);
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
      
        switch (selectedProvince) {
            case "Central Province":
            districtOptionList = ["Kandy", "Matale", "Nuwara Eliya"];
            break;
            case "Eastern Province":
            districtOptionList = ["Ampara", "Batticaloa", "Trincomalee"];
            break;
            case "Northern Province":
            districtOptionList = ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"];
            break;
            case "North Central Province":
            districtOptionList = ["Anuradhapura", "Polonnaruwa"];
            break;
            case "North Western Province":
            districtOptionList = ["Kurunegala", "Puttalam"];
            break;
            case "Sabaragamuwa Province":
            districtOptionList = ["Kegalle", "Ratnapura"];
            break;
            case "Southern Province":
            districtOptionList = ["Galle", "Hambantota", "Matara"];
            break;
            case "Uva Province":
            districtOptionList = ["Badulla", "Monaragala"];
            break;
            case "Western Province":
            districtOptionList = ["Colombo", "Gampaha", "Kalutara"];
            break;
            default:
            districtOptionList = [];
            break;

        }
  
  // Print the filtered district options
    console.log(districtOptionList);
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

const addPoliceStation = function(branch_name, address, district, province, contact_number, email)
{
    console.log(name);
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
            policestationAdditionStatus = false;
            if(addPoliceStationData(this))
            {
                console.log("Police Station added successfully");
                policestationAdditionStatus = true;
            }
            else
            {
                console.log("Police Station adding failed");
                policestationAdditionStatus = false;
            }
            getMessage(policestationAdditionStatus)
        }
    }
    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policeStation", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=addPoliceStation" + "&branch_name=" + branch_name + "&address=" + address + "&district=" + district + "&province=" + province + "&contact_number=" + contact_number + "&email=" + email);

    function addPoliceStationData(httpReq)
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

function getMessage(policestationAdditionStatus) {
    let message = document.createElement("div");
    message.className = "message";

    if (policestationAdditionStatus == true) {
        message.classList.add("danger");
        message.textContent = "Oh no! It is cannot be blank";

        document.body.appendChild(message);

        deleteMessage(message);
    }
    else {
        message.classList.add("success");
        message.textContent = "Police Station Added Successfully";

        document.body.appendChild(message);

        deleteMessage(message);
    }

}

function deleteMessage(el) {
    setTimeout(() => {
        document.body.removeChild(el);
    }, 6000);
}


