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
    user_position = sessionStorage.getItem('position');
    console.log(user_position);
    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            completeLoad(this);
        }
    }
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=viewComplaintsAsInvestigationOfficer");

    function completeLoad(httpreq)
    {
        let jsonComplaintData = JSON.parse(httpreq.responseText);
        console.log(jsonComplaintData);

        if(jsonComplaintData.serverResponse === "null session" || jsonComplaintData.serverResponse === "Not Allowed")
        {
            window.location.href = "http://localhost:8080/ntsf_backend_war/login"; //Redirect to login page
            console.log("Redirecting to login page");
        }
        else if(jsonComplaintData.serverResponse === "Allowed")
        {
            console.log("Allowed");
                    
            const complaintData = document.getElementById("complaintData");
            complaintData.innerHTML = "";

            let count =  jsonComplaintData.List.length - 1;
            for(i=0; i<= count; i++)
            {
                complaintDataHTMLoutput(jsonComplaintData.List[i].user_id, jsonComplaintData.List[i].title,
                jsonComplaintData.List[i].complaint_no);
            }

        }
        else
        {
            alert("Something went wrong");
        }
        return jsonComplaintData;
    }
}

function complaintDataHTMLoutput(user_id, title, complaint_no)
{
    console.log(user_id);
    console.log(title);
    console.log(complaint_no);

    // create table data row
    var dataRow = table.insertRow();
    var dataCell1 = dataRow.insertCell(0);
    var dataCell2 = dataRow.insertCell(1);
    var dataCell3 = dataRow.insertCell(2);
    var dataCell4 = dataRow.insertCell(3);

    //Add content to the table data cells
    dataCell1.innerHTML = user_id;
    dataCell2.innerHTML = title;
    dataCell3.innerHTML = description;
    dataCell4.innerHTML = complaint_no;
    dataCell4.innerHTML = "<button type='button' class='btn btn-primary' id='viewButton' onclick='viewComplaintDetails("+user_id+")'>view</button>";
}

function viewComplaintDetails(user_id) //view a Complaint in Detail
{
    console.log("Function called to view a Complaint in detail");
    window.location.href = "../../../../../police/policeman/investigationOfficer/Complaint.html";
    sessionStorage.setItem("viewUser_id", user_id);
}



