function searchFunction() {
  const searchResults = document.querySelector(".searchResults");
  const searchBar = document.querySelector(".searchBar");
  const searchType = document.querySelector(".searchType");
  const searchYear = document.querySelector(".searchYear");
  const searchLang = document.querySelector(".searchLang");

  const today = new Date().toISOString().split("T")[0];
  let currentTyping = "";
  let page = 1;
  let searchIsFetching = false;
  let searchTimeout = null;
  let selectedType = "movie";
  let selectedYear = "";
  let selectedLang = "";

  // Populate searchType options
  searchType.innerHTML = `
    <option value="movie">Movies</option>
    <option value="tv">TV Shows</option>
  `;

  // Populate searchYear options (last 30 years)
  searchYear.innerHTML = `<option value="">All Years</option>`;
  for (let year = new Date().getFullYear(); year >= 1990; year--) {
    searchYear.innerHTML += `<option value="${year}">${year}</option>`;
  }

  // Populate searchLang options
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "ko", name: "Korean" },
    { code: "ja", name: "Japanese" },
  ];
  searchLang.innerHTML = `<option value="">All Languages</option>`;
  languages.forEach((lang) => {
    searchLang.innerHTML += `<option value="${lang.code}">${lang.name}</option>`;
  });

  async function searchFetchFunction() {
    page = 1;
    searchIsFetching = false;
    searchResults.innerHTML = "";
    searchFetch();
  }

  async function searchFetch() {
    if (searchIsFetching) return;
    searchIsFetching = true;

    let endpoint = `https://api.themoviedb.org/3/search/${selectedType}?api_key=${apiKey}&query=${encodeURIComponent(
      currentTyping
    )}&language=${selectedLang || "en-US"}&page=${page}`;

    if (selectedYear) {
      endpoint += `&year=${selectedYear}`;
    }

    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.results) {
        data.results.forEach((item) => {
          if (
            (item.release_date || item.first_air_date) &&
            item.vote_average >= 2
          ) {
            displaySearch(item);
          }
        });

        searchIsFetching = false;
        page++;
        observeLastItem();
      }
    } catch (error) {
      console.error("Search fetch failed:", error);
      searchIsFetching = false;
    }
    lazy();
  }

  function observeLastItem() {
    const cards = document.querySelectorAll(".searchCard");
    const lastCard = cards[cards.length - 1];

    if (lastCard) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          if (entries[0].isIntersecting) {
            observer.unobserve(lastCard);
            searchFetch();
          }
        },
        { rootMargin: "100px" }
      );
      observer.observe(lastCard);
    }
  }

  searchBar.addEventListener("input", (e) => {
    currentTyping = e.target.value.trim();

    if (searchTimeout) clearTimeout(searchTimeout);

    if (currentTyping.length > 0) {
      searchTimeout = setTimeout(() => {
        searchFetchFunction();
      }, 500);
    } else {
      searchResults.innerHTML = "";
    }
  });

  searchType.addEventListener("change", (e) => {
    selectedType = e.target.value;
    searchFetchFunction();
  });

  searchYear.addEventListener("change", (e) => {
    selectedYear = e.target.value;
    searchFetchFunction();
  });

  searchLang.addEventListener("change", (e) => {
    selectedLang = e.target.value;
    searchFetchFunction();
  });

  function displaySearch(data) {
    const searchCard = document.createElement("a");
    searchCard.href = `#details?${selectedType}/${data.id}`;
    searchCard.className = "searchCard";
    searchCard.innerHTML = `
      <div class="searchImageContainer">
        <img class="lazy searchImage" data-src="https://image.tmdb.org/t/p/w500/${
          data.poster_path || "default-image.jpg"
        }"/>
      </div>
      <div class="searchTitleContainer">
        <span class="searchTitle">${data.title || data.name}</span>
      </div>
    `;

    searchResults.appendChild(searchCard);
  }
}
