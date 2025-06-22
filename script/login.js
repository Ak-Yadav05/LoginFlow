// Toggle password visibility
function eyefunc(imgElement) {
  const input = imgElement.previousElementSibling;

  if (input.type === "password") {
    input.type = "text";
    imgElement.src = "images/eye-open.svg";
  } else {
    input.type = "password";
    imgElement.src = "images/eye-close.svg";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelectorAll(".error-message").forEach(msg => msg.textContent = "");
    document.querySelectorAll(".input").forEach(div => div.classList.remove("error"));

    const storedUser = JSON.parse(localStorage.getItem("data"));
    const inputUsername = username.value.trim();
    const inputPassword = password.value;

    let isValid = true;

    // Username validation
    if (inputUsername === "") {
      showError(username, "Username is required");
      isValid = false;
    }

    // Password validation
    if (inputPassword === "") {
      showError(password, "Password is required");
      isValid = false;
    }

    // No user data found
    if (isValid && !storedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    // Incorrect credentials
    if (
      isValid &&
      (inputUsername !== storedUser.username || inputPassword !== storedUser.password)
    ) {
      showError(password, "Incorrect username or password");
      return;
    }

    // Success: show popup and redirect
    if (isValid) {
      const popup = document.getElementById("login-popup");
      popup.style.display = "flex";

      setTimeout(() => {
        popup.style.display = "none";
        window.location.href = "dashboard.html";
      }, 2000);
    }
  });

  function showError(input, message) {
    const formGroup = input.closest(".form-group");
    const errorText = formGroup.querySelector(".error-message");
    const inputBox = formGroup.querySelector(".input");

    errorText.textContent = message;
    inputBox.classList.add("error");
  }
});
