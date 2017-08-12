#!/usr/bin/env bash
#
# pbcopy.sh -- cross-platform script to pasteboard a file or stdin
#
# Copyright (C) 2017 Dan Poggi
#
# This software may be modified and distributed under the terms
# of the MIT license. See the LICENSE file for details.

set -eo pipefail

declare -a CMD

if hash pbcopy 2>/dev/null; then
  CMD=(pbcopy)
elif hash xsel 2>/dev/null; then
  CMD=(xsel --pasteboard --input)
else
  printf >&2 "Error: neither pbcopy nor xsel found\n"
  exit 1
fi

if [[ -r "$1" ]] && [[ ! -S "$1" && ! -p "$1" ]]; then
  cat "$1" | "${CMD[@]}"
else
  "${CMD[@]}"
fi
