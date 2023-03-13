
document.getElementById('driverFine').addEventListener('click', function(){
    console.log("driverFine button clicked");
    let fineType = "driver";
    sessionStorage.setItem("fine_type", fineType);
});

document.getElementById('vehicleFine').addEventListener('click', function(){
    console.log("vehicleFine button clicked");
    let fineType = "vehicle";
    sessionStorage.setItem("fine_type", fineType);
});

document.getElementById('pedestrianFine').addEventListener('click', function(){
    console.log("pedestrianFine button clicked");
    let fineType = "pedestrian";
    sessionStorage.setItem("fine_type", fineType);
});

