let subtitleELement;
function css(element, style) {
  for (const property in style) element.style[property] = style[property];
}

function createSubtitleElement() {
  const subtitleELement = document.createElement("div");
  css(subtitleELement, {
    "background-color": "#202124",
    color: "white",
    position: "fixed",
    bottom: 0,
    margin: "10px 25vw",
    width: "50vw",
    "border-radius": "10px",
    padding: "15px",
    "text-align": "center",
    "font-size": "18px",
  });
  return subtitleELement;
}
function fetchSubtitleText() {
  const subtitleTextElement =
    document.getElementsByClassName("rc-Phrase active")[0];
  subtitleELement.innerText = subtitleTextElement == undefined? "" : subtitleTextElement.innerText;
  setTimeout(fetchSubtitleText, 300);
}
function showCaption() {
  console.log("Sedang mencoba....");
  try {
    fetchSubtitleText();
  } catch (e) {
    setTimeout(() => {
      console.log("ada error, mencoba 1 detik kemudian");
      showCaption();
    }, 1000);
  }
  return;
}
function closeCaption() {
  clearTimeout(fetchSubtitleText);
  clearTimeout(showCaption);
  subtitleELement.remove();
}
// get message from current tabs with method showCaption
chrome.runtime.onMessage.addListener(function (request, _, _) {
  console.log(request);
  if (request.method == "showCaption") {
    if (subtitleELement) closeCaption();
    subtitleELement = createSubtitleElement()
    document.body.append(subtitleELement);
    showCaption();
  }
});
// get message from current tabs with method closeCaption
chrome.runtime.onMessage.addListener(function (request, _, _) {
  console.log(request);
  if (request.method == "closeCaption") {
    closeCaption();
  }
});
