async function fetchEpisode(id, season) {
  const endpoint = `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${apiKey}
`;

  const response = await fetch(endpoint);
  const data = await response.json();
  console.log(data);
  const arf = data.episodes.map((meow) => {
    return {
      episodeName: meow.name,
      episodeNumber: meow.episode_number,
      episodeOverview: meow.overview,
      episodeRuntime: meow.runtime,
      episodeImage: meow.still_path
        ? `https://image.tmdb.org/t/p/w500/${meow.still_path}`
        : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
    };
  });
  return arf;
}
