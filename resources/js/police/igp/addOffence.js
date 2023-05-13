const form = document.getElementById('form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
let offence_type = sessionStorage.getItem("offence_type");
console.log("Printing below the offence_type from session storage");
console.log("offence_type: " + offence_type);

if(offence_type === "driver"){
   document.getElementById("formTitle").innerHTML = "Add Driver Offence";
}
else if(offence_type === "vehicle"){
    document.getElementById("formTitle").innerHTML = "Add Vehicle Offence";
}
else if(offence_type === "pedestrian"){
    document.getElementById("formTitle").innerHTML = "Add Pedestrian Offence";
}
else{
    console.log("Something went wrong");
}

var police_idSession = sessionStorage.getItem("user_police_id");
console.log("Printing below the username from session storage");
console.log("user_police_id: " + police_idSession);

const demerit_pointOptions = document.getElementById('demerit_pointOptions');
let demerit_pointOptionList = [3, 2, 1];

form.addEventListener('submit', e => {
	e.preventDefault();
    checkInputs();
});

//Checking whether data already exisiting
document.getElementById('description').addEventListener('blur', function(){
    console.log('came until js function for event listener of Description blure');
    let descriptionValue = description.value.trim();
    if(descriptionValue !== ''){
        checkOffenceDescription(descriptionValue);
    }
});

//Input validating
function checkInputs() {
	// trim to remove the whitespaces
	const descriptionValue = description.value.trim();
    const amountValue = amount.value.trim();

    let flagDescription = 1 //error exists
    let flagAmount = 1 //error exists
    let flagDemerit_point = 1 //error exists
	
	if(descriptionValue === '') {
		setErrorFor(description, 'Description cannot be blank');
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

    let demerit_point = checkDemerit_pointFill();

    if(demerit_point){
        setSuccessFor(demerit_pointOptions);
        var demerit_pointValue = demerit_point;
        flagDemerit_point = 0;
    } else {
        setErrorFor(demerit_pointOptions, 'A Demerit Point should be  selected');
        flagDemerit_point = 1;
    }

    if(flagDescription === 0 && flagAmount === 0 && flagDemerit_point === 0){
        console.log('came until js function for event listener of submit button');
        console.log("descriptionValue: " + descriptionValue);
        console.log("amountValue: " + amountValue);
        console.log("demerit_pointValue: " + demerit_pointValue);
        let offence_no = fetchOffenceNo();
        console.log("offence_no: " + offence_no);
        addOffence(offence_no, offence_type, descriptionValue, amountValue, demerit_pointValue);
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


function checkDemerit_pointFill() {
    if (demerit_pointOptions.firstElementChild.classList.contains("hide-option")) {
        return false;
    }
    else {
        let selectedDemerit_point = demerit_pointOptions.firstElementChild.textContent;
        console.log(selectedDemerit_point);
        return selectedDemerit_point;
    }
}

demerit_pointOptions.addEventListener("click", addToUIOptionsDemerit_point);


//e.target refers to the clicked element
//adding UI options to demerit points
function addToUIOptionsDemerit_point(e) {
    if (e.target.classList.contains("hide-option")) {
        controlOptionsDemerit_point(e);
        console.log(e);
    }
    else {
        const pickedOption = e.target;

        if (demerit_pointOptions.firstElementChild.classList.contains("hide-option")) {
            demerit_pointOptions.removeChild(demerit_pointOptions.firstElementChild);
        }
        demerit_pointOptions.insertAdjacentElement("afterbegin", pickedOption);

        deleteOptionsDemerit_point();
        controlOptionsDemerit_point(e);
    }
}

function controlOptionsDemerit_point(e) {
    if (isOpen === false) {
        createOptionsDemerit_point();
        demerit_pointOptions.classList.add("opened");
        isOpen = true;
    }
    else {
        deleteOptionsDemerit_point();
        demerit_pointOptions.classList.remove("opened");
        isOpen = false;
    }
}

function deleteOptionsDemerit_point() {
    while (demerit_pointOptions.childElementCount > 1) {
        demerit_pointOptions.removeChild(demerit_pointOptions.lastElementChild);
    }
}

function createOptionsDemerit_point() {
    demerit_pointOptionList.forEach(element => {
        if (demerit_pointOptions.firstElementChild.textContent !== element) {
            let demerit_pointOption = document.createElement("div");
            demerit_pointOption.className = "option";
            demerit_pointOption.textContent = element;

            demerit_pointOptions.firstElementChild.insertAdjacentElement("afterend", demerit_pointOption);
        }
    });
};

function getOffenceNo(offenceType){
    console.log("getOffenceNo function called");
    let jsonGetOffenceNo;
    let httpreq = new XMLHttpRequest();
    httpreq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            let jsonGetOffenceNoResponse = JSON.parse(this.responseText);
            console.log(jsonGetOffenceNoResponse);
            jsonGetOffenceNo = jsonGetOffenceNoResponse.offence_no;
            console.log(jsonGetOffenceNo);
            return jsonGetOffenceNo;
        }
    }

    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/offence", false); //async = false is mandatory for this function to work properly (???)
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=getOffenceNo" + "&offence_type=" + offenceType);

    return jsonGetOffenceNo;
}


/*Adding offence number to the API request*/
function fetchOffenceNo() {
    console.log("fetchOffenceNo() called");
    let offence_no;
    let selectedOffenceType = offence_type;
    console.log(selectedOffenceType);
    if(selectedOffenceType == "driver")
    {
        recievedOffenceNo = getOffenceNo("driver");
        console.log(recievedOffenceNo);
        if(recievedOffenceNo == 0) //Offence Number for Drivers 1-100
        {
            offence_no = 1;
        }
        else if(recievedOffenceNo > 0 && recievedOffenceNo < 100)
        {
            offence_no = recievedOffenceNo + 1;
        }
        else if (recievedOffenceNo == 100)
        {
            console.log("Maximum number of offences for drivers reached")
            getMessage("Maximum number of offences for drivers reached");
        }
        else
        {
            console.log("Error in fetching offence number for drivers");
        }
    }
    else if(selectedOffenceType == "vehicle") //Offence Number for Vehicles 101-200
    {
        recievedOffenceNo = getOffenceNo("vehicle");
        console.log(recievedOffenceNo);
        if(recievedOffenceNo == 0)
        {
            offence_no = 101;
        }
        else if(recievedOffenceNo > 100 && recievedOffenceNo < 200)
        {
            offence_no = recievedOffenceNo + 1;
        }
        else if (recievedOffenceNo == 200)
        {
            console.log("Maximum number of offences for vehicles reached");
            getMessage("Maximum number of offences for vehicles reached");
        }
        else
        {
            console.log("Error in fetching offence number for vehicles");
        }
    }
    else if(selectedOffenceType == "pedestrian") //Offence Number for Pedestrians 201-300
    {
        recievedOffenceNo = getOffenceNo("pedestrian");
        console.log(recievedOffenceNo);
        if(recievedOffenceNo == 0)
        {
            offence_no = 201;
        }
        else if(recievedOffenceNo > 200 && recievedOffenceNo < 300)
        {
            offence_no = recievedOffenceNo + 1;
        }
        else if (recievedOffenceNo == 300)
        {
            console.log("Maximum number of offences for pedestrians reached")
            getMessage("Maximum number of offences for pedestrians reached");
        }
        else
        {
            console.log("Error in fetching offence number for pedestrians");
        }
    }
    console.log("offence_no to be sent to the backend: " + offence_no);
    return offence_no;
}


//Sending data to backend

const addOffence = function(offence_no, offence_type, description, amount, demerit_point)
{
    console.log('came until js function for addOffence which sends data to backend');
    console.log(offence_no);
    console.log(offence_type);
    console.log(description);
    console.log(amount);
    console.log(demerit_point);

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
    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/offence", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send("action=addOffence" + "&offence_no=" + offence_no + "&offence_type=" + offence_type + "&description=" + description + "&amount=" + amount + "&demerit_point=" + demerit_point);

    function addOffenceData(httpReq)
    {
        let jsonAddOffenceResponse = JSON.parse(httpReq.responseText);
        console.log(jsonAddOffenceResponse);
        let addOffenceStatus = jsonAddOffenceResponse.status;
        console.log(addOffenceStatus);
        return addOffenceStatus;

    }
    
}

 



function deleteMessage(el) {
    setTimeout(() => {
        document.body.removeChild(el);
    }, 6000);
}




