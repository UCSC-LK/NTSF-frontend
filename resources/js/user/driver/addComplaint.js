const addComplaintButton = document.getElementById("addComplaintButton");


const addComplaint = function()
{
    let user_id = document.getElementById("user_id").value;
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let complaint_no = document.getElementById("complaint_no").value;

    console.log(user_id);
    console.log(title);
    console.log(description);
    console.log(complaint_no);

    let httpReq  = new XMLHttpRequest();
    httpReq.onreadystatechange = function ()
    {
        if(this.readyState === 4 && this.status === 200)
        {
            addComplaintData(this);
        }
    }

    httpReq.open("POST", "http://localhost:8080/ntsf_backend_war/addcomplaint", true);
    httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpReq.send("user_id=" + user_id + "&title=" + title + "&description=" + description + "&complaint_no=" + complaint_no);


    function addComplaintData(httpReq)
    {
        let jsonAddComplaintResponse = JSON.parse(httpReq.responseText);
        console.log(jsonAddComplaintResponse);
    }
        
    }

 