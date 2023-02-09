function fetchPolicemanDetails(){
    console.log("I was called onload");
    let police_id = sessionStorage.getItem("Updatepolice_id");

    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            if(fetchPolicemanData(this))
            {
                console.log("Policeman fetched successfully");
            }
            else
            {
                console.log("Policeman fetch failed");
            }
        }
    }

    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.send("action=fetchPoliceman" + "&police_id=" +police_id);

    function fetchPolicemanData(httpreq)
    {
        let jsonPolicemanData = JSON.parse(httpreq.responseText)
        console.log(jsonPolicemanData);

        if(jsonPolicemanData.serverResponse === "null session" || jsonPolicemanData.serverResponse === "Not Allowed")
        {
            window.location.href = "http://localhost:8080/ntsf_backend_war/login"; //Redirect to login page
            console.log("Redirecting to login page");
        }
        else if(jsonPolicemanData.serverResponse === "Allowed")
        {
            console.log("Allowed");
                    
            let name = document.getElementById("name");
            let police_id = document.getElementById("police_id");
            let nic = document.getElementById("nic");
            let mobile_number = document.getElementById("mobile_number");
            let email = document.getElementById("email")
            let rank = document.getElementById("rank");
            let police_station = document.getElementById("police_station");

            console.log(name);
            console.log(police_id);
            console.log(nic);
            console.log(mobile_number);
            console.log(email);
            console.log(rank);
            console.log(police_station);

            name.setAttribute("value", jsonPolicemanData.List[0].name);
            police_id.setAttribute("value", jsonPolicemanData.List[0].police_id);
            nic.setAttribute("value", jsonPolicemanData.List[0].nic);
            mobile_number.setAttribute("value", jsonPolicemanData.List[0].mobile_number);
            email.setAttribute("value", jsonPolicemanData.List[0].email);
            rank.setAttribute("value", jsonPolicemanData.List[0].rank);
            police_station.setAttribute("value", jsonPolicemanData.List[0].police_station)
        }
        else
        {
            alert("Something went wrong");
        }
    }
}

const form = document.getElementById('form');
// const name = document.getElementById('name');
// const police_id = document.getElementById('police_id');
// const nic = document.getElementById('nic');
// const mobile_number = document.getElementById('mobile_number');
// const email = document.getElementById('email');

// form.addEventListener('submit', e => {
// 	e.preventDefault();
//     checkInputs();
// });







