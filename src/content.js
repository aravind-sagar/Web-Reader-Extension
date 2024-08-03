function enableReaderMode() {
  const articleContent = document.querySelector("article") || document.body;
  const readerDiv = document.createElement("div");
  readerDiv.id = "reader-mode";
  readerDiv.innerHTML = articleContent.innerHTML;
  document.body.innerHTML = "";
  document.body.appendChild(readerDiv);

  // Apply the reader mode styles
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = chrome.runtime.getURL("src/reader.css");
  document.head.appendChild(link);

  applyReaderOptions();
}

function applyReaderOptions() {
  const readerDiv = document.getElementById("reader-mode");
  if (readerDiv) {
    const backgroundColor = localStorage.getItem("backgroundColor") || "white";
    const fontFamily = localStorage.getItem("fontFamily") || "Georgia";
    const fontSize = localStorage.getItem("fontSize") || "16px";

    readerDiv.style.backgroundColor = backgroundColor;
    readerDiv.style.fontFamily = fontFamily;
    readerDiv.style.fontSize = fontSize;
  }
}

if (!document.getElementById("reader-mode")) {
  enableReaderMode();
}
