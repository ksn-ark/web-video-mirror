browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "flipVideo") {
    let elem = browser.menus.getTargetElement(message.targetId);
    elem.style.transform = elem.style.transform.includes("scaleX(-1)")
      ? "scaleX(1)"
      : "scaleX(-1)";
  }
});
