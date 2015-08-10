var blockTabFlag = false;

function windowId(callback) {
  return chrome.storage.local.get('timebombWindowId', function(data) {
    callback(data.timebombWindowId);
  });
}

function clearWindowId() {
  chrome.storage.local.remove('timebombWindowId');
}

function closeWindow() {
  blockTabFlag = false;
  windowId(function(windowId) {
    chrome.windows.remove(windowId, function() { chrome.runtime.lastError });
  });
}

function blockTabs(tab) {
  if(!blockTabFlag) return;
  windowId(function(windowId) {
    if(tab.windowId == windowId) {
      chrome.tabs.remove(tab.id);
    }
  });
}

chrome.alarms.onAlarm.addListener(function(alarm) {
  if(alarm.name === 'TimeBomb-CloseTime') {
    closeWindow();
  } else if(alarm.name === 'TimeBomb-BlockTabs') {
    blockTabFlag = true;
  }
});

chrome.tabs.onCreated.addListener(function(tab) {
  blockTabs(tab);
});
