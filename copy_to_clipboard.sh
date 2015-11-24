#!/bin/bash
# copy_to_clipboard.sh -- cross-platform script to clipboard a file or stdin
#
# Copyright (C) 2015 Dan Poggi
#
# This software may be modified and distributed under the terms
# of the MIT license. See the LICENSE file for details.

if hash pbcopy 2>/dev/null; then
  copy_cmd="pbcopy"
elif hash xsel 2>/dev/null; then
  copy_cmd="xsel --clipboard --input"
else
  printf >&2 "Fatal: need pbcopy or xsel to copy to clipboard.\n" "$1"
  exit 1
fi

[[ -f "$1" ]] && cat "$1" | ${copy_cmd} || ${copy_cmd}
