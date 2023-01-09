var { sessionStorage } = require('login.js')


function submitLogin()
{
    const user_id = sessionStorage.user_id; 
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    const query = $.param({
        user_id,
        title,
        description
    });

    const settings = {
        url: `http://localhost:8080/ntsf/addcomplaint?${query}`,
        method: "POST"
    };

    $.ajax(settings).done(submitSuccessCallback).fail(submitUnsuccessCallback);
}
