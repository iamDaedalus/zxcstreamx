function movieSection() {
  const genreWrapper = document.getElementById("genreWrapper");
  const genreMovieContainer = document.getElementById("genreMovieContainer");

  const sectionName = document.querySelector(".sectionName");

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  let currentPage = 1;
  let isLoading = false;
  let selectedGenres = [];

  // Render genre checkboxes
  genres.forEach((genre) => {
    const genreSlide = document.createElement("div");
    genreSlide.className = "swiper-slide genreSlide";

    const genreLabel = document.createElement("label");
    const genreCheckbox = document.createElement("input");
    genreCheckbox.type = "checkbox";
    genreCheckbox.value = genre.id;
    genreCheckbox.id = "genre_" + genre.id;

    genreLabel.innerText = genre.name;
    genreLabel.setAttribute("for", genreCheckbox.id);
    genreCheckbox.addEventListener("change", () => {
      genreLabel.classList.toggle("checked", genreCheckbox.checked);
      updateMoviesBySelectedGenres();
    });

    genreSlide.appendChild(genreLabel);
    genreSlide.appendChild(genreCheckbox);
    genreWrapper.appendChild(genreSlide);
  });

  new Swiper(".genreContainer", {
    slidesPerView: "auto",
    loop: false,
    freeMode: true,
    centeredSlides: false,
    spaceBetween: 15,
    mousewheel: false,
    keyboard: {
      enabled: true, // Enables keyboard navigation
      onlyInViewport: true, // Works only when Swiper is in view
      pageUpDown: true, // Allows PageUp/PageDown keys for navigation
    },
  });

  function updateMoviesBySelectedGenres() {
    selectedGenres = [];
    document
      .querySelectorAll("#genreWrapper input:checked")
      .forEach((checkbox) => {
        selectedGenres.push(checkbox.value);
      });

    currentPage = 1;
    genreMovieContainer.innerHTML = ""; // Clear existing movies

    if (selectedGenres.length === 0) {
      fetchPopularMovies();
      sectionName.innerText = "POPULAR";
    } else {
      fetchMoviesByGenre(selectedGenres.join(","));
      const selectedGenreNames = genres
        .filter((genre) => selectedGenres.includes(genre.id.toString()))
        .map((genre) => genre.name)
        .join(", ");

      sectionName.innerText = selectedGenreNames || "POPULAR";
    }
  }

  async function fetchMoviesByGenre(genreQuery) {
    if (isLoading) return;
    isLoading = true;

    const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreQuery}&page=${currentPage}`;
    const response = await fetch(endpoint);
    const data = await response.json();

    if (currentPage === 1 && data.results.length === 0) {
      genreMovieContainer.innerHTML =
        "<p>No movies found for the selected genres.</p>";
    }

    data.results.forEach((movie) => {
      if (movie.adult === false && movie.vote_average >= 5) {
        displayMovies(movie);
      }
    });

    isLoading = false;
    currentPage++;

    lazy();
  }

  async function fetchPopularMovies() {
    if (isLoading) return;
    isLoading = true;

    const endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}&`;
    const response = await fetch(endpoint);
    const data = await response.json();

    data.results.forEach((movie) => {
      if (movie.adult === false && movie.vote_average >= 5) {
        displayMovies(movie);
      }
    });

    isLoading = false;
    currentPage++;
    lazy();
  }

  function displayMovies(movie, index) {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const isBookmarked = watchlist.some((item) => item.id === movie.id);
    const movieCard = document.createElement("a");
    movieCard.className = "companyCard";
    movieCard.href = `#details?movie/${movie.id}`;

    movieCard.innerHTML = `
      <div class="imageWrapper">
       <i class='bx ${isBookmarked ? "bxs-bookmark" : "bx-bookmark"} '></i>
      <img class="lazy" data-src="https://image.tmdb.org/t/p/w500/${
        movie.poster_path
      }"/>
      </div>
      <div class="titleWrapper">
        <span>${movie.title}</span>
      </div>
      `;

    movieCard.style.animationDelay = `${index * 0.1}s`;

    genreMovieContainer.appendChild(movieCard);

    const bookmark = movieCard.querySelector(".bx-bookmark, .bxs-bookmark");
    bookmark.addEventListener("click", (event) => {
      watchlistFunction(movie.id, "movie", bookmark);
    });
  }

  // Infinite Scroll
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300 &&
      !isLoading
    ) {
      if (selectedGenres.length === 0) {
        fetchPopularMovies();
      } else {
        fetchMoviesByGenre(selectedGenres.join(","));
      }
    }
  });

  // Initial fetch
  fetchPopularMovies();
}
