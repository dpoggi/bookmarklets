// inbox.js -- update Fluid app dock badge for Google Inbox
//
// *NOT A BOOKMARKLET*, requires Safari >= 9 for proper WebKit
// to be used with Fluid.
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

// Dock Badge Modes
//
// Mailbox           badge number = total messages
// Unread            badge number = unread messages
// UnreadWithPinned  badge number = unread or pinned messages
//
var dockBadgeMode = "Mailbox";

(function(mode) {
  var parentElement, predicate;

  function updateBadge(badge) {
    if (typeof window.fluid !== "undefined") {
      window.fluid.dockBadge = badge;
    }
  }

  function disconnectObserver() {
    if (typeof window.observer === "object") {
      window.observer.disconnect();
    }
    updateBadge("");
  }

  function checkInbox(predicate) {
    var items, count;
    items = [].slice.call(document.getElementsByClassName("top-level-item"));
    count = items.filter(predicate).length;
    updateBadge(count >= 1 ? count : "");
  }

  function isUnread(el) {
    return el.getElementsByClassName("qG").length > 0;
  }

  function isPinned(el) {
    return el.getElementsByClassName("itemIconPinned").length > 0;
  }

  // Since my Fluid app likes to capture Google Docs links no matter
  // what I do...
  if (window.location.host.indexOf("inbox.google.com") === -1) {
    return;
  }

  parentElement = document.getElementById("Nr");
  if (parentElement === null) {
    console.log("USERSCRIPT: Couldn't find parent element, dock badging disabled!");
    return;
  }

  predicate = {
    "Mailbox": function() {
      return true;
    },
    "Unread": isUnread,
    "UnreadWithPinned": function(el) {
      return isUnread(el) || isPinned(el);
    },
  }[mode];

  disconnectObserver();
  checkInbox(predicate);

  window.observer = new MutationObserver(function() {
    checkInbox(predicate);
  });
  window.observer.observe(parentElement, {
    childList: true,
    attributes: false,
    characterData: false,
    subtree: true,
  });

  // For some hope of dock badge predictability when handling multiple
  // tabs (multiple Gmail accounts).
  window.removeEventListener("beforeunload", disconnectObserver);
  window.addEventListener("beforeunload", disconnectObserver);
  window.removeEventListener("unload", disconnectObserver);
  window.addEventListener("unload", disconnectObserver);
})(dockBadgeMode);
