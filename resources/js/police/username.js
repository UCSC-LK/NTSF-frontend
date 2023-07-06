 document.getElementById('user_name').innerHTML = sessionStorage.getItem('user_police_name');
 user_police_id = sessionStorage.getItem('user_police_id');
 console.log(user_police_id);

 loadProfilePictureInDashboard();
 // Getting the profile picture

 function loadProfilePictureInDashboard(){
    user_police_id = sessionStorage.getItem('user_police_id');
    console.log(user_police_id);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/ntsf_backend_war/policeman', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('jwt'));
    xhr.responseType = 'arraybuffer'; // set the response type to arraybuffer
    xhr.send('action=viewProfilePictureInDashboard' + "&police_id=" + user_police_id ); // replace the imageId parameter with the correct value
    
    xhr.onload = function() {
        if (this.status == 200) {
            let blob = new Blob([this.response], {type: 'image/jpeg'}); // replace with your image type
            document.getElementById('profile-picture').src = URL.createObjectURL(blob);
        }
    };
    
 }

