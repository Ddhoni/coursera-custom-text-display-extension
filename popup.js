// make sure document is loaded
document.addEventListener("DOMContentLoaded", function () {
  // get show caption button and close caption button
  let showCaptionButton = document.getElementById("showCaptionBtn");
  let closeCaptionButton = document.getElementById("closeCaptionBtn");
  // add event listener to show caption button and close caption button
  showCaptionButton.addEventListener(
    "click",
    function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { method: "showCaption" });
      });
    },
    false
  );

  closeCaptionButton.addEventListener(
    "click",
    function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { method: "closeCaption" });
      });
    },
    false
  );
});
