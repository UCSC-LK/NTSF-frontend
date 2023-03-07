const loadPolicemanDetails = function()
{
    var table = document.getElementById("table");

    console.log("I was called onload");
    console.log("Printing session storage values")
    jwt = sessionStorage.getItem('jwt');
    console.log(jwt);
    user_police_id = sessionStorage.getItem('police_id');
    console.log(user_police_id);
    user_rank = sessionStorage.getItem('rank');
    console.log(user_rank);
    user_police_station = sessionStorage.getItem('police_station');
    console.log(user_police_station);
    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            completeLoad(this);
        }
    }
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/oic", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=viewPoliceman" + "&police_station=" + user_police_station);

    function completeLoad(httpreq)
    {
        let jsonPolicemanData = JSON.parse(httpreq.responseText);
        console.log(jsonPolicemanData);

        if(jsonPolicemanData.serverResponse === "null session" || jsonPolicemanData.serverResponse === "Not Allowed")
        {
            window.location.href = "http://localhost:8080/ntsf_backend_war/login"; //Redirect to login page
            console.log("Redirecting to login page");
        }
        else if(jsonPolicemanData.serverResponse === "Allowed")
        {
            console.log("Allowed");
                    
            const policemanData = document.getElementById("policemanData");
            policemanData.innerHTML = "";

            let count =  jsonPolicemanData.List.length - 1;
            for(i=0; i<= count; i++)
            {
                policemanDataHTMLoutput(jsonPolicemanData.List[i].name, jsonPolicemanData.List[i].police_id,
                jsonPolicemanData.List[i].nic, jsonPolicemanData.List[i].mobile_number, jsonPolicemanData.List[i].email, jsonPolicemanData.List[i].position);
            }

        }
        else
        {
            alert("Something went wrong");
        }
        return jsonPolicemanData;
    }
}

function policemanDataHTMLoutput(name, police_id, nic, mobile_number, email, position)
{
    console.log(name);
    console.log(police_id);
    console.log(nic);
    console.log(mobile_number);
    console.log(email);
    console.log(position);

    // create table data row
    var dataRow = table.insertRow();
    var dataCell1 = dataRow.insertCell(0);
    var dataCell2 = dataRow.insertCell(1);
    var dataCell3 = dataRow.insertCell(2);
    var dataCell4 = dataRow.insertCell(3);
    var dataCell5 = dataRow.insertCell(4);
    var dataCell6 = dataRow.insertCell(5);
    // var dataCell7 = dataRow.insertCell(6);

    //Add content to the table data cells
    dataCell1.innerHTML = name;
    dataCell2.innerHTML = police_id;
    dataCell3.innerHTML = nic;
    dataCell4.innerHTML = mobile_number;
    dataCell5.innerHTML = email;
    // dataCell6.innerHTML = position;

    if(position === "notAssigned"){
        dataCell6.innerHTML = "<select name='positionOptions' id='positionOptions'>" +
        "<option value='notAssigned' selected>Not Assigned</option>" + "<option value='trafficPolice'>Traffic Police</option>" + "<option value='investigationOfficer'>Investigation Officer</option>" + "<option value='courtSeargent'>Court Seargent</option>" + "</select>";
    }
    else if(position === "trafficPolice"){
        dataCell6.innerHTML = "<select name='position' id='position'>" +
        "<option value='notAssigned'>Not Assigned</option>" + "<option value='trafficPolice' selected>Traffic Police</option>" + "<option value='investigationOfficer'>Investigation Officer</option>" + "<option value='courtSeargent'>Court Seargent</option>" + "</select>";
    }
    else if(position === "investigationOfficer"){
        dataCell6.innerHTML = "<select name='position' id='position'>" +
        "<option value='notAssigned'>Not Assigned</option>" + "<option value='trafficPolice'>Traffic Police</option>" + "<option value='investigationOfficer' selected>Investigation Officer</option>" + "<option value='courtSeargent'>Court Seargent</option>" + "</select>";
    }
    else if(position === "courtSeargent"){
        dataCell6.innerHTML = "<select name='position' id='position'>" +
        "<option value='notAssigned'>Not Assigned</option>" + "<option value='trafficPolice'>Traffic Police</option>" + "<option value='investigationOfficer'>Investigation Officer</option>" + "<option value='courtSeargent' selected>Court Seargent</option>" + "</select>";
    }
    else{
    }



    dataCell7.innerHTML = "<button type='button' class='btn btn-primary' id='editButton' onclick='editPosition("+police_id+")'>Update Position</button>";
    // dataCell8.innerHTML = "<button type='button' class='btn btn-danger' id='deletebutton' onclick='deletePolicemanPopUp("+police_id+")'>Delete</button>";
}


function editPosition(police_id) //Edit the position of the policeman
{
   console.log(police_id);
    var selectedPosition = getSelectedPosition();
    console.log(selectedPosition);

    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            positionUpdationStatus = false;
            if(updatePositionData(this))
            {
                console.log("Position Updated");
                positionUpdationStatus = true;
                Location.reload();
            }
            else
            {
                console.log("Position Not Updated");
                positionUpdationStatus = false;
            }
            getMessage(positionUpdationStatus);
        }
    }

    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/oic", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=updatePosition" + "&police_id=" + police_id + "&position=" + selectedPosition);

    function updatePositionData(httpReq)
    {
        let jsonPositionData = JSON.parse(httpReq.responseText);
        console.log(jsonPositionData);
    }
}

function getSelectedPosition(){
    var selectedPosition = document.getElementById("positionOptions").value;
    console.log(selectedPosition);
    return selectedPosition;
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