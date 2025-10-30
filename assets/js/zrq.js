(function () {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbCaption = document.getElementById("lightboxCaption");
  const btnClose = lb.querySelector(".lightbox__close");

  // Open on click
  document.addEventListener("click", function (e) {
    const img = e.target.closest("img[data-full]");
    if (!img) return;
    openLightbox(img.dataset.full || img.src, img.alt || "");
  });

  // Close on backdrop click
  lb.addEventListener("click", function (e) {
    if (e.target === lb) closeLightbox();
  });

  btnClose.addEventListener("click", closeLightbox);

  // Close on Esc
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lb.getAttribute("aria-hidden") === "false")
      closeLightbox();
  });

  // Helpers
  function openLightbox(src, caption) {
    lbImg.src = src;
    lbImg.alt = caption;
    lbCaption.textContent = caption;
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    // Preload hint
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  }

  function closeLightbox() {
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    // Clear to free memory on very large images
    lbImg.src = "";
    lbImg.alt = "";
    lbCaption.textContent = "";
  }
})();
