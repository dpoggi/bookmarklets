"use strict";

const gulp = require("gulp"),
      changed = require("gulp-changed"),
      prettydiff = require("gulp-prettydiff"),
      inject = require("gulp-inject-string"),
      jscs = require("gulp-jscs"),
      rimraf = require("gulp-rimraf");

const paths = {
  src: "src/**/*.js",
  build: "build",
};

gulp.task("default", () => {
  return gulp.src(paths.src)
    .pipe(changed(paths.build))
    .pipe(prettydiff({
      lang: "javascript",
      mode: "minify",
    }))
    .pipe(inject.prepend("javascript:"))
    .pipe(gulp.dest(paths.build));
});

gulp.task("lint", () => {
  return gulp.src(paths.src)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task("clean", () => {
  return gulp.src(paths.build, { read: false })
    .pipe(rimraf());
});
