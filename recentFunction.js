function recentlyFunction(id, mediaType) {

  let recent = JSON.parse(localStorage.getItem("recent")) || [];

  const newRecent = {
    id: id,
    mediaType: mediaType,
  };

  if (!recent.some((item) => item.id === newRecent.id)) {
    recent.push(newRecent); // Push works because watchlist is an array
  } 
  // else {
  //   recent = recent.filter((item) => item.id !== id);
  // }
  // Save updated array
  localStorage.setItem("recent", JSON.stringify(recent));
}
