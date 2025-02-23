function watchlistFunction(id, mediaType, bookmark) {
  console.log(id, mediaType);
  event.preventDefault();
  // Retrieve existing watchlist or initialize as an empty array
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  const newInject = {
    id: id,
    mediaType: mediaType,
  };

  if (!watchlist.some((item) => item.id === newInject.id)) {
    bookmark.classList.replace("bx-bookmark", "bxs-bookmark");
    watchlist.push(newInject); // Push works because watchlist is an array
  } else {
    bookmark.classList.replace("bxs-bookmark", "bx-bookmark");
    watchlist = watchlist.filter((item) => item.id !== id);
  }
  
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}
