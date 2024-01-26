browser.menus.create({
  id: "flipper",
  title: "flip video",
  contexts: ["video"],
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "flipper") {
    const tabId = tab.id;
    browser.tabs.sendMessage(tabId, {
      action: "flipVideo",
      targetId: info.targetElementId,
    });
  }
});
