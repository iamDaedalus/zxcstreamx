// Add this script to your website
window.addEventListener("message", function (event) {
  // console.log("event: ", event);
  console.log("Message received from the player: ", JSON.parse(event.data)); // Message received from player
  if (typeof event.data === "string") {
    var messageArea = document.querySelector("#messageArea");
    messageArea.innerText = event.data;
  }
});
