function retrieveWatchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const watchlistContainer = document.getElementById("watchlistContainer");
  if (watchlist.length > 0) {
    const watchlistWrapper = document.getElementById("watchlistWrapper");

    watchlist.forEach(async (meow) => {
      const isBookmarked = watchlist.some((item) => item.id === meow.id);
      const data = await fetchShow(meow.id, meow.mediaType);
      const watchlistCard = document.createElement("a");
      watchlistCard.href = `#details?${meow.mediaType}/${meow.id}`;
      watchlistCard.className = "swiper-slide watchlistCard";
      watchlistCard.innerHTML = `
     <i class='bx ${isBookmarked ? "bxs-bookmark" : "bx-bookmark"} '></i>
      <div class="imageWrapper">
      <img class="lazy watchlistImg" data-src="${data.poster}"/>
      </div>
      <div class="titleWrapper">
        <span>${data.title}</span>
      </div>
      `;
      watchlistWrapper.appendChild(watchlistCard);

      const bookmark = watchlistCard.querySelector(
        ".bx-bookmark, .bxs-bookmark"
      );
      bookmark.addEventListener("click", (event) => {
        watchlistFunction(meow.id, meow.mediaType, bookmark);
        watchlistCard.remove();
      });
      lazy();
    });

    new Swiper("#watchlistContainer", {
      slidesPerView: "auto",
      spaceBetween: 5,
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  } else {
    watchlistContainer.innerHTML = `<div class="nothing">
    <div class="nothingIcon"><i class='bx bx-ghost'></i></div>
    <div class="nothingText"><p>It's pitch black in here.</p></div>
    </div>`;
  }
}
