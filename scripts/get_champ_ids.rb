#!/usr/bin/env ruby
#
# get_champ_ids.rb -- scrape Mobafire for champion name -> ID mapping
#
# Copyright (C) 2015 Dan Poggi
#
# This software may be modified and distributed under the terms
# of the MIT license. See the LICENSE file for details.

require 'net/http'
require 'json'

data = Net::HTTP.get('www.mobafire.com', '/league-of-legends/champions')
regexp = /\/champion\/([a-z\-]*)-(\d{1,3})/
matches = data.scan(regexp).map do |match|
  [match[0].gsub('-', ' '), match[1].to_i]
end

$stdout.write(JSON.pretty_generate(Hash[matches]))
if $stdout.tty?
  $stderr.puts "\n\nSuccess! Pipe to scripts/copy_to_pasteboard.sh to copy champion IDs as JSON."
else
  $stderr.puts "Success! Check the clipboard!"
end
