
function fetchFineDetails(){
    var table = document.getElementById("table");
    console.log("I was called onload");
    console.log("Printing session storage values");
    jwt = sessionStorage.getItem('jwt');
    console.log(jwt);
    user_police_id = sessionStorage.getItem('user_police_id');
    console.log(user_police_id);
    user_rank = sessionStorage.getItem('rank');
    console.log(user_rank);
    user_police_station = sessionStorage.getItem('user_police_station');
    console.log(user_police_station);


    console.log("Unpaid Fine Details was called");
    var offence_type = sessionStorage.getItem("offence_type");
    console.log("offence_type: " + offence_type);
    var payment_status = "unpaid";
  
    

    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            completeLoad(this);
        }
    }
    
    console.log("policeStation is " + user_police_station);
    console.log("offence_type is " + offence_type);
    console.log("payment_status is " + payment_status);

    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/fine", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=viewFineAsOIC" + "&police_station=" + user_police_station + "&offence_type=" + offence_type + "&payment_status=" + payment_status);

    function completeLoad(httpreq)
    {
        let jsonFineData = JSON.parse(httpreq.responseText);
        console.log(jsonFineData);

        if(jsonFineData.serverResponse === "null session" || jsonFineData.serverResponse === "Not Allowed")
        {
            window.location.href = "http://localhost:8080//login"; //Redirect to login page
            console.log("Redirecting to login page");
        }
        else if(jsonFineData.serverResponse === "Allowed")
        {
            console.log("Allowed");

            const fineData = document.getElementById("fineData");
            fineData.innerHTML = "";

            if(offence_type === "driver")
            {
                document.getElementById("vehicle_no_th").setAttribute("hidden", true); //Make the vehicle header coloumn invisible

                let count = jsonFineData.List.length - 1;
                for(i=0; i<= count; i++)
                {
                    var dataRow = table.insertRow();
                    var dataCell1 = dataRow.insertCell(0);
                    var dataCell2 = dataRow.insertCell(1);
                    var dataCell3 = dataRow.insertCell(2);
                    var dataCell4 = dataRow.insertCell(3);
                    var dataCell5 = dataRow.insertCell(4);
                    var dataCell6 = dataRow.insertCell(5);
                    var dataCell7 = dataRow.insertCell(6);
                    var dataCell8 = dataRow.insertCell(7);
                    var dataCell9 = dataRow.insertCell(8);
                    var dataCell10 = dataRow.insertCell(9);
                    var dataCell11 = dataRow.insertCell(10);
                    var dataCell12 = dataRow.insertCell(11);

                    dataCell1.innerHTML = jsonFineData.List[i].fine_no;
                    dataCell2.innerHTML = jsonFineData.List[i].offence_no;
                    dataCell3.innerHTML = jsonFineData.List[i].offence_description;
                    dataCell4.innerHTML = jsonFineData.List[i].spot_description;
                    dataCell5.innerHTML = jsonFineData.List[i].nic;
                    dataCell6.innerHTML = jsonFineData.List[i].license_no;
                    dataCell7.innerHTML = jsonFineData.List[i].driven_vehicle_no;
                    dataCell8.innerHTML = jsonFineData.List[i].police_id;
                    dataCell9.innerHTML = jsonFineData.List[i].imposed_date_time;
                    dataCell10.innerHTML = jsonFineData.List[i].due_date_time;
                    dataCell11.innerHTML = jsonFineData.List[i].amount;

                    var latitude = jsonFineData.List[i].latitude;
                    var longitude = jsonFineData.List[i].longitude;

                    dataCell12.innerHTML = "<button type='button' id='viewFootageButton' onclick='viewFootage("+latitude+", "+longitude+")'><i class='fa-solid fa-credit-card'></i></button>";


                } 

            }
            else if(offence_type === "vehicle")
            {
                document.getElementById("license_no_th").setAttribute("hidden", true); //Make the license header coloumn invisible
                document.getElementById("driven_vehicle_no_th").setAttribute("hidden", true); //Make the driven vehicle header coloumn invisible

                let count = jsonFineData.List.length - 1;
                for(i=0; i <= count; i++)
                {
                    var dataRow = table.insertRow();
                    var dataCell1 = dataRow.insertCell(0);
                    var dataCell2 = dataRow.insertCell(1);
                    var dataCell3 = dataRow.insertCell(2);
                    var dataCell4 = dataRow.insertCell(3);
                    var dataCell5 = dataRow.insertCell(4);
                    var dataCell6 = dataRow.insertCell(5);
                    var dataCell7 = dataRow.insertCell(6);
                    var dataCell8 = dataRow.insertCell(7);
                    var dataCell9 = dataRow.insertCell(8);
                    var dataCell10 = dataRow.insertCell(9);
                    var dataCell11 = dataRow.insertCell(10);
    

                    dataCell1.innerHTML = jsonFineData.List[i].fine_no;
                    dataCell2.innerHTML = jsonFineData.List[i].offence_no;
                    dataCell3.innerHTML = jsonFineData.List[i].offence_description;
                    dataCell4.innerHTML = jsonFineData.List[i].spot_description;
                    dataCell5.innerHTML = jsonFineData.List[i].nic;
                    dataCell6.innerHTML = jsonFineData.List[i].vehicle_no;
                    dataCell7.innerHTML = jsonFineData.List[i].police_id;
                    dataCell8.innerHTML = jsonFineData.List[i].imposed_date_time;
                    dataCell9.innerHTML = jsonFineData.List[i].due_date_time;
                    dataCell10.innerHTML = jsonFineData.List[i].amount;


                    var latitude = jsonFineData.List[i].latitude;
                    var longitude = jsonFineData.List[i].longitude;

                    dataCell11.innerHTML = "<button type='button' id='viewFootageButton' onclick='viewFootage("+latitude+", "+longitude+")'><i class='fa-solid fa-credit-card'></i></button>";


                }
            }
            else if(offence_type === "pedestrian")
            {

                document.getElementById("vehicle_no_th").setAttribute("hidden", true); //Make the vehicle header coloumn invisible
                document.getElementById("license_no_th").setAttribute("hidden", true); //Make the license header coloumn invisible
                document.getElementById("driven_vehicle_no_th").setAttribute("hidden", true); //Make the driven vehicle header coloumn invisible

                

                let count = jsonFineData.List.length - 1;
                for(i=0; i <= count; i++)
                {
                    var dataRow = table.insertRow();
                    var dataCell1 = dataRow.insertCell(0);
                    var dataCell2 = dataRow.insertCell(1);
                    var dataCell3 = dataRow.insertCell(2);
                    var dataCell4 = dataRow.insertCell(3);
                    var dataCell5 = dataRow.insertCell(4);
                    var dataCell6 = dataRow.insertCell(5);
                    var dataCell7 = dataRow.insertCell(6);
                    var dataCell8 = dataRow.insertCell(7);
                    var dataCell9 = dataRow.insertCell(8);
                    var dataCell10 = dataRow.insertCell(9);

                    dataCell1.innerHTML = jsonFineData.List[i].fine_no;
                    dataCell2.innerHTML = jsonFineData.List[i].offence_no;
                    dataCell3.innerHTML = jsonFineData.List[i].offence_description;
                    dataCell4.innerHTML = jsonFineData.List[i].spot_description;
                    dataCell5.innerHTML = jsonFineData.List[i].nic;
                    dataCell6.innerHTML = jsonFineData.List[i].police_id;
                    dataCell7.innerHTML = jsonFineData.List[i].imposed_date_time;
                    dataCell8.innerHTML = jsonFineData.List[i].due_date_time;
                    dataCell9.innerHTML = jsonFineData.List[i].amount;

                    var latitude = jsonFineData.List[i].latitude;
                    var longitude = jsonFineData.List[i].longitude;

                    dataCell10.innerHTML = "<button type='button' id='viewFootageButton' onclick='viewFootage("+latitude+", "+longitude+")'><i class='fa-solid fa-credit-card'></i></button>";

                }
            }
            else
            {
                console.log("Invalid offence type");
            }
        }
    }
}



