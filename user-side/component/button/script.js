/**
 * Creates and displays a button with a specified label and CSS class name
 * @param {string} buttonLabel - Label of the button
 * @param {string} className - The class name of the button
 * @param {function} callback - Callback function to execute when the button is clicked
 */
export function displayButton(buttonLabel, className, callback) {
  // Create a new button element
  const button = document.createElement("button");

  // Set the class name of the button
  button.className = className;

  // Set the text content of the button
  button.textContent = buttonLabel;

  // Add an event listener for the button click
  button.addEventListener("click", callback);

  // Append the button to the document body
  document.body.appendChild(button);
}
