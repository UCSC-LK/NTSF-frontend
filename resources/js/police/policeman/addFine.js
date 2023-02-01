const form = document.getElementById('form');
const name = document.getElementById('name');
const police_id = document.getElementById('police_id');
const nic = document.getElementById('nic');

let rankOptions = document.getElementById("rankOptions");
let rankOptionList = ["OIC", "Policeman"];

const police_stationOptions = document.getElementById('police_stationOptions');
let police_stationOptionList = ["Dehiwala", "Wellewatte", "Bambalapitya"];

form.addEventListener('submit', e => {
	e.preventDefault();
    checkInputs();
});

//Checking whether data already exisiting

document.getElementById('police_id').addEventListener('blur', function(){
    console.log('came until js function for event listener');
    let police_idValue = police_id.value.trim();
    if(police_idValue !== ''){
        checkPolicemanPolice_ID(police_idValue);
    }
});


document.getElementById('nic').addEventListener('blur', function(){
    console.log('came until js function for event listener');
    let nicValue = nic.value.trim();
    if(nicValue !== ''){
        checkPolicemanNic(nicValue);
    }
});

//Input validating
function checkInputs() {
	// trim to remove the whitespaces
	const nameValue = name.value.trim();
	const police_idValue = police_id.value.trim();
	const nicValue = nic.value.trim();
	
    let flag = 1 //error exists


	if(nameValue === '') {
		setErrorFor(name, 'Name cannot be blank');
        flag = 1;
	} 
    else if((nameValue.match(/^[a-zA-Z]+$/)) == null){
        setErrorFor(name, 'Name should contain only letters');
        flag = 1;
    }
    else if(nameValue.length < 3){
        setErrorFor(name, 'Name should contain at least 3 letters');
        flag = 1;
    }
    else if(nameValue.length > 20){
        setErrorFor(name, 'Name should contain at most 20 letters');
        flag = 1;
    }
    else {
		setSuccessFor(name);
       flag = 0;
	}
	
	if(police_idValue === '') {
		setErrorFor(police_id, 'Police ID cannot be blank');
        flag = 1;
    }
    else if((police_idValue.match(/^[0-9]+$/)) == null){
        setErrorFor(police_id, 'Police ID should contain only numbers');
        flag = 1;
    }
    else if(police_idValue.length !== 10){
        setErrorFor(police_id, 'Police ID should contain 10 numbers');
        flag = 1;
    }   

	else {
		setSuccessFor(police_id);
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

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/addPoliceman", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/addPoliceman", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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


