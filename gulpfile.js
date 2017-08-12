"use strict";

const gulp = require("gulp");
const changed = require("gulp-changed");
const prettydiff = require("gulp-prettydiff");
const inject = require("gulp-inject-string");
const jscs = require("gulp-jscs");
const rimraf = require("gulp-rimraf");

const sourcesGlob = "src/**/*.js";
const buildDir = "build";

gulp.task("clean", () => {
  return gulp.src(buildDir, { read: false })
      .pipe(rimraf());
});

gulp.task("lint", () => {
  return gulp.src(sourcesGlob)
      .pipe(jscs())
      .pipe(jscs.reporter());
});

gulp.task("build", () => {
  return gulp.src(sourcesGlob)
      .pipe(changed(buildDir))
      .pipe(prettydiff({ lang: "javascript", mode: "minify" }))
      .pipe(inject.prepend("javascript:"))
      .pipe(gulp.dest(buildDir));
});

gulp.task("default", ["build"]);
