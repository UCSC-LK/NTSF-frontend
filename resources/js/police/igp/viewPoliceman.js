const loadPolicemanDetails = function()
{

    let user_rank = sessionStorage.getItem('rank');
    if(user_rank !== "igp"){
        window.location.href = "../../404error.html"; //Redirect to 404 error page
        console.log("Redirecting to 404 error page");
    }
    else{            
        document.getElementById('user_name').innerHTML = sessionStorage.getItem('user_police_name');
        
        var table = document.getElementById("table");

        console.log("I was called onload");
        console.log("Printing session storage values")
        jwt = sessionStorage.getItem('jwt');
        console.log(jwt);
        user_police_id = sessionStorage.getItem('user_police_id');
        console.log("user_police_id: " +user_police_id);
        user_rank = sessionStorage.getItem('rank');
        console.log(user_rank);
        let httpreq = new XMLHttpRequest;
        httpreq.onreadystatechange = function()
        {
            if (this.readyState === 4 && this.status === 200) {
                completeLoad(this);
            }
        }
        
        httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/igp", true);
        httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
        httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
        httpreq.send("action=viewPoliceman");

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
                    jsonPolicemanData.List[i].nic, jsonPolicemanData.List[i].mobile_number, jsonPolicemanData.List[i].email, jsonPolicemanData.List[i].rank, jsonPolicemanData.List[i].grade ,  jsonPolicemanData.List[i].police_station);
                }

            }
            else
            {
                alert("Something went wrong");
            }
            return jsonPolicemanData;
        }
    }
}

function policemanDataHTMLoutput(name, police_id, nic, mobile_number, email, rank, grade, police_station)
{
    console.log(name);
    console.log(police_id);
    console.log(nic);
    console.log(mobile_number);
    console.log(email);
    console.log(rank);
    console.log(grade);
    console.log(police_station);

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
    var dataCell9 = dataRow.insertCell(8);
    var dataCell10 = dataRow.insertCell(9);

    //Add content to the table data cells
    dataCell1.innerHTML = name;
    dataCell2.innerHTML = police_id;
    dataCell3.innerHTML = nic;
    dataCell4.innerHTML = mobile_number;
    dataCell5.innerHTML = email;
    // dataCell6.innerHTML = rank;
    if(rank === "igp")
    {
        dataCell6.innerHTML = "IGP";
    }
    else if(rank === "oic"){
        dataCell6.innerHTML = "OIC";
    }
    else if(rank === "policeman"){
        dataCell6.innerHTML = "Policeman";
    }
    else{
        dataCell6.innerHTML = "Unknown";
    }
    dataCell7.innerHTML = grade;
    dataCell8.innerHTML = police_station;
    // dataCell8.innerHTML = "<button type='button' class='btn btn-primary' onclick='editPolicemanDetails("+police_id+")'><i class='fa-regular fa-pen-to-square'></i></button>";
    // dataCell9.innerHTML = "<button type='button' class='btn btn-danger' onclick='deletePolicemanDetails("+police_id+")'> <i class='fa-solid fa-trash'></i></button>";
    dataCell9.innerHTML = "<button type='button' id='editButton' onclick='editPolicemanDetails("+police_id+")'><i class='fa-solid fa-pen-to-square fa-xl' style='color: #0eabfa;'></i></button>";
    dataCell10.innerHTML = "<button type='button' id='deletebutton' onclick='deletePolicemanPopUp("+police_id+")'><i class='fa-solid fa-trash fa-xl' style='color: #0eabfa;'></i></button>";
}

function deletePolicemanDetails(police_id) //Delete a policeman
{
    console.log("Function called to Delete a policeman");
    console.log(police_id);
    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            policemanDeletionStatus = true;
            // if(deletePolicemanData(this))
            // {
            //     console.log("Policeman deleted successfully");
            //     policemanDeletionStatus = true;
            // }
            // else
            // {
            //     console.log("Policeman deletion failed");
            //     policemanDeletionStatus = false;
            // }
            getMessage(policemanDeletionStatus);
            wind
        }
    }
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/igp", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=deletePoliceman" + "&police_id=" +police_id);

    function deletePolicemanData(httpreq)
    {
        console.log("deletePolicemanData function called");
        let jsonDeletePolicemanResponse = JSON.parse(httpreq.responseText);
        console.log(jsonDeletePolicemanResponse);
        let jsonDeletePolicemanResponseAlert = jsonDeletePolicemanResponse.alert;
        console.log(jsonDeletePolicemanResponseAlert);

        if(jsonDeletePolicemanResponseAlert == true)
        {
            console.log("Policeman deleted successfully");
            window.location.reload();
            return true;
        }
        else
        {
            return false;
        }

    }
}

function editPolicemanDetails(police_id) //Edit a policeman
{
    console.log("Function called to Edit a policeman");
    window.location.href = "../../../../police/igp/updatePoliceman.html";
    sessionStorage.setItem("Updatepolice_id", police_id);
}

//Model to ask are you sure want to delete??
const model = document.getElementById('myModel');
const modelYes = document.getElementById('model-yes');
const modelNo = document.getElementById('model-no');


function deletePolicemanPopUp(police_id) {
    model.style.display = "block";
    console.log("popup is called with police_id: " + police_id);

    modelYes.onclick = function() {
    // Perform the delete operation
    console.log("YES delete is clicked" + police_id);
    deletePolicemanDetails(police_id);
    model.style.display = "none";
    };


    modelNo.onclick = function() {
    console.log("NO delete is clicked" + police_id);  
    model.style.display = "none";
    };

}

// Close the model window if the user clicks outside of it
window.onclick = function(event) {
  if (event.target == model) {
    model.style.display = "none";
  }
}
