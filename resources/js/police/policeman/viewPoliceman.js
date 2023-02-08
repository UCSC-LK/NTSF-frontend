const loadPolicemanDetails = function()
{
    var table = document.getElementById("table");

    console.log("I was called onload");
    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            completeLoad(this);
        }
    }
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
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
                jsonPolicemanData.List[i].nic, jsonPolicemanData.List[i].mobile_number, jsonPolicemanData.List[i].email, jsonPolicemanData.List[i].rank, jsonPolicemanData.List[i].police_station);
            }

        }
        else
        {
            alert("Something went wrong");
        }
    }
    return jsonPolicemanData;
}

function policemanDataHTMLoutput(name, police_id, nic, mobile_number, email, rank, police_station)
{
    console.log(name);
    console.log(police_id);
    console.log(nic);
    console.log(mobile_number);
    console.log(email);
    console.log(rank);
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

    //Add content to the table data cells
    dataCell1.innerHTML = name;
    dataCell2.innerHTML = police_id;
    dataCell3.innerHTML = nic;
    dataCell4.innerHTML = mobile_number;
    dataCell5.innerHTML = email;
    dataCell6.innerHTML = rank;
    dataCell7.innerHTML = police_station;
    // dataCell8.innerHTML = "<button type='button' class='btn btn-primary' onclick='editPolicemanDetails("+police_id+")'><i class='fa-regular fa-pen-to-square'></i></button>";
    // dataCell9.innerHTML = "<button type='button' class='btn btn-danger' onclick='deletePolicemanDetails("+police_id+")'> <i class='fa-solid fa-trash'></i></button>";
    dataCell8.innerHTML = "<button type='button' class='btn btn-primary' onclick='editPolicemanDetails("+police_id+")'>Edit</button>";
    dataCell9.innerHTML = "<button type='button' class='btn btn-danger' onclick='deletePolicemanDetails("+police_id+")'>Delete</button>";
        
}

function deletePolicemanDetails(police_id) //Delete a policeman
{
    console.log("Function called to Delete a policeman");
    console.log(police_id);
    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            policemanDeletionStatus = false;
            if(deletePolicemanData(this))
            {
                console.log("Policeman deleted successfully");
                policemanDeletionStatus = true;
            }
            else
            {
                console.log("Policeman deletion failed");
                policemanDeletionStatus = false;
            }
            getMessage(policemanDeletionStatus);
        }
    }
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
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
            alert("Policeman deleted successfully");
            console.log("Policeman deleted successfully");
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
