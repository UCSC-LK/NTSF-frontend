function fetchOffenceDetails(){
    console.log("I was called onload");
    let offence_no = sessionStorage.getItem("Updateoffence_no");

    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            if(fetchOffenceData(this))
            {
                console.log("Offence fetched successfully");
            }
            else
            {
                console.log("Offence fetch failed");
            }
        }
    }

    httpreq.open("GET","http://localhost:8080/ntsf_backend_war/offence?action=fetchOffence&offence_no=" +offence_no, true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send();

    function fetchOffenceData(httpreq)
    {
        let jsonOffenceData = JSON.parse(httpreq.responseText)
        console.log(jsonOffenceData);

        if(jsonOffenceData.serverResponse === "null session" || jsonOffenceData.serverResponse === "Not Allowed")
        {
            window.location.href = "http://localhost:8080/ntsf_backend_war/login"; //Redirect to login page
            console.log("Redirecting to login page");
        }
        else if(jsonOffenceData.serverResponse === "Allowed")
        {
            console.log("Allowed");
            
            let offence_type = document.getElementById("offence_type");
            let offence_no = document.getElementById("offence_no");
            let description = document.getElementById("description");
            let amount = document.getElementById("amount");
            let demerit_points = document.getElementById("demerit_points");

            console.log(offence_type);
            console.log(offence_no);
            console.log(description);
            console.log(amount);
            console.log(demerit_points);

            offence_type.setAttribute("value", jsonOffenceData.List[0].offence_type);
            offence_no.setAttribute("value", jsonOffenceData.List[0].offence_no);
            description.setAttribute("value", jsonOffenceData.List[0].description);
            amount.setAttribute("value", jsonOffenceData.List[0].amount);
           // demerit_points.setAttribute("value", jsonOffenceData.List[0].demerit_points);
        }
        else
        {
            alert("Something went wrong");
        }
    }
}

const form = document.getElementById('form');
const offence_type = document.getElementById('offence_type');
const offence_no = document.getElementById('offence_no');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const demerit_points = document.getElementById('demerit_points');

var police_idSession = sessionStorage.getItem("username");
console.log("Printing below the username from session storage");
console.log("police_idSession: " + police_idSession);

const demerit_pointOptions = document.getElementById('demerit_pointOptions');
let demerit_pointOptionList = [3, 2, 1];

form.addEventListener('submit', e => {
	e.preventDefault();
    checkInputs();
});

//Checking whether data already exisiting
//Here javascript event listener is called only when the value in the input field is changed

document.getElementById('description').addEventListener('blur', function(){
    console.log('came until js function for event listener of Description blure');
    let descriptionValue = description.value.trim();
    if(descriptionValue !== ''){
        checkOffenceDescription(descriptionValue);
    }
});

//Show alert if offence type is changed by the user that it could not be changed
document.getElementById('offence_type').addEventListener('input', function(){
    console.log('came until js function for event listener of offence_type input');
    alert("You cannot change the offence type");  //Complete this part later
});

//Show alert if offence no is changed by the user that it could not be changed
document.getElementById('offence_no').addEventListener('input', function(){
    console.log('came until js function for event listener of offence_no input');
    alert("You cannot change the offence no");  //Complete this part later
});

//Input validating
function checkInputs() {
	// trim to remove the whitespaces
    const offence_typeValue = offence_type.value.trim();
    const offence_noValue = offence_no.value.trim();
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
        console.log("offence_type: " + offence_typeValue);
        console.log("offence_no: " + offence_noValue);
        updateOffence(offence_typeValue, offence_noValue, descriptionValue, amountValue, demerit_pointValue);
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


const updateOffence = function(offence_type, offence_no, description, amount, demerit_points)
{
    console.log('came until js function for updateOffence which sends data to backend');
    console.log("offence_type: " + offence_type);
    console.log("offence_no: " + offence_no);
    console.log("description: " + description);
    console.log("amount: " + amount);   
    console.log("demerit_points: " + demerit_points);

    let httpReq = new XMLHttpRequest();
    httpReq.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            offenceAdditionStatus = false;
            if(updateOffenceData(this))
            {
                console.log("Offence updated successfully");
                offenceAdditionStatus = true;
            }
            else
            {
                console.log("Offence updated failed");
                offenceAdditionStatus = false;
            }
            getMessage(offenceAdditionStatus);
        }
    }

    // var data={};
    // data.action="updateOffence";
    // data.offence_type=offence_type;
    // data.offence_no=offence_no;
    // data.description=description;
    // data.amount=amount;
    // data.demerit_points=demerit_points;
    // var jsonData=JSON.stringify(data);


    // httpReq.open("PUT", "http://localhost:8080/ntsf_backend_war/offence", true);
    // httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    // httpReq.send("action=updateOffence" + "&offence_type=" + offence_type + "&offence_no=" + offence_no + "&description=" + description + "&amount=" + amount + "&demerit_points=" + demerit_points);

    var url = "http://localhost:8080/ntsf_backend_war/offence?action=updateOffence"
        + "&offence_type=" + offence_type
        + "&offence_no=" + offence_no
        + "&description=" + description
        + "&amount=" + amount
        + "&demerit_points=" + demerit_points;
    httpReq.open("PUT", url, true);
    httpReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpReq.send();



    function updateOffenceData(httpReq)
    {
        let jsonUpdateOffenceResponse = JSON.parse(httpReq.responseText);
        console.log(jsonUpdateOffenceResponse);
        let updateOffenceResponse = jsonUpdateOffenceResponse.alert;
        console.log(updateOffenceResponse);
        return updateOffenceResponse;
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

    if (offenceAdditionStatus == false) {
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

function deleteMessage(el) {
    setTimeout(() => {
        document.body.removeChild(el);
    }, 6000);
}












