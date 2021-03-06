#!/usr/bin/env node
"use strict";
/*
 * scrape_champ_ids.js -- scrape Mobafire for champion name -> ID mapping
 *
 * Copyright (C) 2017 Dan Poggi
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

const https = require("https");

https.get("https://www.mobafire.com/league-of-legends/champions", (response) => {
  const { statusCode } = response;
  const contentType = response.headers["content-type"];

  if (statusCode < 200 || statusCode >= 300) {
    throw new Error(`HTTP request failed (or redirected) with status ${statusCode}`);
  } else if (!/text\/html/.test(contentType)) {
    throw new Error(`HTTP request failed with invalid Content-Type ${contentType}`);
  }

  let html = "";

  response.setEncoding("utf8");

  response.on("data", (chunk) => { html += chunk; });

  response.on("end", () => {
    const ids = {};
    const re = /\/champion\/([a-z\-]+)-(\d{1,3})/g;

    for (let match = re.exec(html); match != null; match = re.exec(html)) {
      const name = match[1].replace("-", " ");
      const id = Number.parseInt(match[2]);

      ids[name] = id;
    }

    const json = JSON.stringify(ids, undefined, 4);
    const declaration = `  ids = ${json.replace(/"([a-z]+)"/g, "$1").replace("}", "  };")}\n`;
    process.stdout.write(declaration);

    if (process.stdout.isTTY) {
      console.error("\nSuccess! Redirect (>>) to src/mobafire.js to append champ IDs.");
    } else {
      console.error("Success! Check src/mobafire.js!");
    }
  });
});
