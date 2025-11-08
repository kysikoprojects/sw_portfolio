document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // extra audio error guard (inline script does most of the work)
  const audio = document.getElementById("abAudio");
  const sub   = document.getElementById("abSub");
  if (audio) {
    audio.addEventListener("error", () => {
      const src = audio.currentSrc || audio.src;
      console.warn("Audio failed to load:", src, audio.error);
      if (sub) {
        sub.textContent =
          "⚠ Could not load audio file. Check path & filename casing.";
      }
    });
  }
});
