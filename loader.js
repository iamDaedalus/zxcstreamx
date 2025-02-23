const loader = document.querySelector(".loader-container");
function loaderIndicator() {
  const iframe = document.querySelector("iframe");
  iframe.onload = function () {
    loader.classList.remove("loading");
  };
}
