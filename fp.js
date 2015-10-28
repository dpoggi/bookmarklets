(function () {
  var els, el, i;

  if (window.location.host.indexOf("foreignpolicy.com") !== -1) {
    els = ["TB_overlay", "TB_window"];
    for (i in els) {
      el = document.getElementById(els[i]);
      if (el !== null) {
        el.parentElement.removeChild(el);
      }
    }
    document.body.className = "tb-enabled";
  }
})();
