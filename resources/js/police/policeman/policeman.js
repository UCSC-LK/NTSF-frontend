//Dropdown options for police rank
const rank = document.getElementById("rank");

const rankData = {
    "Policeman": "",
    "OIC": ""
}

for (let key in rankData) {
    let option = document.createElement("option");
    option.setAttribute('value', rankData["option" + key]);

    //remove later
    console.log(key);
    
    let optionText = document.createTextNode(key); 
    option.appendChild(optionText);
  
    rank.appendChild(option);
}


/*
    // an array of options
    var options = ["Option 1", "Option 2", "Option 3"];

    // reference to the select element
    var select = document.getElementById("mySelect");

    // loop through the options and add each one to the select element
    for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);    
}
 */




const addPolicemanButton = document.getElementById("addPolicemanButton");

const addPoliceman = function()
{
    let name = document.getElementById("name").value;
    let police_id = document.getElementById("police_id").value;
    let nic = document.getElementById("nic").value;
    let rank = [document.getElementById("rank").option].value;
    let police_station = document.getElementById("police_station").value;

    if(validateForm(name, police_id, nic, rank, police_station))
    { 
        console.log(name);
        console.log(police_id);
        console.log(nic);
        console.log(rank);
        console.log(police_station);

        let httpReq = new XMLHttpRequest();
        httpReq.onreadystatechange = function()
        {
            if(this.readyState === 4 && this.status === 200)
            {
                addPolicemanData(this);
            }
        }
        httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/addPoliceman", true);
        httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpReq.send("name=" + name + "&police_id=" + police_id + "&nic=" + nic + "&rank=" + rank + "&police_station=" + police_station);

        function addPolicemanData(httpReq)
        {
            let jsonAddPolicemanResponse = JSON.parse(httpReq.responseText);
            console.log(jsonAddPolicemanResponse);
        }
    }

}

function validateForm(name, police_id, nic, rank, police_station)
{
    if(name == "" || name == null)
    {
        // alert("Name must be filled out");
        document.getElementById("name").style.border = "2px solid red";
        document.getElementById("name").style.borderRadius = "5px";
        document.getElementById("name").style.backgroundColor = "rgba(255, 0, 0, 0.2)";

        document.getElementById("nameAlert").innerHTML = "*Name must be filled out";
        document.getElementById("nameAlert").style.color = "red";

        return false;
    }
    
    else if(police_id == "" || police_id == null)
    {
        // alert("Police ID must be filled out");
        document.getElementById("police_id").style.border = "2px solid red";
        document.getElementById("police_id").style.borderRadius = "5px";
        document.getElementById("police_id").style.backgroundColor = "rgba(255, 0, 0, 0.2)";

        document.getElementById("police_idAlert").innerHTML = "*Police ID  must be filled out";
        document.getElementById("police_idAlert").style.color = "red";
        return false;
    }

    else if(nic == "" || nic == null)
    {
        // alert("NIC must be filled out");
        document.getElementById("nic").style.border = "2px solid red";
        document.getElementById("nic").style.borderRadius = "5px";
        document.getElementById("nic").style.backgroundColor = "rgba(255, 0, 0, 0.2)";

        document.getElementById("nicAlert").innerHTML = "*Nic number must be filled out";
        document.getElementById("nicAlert").style.color = "red";
        return false;
    }

    else if(rank == "" || rank == null)
    {
        // alert("Rank must be chosen");
        document.getElementById("rank").style.border = "2px solid red";
        document.getElementById("rank").style.borderRadius = "5px";
        document.getElementById("rank").style.backgroundColor = "rgba(255, 0, 0, 0.2)";

        document.getElementById("rankAlert").innerHTML = "*rank must be chosen";
        document.getElementById("rankAlert").style.color = "red";
        return false;
    }

    else if(police_station == "" || police_station == null)
    {
        // alert("Police Station must be chosen");
        document.getElementById("police_station").style.border = "2px solid red";
        document.getElementById("police_station").style.borderRadius = "5px";
        document.getElementById("police_station").style.backgroundColor = "rgba(255, 0, 0, 0.2)";

        document.getElementById("police_stationAlert").innerHTML = "*Police Station must be filled out";
        document.getElementById("police_stationAlert").style.color = "red";
        return false;
    }
}















//jquery
// var script = document.createElement("script");
// script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
// document.getElementsByTagName("head")[0].appendChild(script);


// function addPoliceman()
// {
//     const name = document.getElementById("name").value;
//     const police_id = document.getElementById("police_id").value;
//     const nic = document.getElementById("nic").value;
//     const rank = document.getElementById("rank").value;
//     const police_station = document.getElementById("police_station").value;

//     const query = $.param({
//         name,
//         police_id,
//         nic,
//         rank,
//         police_station
//     });

//     const settings = {
//         url: `http://localhost:8080/ntsf_backend_war/addPoliceman?${query}`,
//         method: "POST"
//     }

//     $.ajax(settings).done(submitSuccessCallback).fail(submitUnsuccessCallback);
// }

