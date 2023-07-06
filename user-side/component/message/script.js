/**
 * Can display a message with a specified text and CSS class name
 * @param {String} messageText | The message to be displayed
 * @param {String} className | The class name of the message
 */
export function displayMessage(messageText, isSuccess, callback, timeout) {
  // Create a new <div> element
  const message = document.createElement("div");

  // className -> message
  // Predefined CSS class for styling purposes
  message.className = "message";

  // className -> message + className
  if (isSuccess) message.classList.add("success");
  else message.classList.add("failure");

  // Set the text content of the message
  message.textContent = messageText;

  document.body.appendChild(message);

  removeMessage(message, callback, timeout);
}

/**
 * Deletes the message after 6 seconds
 * @param {*} element
 */
export function removeMessage(element, callback, timeout = 2000) {
  setTimeout(() => {
    document.body.removeChild(element);
    if (callback) callback();
  }, timeout);
}
