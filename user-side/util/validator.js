function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

/**
 *
 * @param title
 * @returns if title is valid
 */
export function validateTitle(title) {
  if (title === "") {
    // setErrorFor(title, "Title cannot be blank");
    return false;
  } else if (title.length < 5) {
    // setErrorFor(title, "Title should contain at least 5 characters");
    return false;
  } else if (title.length > 50) {
    // setErrorFor(title, "Title should contain at most 50 characters");
    return false;
  } else {
    // setSuccessFor(title);
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
    // setErrorFor(description, "Description cannot be blank");
    return false;
  } else if (description.length < 5) {
    // setErrorFor(
    //   description,
    //   "Description should contain at least 5 characters"
    // );
    return false;
  } else if (description.length > 100) {
    // setErrorFor(
    //   description,
    //   "Description should contain at most 100 characters"
    // );
    return false;
  } else {
    // setSuccessFor(description);
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
    // setErrorFor(password, "Password should contain at least 8 characters");
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
    // setErrorFor(
    //   password,
    //   "Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    // );
    return false;
  }

  // setSuccessFor(password);
  return true;
}

/**
 * @param mobileNo Mobile Number in Sri Lanka
 * @return if mobile number is valid
 */
export function validateMobileNo(mobileNo) {
  if (mobileNo == null || mobileNo.length == 0) {
    setErrorFor(mobileNo, "Mobile No is empty");
    return false;
  }

  // Remove any leading plus sign
  if (mobileNo.startsWith("+")) {
    mobileNo = mobileNo.substring(1);
  }

  // Check length and format
  if (mobileNo.length != 9 || !mobileNo.match(/^\d{9}$/)) {
    setErrorFor(mobileNo, "Mobile No is invalid");
    return false;
  }

  // Check for valid network operator codes
  // Declares an array named validOperatorCodes
  // Initializes it with five valid network operator codes in Sri Lanka
  var validOperatorCodes = ["071", "072", "075", "077", "078"];

  // Extracts the first 3 digits of the phone number and assigns them to a new variable named operatorCode
  var operatorCode = mobileNo.substring(0, 3);

  // Checks whether the operatorCode is in the list of validOperatorCodes
  if (!validOperatorCodes.includes(operatorCode)) {
    setErrorFor(mobileNo, "Mobile No is invalid");
    return false;
  }

  // All validation checks have passed
  setSuccessFor(mobileNo);
  return true;
}

/**
 * @param email User email
 * @return if email is valid
 */
export function validateEmail(email) {
  if (email.trim().equals("")) {
    // setErrorFor(email, "Email is empty");
    return false;
  } else if (!email.trim().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
    // setErrorFor(email, "Email is invalid");
    return false;
  } else {
    // setSuccessFor(email);
    return true;
  }

  /**
   *
   * @param {NIC number} nic
   * @param {Input password} password
   * @returns
   */
  // export function validateLoginParams(nic, password) {
  //   if (!validateNIC(nic)) {
  //     return 1;
  //   } else if (!validatePassword(password)) {
  //     return 2;
  //   }
  //   return 0;
  // }
}
