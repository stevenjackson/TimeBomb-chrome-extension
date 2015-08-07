var windowId;
function setup() {
  document.getElementById('submit').addEventListener("click", function() {
    chrome.windows.getCurrent(function(window) {
      windowId = window.id;
    });

    var delayTime = document.getElementById('timeUntilClose').value;
    delayTime = parseInt(delayTime);
      console.log('setting alarm to', delayTime);
    chrome.alarms.create("CloseTime", { delayInMinutes: delayTime});
    chrome.alarms.onAlarm.addListener(function (alarm) {
      console.log('alarmin', alarm);
      chrome.windows.remove(windowId);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  setup();
});
