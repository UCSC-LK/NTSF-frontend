// const form = document.querySelector("form"),
//   nextBtn = form.querySelector(".nextBtn"),
//   backBtn = form.querySelector(".backBtn"),
//   allInput = form.querySelectorAll(".first input");

// nextBtn.addEventListener("click", () => {
//   allInput.forEach((input) => {
//     if (input.value != "") {
//       form.classList.add("secActive");
//     } else {
//       form.classList.remove("secActive");
//     }
//   });
// });

// backBtn.addEventListener("click", () => form.classList.remove("secActive"));

function verification() {
  //   var name = document.getElementById("name").value;
  //   var hometown = document.getElementById("hometown").value;
  var email = document.getElementById("email").value;

  if (name && hometown) {
    alert(`${name}: ${hometown}`);
  } else {
    alert("Name or Hometown Not Provided");
  }
}
