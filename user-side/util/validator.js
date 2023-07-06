/**
 *
 * @param {string} elementId (`nic | password | email | mobile number`)
 * @param {function} validateFn (`validateNIC | validatePassword | validateEmail | validateMobileNo`)
 * @returns {boolean} if field input is valid
 */
export function validateInputField(elementId, validateFn) {
  const inputElement = document.getElementById(elementId);

  if (!validateFn(inputElement.value)) {
    console.log(`Provided ${elementId} is invalid`);
    inputElement.classList.add("invalid");
    return false;
  }

  inputElement.classList.remove("invalid");
  return true;
}

/**
 *
 * @param title
 * @returns if title is valid
 */
export function validateTitle(title) {
  if (title === "") {
    return false;
  } else if (title.length < 5) {
    return false;
  } else if (title.length > 50) {
    return false;
  } else {
    return true;
  }
}

/**
 *
 * @param description
 * @returns if description is valid
 */
export function validateDescription(description) {
  if (description === "") {
    return false;
  } else if (description.length < 5) {
    return false;
  } else if (description.length > 500) {
    return false;
  } else {
    return true;
  }
}

/**
 *
 * @param nic
 * @returns if NIC is valid
 */
export function validateNIC(nic) {
  if (
    nic.length === 10 &&
    !isNaN(nic.substr(0, 9)) &&
    isNaN(nic.substr(9, 1).toLowerCase()) &&
    ["x", "v"].includes(nic.substr(9, 1).toLowerCase())
  ) {
    return true;
  } else if (nic.length === 12 && !isNaN(nic)) {
    return true;
  } else {
    return false;
  }
}

/**
 *
 * @param password
 * @returns if input password is valid
 */
export function validatePassword(password) {
  if (password == null || password.length < 8) {
    return false;
  }

  var hasUppercase = false;
  var hasLowercase = false;
  var hasDigit = false;
  var hasSpecialChar = false;

  for (var i = 0; i < password.length; i++) {
    // charAt() method is used to access each character of the string
    var c = password.charAt(i);
    if (c >= "A" && c <= "Z") {
      hasUppercase = true;
    } else if (c >= "a" && c <= "z") {
      hasLowercase = true;
    } else if (c >= "0" && c <= "9") {
      hasDigit = true;
    } else {
      hasSpecialChar = true;
    }
  }

  if (!hasUppercase || !hasLowercase || !hasDigit || !hasSpecialChar) {
    return false;
  }
  return true;
}

/**
 * @param mobileNo Mobile Number in Sri Lanka
 * @return if mobile number is valid
 */
export function validateMobileNo(mobileNo) {
  if (mobileNo == null || mobileNo.length == 0) {
    return false;
  }

  // Remove any leading plus sign
  if (mobileNo.startsWith("+")) {
    mobileNo = mobileNo.substring(1);
  }

  // Check length and format
  if (mobileNo.length !== 10 || !/^\d{10}$/.test(mobileNo)) {
    // code to execute if mobileNo is not valid
    return false;
  }

  // Check for valid network operator codes
  // Declares an array named validOperatorCodes
  // Initializes it with 8 valid network operator codes in Sri Lanka
  var validOperatorCodes = [
    "070",
    "071",
    "072",
    "074",
    "075",
    "076",
    "077",
    "078",
  ];

  // Extracts the first 3 digits of the phone number and assigns them to a new variable named operatorCode
  var operatorCode = mobileNo.substring(0, 3);

  // Checks whether the operatorCode is in the list of validOperatorCodes
  if (!validOperatorCodes.includes(operatorCode)) {
    return false;
  }

  // All validation checks have passed
  return true;
}

/**
 * @param email User email
 * @return if email is valid
 */
export function validateEmail(email) {
  if (email.length == 0) {
    return false;
  } else if (!/^[A-Za-z0-9+_.-]+@(.+)$/.test(email)) {
    // code to execute if email is not valid
    return false;
  } else {
    return true;
  }
}
