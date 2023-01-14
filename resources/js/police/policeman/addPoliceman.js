const form = document.getElementById('form');
const name = document.getElementById('name');
const police_id = document.getElementById('police_id');
const nic = document.getElementById('nic');
let rankOptions = document.getElementById("rankOptions");
let rankOptionList = ["OIC", "Policeman"];
const police_station = document.getElementById('police_station');
let police_stationList = ["Dehiwala", "Wellewatte", "Bambalapitya"];


form.addEventListener('submit', e => {
	e.preventDefault();
	getMessage();
	
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const nameValue = name.value.trim();
	const police_idValue = police_id.value.trim();
	const nicValue = nic.value.trim();
	
    
	if(nameValue === '') {
		setErrorFor(name, 'Name cannot be blank');
	} else {
		setSuccessFor(name);
	}
	
	if(police_idValue === '') {
		setErrorFor(police_id, 'Police ID cannot be blank');
	// } else if (!isEmail(emailValue)) {
	// 	setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(police_id);
	}
	
	if(nicValue === '') {
		setErrorFor(nic, 'NIC cannot be blank');
	} else {
		setSuccessFor(nic);
	}

    // if(rankValue === '') {
    //     setErrorFor(rank, 'Rank cannot be blank');
    // } else {
    //     setSuccessFor(rank);
    // }

    // if(police_stationValue === '') {
    //     setErrorFor(police_station, 'Police Station cannot be blank');
    // } else {
    //     setSuccessFor(police_station);
    // }
	
	// if(password2Value === '') {
	// 	setErrorFor(password2, 'Password2 cannot be blank');
	// } else if(passwordValue !== password2Value) {
	// 	setErrorFor(password2, 'Passwords does not match');
	// } else{
	// 	setSuccessFor(password2);
	// }
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
// function isEmail(email) {
// 	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
// }


let isOpen = false;


rankOptions.addEventListener("click", addToUIOptions);

function getMessage() {
    let message = document.createElement("div");
    message.className = "message";

    if (rankOptions.firstElementChild.classList.contains("hide-option")) {
        message.classList.add("danger");
        message.textContent = "Fill all required fields!!";

        document.body.appendChild(message);

        deleteMessage(message);
    }
    else {
        message.classList.add("success");
        message.textContent = "Policeman Added Successfully!)";

        document.body.appendChild(message);
        let selectedRank = rankOptions.firstElementChild.textContent;
        console.log(selectedRank);

        deleteMessage(message);
    }

}

function deleteMessage(el) {
    setTimeout(() => {
        document.body.removeChild(el);
    }, 6000);
}

function addToUIOptions(e) {
    if (e.target.classList.contains("hide-option")) {
        controlOptions(e);
    }
    else {
        const pickedOption = e.target;

        if (rankOptions.firstElementChild.classList.contains("hide-option")) {
            rankOptions.removeChild(rankOptions.firstElementChild);
        }
        rankOptions.insertAdjacentElement("afterbegin", pickedOption);

        deleteOptions();
        controlOptions(e);
    }
}

function controlOptions(e) {
    if (isOpen === false) {
        createOptions();
        rankOptions.classList.add("opened");
        isOpen = true;
    }
    else {
        deleteOptions();
        rankOptions.classList.remove("opened");
        isOpen = false;
    }
}

function deleteOptions() {
    while (rankOptions.childElementCount > 1) {
        rankOptions.removeChild(rankOptions.lastElementChild);
    }
}

function createOptions() {
    rankOptionList.forEach(element => {
        if (rankOptions.firstElementChild.textContent !== element) {
            let rankOption = document.createElement("div");
            rankOption.className = "option";
            rankOption.textContent = element;

            rankOptions.firstElementChild.insertAdjacentElement("afterend", rankOption);
        }
    });
};

