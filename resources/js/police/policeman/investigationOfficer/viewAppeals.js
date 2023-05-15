function viewAppealsOnLoad(){
    console.log("viewAppealsOnLoad is called");
    console.log("I was called onload");
    console.log("Printing session storage values");
    let jwt = sessionStorage.getItem('jwt');
    console.log(jwt);
    let user_police_id = sessionStorage.getItem('user_police_id');
    console.log("user_police_id: " + user_police_id);
    let user_rank = sessionStorage.getItem('rank');
    console.log(user_rank);
    let user_police_station = sessionStorage.getItem('user_police_station');
    console.log(user_police_station);
    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            completeLoad(this);
        }
    }
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=viewAppealsAsInvestigationOfficer" + "&police_station=" + user_police_station);

    function completeLoad(httpreq)
    {
        let jsonAppealData = JSON.parse(httpreq.responseText);
        console.log(jsonAppealData);

        if(jsonAppealData.serverResponse === "null session" || jsonAppealData.serverResponse === "Not Allowed")
        {
            window.location.href = "http://localhost:8080/ntsf_backend_war/login"; //Redirect to login page
            console.log("Redirecting to login page");
        }
        else if(jsonAppealData.serverResponse === "Allowed")
        {
            console.log("Allowed");
                    
            const appealData = document.getElementById("appealData");
            appealData.innerHTML = "";

            let count =  jsonAppealData.List.length - 1;
            for(i=0; i<= count; i++)
            {
                appealDataHTMLoutput(jsonAppealData.List[i].complaint_no, jsonAppealData.List[i].fine_no,
                jsonAppealData.List[i].user_id, jsonAppealData.List[i].title, jsonAppealData.List[i].description);
            }

        }
        else
        {
            alert("Something went wrong");
        }
        return jsonAppealData;
    }

}

function appealDataHTMLoutput(complaint_no, fine_no, user_id, title, description)
{
    console.log("Function called to add Appeals data to the table");
    console.log("complaint_no: " + complaint_no);
    console.log("fine_no: " + fine_no);
    console.log("user_id: " + user_id);
    console.log("title: " + title);
    console.log("description: " + description);

    // create table data row
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

    //Add content to the table data cells
    dataCell1.innerHTML = complaint_no;
    dataCell2.innerHTML = fine_no;
    dataCell3.innerHTML = user_id;
    dataCell4.innerHTML = title;
    dataCell5.innerHTML = description;
    dataCell6.innerHTML = "<button type='button' id='viewFootageButton' onclick='viewFootage("+complaint_no+", "+fine_no+")'><i class='fa-solid fa-photo-film fa-xl' style='color: #0eabfa;'></i></button>"
    dataCell7.innerHTML = "<button type='button' id='viewLocationButton' onclick='viewLocation("+complaint_no+", "+fine_no+", "+user_id+", \""+title+"\", \""+description+"\")'><i class='fa-solid fa-location-dot fa-xl' style='color: #0eabfa;'></i></button>";
    dataCell8.innerHTML = "<button type='button' id='AcceptButton' onclick='acceptAppeal("+complaint_no+", "+fine_no+")'><i class='fa-solid fa-check fa-2xl' style='color: #0eabfa;'></i></button>";
    dataCell9.innerHTML = "<button type='button' id='RejectButton' onclick='rejectAppeal("+complaint_no+", "+fine_no+")'><i class='fa-solid fa-xmark fa-2xl' style='color: #0eabfa;'></i></button>";

    
}

function viewLocation(complaint_no, fine_no, user_id, title, description){
    console.log("view Location is called");
    let jwt = sessionStorage.getItem('jwt');
    let user_police_id = sessionStorage.getItem('user_police_id');
    console.log("user_police_id: " + user_police_id);
    let user_rank = sessionStorage.getItem('rank');
    console.log(user_rank);
    let user_police_station = sessionStorage.getItem('user_police_station');
    console.log(user_police_station);
    console.log("Complaint No: " + complaint_no);
    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            completeLoad(this);
        }
    }
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/fine", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=viewLocation" + "&fine_no=" + fine_no);

    function completeLoad(httpreq)
    {
        let jsonFineData = JSON.parse(httpreq.responseText);
        console.log(jsonFineData);

        if(jsonFineData.serverResponse === "null session" || jsonFineData.serverResponse === "Not Allowed")
        {
            window.location.href = "http://localhost:8080/ntsf_backend_war/login"; //Redirect to login page
            console.log("Redirecting to login page");
        }
        else if(jsonFineData.serverResponse === "Allowed")
        {
            console.log("Allowed");
                    
            var latitude = jsonFineData.List[0].latitude;
            var longitude = jsonFineData.List[0].longitude;

            console.log("latitude: " + latitude);
            console.log("longitude: " + longitude);

            sessionStorage.setItem('maplatitude', latitude);
            sessionStorage.setItem('maplongitude', longitude);
            sessionStorage.setItem('mapcomplaint_no', complaint_no);
            sessionStorage.setItem('mapfine_no', fine_no);
            sessionStorage.setItem('mapuser_id', user_id);
            sessionStorage.setItem('maptitle', title);
            sessionStorage.setItem('mapdescription', description);

            window.location.href = "../../../../../police/policeman/investigationOfficer/location.html"

        }
        else
        {
            alert("Something went wrong");
        }

    }
    
}

function acceptAppeal(complaint_no, fine_no){

}

function rejectAppeal(complaint_no, fine_no){
    console.log("view Location is called");
    let jwt = sessionStorage.getItem('jwt');
    let user_police_id = sessionStorage.getItem('user_police_id');
    console.log("user_police_id: " + user_police_id);
    let user_rank = sessionStorage.getItem('rank');
    console.log(user_rank);
    let user_police_station = sessionStorage.getItem('user_police_station');
    console.log(user_police_station);
    console.log("Complaint No: " + complaint_no);
    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            completeLoad(this);
        }
    }
    
    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/policeman", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=rejectAppeal" + "&complaint_no=" + complaint_no);

    function completeLoad(httpreq)
    {
        let jsonFineData = JSON.parse(httpreq.responseText);
        console.log(jsonFineData);

        if(jsonFineData.serverResponse === "null session" || jsonFineData.serverResponse === "Not Allowed")
        {
            window.location.href = "http://localhost:8080/ntsf_backend_war/login"; //Redirect to login page
            console.log("Redirecting to login page");
        }
        else if(jsonFineData.serverResponse === "Allowed")
        {
            console.log("Allowed");
            let jsonFineDataAlert = jsonFineData.alert; 
            if(jsonFineDataAlert == true){
                getMessage(true);
                window.location.reload();
            }
            else{
                getMessage(false);
            }
    
        }
        else
        {
            alert("Something went wrong");
        }

    }
    

}


function viewFootage(){
    window.open("footage.html");


    // console.log("viewFootage is called");
    // var videoUrl = "D:\project\NTSF-frontend\resources\images\footage\15.mp4"; // Replace with the actual video URL
    // var videoName = "15.mp4"; // Replace with the desired filename for the downloaded video
    // var link = document.createElement("a");
    // link.href = videoUrl;
    // link.download = videoName;
    // link.click();

    // var videoUrl = "D:\project\NTSF-frontend\resources\images\footage\15.mp4"; // Replace with the actual video URL
    //         var videoName = "15.mp4"; // Replace with the desired filename for the downloaded video

    //         fetch(videoUrl)
    //             .then(response => response.blob())
    //             .then(blob => {
    //                 var url = window.URL.createObjectURL(blob);
    //                 var link = document.createElement("a");
    //                 link.href = url;
    //                 link.download = videoName;
    //                 link.click();
    //             });
        

}




function getMessage(appealRejectionStatus) {
    let message = document.createElement("div");
    message.className = "message";

    if (appealRejectionStatus == false) {
        message.classList.add("danger");
        message.textContent = "Appeal Rejection Failed";

        document.body.appendChild(message);

        deleteMessage(message);
    }
    else {
        message.classList.add("success");
        message.textContent = "Appeal Rejected Successfully";

        document.body.appendChild(message);

        deleteMessage(message);
    }

}

function deleteMessage(el) {
    setTimeout(() => {
        document.body.removeChild(el);
    }, 6000);
}

