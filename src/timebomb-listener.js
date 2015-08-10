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
    chrome.windows.remove(windowId, errorSwallower);
  });
}

function blockTabListener(tab) {
  windowId(function(windowId) {
    if(tab.windowId == windowId) {
      chrome.tabs.remove(tab.id, errorSwallower);
    }
  });
}

function errorSwallower() {
  chrome.runtime.lastError;
}

function showSnoozeNotification() {
    var id = 'TimeBomb-SnoozeNotification';
    var opts = {
      type: 'basic',
      title: '2 minute warning',
      message: 'Time is almost up!',
      buttons: [{title: 'Snooze for 5 minutes'}],
      iconUrl: 'boom.png'
    };
    chrome.notifications.create(id, opts);

    chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
      if(notificationId === id) {
        snooze();
      }
    });
}

function snooze() {
  chrome.alarms.create('TimeBomb-CloseTime', { delayInMinutes: 5 });
}

chrome.alarms.onAlarm.addListener(function(alarm) {
  if(alarm.name === 'TimeBomb-CloseTime') {
    boom();
  } else if(alarm.name === 'TimeBomb-BlockTabs') {
    chrome.tabs.onCreated.addListener(blockTabListener);
  } else if(alarm.name === 'TimeBomb-Warning') {
    showSnoozeNotification();
  }
});
