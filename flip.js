browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "flipVideo") {
    let elem = browser.menus.getTargetElement(message.targetId);
    elem.style.transform = elem.style.transform.includes("scaleX(-1)")
      ? "scaleX(1)"
      : "scaleX(-1)";
  }
  if (message.action === "tabChanged") {
    flipdiv.style.display = "none";
  }
});

let flipdiv;
let flag = false;

document.addEventListener("contextmenu", (event) => {
  if (event.target.tagName === "VIDEO") {
    flag = true;
  }
  const ytcontextmenu = document.querySelector("div.ytp-contextmenu");
  if (ytcontextmenu && ytcontextmenu.style.display !== "none") {
    flag = true;
    event.target = document.querySelector("video.html5-main-video");
  }
  if (flag) {
    if (!flipdiv) {
      createFlip(event.clientX, event.clientY, event.target);
      flipdiv.style.removeProperty("display");
    } else {
      flipdiv.style.removeProperty("display");
      flipdiv.style.top = `${event.clientY}px`;
      flipdiv.style.left = `${event.clientX - 80}px`;
    }
    event.target.addEventListener("pause", () => {
      if (flipdiv) {
        flipdiv.style.display = "none";
      }
    });
    event.target.addEventListener("play", () => {
      if (flipdiv) {
        flipdiv.style.display = "none";
      }
    });
  } else {
    if (flipdiv) {
      flipdiv.style.display = "none";
    }
  }
});

const createFlip = (clientX, clientY, video) => {
  const fdiv = document.createElement("div");
  const img = document.createElement("img");
  const manifest = browser.runtime.getManifest();
  img.src = manifest.icons[48];
  img.alt = "flip video";
  img.style.width = "48px";
  fdiv.addEventListener("click", () => {
    video.style.transform = video.style.transform.includes("scaleX(-1)")
      ? "scaleX(1)"
      : "scaleX(-1)";
  });
  fdiv.addEventListener("mouseenter", () => {
    fdiv.style.backgroundColor = "#52535e";
  });
  fdiv.addEventListener("mouseleave", () => {
    fdiv.style.backgroundColor = "#2e2e36";
  });
  fdiv.tabIndex = "-2";
  fdiv.className = "flip-button-extension-custom";
  fdiv.style.backgroundColor = "#2e2e36";
  fdiv.style.padding = "5px";
  fdiv.style.borderRadius = "5px";
  fdiv.style.border = "solid 7px #2e2e36";
  fdiv.style.display = "none";
  fdiv.style.position = "absolute";
  fdiv.style.top = `${clientY}px`;
  fdiv.style.left = `${clientX - 80}px`;
  fdiv.appendChild(img);
  document.body.appendChild(fdiv);

  flipdiv = fdiv;
};

document.addEventListener("keyup", function (event) {
  if (event.key === "Escape") {
    if (flipdiv) {
      flipdiv.style.display = "none";
    }
  }
});

document.addEventListener("click", function (event) {
  if (flipdiv) {
    flipdiv.style.display = "none";
  }
});

document.addEventListener("dblclick", function (event) {
  if (flipdiv) {
    flipdiv.style.display = "none";
  }
});

document.addEventListener("focus", function (event) {
  if (flipdiv) {
    flipdiv.style.display = "none";
  }
});
