#!/bin/bash

if [[ ! -f "$1" ]]; then
  printf >&2 "Fatal: first argument must be a file.\n"
  exit 1
fi

if hash pbcopy 2>/dev/null; then
  copy="pbcopy"
elif hash xsel 2>/dev/null; then
  copy="xsel --clipboard --input"
else
  printf >&2 "Fatal: need pbcopy or xsel to copy script to clipboard.\n"
  exit 1
fi

cat "$1" | ${copy}
