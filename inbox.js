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
  var onlyCheckUnread, unreadIncludesPinned, predicate, parentEl;

  // If you want the dock badge to only count unread emails instead of
  // all of them (Mailbox behavior), set this to true. I like it the
  // Mailbox way.
  onlyCheckUnread = false;
  // If ya set the above option to true, do you want that number to
  // include messages you've pinned? Something tells me you might.
  unreadIncludesPinned = true;

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

  if (onlyCheckUnread && unreadIncludesPinned) {
    predicate = function(el) { return isUnread(el) || isPinned(el); };
  } else if (onlyCheckUnread) {
    predicate = isUnread;
  } else {
    predicate = function(el) { return true; };
  }

  function checkInbox() {
    var items, count;

    items = Array.from(document.getElementsByClassName("top-level-item"));
    count = items.filter(function(item) { return predicate(item); }).length;

    if (count >= 1) {
      updateBadge(count);
    } else {
      updateBadge("");
    }
  }

  if (typeof window.disconnectObserver !== "function") {
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

  parentEl = document.getElementById("Nr");
  if (parentEl !== null) {
    window.observer.observe(parentEl, window.observerConfig);
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
