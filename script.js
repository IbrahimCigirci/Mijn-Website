document.addEventListener("DOMContentLoaded", function () {
  // ✅ Video popup functionaliteit
  const popup = document.getElementById("popup-video");
  const openVideoBtn = document.querySelector(".open-video");
  const closeVideoBtn = document.querySelector(".close-video");
  const videoElement = popup?.querySelector("video");

  if (openVideoBtn && popup && closeVideoBtn && videoElement) {
    openVideoBtn.addEventListener("click", function () {
      popup.classList.add("show");
      videoElement.play();
    });

    closeVideoBtn.addEventListener("click", function () {
      popup.classList.remove("show");
      videoElement.pause();
      videoElement.currentTime = 0;
    });

    popup.addEventListener("click", function (event) {
      if (event.target === popup) {
        popup.classList.remove("show");
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    });
  }

  // ✅ Fade-in animaties
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  fadeElements.forEach(el => observer.observe(el));

  // ✅ Hover-pop-up voor klantlogo's met naam, uitleg en Instagram link
  const klantPopup = document.getElementById("klant-popup");
  const klantName = document.getElementById("klant-name");
  const klantInfo = document.getElementById("klant-info");
  const klantLink = document.getElementById("klant-link");

  let popupVisible = false;
  let hideTimeout;

  if (klantPopup && klantName && klantInfo && klantLink) {
    document.querySelectorAll(".klantlogo").forEach((logo) => {
      logo.addEventListener("mouseenter", function () {
        const rect = this.getBoundingClientRect();
        klantName.textContent = this.dataset.name;
        klantInfo.textContent = this.dataset.info;
        klantLink.href = this.dataset.link || "#";
        klantLink.style.display = this.dataset.link ? "inline-block" : "none";

        klantPopup.style.display = "block";
        klantPopup.style.top = `${rect.top + window.scrollY - 130}px`;
        klantPopup.style.left = `${rect.left + rect.width / 2}px`;
        klantPopup.style.transform = "translateX(-50%)";
        popupVisible = true;
      });

      logo.addEventListener("mouseleave", function () {
        hideTimeout = setTimeout(() => {
          if (!popupVisible) klantPopup.style.display = "none";
        }, 200);
      });
    });

    klantPopup.addEventListener("mouseenter", function () {
      popupVisible = true;
      clearTimeout(hideTimeout);
    });

    klantPopup.addEventListener("mouseleave", function () {
      popupVisible = false;
      klantPopup.style.display = "none";
    });
  }
});

// ✅ Navigatie scroll-effect
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ✅ Carousel scroll functionaliteit
function scrollCarousel(direction) {
  const container = document.getElementById("projectCarousel");
  const scrollAmount = container.offsetWidth;
  container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });


  

  document.querySelectorAll('.letter-animated').forEach(element => {
    const chars = element.textContent.trim().split('');
    element.textContent = '';

    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.animationDelay = `${index * 150}ms`;
      element.appendChild(span);
    });

    element.addEventListener('mouseenter', () => {
      element.classList.remove('fadeout'); // reset als hij al bezig was
      element.classList.add('hover-effect');

      clearTimeout(element._hoverTimeout);
      element._hoverTimeout = setTimeout(() => {
        element.classList.remove('hover-effect');
        element.classList.add('fadeout');
      }, 3000);
    });
  });
  
  
  window.addEventListener('scroll', () => {
    const circle = document.querySelector('.scroll-rotating-circle');
    if (circle) {
      const rotation = window.scrollY * 0.2;
      circle.style.setProperty('--rotation', `${rotation}deg`);
    }
  });
