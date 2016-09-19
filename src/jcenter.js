// jcenter.js -- jump to a given package on JCenter
//
// Copyright (C) 2016 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function() {
  var baseUrl, groupId, artifactId;

  baseUrl = "https://bintray.com/bintray/jcenter";

  groupId = prompt("Group ID:");
  if (groupId === null || groupId === "") {
    alert("Invalid group ID.");
    return;
  }

  artifactId = prompt("Artifact ID:");
  if (artifactId === null || artifactId === "") {
    alert("Invalid artifact ID.");
    return;
  }

  window.location.assign(baseUrl + "/" + groupId + ":" + artifactId);
}());
