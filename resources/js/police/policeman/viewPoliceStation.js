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
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/policeStation", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
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
                    
            const policestationData = document.getElementById("policestationData");
            policestationData.innerHTML = "";

            let count =  jsonPoliceStationData.List.length - 1;
            for(i=0; i<= count; i++)
            {
                policestationDataHTMLoutput(jsonPoliceStationData.List[i].branch_name, jsonPoliceStationData.List[i].address,
                jsonPoliceStationData.List[i].district, jsonPoliceStationData.List[i].province, jsonPoliceStationData.List[i].contact_number, jsonPoliceStationData.List[i].email);
            }

        }
        else
        {
            alert("Something went wrong");
        }
    }
    return jsonPoliceStationData;
}

function policestationDataHTMLoutput(branch_name, address, district, province, contact_number, email)
{
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

    //Add content to the table data cells
    dataCell1.innerHTML = branch_name;
    dataCell2.innerHTML = address;
    dataCell3.innerHTML = district;
    dataCell4.innerHTML = province;
    dataCell5.innerHTML = contact_number;
    dataCell6.innerHTML = email;
    // dataCell8.innerHTML = "<button type='button' class='btn btn-primary' onclick='editPolicemanDetails("+policeid+")'>Edit</button>";
    // dataCell9.innerHTML = "<button type='button' class='btn btn-danger' onclick='deletePolicemanDetails("+police_id+")'>Delete</button>";
    
}

