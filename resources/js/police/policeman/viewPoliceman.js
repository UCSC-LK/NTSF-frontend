const loadPolicemanDetails = function()
{
    let httpReq = new XMLHttpRequest;
    httpReq.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200) {
            completeLoad(this);
        }
    }
    
    httpreq.open("GET", "", true);
    httpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    httpreq.send();

    function completeLoad(httpreq)
    {
        let jsonPolicemanData = JSON.parse(httpreq.responseText);
        console.log(jsonPolicemanData);
        
        const policemanData = document.getElementById("policemanData");
        policemanData.innerHTML = "";

        let count =  jsonPolicemanData.List.length - 1;
        for(i=0; i<= count; i++)
        {
            policemanDataHTMLoutput(jsonPolicemanData.List[i].name, jsonPolicemanData.List[i].police_id,
                jsonPolicemanData.List[i].nic, jsonPolicemanData.List[i].rank, jsonPolicemanData.List[i].police_station);
        }
    }
}

function policemanDataHTMLoutput(name, police_id, nic, rank, police_station)
{
    console.log(name);
    console.log(police_id);
    console.log(nic);
    console.log(rank);
    console.log(police_station);

    const policemanData = document.getElementById("policemanData");
    policemanData.innerHTML = "";


    let htmlString = 
    '<tr>' + 
    '<td>' + 'name' + '</td>' + 
    '<td>' + 'police_id' + '</td>' + 
    '<td>' + 'nic' + '</td>' + 
    '<td>' + 'rank' + '</td>' + 
    '<td>' + 'police_station' + '</td>' + 
    '</tr>';


    policemanData.innerHTML += htmlString;

    
    console.log(name);
    console.log(police_id);
    console.log(nic);
    console.log(rank);
    console.log(police_station0);
}