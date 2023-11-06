chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'hello guys',
    id: 'id'
  });
});