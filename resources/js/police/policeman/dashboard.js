let user_position =  sessionStorage.getItem('position');
console.log(user_position);

if(user_position === 'trafficPolice'){
    document.getElementById("investigationOfficerButton").href = "javascript:void(0)";
    document.getElementById("courtSeargentButton").href = "javascript:void(0)";
    document.getElementById("investigationOfficerButton").style.cursor = "not-allowed";
    document.getElementById("courtSeargentButton").style.cursor = "not-allowed";

    document.getElementById("trafficPoliceCard").style.border = "2px solid #0d6efd";

}

else if (user_position === 'investigationOfficer'){
    document.getElementById("trafficPoliceButton").href = "javascript:void(0)";
    document.getElementById("courtSeargentButton").style.cursor = "not-allowed";
    document.getElementById("trafficPoliceButton").style.cursor = "not-allowed";
    document.getElementById("courtSeargentButton").href = "javascript:void(0)";

    document.getElementById("investigationOfficerCard").style.border = "2px solid #0d6efd";
}

else if (user_position == 'courtSeargent'){
    document.getElementById("trafficPoliceButton").href = "javascript:void(0)";
    document.getElementById("investigationOfficerButton").href = "javascript:void(0)";
    document.getElementById("trafficPoliceButton").style.cursor = "not-allowed";
    document.getElementById("investigationOfficerButton").style.cursor = "not-allowed";

    document.getElementById("courtSeargentCard").style.border = "2px solid #0d6efd";

}

else if (user_position == 'notAssigned'){
    document.getElementById("trafficPoliceButton").href = "javascript:void(0)";
    document.getElementById("investigationOfficerButton").href = "javascript:void(0)";
    document.getElementById("courtSeargentButton").href = "javascript:void(0)";
    document.getElementById("trafficPoliceButton").style.cursor = "not-allowed";
    document.getElementById("investigationOfficerButton").style.cursor = "not-allowed";
    document.getElementById("courtSeargentButton").style.cursor = "not-allowed";
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