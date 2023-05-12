/**
 * 
 * @param {*} input | input element
 * @param {*} message | error message
 */
export function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

/**
 * 
 * @param {*} input | input element
 */
export function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
