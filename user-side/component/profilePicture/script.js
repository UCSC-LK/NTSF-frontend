/**
 * Saves the image to the sessionStorage
 * @param {*} imageKey | The name that can later use to retrieve the image from the sessionStorage (e.g. "profilePicture")
 * @param {*} binaryStream | The binary stream of the image
 */
export function saveImageToSessionStorage(imageKey, base64Image) {
  // Convert the binaryStream to base64-encoded string
  // const base64Image = btoa(binaryStream);

  // Save the base64-encoded image in the sessionStorage
  sessionStorage.setItem(imageKey, base64Image);
}

/**
 * Displays the image from the sessionStorage
 * @param {*} imageKey
 * @param {*} containerId | The id of the container on the page where the image should be displayed
 */
export function displayImageFromSessionStorage(imageKey, containerId) {
  // Retrieve the base64-encoded image from sessionStorage
  const base64Image = sessionStorage.getItem(imageKey);

  // Create an <img> element and set its source to the base64-encoded image
  const imgElement = document.createElement("img");
  imgElement.src = "data:image/jpeg;base64," + base64Image;

  // Append the <img> element to the specified container on the page
  const container = document.getElementById(containerId);
  container.appendChild(imgElement);
}
