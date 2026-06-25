const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector("#nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    links.classList.toggle("is-open", !isOpen);
  });
}

const slider = document.querySelector(".banner-slider");

if (slider) {
  const slides = Array.from(slider.querySelectorAll(".banner-slide"));
  const dots = Array.from(slider.querySelectorAll(".banner-dots button"));
  const prev = slider.querySelector(".banner-arrow-prev");
  const next = slider.querySelector(".banner-arrow-next");
  let activeIndex = 0;
  let intervalId;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === activeIndex));
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === activeIndex));
  };

  const startSlider = () => {
    window.clearInterval(intervalId);
    intervalId = window.setInterval(() => showSlide(activeIndex + 1), 3000);
  };

  prev?.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    startSlider();
  });

  next?.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    startSlider();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startSlider();
    });
  });

  showSlide(0);
  startSlider();
}

const magnifiableFigures = Array.from(document.querySelectorAll(".product-details-section .visible-short-caption"));

if (magnifiableFigures.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = `
    <div class="image-lightbox-panel" role="dialog" aria-modal="true" aria-label="Expanded product image">
      <button class="image-lightbox-close" type="button" aria-label="Close expanded image">×</button>
      <img alt="">
      <p></p>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector("p");
  const closeButton = lightbox.querySelector(".image-lightbox-close");

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-lightbox");
  };

  magnifiableFigures.forEach((figure) => {
    const image = figure.querySelector("img");
    const caption = figure.querySelector("figcaption strong") || figure.querySelector("figcaption");
    if (!image) return;

    const button = document.createElement("button");
    button.className = "image-magnify-button";
    button.type = "button";
    button.setAttribute("aria-label", `Enlarge ${image.alt}`);
    button.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="11" cy="11" r="7"></circle>
        <path d="m16.5 16.5 4 4"></path>
      </svg>
    `;

    button.addEventListener("click", () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = caption?.textContent || image.alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("has-lightbox");
      closeButton.focus();
    });

    figure.appendChild(button);
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}
