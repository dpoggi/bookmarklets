#!/bin/bash

pushd "$(dirname "${BASH_SOURCE}")" >/dev/null
project_root="$(pwd -P)"
popd >/dev/null

prettydiff_dir="${project_root}/node_modules/prettydiff"
[[ -d "${prettydiff_dir}" ]] || exit 1

cli_js="${prettydiff_dir}/api/node-local.js"
cli_js_new="${prettydiff_dir}/api/node-local-new.js"

sed -e "s/enderflag[ ]*=[ ]*false/enderflag = true/" "${cli_js}" >"${cli_js_new}"
if [[ "$?" = "0" ]]; then
  mv "${cli_js_new}" "${cli_js}"
fi
