let captionELement,
  dragableArea,
  buttonContainer,
  closeCaptionButton,
  refreshCaptionButton,
  captionTextElement;

function css(element, style) {
  for (const property in style) element.style[property] = style[property];
}

// Function to add css to multiple element
function addCssToElements(elements, style) {
  for (const element of elements) css(element, style);
}
function createCaptionElement() {
  const captionELement = document.createElement("div");
  const dragableArea = document.createElement("div");
  const buttonContainer = document.createElement("div");
  const closeCaptionButton = document.createElement("button");
  const refreshCaptionButton = document.createElement("button");
  const captionTextElement = document.createElement("div");

  captionELement.id = "caption";
  dragableArea.id = "dragableArea";
  buttonContainer.id = "buttonContainer";
  closeCaptionButton.id = "closeCaptionBtn";
  refreshCaptionButton.id = "refreshCaptionBtn";
  captionTextElement.id = "captionText";

  closeCaptionButton.innerText = "✖";
  refreshCaptionButton.innerText = "⟳";

  closeCaptionButton.title = "Close Caption";
  refreshCaptionButton.title = "Refresh Caption";

  closeCaptionButton.addEventListener("click", closeCaption);
  refreshCaptionButton.addEventListener("click", showCaption);

  captionELement.append(dragableArea);
  dragableArea.append(buttonContainer);
  buttonContainer.append(refreshCaptionButton);
  buttonContainer.append(closeCaptionButton);
  captionELement.append(captionTextElement);

  css(captionELement, {
    "background-color": "#202124",
    color: "white",
    position: "fixed",
    top: "90vh",
    left: "25vw",
    right: "25vw",
    width: "50vw",
    "border-radius": "10px",
    "text-align": "center",
    "font-size": "18px",
    "z-index": 9,
    overflow: "hidden",
  });

  css(dragableArea, {
    position: "absolute",
    cursor: "move",
    width: "50vw",
    height: "500px",
    "z-index": 10,
  });

  css(buttonContainer, {
    position: "absolute",
    width: "50px",
    top: 0,
    right: 0,
    "z-index": 12,
  });

  addCssToElements([closeCaptionButton, refreshCaptionButton], {
    cursor: "pointer",
    "border-radius": "50%",
    width: "15px",
    heigh: "15px",
    padding: "2px",
    "font-weight": 10,
    "line-height":"10px",
    "text-align": "center",
    border: "none",
    "font-size": "9px",
    margin: "2px",
  });
  refreshCaptionButton.style.fontWeight = 100;
  refreshCaptionButton.style.fontSize = "10px";


  css(captionTextElement, {
    position: "relative",
    "z-index": 11,
    margin: "15px",
  });

  return {
    captionELement,
    dragableArea,
    buttonContainer,
    closeCaptionButton,
    refreshCaptionButton,
    captionTextElement,
  };
}
function fetchCaptionText() {
  const courseraCaptionElement =
    document.getElementsByClassName("rc-Phrase active")[0];
  captionTextElement.innerText =
    courseraCaptionElement == undefined ? "" : courseraCaptionElement.innerText;
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
  if (request.method == "showCaption") {
    // check if caption already exist, if yes, close it
    if (captionELement) closeCaption();
    ({
      captionELement,
      dragableArea,
      buttonContainer,
      closeCaptionButton,
      refreshCaptionButton,
      captionTextElement,
    } = createCaptionElement());
    document.body.append(captionELement);

    // make the caption dragable
    dragElement(captionELement, dragableArea);

    // show the caption
    showCaption();
  }
});

// Make the DIV element draggagle:
// https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(parentElmnt, dragAreaElmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  dragAreaElmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    parentElmnt.style.top = parentElmnt.offsetTop - pos2 + "px";
    parentElmnt.style.left = parentElmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// get message from current tabs with method closeCaption
chrome.runtime.onMessage.addListener(function (request, _, _) {
  if (request.method == "closeCaption") {
    closeCaption();
  }
});