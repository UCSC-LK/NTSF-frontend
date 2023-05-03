
document.getElementById('driverFine').addEventListener('click', function(){
    console.log("driverFine button clicked");
    let offenceType = "driver";
    sessionStorage.setItem("offence_type", offenceType);
});

document.getElementById('vehicleFine').addEventListener('click', function(){
    console.log("vehicleFine button clicked");
    let offenceType = "vehicle";
    sessionStorage.setItem("offence_type", offenceType);
});

document.getElementById('pedestrianFine').addEventListener('click', function(){
    console.log("pedestrianFine button clicked");
    let offenceType = "pedestrian";
    sessionStorage.setItem("offence_type", offenceType);
});

