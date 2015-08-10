function windowId(callback) {
  return chrome.storage.local.get('timebombWindowId', function(data) {
    callback(data.timebombWindowId);
  });
}

function clearWindowId() {
  chrome.storage.local.remove('timebombWindowId');
}

function boom() {
  chrome.tabs.onCreated.removeListener(blockTabListener);
  closeWindow();
}

function closeWindow() {
  windowId(function(windowId) {
    chrome.windows.remove(windowId, function() { chrome.runtime.lastError });
  });
}

function blockTabListener(tab) {
  windowId(function(windowId) {
    if(tab.windowId == windowId) {
      chrome.tabs.remove(tab.id);
    }
  });
}

chrome.alarms.onAlarm.addListener(function(alarm) {
  if(alarm.name === 'TimeBomb-CloseTime') {
    boom();
  } else if(alarm.name === 'TimeBomb-BlockTabs') {
    chrome.tabs.onCreated.addListener(blockTabListener);
  }
});
