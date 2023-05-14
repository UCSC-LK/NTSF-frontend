document.getElementById('user_name').innerHTML = sessionStorage.getItem('user_police_name');
const loadPolicemanDetails = function()
{
    var table = document.getElementById("table");

    console.log("I was called onload");
    console.log("Printing session storage values");
    jwt = sessionStorage.getItem('jwt');
    console.log(jwt);
    user_police_id = sessionStorage.getItem('police_id');
    console.log(user_police_id);
    user_rank = sessionStorage.getItem('rank');
    console.log(user_rank);
    user_police_station = sessionStorage.getItem('user_police_station');
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

    //Add content to the table data cells
    dataCell1.innerHTML = name;
    dataCell2.innerHTML = police_id;
    dataCell3.innerHTML = nic;
    dataCell4.innerHTML = mobile_number;
    dataCell5.innerHTML = email;
    dataCell6.innerHTML = position;
    //not assigned should be turend as null

}
