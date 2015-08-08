var moment = require('../src/moment.min.js');

function TimeBomb() {
}
TimeBomb.prototype.setFor = function(time) {
  chrome.windows.getCurrent(function(window) {
    this.windowId = window.id;
  }.bind(this));
  this.closeTime = TimeBomb.minutesUntil(time);
  return this;
};

TimeBomb.minutesUntil = function(time) {
  var endTime = moment(time, "HH:mm a");
  var now = moment();
  if(endTime.isBefore(now)) {
    endTime = endTime.add(1, 'day');
  }
  var diff = endTime.diff(now, 'minutes');
  //moment is very precise in its calculation
  //if you have 119 seconds until close, that's 1 minute.
  return diff + 1;
}

TimeBomb.prototype.start = function() {
  console.log('setting alarm to', this.closeTime);
  chrome.alarms.create("CloseTime", { delayInMinutes: this.closeTime});
  chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log('alarmin', alarm);
    chrome.windows.remove(this.windowId);
  }.bind(this));
  return this;
};

TimeBomb.prototype.blockNewTabs = function() {
  chrome.tabs.onCreated.addListener(function(tab) {
    console.log('tab created');
    chrome.tabs.remove(tab.id);
  });
};

module.exports = TimeBomb;
