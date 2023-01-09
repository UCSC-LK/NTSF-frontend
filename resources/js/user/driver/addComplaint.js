// var { sessionStorage } = require('login.js')
//jquery
var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

function addComplaint()
{

    // const user_id = sessionStorage.user_id; 
    const user_id = document.getElementById("user_id").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const complaint_no = document.getElementById("complaint_no").value;


    console.log(user_id);
    console.log(title);
    console.log(description);
    console.log(complaint_no);


    const query = $.param({
        user_id,
        title,
        description,
        complaint_no
    });
  
    const settings = {
        url: `http://localhost:8080/ntsf_backend_war/addcomplaint?${query}`,
        method: "POST"
    };

    $.ajax(settings).done(submitSuccessCallback).fail(submitUnsuccessCallback);
}
