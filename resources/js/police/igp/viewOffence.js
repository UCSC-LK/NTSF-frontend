const loadOffenceDetails = function()
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
    httpreq.send("action=viewOffence");

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
                offenceDataHTMLoutput(jsonOffenceData.List[i].offence_no, jsonOffenceData.List[i].offence_type,
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

function offenceDataHTMLoutput(offence_no, offence_type, description, amount, demerit_points)
{
    console.log(offence_no);
    console.log(offence_type);
    console.log(description);
    console.log(amount);
    console.log(demerit_points);

    // create table data row
    var dataRow = table.insertRow();
    var dataCell1 = dataRow.insertCell(0);
    var dataCell2 = dataRow.insertCell(1);
    var dataCell3 = dataRow.insertCell(2);
    var dataCell4 = dataRow.insertCell(3);
    var dataCell5 = dataRow.insertCell(4);
    var dataCell6 = dataRow.insertCell(5);
    var dataCell7 = dataRow.insertCell(6);
    
    //Add content to the table data cells
    dataCell1.innerHTML = offence_no;
    dataCell2.innerHTML = offence_type;
    dataCell3.innerHTML = description;
    dataCell4.innerHTML = amount;
    dataCell5.innerHTML = demerit_points;
    dataCell6.innerHTML = "<button type='button' id='editButton' onclick='editPolicemanDetails("+offence_no+")'><i class='fa-solid fa-pen-to-square fa-xl' style='color: #0eabfa;'></i></button>";
    dataCell7.innerHTML = "<button type='button' id='deletebutton' onclick='deletePolicemanPopUp("+offence_no+")'><i class='fa-solid fa-trash fa-xl' style='color: #0eabfa;'></i></button>";
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
const modal = document.getElementById('myModal');
const modalYes = document.getElementById('modal-yes');
const modalNo = document.getElementById('modal-no');


function deleteOffencePopUp(offence_no) {
    modal.style.display = "block";
    console.log("popup is called with offence_no: " + offence_no);

    modalYes.onclick = function() {
    // Perform the delete operation
    console.log("YES delete is clicked" + offence_no);
    deleteOffenceDetails(offence_no);
    modal.style.display = "none";
    };


    modalNo.onclick = function() {
    console.log("NO delete is clicked" + offence_no);  
    modal.style.display = "none";
    };

}

// Close the modal window if the user clicks outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
