// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.create({
    url: chrome.extension.getURL("options.html")
  })
});
