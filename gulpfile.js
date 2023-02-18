import { deleteAsync } from "del";

import gulp from "gulp";
const { src, dest } = gulp;
import injectString from "gulp-inject-string";
const { append, prepend } = injectString;
import prettydiff from "gulp-prettydiff";
import rename from "gulp-rename";

const sourcesGlob = "src/**/*.js";
const buildDir = "build";

const clean = () => deleteAsync(buildDir);

const build = () => {
  return src(sourcesGlob)
    .pipe(prettydiff({ lang: "javascript", mode: "minify" }))
    .pipe(prepend("javascript:(function(){\"use strict\";"))
    .pipe(append("})();"))
    .pipe(dest(buildDir));
};

const buildHTML = () => {
  return src(sourcesGlob)
    .pipe(prettydiff({ lang: "javascript", mode: "minify" }))
    .pipe(prepend("<script defer>(function(){\"use strict\";"))
    .pipe(append("})();</script>"))
    .pipe(rename({ extname: ".html" }))
    .pipe(dest(buildDir));
};

export { clean, build, buildHTML as "build-html" };
export default build;
