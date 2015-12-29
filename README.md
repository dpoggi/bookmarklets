# Bookmarklets

This here's muh bookmarklets repository. Comments in .js files more or less explain what they do.

# Tooling

* Just about everything is a `make` target.
* Run `make setup` to install npm packages first! None of this will work without `prettydiff` installed in `./node_modules`.
* `make` or `make all` will build scriptname.browser.js files from scriptname.js files. scriptname.browser.js files contain javascript:minifiedbookmarkletcode() for easy pasting into your browser bookmarks.
* `make scriptname` will ensure that scriptname.browser.js is compiled and up-to-date, then copy it to the clipboard using pbcopy on Mac or xsel on Linux (make sure xsel is installed!).
* The Mobafire script relies on a JS object mapping champion names to IDs. To scrape an updated copy of this object and copy it to the clipboard, run `./get_champ_ids.rb | ./copy_to_clipboard.sh`.

# Copyright

Copyright (C) 2015 Dan Poggi. MIT License, see LICENSE for details.
