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
    
    //Add content to the table data cells
    dataCell1.innerHTML = offence_no;
    dataCell2.innerHTML = description;
    dataCell3.innerHTML = amount;
    dataCell4.innerHTML = demerit_points;
}





