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
  const form = document.getElementById("signup-form");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelectorAll(".error-message").forEach(msg => msg.textContent = "");
    document.querySelectorAll(".input").forEach(div => div.classList.remove("error"));

    let isValid = true;

    // Username validation
    if (username.value.trim() === "") {
      showError(username, "Username is required");
      isValid = false;
    } else if (username.value.trim().length < 3) {
      showError(username, "Username must be at least 3 characters");
      isValid = false;
    }

    // Password validation
    if (password.value.trim() === "") {
      showError(password, "Password is required");
      isValid = false;
    } else if (password.value.trim().length < 6) {
      showError(password, "Password must be at least 6 characters");
      isValid = false;
    }

    // Confirm password validation
    if (confirmPassword.value.trim() === "") {
      showError(confirmPassword, "Please confirm your password");
      isValid = false;
    } else if (confirmPassword.value !== password.value) {
      showError(confirmPassword, "Passwords do not match");
      isValid = false;
    }

    // If valid, store user data and show popup
    if (isValid) {
      const userData = {
        username: username.value.trim(),
        password: password.value.trim()
      };

      localStorage.setItem("data", JSON.stringify(userData));
      form.reset();

      const popup = document.getElementById("success-popup");
      popup.style.display = "flex";

      setTimeout(() => {
        const box = document.querySelector(".popup-box");
        box.style.animation = "popupOut 0.3s ease-in-out forwards";

        setTimeout(() => {
          popup.style.display = "none";
          window.location.href = "login.html";
        }, 300);
      }, 1700);
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
