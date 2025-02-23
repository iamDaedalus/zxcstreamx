async function fetchShow(id, mediaType) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}`
  );
  const data = await response.json();

  const title = data.title || data.name || "404NOTFOUND";
  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w1280/${data.poster_path}`
    : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibeodCS7BPOb9g45oi5UXnHI4lwGJECVpkbQTTZOSV4YTNkOWzY__ZQITNna1nBEiXMcATjNM20xtsKXbRPvejk1Rek-bRsp-ZiwOI5vyWMhYC_AEQodd_otWepiHkpG9zJCd0iABhb1iFFRuJXE6mSyWhy0xpQdv8IIZoOAl8aI1QBc4gRQxfvqim/s1600/%5BZXC%20STREAM%5D11.jpg";
  const backdrop = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
    : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibeodCS7BPOb9g45oi5UXnHI4lwGJECVpkbQTTZOSV4YTNkOWzY__ZQITNna1nBEiXMcATjNM20xtsKXbRPvejk1Rek-bRsp-ZiwOI5vyWMhYC_AEQodd_otWepiHkpG9zJCd0iABhb1iFFRuJXE6mSyWhy0xpQdv8IIZoOAl8aI1QBc4gRQxfvqim/s1600/%5BZXC%20STREAM%5D11.jpg";

  const tagline = data.tagline || "";
  const overview = data.overview || "";
  const genreName = data.genres?.[0]?.name || "Unknown Genre";
  const vote = data.vote_average || "";
  const season = data.seasons || "";
  const yearReleased =
    (data.release_date || data.first_air_date)?.split("-")[0] || "Unknown";

  const runtimeInMinutes = data.runtime;
  const runtime = runtimeInMinutes
    ? `${Math.floor(runtimeInMinutes / 60)}h ${runtimeInMinutes % 60}m`
    : `S${data.number_of_seasons}E${data.number_of_episodes}`;

  return {
    id: data.id,
    mediaType: mediaType,
    poster: poster,
    backdrop: backdrop,
    title: title,
    year: yearReleased,
    run: runtime,
    genre: genreName,
    overview: overview,
    tagline: tagline,
    vote: vote,
    season: season,
  };
}
