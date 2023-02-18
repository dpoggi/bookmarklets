"use strict";

const gulp = require("gulp");
const changed = require("gulp-changed");
const prettydiff = require("gulp-prettydiff");
const injectString = require("gulp-inject-string");
const rename = require("gulp-rename");
const rimraf = require("gulp-rimraf");

const sourcesGlob = "src/**/*.js";
const buildDir = "build";

const clean = exports.clean = () => {
  return gulp
    .src(buildDir, { read: false })
    .pipe(rimraf());
};

const build = exports.build = () => {
  return gulp
    .src(sourcesGlob)
    .pipe(changed(buildDir))
    .pipe(prettydiff({ lang: "javascript", mode: "minify" }))
    .pipe(injectString.prepend("javascript:"))
    .pipe(gulp.dest(buildDir));
};

const buildHTML = exports.buildHTML = () => {
  return gulp
    .src(sourcesGlob)
    .pipe(changed(buildDir))
    .pipe(prettydiff({ lang: "javascript", mode: "minify" }))
    .pipe(injectString.prepend("<script defer>\"use strict\";"))
    .pipe(injectString.append("</script>"))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest(buildDir));
};

exports.default = build;
