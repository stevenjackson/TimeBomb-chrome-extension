var require = require || function() {};
var module = module || {};
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submit').addEventListener("click", function() {
    new TimeBomb()
      .setFor(document.getElementById('timeToClose').value)
      //.blockTabsInLast(1)
      .start();
  });
});
