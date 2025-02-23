let networksCurrentPage = 1;
let networksIsFetching = false;
let networksIdGlobal = null;

async function networksFunction(networksId) {
  networksCurrentPage = 1;
  networksIsFetching = false;
  networksIdGlobal = networksId;

  const networkContainer = document.getElementById("networkContainer");
  networkContainer.innerHTML = "";

  await networksFetch();
}
async function networksFetch() {
  if (networksIsFetching) return;
  networksIsFetching = true;

  const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_companies=${networksIdGlobal}&sort_by=popularity.desc&page=${networksCurrentPage}
`;
  const today = new Date().toISOString().split("T")[0];

  const response = await fetch(endpoint);
  const data = await response.json();
  data.results.forEach(async (meow) => {
    if (meow.release_date <= today && meow.vote_average >= 2) {
      displayNetworks(meow);
    }
  });

  networksIsFetching = false;
  networksCurrentPage++;
  observeLastItemNetwork();
}

function observeLastItemNetwork() {
  const cards = document.querySelectorAll(".companyCard");
  const lastCard = cards[cards.length - 1];

  if (lastCard) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.unobserve(lastCard); // Unobserve current last item
          networksFetch(); // Fetch next page
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(lastCard);
  }
}

function displayNetworks(data) {
  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
    : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibeodCS7BPOb9g45oi5UXnHI4lwGJECVpkbQTTZOSV4YTNkOWzY__ZQITNna1nBEiXMcATjNM20xtsKXbRPvejk1Rek-bRsp-ZiwOI5vyWMhYC_AEQodd_otWepiHkpG9zJCd0iABhb1iFFRuJXE6mSyWhy0xpQdv8IIZoOAl8aI1QBc4gRQxfvqim/s1600/%5BZXC%20STREAM%5D11.jpg";

  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const isBookmarked = watchlist.some((item) => item.id === data.id);
  const companyCard = document.createElement("a");
  companyCard.href = `#details?movie/${data.id}`;
  companyCard.className = "companyCard";
  companyCard.innerHTML = `
      <div class="imageWrapper">
       <i class='bx ${isBookmarked ? "bxs-bookmark" : "bx-bookmark"} '></i>
      <img class="lazy" data-src="${poster}"/>
      </div>
      <div class="titleWrapper">
        <span>${data.title}</span>
      </div>
      `;
  networkContainer.appendChild(companyCard);

  const bookmark = companyCard.querySelector(".bx-bookmark, .bxs-bookmark");
  bookmark.addEventListener("click", (event) => {
    watchlistFunction(data.id, "movie", bookmark);
  });

  lazy();
}
