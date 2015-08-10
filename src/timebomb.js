var moment = require('../src/moment.min.js');

function TimeBomb() {
}
TimeBomb.prototype.setFor = function(time) {
  chrome.windows.getCurrent(function(window) {
    chrome.storage.local.set({'timebombWindowId': window.id});
  });
  this.closeTime = TimeBomb.minutesUntil(time);
  return this;
};

TimeBomb.minutesUntil = function(time) {
  var endTime = moment(time, "HH:mm a");
  var now = moment();
  if(endTime.isBefore(now)) {
    endTime = endTime.add(1, 'day');
  }
  var diff = endTime.diff(now, 'seconds');
  return diff / 60;
}

TimeBomb.prototype.start = function() {
  chrome.alarms.create("TimeBomb-CloseTime", { delayInMinutes: this.closeTime});
  return this;
};

TimeBomb.prototype.blockTabsInLast = function(minutes) {
  if(!minutes) return this;

  var blockTime = this.closeTime - parseInt(minutes);
  if(blockTime < 0) {
    blockTime = .1;
  }

  chrome.alarms.create("TimeBomb-BlockTabs", { delayInMinutes: blockTime });
  return this;
};

module.exports = TimeBomb;
