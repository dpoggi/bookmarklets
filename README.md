# Bookmarklets

This here's my bookmarklets repository. Comments in .js files more or less
explain what they do.

## Getting Started

```sh
npm i -g gulp
yarn
gulp lint
gulp
```

* The Mobafire script relies on a JS object mapping champion names to IDs.
  To scrape an updated copy of this object and copy it to the clipboard,
  run `scripts/get_champ_ids.rb | scripts/copy_to_pasteboard.sh`.

## Copyright

Copyright (C) 2017 Dan Poggi. MIT License, see LICENSE for details.
