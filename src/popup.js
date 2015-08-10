var require = require || function() {};
var module = module || {};
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submit').addEventListener("click", function() {
    new TimeBomb()
      .setFor(document.getElementById('timeToClose').value)
      .blockTabsInLast(document.getElementById('blockTime').value)
      .start();

    window.close();
  });
});
