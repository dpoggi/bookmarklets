// inbox.js -- update Fluid app dock badge for Google Inbox
//
// *NOT A BOOKMARKLET*, requires Safari >= 9 for proper WebKit
// to be used with Fluid.
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function() {
  var mode, predicate, parentEl;

  // MODES
  // Mailbox           badge number = total messages
  // Unread            badge number = unread messages
  // UnreadWithPinned  badge number = unread or pinned messages
  mode = "Mailbox";

  // Since my Fluid app likes to capture Google Docs links no matter
  // what I do...
  if (window.location.host.indexOf("inbox.google.com") === -1) {
    return;
  }

  function updateBadge(badge) {
    window.fluid.dockBadge = badge;
  }
  function isUnread(el) {
    return el.getElementsByClassName("qG").length > 0;
  }
  function isPinned(el) {
    return el.getElementsByClassName("itemIconPinned").length > 0;
  }

  predicate = {
    "Mailbox":          function(el) { return true; },
    "Unread":           isUnread,
    "UnreadWithPinned": function(el) { return isUnread(el) || isPinned(el); },
  }[mode];

  function checkInbox() {
    var items, count;
    items = Array.from(document.getElementsByClassName("top-level-item"));
    count = items.filter(predicate).length;
    updateBadge(count >= 1 ? count : "");
  }

  if (typeof window.disconnectObserver !== "function") {
    window.disconnectObserver = function(event) {
      if (typeof window.observer !== "undefined") {
        window.observer.disconnect();
      }
    }
  }

  window.disconnectObserver();
  updateBadge("");
  window.observer = new MutationObserver(function(mutations) {
    checkInbox();
  });

  parentEl = document.getElementById("Nr");
  if (parentEl !== null) {
    window.observer.observe(parentEl, {
      childList: true,
      attributes: false,
      characterData: false,
      subtree: true,
    });
    checkInbox();
  } else {
    console.log("USERSCRIPT: Couldn't find parent element, dock badging disabled!");
  }

  // For some hope of dock badge predictability when handling multiple
  // tabs (multiple Gmail accounts).
  window.removeEventListener("beforeunload", window.disconnectObserver);
  window.addEventListener("beforeunload", window.disconnectObserver);
  window.removeEventListener("unload", window.disconnectObserver);
  window.addEventListener("unload", window.disconnectObserver);
})();
