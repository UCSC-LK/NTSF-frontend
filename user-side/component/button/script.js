/**
 * Creates and displays a button with a specified label and CSS class name
 * fineNo -> default value = null | Not to break it's common behaviour
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

  // Add an event listener for the button click event
  button.addEventListener("click", () => {
    callback();
  });

  return button;
}
