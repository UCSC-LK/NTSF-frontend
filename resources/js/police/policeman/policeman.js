const rank = document.getElementById("rank");

const rankData = {
    "Policeman": "",
    "OIC": ""
}

for (let key in rankData) {
    let option = document.createElement("option");
    option.setAttribute('value', rankData[key]);
  
    let optionText = document.createTextNode(key);
    option.appendChild(optionText);
  
    rank.appendChild(option);
  }












//jquery
var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);


function addPoliceman()
{
    const name = document.getElementById("name").value;
    const police_id = document.getElementById("police_id").value;
    const nic = document.getElementById("nic").value;
    const rank = document.getElementById("rank").value;
    const police_station = document.getElementById("police_station").value;

    const query = $.param({
        name,
        police_id,
        nic,
        rank,
        police_station
    });

    const settings = {
        url: `http://localhost:8080/ntsf_backend_war/addPoliceman?${query}`,
        method: "POST"
    }

    $.ajax(settings).done(submitSuccessCallback).fail(submitUnsuccessCallback);
}

