# Bookmarklets

This here's my bookmarklets repository. Comments in `.js` files more or less
explain what they do.

## Builds

Up-to-date-ish builds are kept at:

https://files.danpoggi.com/bookmarklets/

## Getting Started

```sh
yarn
npm run build
```

* The Mobafire script relies on a JS object mapping champion names to IDs.
  To scrape an updated copy of this object and append it to `mobafire.js`,
  run `scripts/scrape_champ_ids.js >>src/mobafire.js`.

## License

[BSD Zero Clause License](https://spdx.org/licenses/0BSD.html)

## Copyright

Copyright &copy; 2015&ndash;2023 Dan Poggi
