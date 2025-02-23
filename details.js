function detailsFunction(data) {
  const detailsContainer = document.getElementById("detailsContainer");
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const isBookmarked = watchlist.some((item) => item.id === data.id);
  detailsContainer.innerHTML = `
  <div class="detailsPoster">
 <i class='bx bx-play-circle'></i>
  <img class="detailsImage lazy" data-src="${data.backdrop}"/>
  </div>


  <div class="detailsWrapper">

  <i class="detailsTagline">${data.tagline}</i>
  <span class="detailsTitle">${data.title} <span class="detailsYear">(${
    data.year
  })</span></span>
  <div class="detailsTrio">
  <span><i class='bx bxs-star'></i><i class='bx bxs-star-half' ></i> ${
    data.vote
  }</span>
  &#x2022;
  <span>${data.run}</span>
  &nbsp;
  
  &#x2022;
  &nbsp;
  
  <span>${data.genre}</span>   
  </div>
  <div class="playDownload">
 
   <a class="playDetails"><i class='bx bx-play'></i>Play Now</a> 
   <i class='bx bx-download downloadMovie'></i>
  </div>
   <i class='bx ${isBookmarked ? "bxs-bookmark" : "bx-bookmark"} '></i>
  <div class="detailsButtonWrapper">
  <button class="detailsOverviewbutton">Overview</button>
  <button class="detailsEpisodesbutton">Episodes</button>
  <button class="detailsTrailerbutton">Trailer</button>
   <button class="detailsMorebutton">More+</button>
  </div>
   <div class="detailsUpdate">
 <p class="detailsOverview">${data.overview}</p>
  </div>
  
  </div>
  `;

  const downloadMovie = detailsContainer.querySelector(".downloadMovie");
  downloadMovie.addEventListener("click", () => {
    window.open(`https://dl.vidsrc.vip/movie/${data.id}`), "_blank";
  });

  const bookmark = document.querySelector(".bx-bookmark, .bxs-bookmark");
  bookmark.addEventListener("click", () => {
    watchlistFunction(data.id, data.mediaType, bookmark);
  });

  const playDetails = document.querySelector(".playDetails");
  if (!data.id) {
    playDetails.classList.add("shy");
  }
  playDetails.href = `#play?${data.mediaType}/${data.id}`;
  playDetails.addEventListener("click", (event) => {
    recentlyFunction(data.id, data.mediaType);
  });

  const detailsOverviewbutton = document.querySelector(
    ".detailsOverviewbutton"
  );
  const detailsEpisodesbutton = document.querySelector(
    ".detailsEpisodesbutton"
  );
  const detailsTrailerbutton = document.querySelector(".detailsTrailerbutton");
  const detailsUpdate = document.querySelector(".detailsUpdate");

  detailsOverviewbutton.classList.add("red");

  detailsOverviewbutton.addEventListener("click", () => {
    detailsOverviewbutton.classList.add("red");
    detailsEpisodesbutton.classList.remove("red");
    detailsTrailerbutton.classList.remove("red");
    detailsUpdate.innerHTML = `<p class="detailsOverview">${data.overview}</p>`;
  });
  detailsTrailerbutton.addEventListener("click", async () => {
    const url = await fetchTrailer(data.id, data.mediaType);
    loader.classList.add("loading");
    detailsOverviewbutton.classList.remove("red");
    detailsEpisodesbutton.classList.remove("red");
    detailsTrailerbutton.classList.add("red");
    detailsUpdate.innerHTML = `
    <iframe class="detailsTrailer" src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `;

    loaderIndicator();
  });

  if (data.mediaType == "tv") {
    downloadMovie.classList.add("shy");
    detailsEpisodesbutton.classList.add("unhide");
    detailsEpisodesbutton.addEventListener("click", () => {
      detailsOverviewbutton.classList.remove("red");
      detailsEpisodesbutton.classList.add("red");
      detailsTrailerbutton.classList.remove("red");

      detailsUpdate.innerHTML = `
      <div class="detailsSeason"><span class="seasonText">Select season</span> <i class='bx bx-chevron-down' ></i>
      <div class="detailsSeasonPopulate"></div>
      </div>




      <div class="swiper-container detailsEpisodeContainer">
      <div  class="swiper-wrapper detailsEpisodeWrapper"></div>
       <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      </div>
      `;

      const detailsSeason = document.querySelector(".detailsSeason");
      const detailsSeasonPopulate = document.querySelector(
        ".detailsSeasonPopulate"
      );
      const seasonText = document.querySelector(".seasonText");
      const detailsEpisodeWrapper = document.querySelector(
        ".detailsEpisodeWrapper"
      );

      detailsSeason.addEventListener("click", () => {
        detailsSeasonPopulate.classList.toggle("drop");
      });
      const today = new Date().toISOString().split("T")[0];
      data.season.forEach((meow) => {
        if (meow.air_date <= today) {
          const seasonDetailsButton = document.createElement("button");
          seasonDetailsButton.className = "seasonDetailsButton";
          seasonDetailsButton.innerText = meow.name;
          detailsSeasonPopulate.appendChild(seasonDetailsButton);

          seasonDetailsButton.addEventListener("click", async () => {
            detailsEpisodeWrapper.innerHTML = "";
            const episodes = await fetchEpisode(data.id, meow.season_number);
            seasonText.innerText = meow.name;

            episodes.forEach((meoww) => {
              const episodeSlide = document.createElement("a");
              episodeSlide.className = "swiper-slide episodeSlide";
              episodeSlide.href = `#play?tv/${data.id}/${meow.season_number}/${meoww.episodeNumber}`;

              episodeSlide.innerHTML = `
              <div class="episodeImageWrapper">
              <img class="episodeImage lazy" data-src="${meoww.episodeImage}"/>
               <div class="episodeDownload">
              <p class="episodeRuntime">${meoww.episodeRuntime} minutes</p>
              <i class='bx bx-download episodeDowload'></i>
              </div>
              </div>
              <div class="episodeTitleWrapper">
              <p class="episodeTitle">E${meoww.episodeNumber}. ${meoww.episodeName}</p>
              <p class="episodeOverview">${meoww.episodeOverview}</p>
              </div>
              `;
              detailsEpisodeWrapper.appendChild(episodeSlide);

              const episodeDowload =
                episodeSlide.querySelector(".episodeDowload");
              episodeDowload.addEventListener("click", (e) => {
                e.preventDefault();
                window.open(
                  `https://dl.vidsrc.vip/tv/${data.id}/${meow.season_number}/${meoww.episodeNumber}`,
                  "_blank"
                );
              });
            });
            lazy();
          });
          if (meow.name == "Season 1") {
            seasonDetailsButton.click();
            detailsSeasonPopulate.classList.remove("drop");
          }
        }
      });
      const epsSwiper = new Swiper(".detailsEpisodeContainer", {
        slidesPerView: "auto",
        spaceBetween: 20,
        loop: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    });
  }

  lazy();
}
