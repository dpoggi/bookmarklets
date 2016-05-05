(function() {
  var node, range;

  node = window.getSelection().anchorNode;
  while (node.tagName !== "PRE" && node.tagName !== "DIV") {
    node = node.parentElement;
  }

  range = document.createRange();
  range.selectNode(node);

  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
})();
