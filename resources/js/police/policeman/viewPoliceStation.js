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
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/policestation", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.send("action=viewPoliceStation");

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
                policemanDataHTMLoutput(jsonPolicemanData.List[i].branch_name, jsonPolicemanData.List[i].address,
                jsonPolicemanData.List[i].district, jsonPolicemanData.List[i].province, jsonPolicemanData.List[i].contact_number, jsonPolicemanData.List[i].email);
            }

        }
        else
        {
            alert("Something went wrong");
        }
    }
    return jsonPolicemanData;
}

function policemanDataHTMLoutput(name, address, district, province, contact_number, email)
{
    console.log(name);
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
    dataCell1.innerHTML = name;
    dataCell2.innerHTML = address;
    dataCell3.innerHTML = district;
    dataCell4.innerHTML = province;
    dataCell5.innerHTML = contact_number;
    dataCell6.innerHTML = email;
    
}

