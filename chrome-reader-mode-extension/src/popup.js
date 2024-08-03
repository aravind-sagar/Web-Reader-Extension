document.getElementById("toggleReaderMode").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: toggleReaderMode,
    });
  });
});

document.getElementById("background").addEventListener("change", (event) => {
  setReaderOption("backgroundColor", event.target.value);
});

document.getElementById("font").addEventListener("change", (event) => {
  setReaderOption("fontFamily", event.target.value);
});

document.getElementById("fontSize").addEventListener("change", (event) => {
  setReaderOption("fontSize", event.target.value + "px");
});

function setReaderOption(key, value) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (key, value) => {
        localStorage.setItem(key, value);
        applyReaderOptions();
      },
      args: [key, value],
    });
  });
}

function toggleReaderMode() {
  if (!document.getElementById("reader-mode")) {
    const articleContent = document.querySelector("article") || document.body;
    const readerDiv = document.createElement("div");
    readerDiv.id = "reader-mode";
    readerDiv.innerHTML = articleContent.innerHTML;
    document.body.innerHTML = "";
    document.body.appendChild(readerDiv);
    applyReaderOptions();
  } else {
    location.reload();
  }
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
