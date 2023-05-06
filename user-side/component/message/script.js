/**
 * Can display a message with a specified text and CSS class name
 * @param {String} messageText | The message to be displayed
 * @param {String} className | The class name of the message
 */
export function getMessage(messageText, isSuccess, callback, timeout) {
  // Create a new <div> element
  const message = document.createElement("div");

  // className -> message
  // Predefined CSS class for styling purposes
  message.className = "message";

  // className -> message + className
  if (isSuccess) message.classList.add("success");
  else message.classList.add("danger");

  // Set the text content of the message
  message.textContent = messageText;

  document.body.appendChild(message);

  deleteMessage(message, callback, timeout);
}

/**
 * Deletes the message after 6 seconds
 * @param {*} element
 */
export function deleteMessage(element, callback, timeout = 2000) {
  setTimeout(() => {
    document.body.removeChild(element);
    if (callback) callback();
  }, timeout);
}

// export function getMessage(loginStatus) {
//   let message = document.createElement("div");
//   message.className = "message";

//   if (loginStatus == false) {
//     message.classList.add("danger");
//     message.textContent =
//       "Login Unsuccessful. Please try again or contact your administrator for assistance.";

//     document.body.appendChild(message);

//     deleteMessage(message);
//   } else {
//     message.classList.add("success");
//     message.textContent = "Login Successful";

//     document.body.appendChild(message);

//     deleteMessage(message);
//   }
// }
