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
  var onlyCheckUnread, unreadIncludesPinned, predicate, pinnedPredicate, els;

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

  function isNotAttachment(el) {
    var classNames;
    classNames = el.className.replace(/[\t\r\n\f]/g, " ").split(" ");
    return classNames.indexOf("kl") === -1;
  }
  function isUnread(el) {
    return el.getElementsByClassName("qG").length > 0;
  }
  function isPinned(el) {
    return el.getElementsByClassName("itemIconPinned").length > 0;
  }
  // Highly Scientific Naming (tm)
  function predicateCombinerer() {
    var args;
    args = Array.prototype.slice.call(arguments);
    return function(el) {
      return args.map(function(p) { return p(el); }).indexOf(false) === -1;
    };
  }

  if (onlyCheckUnread) {
    predicate = predicateCombinerer(isNotAttachment, isUnread);
  } else {
    predicate = predicateCombinerer(isNotAttachment);
  }
  pinnedPredicate = predicateCombinerer(isNotAttachment, isPinned);

  function checkInbox() {
    var count, closedItems, i, openItems;

    // We have to use old-school for loops here or we'll get strange
    // elements in the NodeLists.
    count = 0;
    closedItems = document.getElementsByClassName("jS");
    for (i = 0; i < closedItems.length; i++) {
      if (predicate(closedItems[i])) {
        count += 1;
      } else if (unreadIncludesPinned && pinnedPredicate(closedItems[i])) {
        count += 1;
      }
    }

    if (!onlyCheckUnread) {
      openItems = document.getElementsByClassName("mh");
      for (i = 0; i < openItems.length; i++) {
        count += 1;
      }
    }

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
  els = document.querySelectorAll(".yDSKFc.viy5Tb");
  if (els.length >= 1) {
    window.observer.observe(els[0], window.observerConfig);
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
