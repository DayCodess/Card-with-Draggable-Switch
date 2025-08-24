const card = document.querySelector(".card");
const thumb = document.querySelector(".switch-thumb");
const track = document.querySelector(".switch-track");
const labels = document.querySelectorAll(".switch-label");

let isDragging = false;
let startX = 0;
let thumbLeft = 3;

card.classList.add("login-active"); // default state

// Drag handling
thumb.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  thumb.style.transition = "none";
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  let newLeft = thumbLeft + dx;
  const max = track.offsetWidth / 2 - 3;
  if (newLeft < 3) newLeft = 3;
  if (newLeft > max) newLeft = max;
  thumb.style.left = newLeft + "px";
});

document.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  document.body.style.userSelect = "";

  const middle = track.offsetWidth / 4;
  if (parseInt(thumb.style.left) > middle) {
    setSignup();
  } else {
    setLogin();
  }
});

// Click labels toggle
labels.forEach(label => {
  label.addEventListener("click", () => {
    if (label.classList.contains("left")) setLogin();
    if (label.classList.contains("right")) setSignup();
  });
});

// Functions
function setLogin() {
  card.classList.remove("signup-active");
  card.classList.add("login-active");
  thumbLeft = 3;
  thumb.style.transition = "left 0.35s cubic-bezier(0.34,1.56,0.64,1)";
  thumb.style.left = thumbLeft + "px";
  labels[0].classList.add("active");
  labels[1].classList.remove("active");
}

function setSignup() {
  card.classList.add("signup-active");
  card.classList.remove("login-active");
  thumbLeft = track.offsetWidth / 2 - 3;
  thumb.style.transition = "left 0.35s cubic-bezier(0.34,1.56,0.64,1)";
  thumb.style.left = thumbLeft + "px";
  labels[1].classList.add("active");
  labels[0].classList.remove("active");
}
