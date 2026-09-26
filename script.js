document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("heroVideo");
  const menuButton = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  if (video) {
    try {
      video.currentTime = 0;
    } catch (error) {
      console.debug("Video currentTime could not be reset immediately:", error);
    }

    const playPromise = video.play();

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch((error) => {
        console.warn("Autoplay was prevented by the browser:", error);
      });
    }

    video.addEventListener("loadedmetadata", () => {
      try {
        video.currentTime = 0;
      } catch (error) {
        console.debug("Video reset after metadata load was unavailable:", error);
      }
    });

    video.addEventListener("ended", () => {
      console.info("Hero video reached the final frame.");
    });
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        mobileMenu.classList.contains("is-open") &&
        !mobileMenu.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        mobileMenu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      }
    });
  }
});
