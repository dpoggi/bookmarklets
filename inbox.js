// inbox.js -- update Fluid app dock badge for Google Inbox
//
// *NOT A BOOKMARKLET*, also written in archaic Safari <9 JS,
// because Fluid isn't really maintained anymore and for some
// reason things that should be available in Safari 9 just aren't
// available (looking at you, Array.from).
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function() {
  var els;

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

  if (typeof window.disconnectObserver === "undefined") {
    window.disconnectObserver = function(event) {
      if (typeof window.observer !== "undefined") {
        window.observer.disconnect();
      }
    }
  }

  window.disconnectObserver();
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
    checkInbox();
  } else {
    alert("Couldn't find parent element, dock badging disabled!");
  }

  // For some hope of dock badge predictability when handling multiple
  // tabs (multiple Gmail accounts).
  window.removeEventListener("beforeunload", window.disconnectObserver);
  window.addEventListener("beforeunload", window.disconnectObserver);
  window.removeEventListener("unload", window.disconnectObserver);
  window.addEventListener("unload", window.disconnectObserver);
})();
