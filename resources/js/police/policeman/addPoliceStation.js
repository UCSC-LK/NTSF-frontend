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
        checkPolicemanBranch_name(branch_nameValue);
    }
});


document.getElementById('contact_number').addEventListener('blur', function(){
    console.log('came until js function for event listener');
    let contact_numberValue = contact_number.value.trim();
    if(contact_numberValue !== ''){
        checkPolicemanContact_Number(contact_numberValue);
    }
});

document.getElementById('email').addEventListener('blur', function(){
    console.log('came until js function for event listener');
    let emailValue = email.value.trim();
    if(emailValue !== ''){
        checkPolicemanEmail(emailValue);
    }
});

//Input validating
function checkInputs() {
	// trim to remove the whitespaces
	const branch_nameValue = branch_name.value.trim();
	const addressValue = address.value.trim();
	const contact_numberValue = contact_number.value.trim();
	
    let flagBranch_Name = 1 //error exists
    let flagAddress = 1 //error exists
    let flagContact_Number = 1 //error exists


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
        flag = 1;
    }
    else if((addressValue.match(/^[0-9]+$/)) == null){
        setErrorFor(address, 'Address should contain only numbers');
        flag = 1;
    }
    else if(addressValue.length !== 10){
        setErrorFor(address, 'Address should contain 10 numbers');
        flag = 1;
    }   

	else {
		setSuccessFor(address);
        flag = 0;
	}
	
	if(nicValue === '') {
		setErrorFor(nic, 'NIC cannot be blank');
        flag = 1;
        
	} else {
		setSuccessFor(nic);
        flag = 0;
	}

    let rank = checkRankFill();
    if(rank){
        setSuccessFor(rankOptions);
        var rankValue = rank;
        flag = 0;
    }
    else {
        setErrorFor(rankOptions, 'A Rank should be  selected');
        flag = 1;
        
    }

    let police_station = checkPolice_stationFill();

    if(police_station){
        setSuccessFor(police_stationOptions);
        var police_stationValue = police_station;
        flag = 0;
    } else {
        setErrorFor(police_stationOptions, 'A Police Station should be  selected');
        flag = 1;
    }

    if(flag == 0){
        console.log(nameValue, police_idValue, nicValue, rankValue, police_stationValue);
        addPoliceman(nameValue, police_idValue, nicValue, rankValue, police_stationValue)
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

const addPoliceman = function(name, police_id, nic, rank, police_station)
{
    console.log(name);
    console.log(police_id);
    console.log(nic);
    console.log(rank);
    console.log(police_station);

    let httpReq = new XMLHttpRequest();
    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            addPolicemanData(this);
        }
    }
    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/addPoliceman", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.send("action=addPoliceman" + "&name=" + name + "&police_id=" + police_id + "&nic=" + nic + "&rank=" + rank + "&police_station=" + police_station);

    function addPolicemanData(httpReq)
    {
        let jsonAddPolicemanResponse = JSON.parse(httpReq.responseText);
        console.log(jsonAddPolicemanResponse);
    }
    
}

//Database data duplication error checking

const checkPolicemanBranch_Name = function(branch_name) //Returns true if duplicate data exists
{
    console.log("checkPolicemanBranch_Name");
    console.log(branch_name);

    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkPolicemanBranch_NameData(this))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policestation", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.send("action=checkBranch_Name" + "&branch_name=" + branch_name);

    function checkPolicemanBranch_NameData(httpReq)
    {
        console.log("checkPolicemanBranch_NameData");
        let jsonCheckPolicemanResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckPolicemanResponse);
        let jsonCheckPolicemanResponseAlert = jsonCheckPolicemanResponse.alert;
        console.log(jsonCheckPolicemanResponseAlert);

        if(jsonCheckPolicemanResponseAlert == true)
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

const checkPolicemanContact_Number = function(contact_number) //Returns true if duplicate data exists
{
    console.log("checkPolicemanContact_Number");
    console.log(contact_number);

    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkPolicemanContact_NumberData(this))
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
    httpReq.send("action=checkContact_Number" + "&contact_number=" + contact_number);

    function checkPolicemanContact_NumberData(httpReq)
    {
        console.log("checkPolicemanContact_NumberData");
        let jsonCheckPolicemanResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckPolicemanResponse);
        let jsonCheckPolicemanResponseAlert = jsonCheckPolicemanResponse.alert;
        console.log(jsonCheckPolicemanResponseAlert);

        if(jsonCheckPolicemanResponseAlert == true)
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

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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



