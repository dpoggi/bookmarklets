#!/usr/bin/env bash
#
# copy_to_pasteboard.sh -- cross-platform script to pasteboard a file or stdin
#
# Copyright (C) 2015 Dan Poggi
#
# This software may be modified and distributed under the terms
# of the MIT license. See the LICENSE file for details.

set -e

if hash pbcopy 2> /dev/null; then
  CMD=( pbcopy )
elif hash xsel 2> /dev/null; then
  CMD=( xsel --pasteboard --input )
else
  printf >&2 "Error: need pbcopy or xsel to copy to pasteboard.\n"
  exit 1
fi

if [[ -s "$1" ]]; then
  cat "$1" | ${CMD[*]}
else
  ${CMD[*]}
fi
