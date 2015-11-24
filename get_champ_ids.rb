#!/usr/bin/env ruby

require 'bundler/setup'
require 'rest-client'

data = RestClient.get('http://www.mobafire.com/league-of-legends/champions').body
regexp = /\/champion\/([a-z\-]*)-(\d{1,3})/
matches = data.scan(regexp).map do |match|
  [match[0].gsub('-', ' '), match[1].to_i]
end

$stdout.write(JSON.pretty_generate(Hash[matches]))
if $stdout.tty?
  $stderr.puts "\n\nGreat success! Pipe to ./copy_to_clipboard.sh to copy champion IDs as JSON."
else
  $stderr.puts "Great success! Check the clipboard!"
end
