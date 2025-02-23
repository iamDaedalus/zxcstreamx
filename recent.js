function retrieveRecent() {
  const recentlyContainer = document.getElementById("recentlyContainer");
  const recentlyWrapper = document.getElementById("recentlyWrapper");
  const deleteRecent = document.querySelector(".deleteRecent");

  let recent = JSON.parse(localStorage.getItem("recent")) || [];
  recent.forEach(async (meow) => {
    const data = await fetchShow(meow.id, meow.mediaType);
    const english = await fetchImages(
      meow.id,
      meow.mediaType,
      "englishBackdrop"
    );

    const recentSlide = document.createElement("a");
    recentSlide.href = `#details?${meow.mediaType}/${meow.id}`;
    recentSlide.className = "recentSlide swiper-slide";
    recentSlide.innerHTML = `
    <i class='bx bx-trash trashRecent'></i>
    <div class="recentImageContainer"><img class="lazy recentImage" data-src="${english}"/></div>
    <div class="recentTitleContainer">
    <span class="recentTitle">${data.title}</span>
     <span class="recentYear">${data.year}</span>
    </div>
    `;
    recentlyWrapper.appendChild(recentSlide);
    lazy();
    const trashRecent = recentSlide.querySelector(".trashRecent");
    deleteRecent.addEventListener("click", () => {
      trashRecent.classList.toggle("trash");
      if (trashRecent.classList.contains("trash")) {
        deleteRecent.classList.replace("bx-edit-alt", "bx-x");
      } else {
        deleteRecent.classList.replace("bx-x", "bx-edit-alt");
      }
    });
    trashRecent.addEventListener("click", (e) => {
      e.preventDefault();

      recent = recent.filter(
        (item) => item.id !== meow.id || item.mediaType !== meow.mediaType
      );
      localStorage.setItem("recent", JSON.stringify(recent));
      recentSlide.remove();
    });
  });
  if (recent.length === 0) {
    recentlyContainer.remove();
  }
  const compSwiper = new Swiper("#recentlyContainer", {
    slidesPerView: "auto",
    spaceBetween: 15,
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    freeMode: true,
    keyboard: {
      enabled: true, // Enables keyboard navigation
      onlyInViewport: true, // Works only when Swiper is in view
      pageUpDown: true, // Allows PageUp/PageDown keys for navigation
    },
  });
}
