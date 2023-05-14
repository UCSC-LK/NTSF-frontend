let user_position =  sessionStorage.getItem('position');
console.log(user_position);

if(user_position === 'trafficPolice'){
    document.getElementById("investigationOfficerButton").href = "javascript:void(0)";
    document.getElementById("courtSeargentButton").href = "javascript:void(0)";

    document.getElementById("trafficPoliceCard").style.border = "2px solid #0d6efd";

    document.getElementById("investigationOfficerCard").style.opacity = "0.5";
    document.getElementById("courtSeargentCard").style.opacity = "0.5";
    document.getElementById("investigationOfficerCard").style.pointerEvents = "none";
    document.getElementById("courtSeargentCard").style.pointerEvents = "none";
    document.getElementById("your-role").innerHTML = "Hi! Your role today is Traffic Police Officer";
    document.getElementById("investigationOfficerButton").style.cursor = "not-allowed";
    document.getElementById("courtSeargentButton").style.cursor = "not-allowed";


}

else if (user_position === 'investigationOfficer'){
    document.getElementById("trafficPoliceButton").href = "javascript:void(0)";
    document.getElementById("courtSeargentButton").style.cursor = "not-allowed";
    document.getElementById("trafficPoliceButton").style.cursor = "not-allowed";
    document.getElementById("courtSeargentButton").href = "javascript:void(0)";

    document.getElementById("investigationOfficerCard").style.border = "2px solid #0d6efd";
    document.getElementById("your-role").innerHTML = "Hi! Your role today is Investigation Officer";

    document.getElementById("trafficPoliceCard").style.opacity = "0.5";
    document.getElementById("courtSeargentCard").style.opacity = "0.5";
    document.getElementById("trafficPoliceCard").style.pointerEvents = "none";
    document.getElementById("courtSeargentCard").style.pointerEvents = "none";

    document.getElementById("trafficPoliceButton").style.cursor = "not-allowed";
    document.getElementById("courtSeargentButton").style.cursor = "not-allowed";
}

else if (user_position == 'courtSeargent'){
    document.getElementById("trafficPoliceButton").href = "javascript:void(0)";
    document.getElementById("investigationOfficerButton").href = "javascript:void(0)";
    document.getElementById("trafficPoliceButton").style.cursor = "not-allowed";
    document.getElementById("investigationOfficerButton").style.cursor = "not-allowed";

    document.getElementById("courtSeargentCard").style.border = "2px solid #0d6efd";
    document.getElementById("your-role").innerHTML = "Hi! Your role today is Court Seargent";

    document.getElementById("investigationOfficerCard").style.opacity = "0.5";
    document.getElementById("trafficPoliceCard").style.opacity = "0.5";
    document.getElementById("investigationOfficerCard").style.pointerEvents = "none";
    document.getElementById("trafficPoliceCard").style.pointerEvents = "none";
    document.getElementById("trafficPoliceButton").style.cursor = "not-allowed";
    document.getElementById("investigationOfficerButton").style.cursor = "not-allowed";

}

else if (user_position == 'notAssigned'){
    document.getElementById("trafficPoliceButton").href = "javascript:void(0)";
    document.getElementById("investigationOfficerButton").href = "javascript:void(0)";
    document.getElementById("courtSeargentButton").href = "javascript:void(0)";
    document.getElementById("trafficPoliceButton").style.cursor = "not-allowed";
    document.getElementById("investigationOfficerButton").style.cursor = "not-allowed";
    document.getElementById("courtSeargentButton").style.cursor = "not-allowed";

    document.getElementById("your-role").innerHTML = "Hi! You are not assigned to any role today";
}

else {
    document.getElementById("trafficPoliceButton").href = "javascript:void(0)";
    document.getElementById("investigationOfficerButton").href = "javascript:void(0)";
    document.getElementById("courtSeargentButton").href = "javascript:void(0)";
    document.getElementById("trafficPoliceButton").style.cursor = "not-allowed";
    document.getElementById("investigationOfficerButton").style.cursor = "not-allowed";
    document.getElementById("courtSeargentButton").style.cursor = "not-allowed";
    console.log("Error in user position");
}