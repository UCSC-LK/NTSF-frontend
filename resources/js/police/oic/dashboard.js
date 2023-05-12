function loadDashboardDetails(){
    console.log("I was called onload");
   
    
    jwt = sessionStorage.getItem('jwt');
    console.log(jwt);
    user_police_id = sessionStorage.getItem('user_police_id');
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

    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/oic", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=fetchDashboardDetails");

    function completeLoad(httpreq)
    {
        let jsonOffenceData = JSON.parse(httpreq.responseText);
        console.log(jsonOffenceData);

        if(jsonOffenceData.serverResponse === "null session" || jsonOffenceData.serverResponse === "Not Allowed")
        {
            window.location.href = "../login"; //Redirect to login page
            console.log("Redirecting to login page");
            sessionStorage.clear();
        }
        else if(jsonOffenceData.serverResponse === "Allowed")
        {
            console.log("Allowed");

            document.getElementById("noOfPolicestation").innerHTML = jsonOffenceData.List[0].policeStationCount;
            document.getElementById("noOfPoliceman").innerHTML = jsonOffenceData.List[0].policemanCount;
            document.getElementById("noOfTrafficPolice").innerHTML = jsonOffenceData.List[0].trafficPolicemanCount;
            document.getElementById("totalFine").innerHTML = jsonOffenceData.List[0].totalFineAmount;
            document.getElementById("collectedFine").innerHTML = jsonOffenceData.List[0].totalPaidFineAmount;
            document.getElementById("dueFine").innerHTML = jsonOffenceData.List[0].totalUnpaidFineAmount;
        }
        else
        {
            console.log("Something went wrong");
        }
    }


}