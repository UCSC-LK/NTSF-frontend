// // var { sessionStorage } = require('login.js')
// //jquery
// var script = document.createElement("script");
// script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
// document.getElementsByTagName("head")[0].appendChild(script);

// function addComplaint()
// {

//     // const user_id = sessionStorage.user_id; 
//     const user_id = document.getElementById("user_id").value;
//     const title = document.getElementById("title").value;
//     const description = document.getElementById("description").value;
//     const complaint_no = document.getElementById("complaint_no").value;


//     console.log(user_id);
//     console.log(title);
//     console.log(description);
//     console.log(complaint_no);


//     const query = $.param({
//         user_id,
//         title,
//         description,
//         complaint_no
//     });
  
//     const settings = {
//         url: `http://localhost:8080/ntsf_backend_war/addcomplaint?${query}`,
//         method: "POST"
//     };

//     $.ajax(settings).done(submitSuccessCallback).fail(submitUnsuccessCallback);
// }





const addComplaintServletURL = 'http://localhost:8080/ntsf_backend_war/addcomplaint';

// const addComplaint = () => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', addComplaintServlet);

//     xhr.onload = () => {
//         const data = JSON.parse(xhr.response);
//         console.log(data);

//     };
//     xhr.send();
// };

const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.responseType = 'json'

            // if(data)
            // {
            //     xhr.setRequestHeader('Content-Type', 'application/json');
            // }

            xhr.onload = () => {        
                if(xhr.status >= 400)
                {
                    reject(xhr.response);
                }
                else
                {
                    resolve(xhr.response);
                }
            };

            xhr.onerror = () =>
            {
                reject('Something went wrong!')
            }
            xhr.send(JSON.stringify(data));

            

    });
    return promise;
};

//******GET Method */
// const addComplaint = () =>
// {
//     sendHttpRequest('GET', addComplaintServlet).then(responseData => {
//         console.log(responseData);
//     });
// };

const addComplaint = () =>
{
    const user_id = document.getElementById("user_id").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const complaint_no = document.getElementById("complaint_no").value;
    console.log(user_id, title, description, complaint_no)
    sendHttpRequest('POST', addComplaintServletURL, {
        user_id: user_id,
        title: title,
        description: description,
        complaint_no: complaint_no
    }).then(responseData => {
        console.log(responseData);
    }).catch(err => {
        console.log(err);
    });
};