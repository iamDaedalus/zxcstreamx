function popular() {
  let popularSwiper;
  async function popularFetch(type = "movie") {
    const populardWrapper = document.getElementById("popularWrapper");

    const endpoint = `https://api.themoviedb.org/3/${type}/popular?api_key=${apiKey}&language=en-US&page=1`;
    const response = await fetch(endpoint);
    const data = await response.json();
    popularWrapper.innerHTML = "";

    data.results.forEach((meow) => {
      const yearReleased =
        (meow.release_date || meow.first_air_date)?.split("-")[0] || "Unknown";
      const topRatedSlide = document.createElement("a");
      topRatedSlide.href = `#details?${type}/${meow.id}`;
      topRatedSlide.className = "topRatedSlide swiper-slide";
      topRatedSlide.innerHTML = `
    <div class="topRatedImageContainer">
    <img class="lazy topRatedImage" data-src="https://image.tmdb.org/t/p/w500/${
      meow.poster_path
    }"/>
    </div>
    <div class="topRatedTitleContainer">
     <span  class="topRatedTitle">${meow.title || meow.name}</span>
     <span>${yearReleased}</span>
    </div>
    `;

      populardWrapper.appendChild(topRatedSlide);
    });

    if (popularSwiper) {
      popularSwiper.destroy();
    }

    popularSwiper = new Swiper("#popularContainer", {
      slidesPerView: "auto",
      spaceBetween: 15,
      freeMode: true,
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      keyboard: {
        enabled: true, // Enables keyboard navigation
        onlyInViewport: true, // Works only when Swiper is in view
        pageUpDown: true, // Allows PageUp/PageDown keys for navigation
      },
    });

    lazy();
  }

  const movieButtonn = document.querySelector(".popularMovieButton");
  movieButtonn.classList.add("red");
  movieButtonn.addEventListener("click", () => {
    movieButtonn.classList.add("red");
    tvButtonn.classList.remove("red");
    popularFetch("movie");
  });
  const tvButtonn = document.querySelector(".tvMovieButton");
  tvButtonn.addEventListener("click", () => {
    tvButtonn.classList.add("red");
    movieButtonn.classList.remove("red");
    popularFetch("tv");
  });

  popularFetch("movie");
}
