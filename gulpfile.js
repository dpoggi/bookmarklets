"use strict";

const gulp = require("gulp");
const changed = require("gulp-changed");
const prettydiff = require("gulp-prettydiff");
const injectString = require("gulp-inject-string");
const rimraf = require("gulp-rimraf");

const sourcesGlob = "src/**/*.js";
const buildDir = "build";

exports.clean = function() {
  return gulp.src(buildDir, { read: false })
      .pipe(rimraf());
};

exports.build = function() {
  return gulp.src(sourcesGlob)
      .pipe(changed(buildDir))
      .pipe(prettydiff({ lang: "javascript", mode: "minify" }))
      .pipe(injectString.prepend("javascript:"))
      .pipe(gulp.dest(buildDir));
};

exports.default = exports.build;
