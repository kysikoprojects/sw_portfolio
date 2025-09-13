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

  // === Audio player fixes ===
  const audio = document.getElementById("abAudio");
  const sub = document.getElementById("abSub");

  if (audio) {
    // Always encode filenames for safe loading
    const origLoad = window.playJsonAlbum;
    if (origLoad) {
      window.playJsonAlbum = function (aEl) {
        origLoad(aEl);
        if (window.tracks && window.tracks.length > 0) {
          // Encode first load immediately
          audio.src = encodeURI(window.tracks[0]);
        }
      };
    }

    // Error handler for missing files
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
