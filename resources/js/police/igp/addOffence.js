const form = document.getElementById('form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');

var police_idSession = sessionStorage.getItem("username");
console.log("Printing below the username from session storage");
console.log("police_idSession: " + police_idSession);

let offenceTypeOptions = document.getElementById("offenceTypeOptions");
let offenceTypeOptionList = ["driver", "pedestrian", "vehicle"];

const demeritPointOptions = document.getElementById('demeritPointOptions');
let demeritPointOptionList = [1, 2, 3];

form.addEventListener('submit', e => {
	e.preventDefault();
    checkInputs();
});

//Checking whether data already exisiting
document.getElementById('description').addEventListener('blur', function(){
    console.log('came until js function for event listener of Description blure');
    let descriptionValue = description.value.trim();
    if(descriptionValue !== ''){
        checkOffenceDescription(description.value);
    }
});

//Input validating
function checkInputs() {
	// trim to remove the whitespaces
	const descriptionValue = description.value.trim();
    const amountValue = amount.value.trim();

    let flagOffenceType = 1 //error exists
    let flagDescription = 1 //error exists
    let flagAmount = 1 //error exists
    let flagDemeritPoints = 1 //error exists
	
	if(descriptionValue === '') {
		setErrorFor(nic, 'Description cannot be blank');
        flagDescription = 1;
        
	}
    else {
		setSuccessFor(description);
        flagDescription = 0;
	}

    if(amountValue === '') {
        setErrorFor(amount, 'Amount cannot be blank');
        flagAmount = 1;
    }
    else {
        setSuccessFor(amount);
        flagAmount = 0;
    }

    let offenceType = checkOffenceTypeFill();
    if(offenceType){
        setSuccessFor(offenceTypeOptions);
        var offenceTypeValue = offenceType;
        flagOffenceType = 0;
    }
    else {
        setErrorFor(offenceTypeOptions, 'An offence type should be  selected');
        flagOffenceType = 1;
        
    }

    let demeritPoints = checkDemeritPointsFill();

    if(demeritPoints){
        setSuccessFor(demeritPointsOptions);
        var demeritPointsValue = demeritPoints;
        flagDemeritPoints = 0;
    } else {
        setErrorFor(demeritPointsOptions, 'A Demerit Point should be  selected');
        flagDemeritPoints = 1;
    }

    if(flagOffenceType === 0 && flagDescription === 0 && flagAmount === 0 && flagDemeritPoints === 0){
        console.log('came until js function for event listener of submit button');
        console.log("offenceTypeValue: " + offenceTypeValue);
        console.log("descriptionValue: " + descriptionValue);
        console.log("amountValue: " + amountValue);
        console.log("demeritPointsValue: " + demeritPointsValue);
        addOffence(offenceTypeValue, descriptionValue, amountValue, demeritPointsValue);
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

function checkOffencetypeFill() {
    if (offenceTypeOptions.firstElementChild.classList.contains("hide-option")) {
        return false;
    }
    else {
        let selectedOffencetype = offenceTypeOptions.firstElementChild.textContent;
        console.log(selectedOffencetype);
        return selectedOffencetype;
    }
}

function checkDemeritPointsFill() {
    if (demeritPointsOptions.firstElementChild.classList.contains("hide-option")) {
        return false;
    }
    else {
        let selectedDemeritPoints = demeritPointsOptions.firstElementChild.textContent;
        console.log(selectedDemeritPoints);
        return selectedDemeritPoints;
    }
}

offenceTypeOptions.addEventListener("click", addToUIOptionsOffenceType);
demeritPointsOptions.addEventListener("click", loadPoliceStationOptionsListOnLoad());
demeritPointsOptions.addEventListener("click", addToUIOptionsdemeritPoints);


//e.target refers to the clicked element
//adding UI options to offence type
function addToUIOptionsOffenceType(e) {
    if (e.target.classList.contains("hide-option")) {
        controlOptionsOffenceType(e);
    }
    else {
        const pickedOption = e.target;

        if (offenceTypeOptions.firstElementChild.classList.contains("hide-option")) {
            offenceTypeOptions.removeChild(offenceTypeOptions.firstElementChild);
        }
        offenceTypeOptions.insertAdjacentElement("afterbegin", pickedOption);

        deleteOptionsOffenceType();
        controlOptionsOffenceType(e);
    }
}

function controlOptionsOffenceType(e) {
    if (isOpen === false) {
        createOptionsOffenceType();
        offenceTypeOptions.classList.add("opened");
        isOpen = true;
    }
    else {
        deleteOptionsOffenceType();
        offenceTypeOptions.classList.remove("opened");
        isOpen = false;
    }
}

function deleteOptionsOffenceType() {
    while (offenceTypeOptions.childElementCount > 1) {
        offenceTypeOptions.removeChild(offenceTypeOptions.lastElementChild);
    }
}

function createOptionsOffenceType() {
    offenceTypeOptionList.forEach(element => {
        if (offenceTypeOptions.firstElementChild.textContent !== element) {
            let offenceTypeOption = document.createElement("div");
            offenceTypeOption.className = "option";
            offenceTypeOption.textContent = element;

            offenceTypeOptions.firstElementChild.insertAdjacentElement("afterend", offenceTypeOption);
        }
    });
};

//adding UI options to demerit points
function addToUIOptionsdemeritPoints(e) {
    if (e.target.classList.contains("hide-option")) {
        controlOptionsdemeritPoints(e);
        console.log(e);
    }
    else {
        const pickedOption = e.target;

        if (demeritPointsOptions.firstElementChild.classList.contains("hide-option")) {
            demeritPointsOptions.removeChild(demeritPointsOptions.firstElementChild);
        }
        demeritPointsOptions.insertAdjacentElement("afterbegin", pickedOption);

        deleteOptionsdemeritPoints();
        controlOptionsdemeritPoints(e);
    }
}

function controlOptionsdemeritPoints(e) {
    if (isOpen === false) {
        createOptionsdemeritPoints();
        demeritPointsOptions.classList.add("opened");
        isOpen = true;
    }
    else {
        deleteOptionsdemeritPoints();
        demeritPointsOptions.classList.remove("opened");
        isOpen = false;
    }
}

function deleteOptionsdemeritPoints() {
    while (demeritPointsOptions.childElementCount > 1) {
        demeritPointsOptions.removeChild(demeritPointsOptions.lastElementChild);
    }
}

function createOptionsdemeritPoints() {
    demeritPointsOptionList.forEach(element => {
        if (demeritPointsOptions.firstElementChild.textContent !== element) {
            let demeritPointsOption = document.createElement("div");
            demeritPointsOption.className = "option";
            demeritPointsOption.textContent = element;

            demeritPointsOptions.firstElementChild.insertAdjacentElement("afterend", demeritPointsOption);
        }
    });
};


//Sending data to backend

const addOffence = function(offenceType, description, amount, demeritPoints)
{
    console.log('came until js function for addOffence which sends data to backend');
    console.log(offenceType);
    console.log(description);
    console.log(amount);
    console.log(demeritPoints);

    let httpReq = new XMLHttpRequest();
    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            offenceAdditionStatus = false;
            if(addOffenceData(this))
            {
                console.log("Offence added successfully");
                offenceAdditionStatus = true;
            }
            else
            {
                console.log("Offence added failed");
                offenceAdditionStatus = false;
            }
            getMessage(offenceAdditionStatus);
        }
    }
    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/igp", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=addOffence" + "&offenceType=" + offenceType + "&description=" + description + "&amount=" + amount + "&demeritPoints=" + demeritPoints);

    function addOffenceData(httpReq)
    {
        let jsonAddOffenceResponse = JSON.parse(httpReq.responseText);
        console.log(jsonAddOffenceResponse);
    }
    
}

//Database data duplication error checking
const checkOffenceDescription = function(description) //Returns true if duplicate data exists
{
    console.log("checkOffenceDescription");
    console.log(description);

    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            if(checkOffenceDescriptionData(this))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/offence", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=checkOffenceDescription" + "&description=" + description);

    function checkOffenceDescriptionData(httpReq)
    {
        console.log("checkOffenceDescriptionData");
        let jsonCheckOffenceDescriptionResponse = JSON.parse(httpReq.responseText);
        console.log(jsonCheckOffenceDescriptionResponse);
        let jsonCheckOffenceDescriptionResponseAlert = jsonCheckOffenceDescriptionResponse.alert;
        console.log(jsonCheckOffenceDescriptionResponseAlert);

        if(jsonCheckOffenceDescriptionResponseAlert == true)
        {
            console.log("Description already exists");
            setErrorFor(document.getElementById('description'), 'Description already exists');
            return true; //returns true if duplicate entry exists
        }
        else
        {
            
            return false;
        }
    }
}

function getMessage(offenceAdditionStatus) {
    let message = document.createElement("div");
    message.className = "message";

    if (offenceAdditionStatus == true) {
        message.classList.add("danger");
        message.textContent = "Oh no! It is cannot be blank";

        document.body.appendChild(message);

        deleteMessage(message);
    }
    else {
        message.classList.add("success");
        message.textContent = "Offence Added Successfully";

        document.body.appendChild(message);

        deleteMessage(message);
    }

}







