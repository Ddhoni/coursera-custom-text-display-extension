let captionELement;
function css(element, style) {
  for (const property in style) element.style[property] = style[property];
}

function createCaptionElement() {
  const captionELement = document.createElement("div");
  css(captionELement, {
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
  return captionELement;
}
function fetchCaptionText() {
  const captionTextElement =
    document.getElementsByClassName("rc-Phrase active")[0];
  captionELement.innerText = captionTextElement == undefined? "" : captionTextElement.innerText;
  setTimeout(fetchCaptionText, 300);
}
function showCaption() {
  console.log("Sedang mencoba....");
  try {
    fetchCaptionText();
  } catch (e) {
    setTimeout(() => {
      console.log("ada error, mencoba 1 detik kemudian");
      showCaption();
    }, 1000);
  }
  return;
}
function closeCaption() {
  clearTimeout(fetchCaptionText);
  clearTimeout(showCaption);
  captionELement.remove();
}
// get message from current tabs with method showCaption
chrome.runtime.onMessage.addListener(function (request, _, _) {
  console.log(request);
  if (request.method == "showCaption") {
    if (captionELement) closeCaption();
    captionELement = createCaptionElement()
    document.body.append(captionELement);
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
