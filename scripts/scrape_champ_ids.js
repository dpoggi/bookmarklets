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

const fs = require("fs");
const https = require("https");
const readline = require("readline");
const { URL } = require("url");

const srcPath = (() => {
  const path = require("path");
  const projectDir = path.resolve(process.mainModule.filename, "..", "..");
  return path.join(projectDir, "src", "mobafire.js");
})();

function fetchHtml(path, baseUrl) {
  return new Promise((resolve, reject) => {
    https.get(new URL(path, baseUrl), (response) => {
      if (response.statusCode < 200 || response.statusCode >= 300) {
        reject("HTTP " + response.statusCode + " " + response.statusMessage);
        return;
      }
      if (!/text\/html/.test(response.headers["content-type"])) {
        reject(`Invalid Content-Type ${response.headers["content-type"]}`);
        return;
      }

      let html = "";

      response.setEncoding("utf8");
      response.on("readable", () => { html += response.read(); });
      response.on("end", () => { resolve(html); });
    });
  });
}

function replaceChunk(options) {
  const { path, beginPattern, endPattern, replacement } = options;

  const rl = readline.createInterface({
    terminal: false,
    historySize: 0,
    prompt: "",
    crlfDelay: Infinity,
    input: fs.createReadStream(path)
  });

  let ignoreInput = false;
  rl.on("line", (line) => {
    if (beginPattern.test(line)) {
      ignoreInput = true;
      dest.write(replacement);
      return;
    } else if (ignoreInput && endPattern.test(line)) {
      ignoreInput = false;
      return;
    } else if (ignoreInput) {
      return;
    }
    dest.write(line);
    dest.write("\n");
  })
  .on("close", () => {
    dest.end();

    if (fs.existsSync(paths.dest)) {
      fs.unlinkSync(paths.src);
      fs.linkSync(paths.dest, paths.src);
      fs.unlinkSync(paths.dest);
    }
  });
}

fetchHtml("/league-of-legends/champions", "https://www.mobafire.com")
  .then((html) => {
    const champIds = {};

    const regexp = /\/champion\/([a-z\-]+)-(\d{1,3})/g;
    for (let match = regexp.exec(html); match != null; match = regexp.exec(html)) {
      const name = match[1].replace("-", " ");
      const id = Number.parseInt(match[2]);
      champIds[name] = id;
    }

    return champIds;
  })
  .then(champIds => JSON.stringify(champIds, undefined, 4))
  .then(json => json.replace(/"([a-z]+)"/g, "$1").replace("}", "  }"))
  .then(literal => `  ids = ${literal};\n`)
  .then((expression) => {
    console.log(expression);
    // replaceChunk({
    //   path: srcPath,
    //   beginPattern: /ids = {$/,
    //   endPattern: /};$/,
    //   replacement: expression
    // });
  })
  .then(() => { console.log("Success! Check src/mobafire.js!"); })
  .catch((err) => {
    throw new Error(err);
  });
