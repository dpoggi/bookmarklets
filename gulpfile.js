"use strict";

const gulp = require("gulp");
const { dest } = gulp;
const prettydiff = require("gulp-prettydiff");
const { append, prepend } = require("gulp-inject-string");
const rename = require("gulp-rename");
const rimraf = require("gulp-rimraf");

const sourcesGlob = "src/**/*.js";
const buildDir = "build";

exports.clean = () => {
  return gulp
    .src(buildDir, { read: false })
    .pipe(rimraf());
};

exports.build = () => {
  return gulp
    .src(sourcesGlob)
    .pipe(prettydiff({ lang: "javascript", mode: "minify" }))
    .pipe(prepend("javascript:"))
    .pipe(dest(buildDir));
};

exports["build-html"] = () => {
  return gulp
    .src(sourcesGlob)
    .pipe(prettydiff({ lang: "javascript", mode: "minify" }))
    .pipe(prepend("<script defer>\"use strict\";"))
    .pipe(append("</script>"))
    .pipe(rename({ extname: ".html" }))
    .pipe(dest(buildDir));
};

exports.default = exports.build;
