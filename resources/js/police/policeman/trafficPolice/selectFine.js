let fine_type = sessionStorage.getItem("fine_type");

if(fine_type == "driver")
{
   
}
else if(fine_type == "vehicle")
{
    
}
else if(fine_type == "pedestrian")
{
}
else
{
    alert("Something went wrong");
}

function loadFineCards(fine_type) {
    console.log("loadFineCards function called");

    let httpreq = new XMLHttpRequest;
    httpreq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            completeLoad(this);
        }
    }

    httpreq.open("POST", "http://localhost:8080/ntsf_backend_war/offence", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpreq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwt'));
    httpreq.send("action=viewOffence" + "&fine_type=" + fine_type);

}
