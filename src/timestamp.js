// timestamp.js -- generate a Unix timestamp from a date string
//
// Copyright (C) 2016-2023 Dan Poggi
//
// This software may be modified and distributed under the terms of the
// BSD Zero Clause License. See the LICENSE file for details.

(function() {
  var dateString, date, timestamp;

  dateString = prompt("Enter ISO 8601 date (like 2016-06-01T14:25:30Z):");
  date = new Date(dateString);
  timestamp = Number(date);

  if (dateString === null || dateString === "" || !isFinite(timestamp)) {
    alert("Invalid ISO 8601 date.");
    return;
  }

  prompt("Timestamp:", "" + (timestamp / 1000));
}());
