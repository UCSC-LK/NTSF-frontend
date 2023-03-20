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
}


