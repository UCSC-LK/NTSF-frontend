
document.getElementById('driverOffence').addEventListener('click', function(){
    console.log("driverOffence button clicked");
    let offenceType = "driver";
    sessionStorage.setItem("offence_type", offenceType);
});

document.getElementById('vehicleOffence').addEventListener('click', function(){
    console.log("vehicleOffence button clicked");
    let offenceType = "vehicle";
    sessionStorage.setItem("offence_type", offenceType);
});

document.getElementById('pedestrianOffence').addEventListener('click', function(){
    console.log("pedestrianOffence button clicked");
    let offenceType = "pedestrian";
    sessionStorage.setItem("offence_type", offenceType);
});
