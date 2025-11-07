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

  // === Audio player helper patch ===
  const audio   = document.getElementById("abAudio");
  const sub     = document.getElementById("abSub");
  const coverEl = document.getElementById("abCover"); // <-- now an <img>

  // only do this if the main inline player script already defined playJsonAlbum
  const origPlay = window.playJsonAlbum;

  if (origPlay) {
    // wrap the original function
    window.playJsonAlbum = function (aEl) {
      // run the original logic (opens bar, sets tracks, etc.)
      origPlay(aEl);

      // 1) set the album cover src based on the image that was clicked
      if (coverEl && aEl) {
        const img = aEl.querySelector("img");
        if (img && img.src) {
          coverEl.src = img.src;
        }
      }

      // 2) extra safety: if the inline script put tracks on window, re-encode first one
      if (audio && window.tracks && window.tracks.length > 0) {
        const first = window.tracks[0];
        audio.src = encodeURI(first).replace(/#/g, "%23");
      }
    };
  }

  // global audio error handler
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
