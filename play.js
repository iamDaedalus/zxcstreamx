function playerFunction(id, mediaType, seasonFetch, episodeFetch) {
  const sourceContainer = document.getElementById("sourceContainer");
  const season = seasonFetch || "1";
  const episode = episodeFetch || "1";

  const servers = [
    {
      name: "Main Sever 1",
      movieLink: ` https://player.videasy.net/movie/${id}`,
      tvLink: `https://player.videasy.net/tv/${id}/${season}/${episode}`,
    },
    {
      name: "Main Sever 2",
      movieLink: `https://vidsrc.xyz/embed/movie/${id}`,
      tvLink: `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`,
    },
    {
      name: "Server 2",
      movieLink: `https://embed.su/embed/movie/${id}`,
      tvLink: `https://embed.su/embed/tv/${id}/${season}/${episode}`,
    },
    {
      name: "Server 1",
      movieLink: `https://vidsrc.cc/v2/embed/movie/${id}`,
      tvLink: `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}`,
    },
    {
      name: "Server 3",
      movieLink: `https://vidbinge.dev/embed/movie/${id}`,
      tvLink: `https://vidbinge.dev/embed/tv/${id}/${season}/${episode}`,
    },

    {
      name: "Server 4",
      movieLink: `https://vidlink.pro/movie/${id}`,
      tvLink: `https://vidlink.pro/tv/${id}/${season}/${episode}`,
    },
    {
      name: "Server 5",
      movieLink: `https://www.primewire.tf/embed/movie?tmdb=${id}`,
      tvLink: `https://www.primewire.tf/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`,
    },
  ];

  const iframeContainer = document.createElement("div");
  iframeContainer.className = "iframeContainer";
  const serversContainer = document.createElement("div");
  serversContainer.className = "serversContainer";

  iframeContainer.innerHTML = `
      <iframe class="sourcePlayer" src="" allow="accelerometer; autoplay;gyroscope; picture-in-picture;"  allowfullscreen></iframe>
  `;

  sourceContainer.appendChild(iframeContainer);
  sourceContainer.appendChild(serversContainer);
  loader.classList.add("loading");
  const sourcePlayer = iframeContainer.querySelector(".sourcePlayer");
  sourcePlayer.className = "sourcePlayer";
  loaderIndicator();

  if (mediaType == "movie") {
    sourcePlayer.src = servers[0].movieLink;
  } else {
    sourcePlayer.src = servers[0].tvLink;
  }

  servers.forEach((meow, index) => {
    const serverButton = document.createElement("button");
    serverButton.className = "serverButton";
    serverButton.innerText = meow.name;
    serversContainer.appendChild(serverButton);

    if (index == 0) {
      serverButton.classList.add("working");
    }

    serverButton.addEventListener("click", () => {
      loader.classList.add("loading");
      document
        .querySelectorAll(".serverButton")
        .forEach((button) => button.classList.remove("working"));
      serverButton.classList.add("working");
      if (mediaType == "movie") {
        sourcePlayer.src = meow.movieLink;
      } else {
        sourcePlayer.src = meow.tvLink;
      }
    });
  });


}
