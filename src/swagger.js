// swagger.js -- select the entirety of a JSON response in swagger-ui
//
// Copyright (C) 2016-2023 Dan Poggi
//
// This software may be modified and distributed under the terms of the
// BSD Zero Clause License. See the LICENSE file for details.

var node, range;

node = window.getSelection().anchorNode;

while (node.tagName !== "PRE" && node.tagName !== "DIV") {
  node = node.parentElement;
}

range = document.createRange();
range.selectNode(node);

window.getSelection().removeAllRanges();
window.getSelection().addRange(range);
