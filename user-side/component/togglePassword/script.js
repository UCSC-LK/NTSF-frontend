/**
 * Toggle password visibility
 */
export function togglePasswordVisibility() {
  var passwordInput = document.getElementById("password");
  var toggleEyeIcon = document.getElementById("toggleEye");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleEyeIcon.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    passwordInput.type = "password";
    toggleEyeIcon.innerHTML = '<i class="fas fa-eye"></i>';
  }
}
