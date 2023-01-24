const loadPolicemanDetails = function()
{
    console.log("I was called onload");
    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            completeLoad(this);
        }
    }
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/viewPoliceman", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.send();

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
                policemanDataHTMLoutput(jsonPolicemanData.List[i].name.value, jsonPolicemanData.List[i].police_id,
                jsonPolicemanData.List[i].nic, jsonPolicemanData.List[i].rank, jsonPolicemanData.List[i].police_station);
            }

        }
        else
        {
            alert("Something went wrong");
        }
    }
}

function policemanDataHTMLoutput(name, police_id, nic, rank, police_station)
{
    console.log(name.value);
    console.log(police_id.value);
    console.log(nic);
    console.log(rank);
    console.log(police_station);

    const policemanData = document.getElementById("policemanData");
    policemanData.innerHTML = "";


    let htmlString = 
    '<tr>' + 
    '<td data-th="Supplier Code">' + name + '</td>' + 
    '<td data-th="Supplier Name">' + police_id + '</td>' + 
    '<td data-th="Invoice Number">' + nic + '</td>' + 
    '<td data-th="Invoice Date">' + rank + '</td>' + 
    '<td data-th="Due Date">' + police_station + '</td>' + 
    '</tr>';


    policemanData.innerHTML += htmlString;


    console.log(htmlString);

    console.log(name);
    console.log(police_id);
    console.log(nic);
    console.log(rank);
    console.log(police_station);
    
}