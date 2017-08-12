#!/usr/bin/env bash
#
# copy_to_pasteboard.sh -- cross-platform script to pasteboard a file or stdin
#
# Copyright (C) 2017 Dan Poggi
#
# This software may be modified and distributed under the terms
# of the MIT license. See the LICENSE file for details.

set -eo pipefail

main() {
  local -a cmd

  if hash pbcopy 2>/dev/null; then
    cmd=(pbcopy)
  elif hash xsel 2>/dev/null; then
    cmd=(xsel --pasteboard --input)
  else
    printf >&2 "Error: neither pbcopy nor xsel found\n"
    return 1
  fi

  if [[ -r "$1" ]]; then
    cat "$1" | "${cmd[@]}"
  else
    "${cmd[@]}"
  fi
}

main "$@"
