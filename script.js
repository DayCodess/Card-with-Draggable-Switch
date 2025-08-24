const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const switchBtn = document.querySelector(".switch-btn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginMessage = document.getElementById("loginMessage");
const signupMessage = document.getElementById("signupMessage");

// Switch forms
signupTab.addEventListener("click", () => {
  switchBtn.style.left = "calc(50% + 5px)";
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});

loginTab.addEventListener("click", () => {
  switchBtn.style.left = "5px";
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

// Store accounts in localStorage
const users = JSON.parse(localStorage.getItem("users")) || {};

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (users[email]) {
    signupMessage.textContent = "User already exists!";
    signupMessage.style.color = "orange";
    return;
  }

  users[email] = { username, password };
  localStorage.setItem("users", JSON.stringify(users));
  signupMessage.textContent = "Signup successful! Please login.";
  signupMessage.style.color = "#6c63ff";
  signupForm.reset();
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (users[email] && users[email].password === password) {
    if (localStorage.getItem("lastLogin") === email) {
      loginMessage.textContent = "Welcome back, " + users[email].username + "!";
    } else {
      loginMessage.textContent = "Welcome, " + users[email].username + "!";
    }
    loginMessage.style.color = "#6c63ff";
    localStorage.setItem("lastLogin", email);
    loginForm.reset();
  } else {
    loginMessage.textContent = "Invalid email or password!";
    loginMessage.style.color = "red";
  }
});
