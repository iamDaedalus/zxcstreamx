let companyCurrentPage = 1;
let companyIsFetching = false;
let companyIdGlobal = null;

async function companiesFunction(companyId) {
  companyCurrentPage = 1;
  companyIsFetching = false;
  companyIdGlobal = companyId;

  const companyContainer = document.getElementById("companyContainer");
  companyContainer.innerHTML = "";

  await fetchCompanies(); // Fetch initial data
}

async function fetchCompanies() {
  if (companyIsFetching) return;
  companyIsFetching = true;

  const endpoint = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_networks=${companyIdGlobal}&sort_by=popularity.desc&page=${companyCurrentPage}`;
  const today = new Date().toISOString().split("T")[0];

  const response = await fetch(endpoint);
  const data = await response.json();

  data.results.forEach((meow) => {
    if (meow.first_air_date <= today && meow.vote_average >= 2) {
      displayCompany(meow);
    }
  });

  companyIsFetching = false;
  companyCurrentPage++;


  observeLastItem();
}

function observeLastItem() {
  const cards = document.querySelectorAll(".companyCard");
  const lastCard = cards[cards.length - 1];

  if (lastCard) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.unobserve(lastCard); // Unobserve current last item
          fetchCompanies(); // Fetch next page
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(lastCard);
  }
}

function displayCompany(data) {
  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
    : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibeodCS7BPOb9g45oi5UXnHI4lwGJECVpkbQTTZOSV4YTNkOWzY__ZQITNna1nBEiXMcATjNM20xtsKXbRPvejk1Rek-bRsp-ZiwOI5vyWMhYC_AEQodd_otWepiHkpG9zJCd0iABhb1iFFRuJXE6mSyWhy0xpQdv8IIZoOAl8aI1QBc4gRQxfvqim/s1600/%5BZXC%20STREAM%5D11.jpg";

  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const isBookmarked = watchlist.some((item) => item.id === data.id);

  const companyCard = document.createElement("a");
  companyCard.href = `#details?tv/${data.id}`;
  companyCard.className = "companyCard";
  companyCard.innerHTML = `
      <div class="imageWrapper">
       <i class='bx ${isBookmarked ? "bxs-bookmark" : "bx-bookmark"}'></i>
      <img class="lazy" data-src="${poster}"/>
      </div>
      <div class="titleWrapper">
        <span>${data.name}</span>
      </div>
      `;

  companyContainer.appendChild(companyCard);
  const bookmark = companyCard.querySelector(".bx-bookmark, .bxs-bookmark");
  bookmark.addEventListener("click", (event) => {
    watchlistFunction(data.id, "tv", bookmark);
  });

  lazy(); // Lazy load images
}
