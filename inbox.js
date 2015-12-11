// inbox.js -- update Fluid app dock badge for Google Inbox
// *NOT A BOOKMARKLET*
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

function updateBadge(badge) {
  window.fluid.dockBadge = badge;
}

function checkInbox() {
  var count, closedItems, i, openItems;

  count = 0;

  // We have to use old-school for loops here or we'll get strange
  // elements in the NodeLists.

  closedItems = document.getElementsByClassName("jS");
  for (i = 0; i < closedItems.length; i++) {
    if ((" " + closedItems[i].className + " ").indexOf(" kl ") === -1) {
      count += 1;
    }
  }

  openItems = document.getElementsByClassName("mh");
  for (i = 0; i < openItems.length; i++) {
    count += 1;
  }

  if (count >= 1) {
    updateBadge(count);
  } else {
    updateBadge("");
  }
}

function disconnectObserver() {
  if (typeof window.observer !== "undefined") {
    window.observer.disconnect();
  }
}

var els;

disconnectObserver();
window.observer = new MutationObserver(function(mutations) {
  checkInbox();
});
window.observerConfig = {
  childList: true,
  attributes: false,
  characterData: false,
  subtree: true,
};

updateBadge("");
els = document.querySelectorAll(".yDSKFc.viy5Tb");
if (els.length >= 1) {
  window.observer.observe(els[0], window.observerConfig);
}
checkInbox();

window.addEventListener("beforeunload", disconnectObserver);
window.addEventListener("unload", disconnectObserver);
