document.getElementById("triviaBtn").addEventListener("click", () => {
  window.open("trivia.html", "_blank");
});

document.getElementById("historiaBtn").addEventListener("click", () => {
  window.open("historia.html", "_blank");
});

document.getElementById("manualBtn").addEventListener("click", () => {
  window.open("manual.html", "_blank");
});

document.getElementById("statsBtn").addEventListener("click", () => {
  window.open("estadisticas.html", "_blank");
});

const profileBtn = document.getElementById("profile-btn");
if (profileBtn) {
  profileBtn.addEventListener("click", () => {
    window.open("manual.html", "_blank");
  });
}