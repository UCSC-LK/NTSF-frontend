const loadOffenceDetails = function()
{
    var table = document.getElementById("table");

    console.log("I was called onload");
    console.log("Printing session storage values")
    let offenceType = sessionStorage.getItem("offence_type");
    console.log(offenceType);;

    //Set the offence type in the page heading
    if(offenceType === "driver")
    {
        document.getElementById("offenceType").innerHTML = "Driver Offences";
    }
    else if(offenceType === "vehicle")
    {
        document.getElementById("offenceType").innerHTML = "Vehicle Offences";
    }
    else if(offenceType === "pedestrian")
    {
        document.getElementById("offenceType").innerHTML = "Pedestrian Offences";
    }
    else{
        console.log("Something went wrong");
    }


    jwt = sessionStorage.getItem('jwt');
    console.log(jwt);
    user_police_id = sessionStorage.getItem('user_police_id');
    console.log(user_police_id);
    user_rank = sessionStorage.getItem('rank');
    console.log(user_rank);
    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            completeLoad(this);
        }
    }
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/offence", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=viewOffenceByType" + "&offence_type=" + offenceType);

    function completeLoad(httpreq)
    {
        let jsonOffenceData = JSON.parse(httpreq.responseText);
        console.log(jsonOffenceData);

        if(jsonOffenceData.serverResponse === "null session" || jsonOffenceData.serverResponse === "Not Allowed")
        {
            window.location.href = "http://localhost:8080/ntsf_backend_war/login"; //Redirect to login page
            console.log("Redirecting to login page");
        }
        else if(jsonOffenceData.serverResponse === "Allowed")
        {
            console.log("Allowed");
                    
            const offenceData = document.getElementById("offenceData");
            offenceData.innerHTML = "";

            let count =  jsonOffenceData.List.length - 1;
            for(i=0; i<= count; i++)
            {
                offenceDataHTMLoutput(jsonOffenceData.List[i].offence_no,
                jsonOffenceData.List[i].description, jsonOffenceData.List[i].amount, jsonOffenceData.List[i].demerit_points);
            }

        }
        else
        {
            alert("Something went wrong");
        }
        return jsonOffenceData;
    }
}

function offenceDataHTMLoutput(offence_no, description, amount, demerit_points)
{
    // create table data row
    var dataRow = table.insertRow();
    var dataCell1 = dataRow.insertCell(0);
    var dataCell2 = dataRow.insertCell(1);
    var dataCell3 = dataRow.insertCell(2);
    var dataCell4 = dataRow.insertCell(3);
    var dataCell5 = dataRow.insertCell(4);
    var dataCell6 = dataRow.insertCell(5);
    
    //Add content to the table data cells
    dataCell1.innerHTML = offence_no;
    dataCell2.innerHTML = description;
    dataCell3.innerHTML = amount;
    dataCell4.innerHTML = demerit_points;
    dataCell5.innerHTML = "<button type='button' id='editButton' onclick='editOffenceDetails("+offence_no+")'><i class='fa-solid fa-pen-to-square fa-xl' style='color: #0eabfa;'></i></button>";
    dataCell6.innerHTML = "<button type='button' id='deletebutton' onclick='deleteOffencePopUp("+offence_no+")'><i class='fa-solid fa-trash fa-xl' style='color: #0eabfa;'></i></button>";
}

function deleteOffenceDetails(offence_no) //Delete an offence
{
    console.log("Function called to Delete an offence");
    console.log(offence_no);
    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            offenceDeletionStatus = false;
            if(deleteOffenceData(this))
            {
                console.log("Offence deleted successfully");
                offenceDeletionStatus = true;
            }
            else
            {
                console.log("Offence deletion failed");
                offenceDeletionStatus = false;
            }
            getMessage(offenceDeletionStatus);
        }
    }
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/offence", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=deleteOffence" + "&offence_no=" +offence_no);

    function deleteOffenceData(httpreq)
    {
        console.log("deleteOffenceData function called");
        let jsonDeleteOffenceResponse = JSON.parse(httpreq.responseText);
        console.log(jsonDeleteOffenceResponse);
        let jsonDeleteOffenceResponseAlert = jsonDeleteOffenceResponse.alert;
        console.log(jsonDeleteOffenceResponseAlert);

        if(jsonDeleteOffenceResponseAlert == true)
        {
            console.log("Offence deleted successfully");
            window.location.reload();
            return true;
        }
        else
        {
            return false;
        }

    }
}

function editOffenceDetails(offence_no) //Edit a offence
{
    console.log("Function called to Edit an offence");
    window.location.href = "../../../../police/igp/updateOffence.html";
    sessionStorage.setItem("Updateoffence_no", offence_no);
}

//Model to ask are you sure want to delete??
const model = document.getElementById('myModel');
const modelYes = document.getElementById('model-yes');
const modelNo = document.getElementById('model-no');


function deleteOffencePopUp(offence_no) {
    model.style.display = "block";
    console.log("popup is called with offence_no: " + offence_no);

    modelYes.onclick = function() {
    // Perform the delete operation
    console.log("YES delete is clicked" + offence_no);
    deleteOffenceDetails(offence_no);
    model.style.display = "none";
    };


    modelNo.onclick = function() {
    console.log("NO delete is clicked" + offence_no);  
    model.style.display = "none";
    };

}

// Close the model window if the user clicks outside of it
window.onclick = function(event) {
  if (event.target == model) {
    model.style.display = "none";
  }
}
