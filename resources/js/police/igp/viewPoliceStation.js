document.getElementById('user_name').innerHTML = sessionStorage.getItem('user_police_name');
const loadPoliceStationDetails = function()
{
    var table = document.getElementById("table");

    console.log("I was called onload");
    console.log("Printing session storage values");
    let jwt = sessionStorage.getItem('jwt');
    console.log(jwt);
    let user_police_id = sessionStorage.getItem('user_police_id');
    console.log("user_police_id: " + user_police_id);
    let user_rank = sessionStorage.getItem('rank');
    console.log(user_rank);
    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            completeLoad(this);
        }
    }
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/policeStation", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=viewPoliceStation");

    function completeLoad(httpreq)
    {
        let jsonPoliceStationData = JSON.parse(httpreq.responseText);
        console.log(jsonPoliceStationData);

        if(jsonPoliceStationData.serverResponse === "null session" || jsonPoliceStationData.serverResponse === "Not Allowed")
        {
            window.location.href = "http://localhost:8080/ntsf_backend_war/login"; //Redirect to login page
            console.log("Redirecting to login page");
        }
        else if(jsonPoliceStationData.serverResponse === "Allowed")
        {
            console.log("Allowed");
                    
            const policeStationData = document.getElementById("policeStationData");
            policeStationData.innerHTML = "";

            let count =  jsonPoliceStationData.List.length - 1;
            for(i=0; i<= count; i++)
            {
                policeStationDataHTMLoutput(jsonPoliceStationData.List[i].branch_name, jsonPoliceStationData.List[i].address,
                jsonPoliceStationData.List[i].district, jsonPoliceStationData.List[i].province, jsonPoliceStationData.List[i].contact_number, jsonPoliceStationData.List[i].email);
            }

        }
        else
        {
            alert("Something went wrong");
        }
        return jsonPoliceStationData;
    }

}

function policeStationDataHTMLoutput(branch_name, address, district, province, contact_number, email)
{
    console.log("Function called to add Police Station data to the table");
    console.log(branch_name);
    console.log(address);
    console.log(district);
    console.log(province);
    console.log(contact_number);
    console.log(email);


    // create table data row
    var dataRow = table.insertRow();
    var dataCell1 = dataRow.insertCell(0);
    var dataCell2 = dataRow.insertCell(1);
    var dataCell3 = dataRow.insertCell(2);
    var dataCell4 = dataRow.insertCell(3);
    var dataCell5 = dataRow.insertCell(4);
    var dataCell6 = dataRow.insertCell(5);
    var dataCell7 = dataRow.insertCell(6);
    var dataCell8 = dataRow.insertCell(7);

    //Add content to the table data cells
    dataCell1.innerHTML = branch_name;
    dataCell2.innerHTML = address;
    dataCell3.innerHTML = district;
    dataCell4.innerHTML = province;
    dataCell5.innerHTML = contact_number;
    dataCell6.innerHTML = email;
    dataCell7.innerHTML = "<button type='button' id='editButton' onclick='editPoliceStationDetails(\""+branch_name+"\")'><i class='fa-solid fa-pen-to-square fa-xl' style='color: #0eabfa;'></i></button>";
    dataCell8.innerHTML = "<button type='button' id='deletebutton' onclick='deletePoliceStationPopUp(\""+branch_name+"\")'><i class='fa-solid fa-trash fa-xl' style='color: #0eabfa;'></i></button>";

    
}

function deletePoliceStationDetails(branch_name) //Delete a Police Station
{
    console.log("Function called to Delete a Police Station");
    console.log(branch_name);
    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            policeStationDeletionStatus = false;
            if(deletePoliceStationData(this))
            {
                console.log("Police Station deleted successfully");
                policeStationDeletionStatus = true;
            }
            else
            {
                console.log("Police Station deletion failed");
                policeStationDeletionStatus = false;
            }
            getMessage(policeStationDeletionStatus);
        }
    }
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/policeStation", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=deletePoliceStation" + "&branch_name=" +branch_name);

    function deletePoliceStationData(httpreq)
    {
        console.log("deletePoliceStationData function called");
        let jsonDeletePoliceStationResponse = JSON.parse(httpreq.responseText);
        console.log(jsonDeletePoliceStationResponse);
        let jsonDeletePoliceStationResponseAlert = jsonDeletePoliceStationResponse.alert;
        console.log(jsonDeletePoliceStationResponseAlert);

        if(jsonDeletePoliceStationResponseAlert == true)
        {
            console.log("PoliceStation deleted successfully");
            window.location.reload();
            return true;
        }
        else
        {
            return false;
        }

    }
}

function editPoliceStationDetails(branch_name) //Edit a Police Station
{
    console.log("Function called to Edit a Police Station");
    console.log(branch_name);
    window.location.href = "../../../../police/igp/updatePoliceStation.html";
    sessionStorage.setItem("Updatebranch_name", branch_name);
}

//Model to ask are you sure want to delete??
const model = document.getElementById('myModel');
const modelYes = document.getElementById('model-yes');
const modelNo = document.getElementById('model-no');


function deletePoliceStationPopUp(branch_name) {
    model.style.display = "block";
    console.log("popup is called with branch_name: " + branch_name);

    modelYes.onclick = function() {
    // Perform the delete operation
    console.log("YES delete is clicked" + branch_name);
    deletePoliceStationDetails(branch_name);
    model.style.display = "none";
    };


    modelNo.onclick = function() {
    console.log("NO delete is clicked" + branch_name);  
    model.style.display = "none";
    };

}

// Close the model window if the user clicks outside of it
window.onclick = function(event) {
  if (event.target == model) {
    model.style.display = "none";
  }
}


