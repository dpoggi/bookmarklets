#!/usr/bin/env ruby
#
# get_champ_ids.rb -- scrape Mobafire for champion name -> ID mapping
#
# Copyright (C) 2017 Dan Poggi
#
# This software may be modified and distributed under the terms
# of the MIT license. See the LICENSE file for details.

require 'net/http'
require 'json'

html_blob = Net::HTTP.get('www.mobafire.com', '/league-of-legends/champions')

matches = html_blob.scan(/\/champion\/([a-z\-]*)-(\d{1,3})/).map do |match|
  [match[0].gsub('-', ' '), match[1].to_i]
end

STDOUT.write(JSON.pretty_generate(Hash[matches]))

if STDOUT.tty?
  STDERR.puts "\n\nSuccess! Pipe to scripts/copy_to_pasteboard.sh to copy champion IDs as JSON."
else
  STDERR.puts "Success! Check the clipboard!"
end
