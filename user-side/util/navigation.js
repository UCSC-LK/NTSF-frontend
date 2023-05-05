function redirect(url) {
  window.location.href = url;
}

export function redirectToLogin() {
  redirect("/user-side/user/login/index.html");
}
