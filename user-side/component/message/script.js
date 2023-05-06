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

/**
 * Can display a message with a specified text and CSS class name
 * @param {String} messageText | The message to be displayed
 * @param {String} className | The class name of the message
 */
export function showMessage(messageText, className) {
  // Create a new <div> element
  const message = document.createElement("div");

  // className -> message
  // Predefined CSS class for styling purposes
  message.className = "message";

  // className -> message + className
  message.classList.add(className);

  // Set the text content of the message
  message.textContent = messageText;

  document.body.appendChild(message);

  deleteMessage(message);
}

export function deleteMessage(element) {
  setTimeout(() => {
    document.body.removeChild(element);
  }, 6000);
}
