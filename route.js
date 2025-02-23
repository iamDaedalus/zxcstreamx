const route = {
  home: `
  <div class="home">


  
    <div class="landing">
     <div class="backdropLanding swiper-container">
     <div class="swiper-wrapper landingWrapper"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>

     <div class="swiper-container posterLanding">
    <div class="swiper-wrapper"></div>
    </div>
    </div>

 <div class="slides">

      <div id="recentlyContainer" class="swiper-container">
      
     <div class="landingLabelContainer">
     <span class="landingLabel">Continue Watching</span>
     <i class='bx bx-edit-alt deleteRecent'></i>
     
     </div>

        <div id="recentlyWrapper" class="swiper-wrapper"></div>
           <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
     </div>

  <div id="companiesContainer" class="swiper-container">
     <div class="landingLabelContainer">
     <span class="landingLabel">TV Networks</span>  
     </div>

     <div id="companiesWrapper" class="swiper-wrapper"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
     </div>


       <div id="networksContainer" class="swiper-container">
     <div class="landingLabelContainer">
     <span class="landingLabel">Movie Studios</span>  
     </div>

     <div id="networksWrapper" class="swiper-wrapper"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
     </div>



      <div id="popularContainer" class="swiper-container">
     <div class="landingLabelContainer">
     <span class="landingLabel">Popular</span>  
     <span class="mediatypeButton">
     <button class="popularMovieButton">Movie</button>
     <button class="tvMovieButton">TV</button>
     </span>  
     </div>

     <div id="popularWrapper" class="swiper-wrapper"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
     </div>





    <div id="topRatedContainer" class="swiper-container">
     <div class="landingLabelContainer">
     <span class="landingLabel">Top Rated</span>  
     <span class="mediatypeButton">
     <button class="topMovieButton">Movie</button>
     <button class="topTvButton">TV</button>
     </span>  
     </div>

     <div id="topRatedWrapper" class="swiper-wrapper"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
     </div>






 
   

        </div>

        </div>
         <footer>&copy; All righst reserved</footer>
         
         
         `,
  movie: ` <div class="meow-movie">
   <div class="swiper-container genreContainer">
      <div id="genreWrapper" class="swiper-wrapper"></div>
    </div>
     <h1 class="sectionName">POPULAR</h1>
    <div id="genreMovieContainer"></div>
  </div>`,
  tv: ` <div class="meow-movie">
   <div class="swiper-container genreContainer">
      <div id="genreWrapper" class="swiper-wrapper"></div>
    </div>
       <h1 class="sectionName">TOP-RATED</h1>
    <div id="genreMovieContainer"></div>
  </div>`,
  watchlist: `<div id="watchlistContainer" class="swiper-container">
  <div id="watchlistWrapper" class="swiper-wrapper">
  </div>
    <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
  </div>`,
  search: `
 <div class="searchMainContainer">
    <div class="searhContainer">
      <div class="searchBarContainer">
        <i class="bx bx-search searchIcon"></i>
        <input
          class="searchBar"
          type="search"
          placeholder="Search your favorite Movie & TV Shows..."
        />
      </div>
      <div class="searchSelect">
      <select class="searchType"></select>
      <select class="searchYear"></select>
      <select class="searchLang"></select>
      </div>
    </div>
    <div class="searchResults"></div>
  </div>`,
};

async function render() {
  const hash = location.hash.slice(1) || "home";
  let content = route[hash];

  // Handle dynamic company routes
  if (hash.startsWith("company/")) {
    content = `<div id="companyContainer"></div>`;
  }
  if (hash.startsWith("networks/")) {
    content = `<div id="networkContainer"></div>`;
  } else if (hash.startsWith("details?")) {
    content = `<div id="detailsContainer"></div>`;
  } else if (hash.startsWith("play?")) {
    content = `<div id="sourceContainer"></div>`;
  }

  // Default to 404 if no valid route
  if (!content) {
    content = `<div class="notFound"><h1>404</h1><p>Page Not Found</p></div>`;
  }

  document.getElementById("contents").innerHTML = content;
  document
    .querySelectorAll(".line")
    .forEach((line) => line.classList.remove("glow"));

  document.querySelector(`a[href="#${hash}"] .line`)?.classList.add("glow");

  if (hash == "home") {
    landingFunction();
    retrieveRecent();
    company();
    networks();
    topRated();
    popular();
  } else if (hash.startsWith("company/")) {
    const companyId = hash.replace("company/", "");
    companiesFunction(companyId);
  } else if (hash.startsWith("networks/")) {
    const networksId = hash.replace("networks/", "");
    networksFunction(networksId);
  } else if (hash.startsWith("details?")) {
    const params = hash.replace("details?", "").split("/");
    const mediaType = params[0];
    const id = params[1];
    const data = await fetchShow(id, mediaType);
    detailsFunction(data);
  } else if (hash.startsWith("play?")) {
    const params = hash.replace("play?", "").split("/");
    const mediaType = params[0];
    const id = params[1];
    const season = params[2];
    const episode = params[3];
    playerFunction(id, mediaType, season, episode);
  } else if (hash == "movie") {
    movieSection();
  } else if (hash == "tv") {
    tvSection();
  } else if (hash == "watchlist") {
    retrieveWatchlist();
  } else if (hash == "donate") {
  } else if (hash == "search") {
    searchFunction();
  }
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);
