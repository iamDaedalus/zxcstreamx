function topRated() {
  let swiper;
  async function topRatedFetch(type = "movie") {
    const topRatedWrapper = document.getElementById("topRatedWrapper");

    const endpoint = `https://api.themoviedb.org/3/${type}/top_rated?api_key=${apiKey}&language=en-US&page=1`;
    const response = await fetch(endpoint);
    const data = await response.json();
    topRatedWrapper.innerHTML = "";

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

      topRatedWrapper.appendChild(topRatedSlide);
    });

    if (swiper) {
      swiper.destroy();
    }

    swiper = new Swiper("#topRatedContainer", {
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
    lazy();
  }

  const movieButton = document.querySelector(".topMovieButton");
  const tvButton = document.querySelector(".topTvButton");
  tvButton.classList.add("red");
  movieButton.addEventListener("click", () => {
    topRatedFetch("movie");
    movieButton.classList.add("red");
    tvButton.classList.remove("red");
  });

  tvButton.addEventListener("click", () => {
    tvButton.classList.add("red");
    movieButton.classList.remove("red");

    topRatedFetch("tv");
  });

  topRatedFetch("tv");
}
