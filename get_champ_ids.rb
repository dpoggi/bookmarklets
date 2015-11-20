#!/usr/bin/env ruby

require 'json'
require 'rest-client'

data = RestClient.get('http://www.mobafire.com/league-of-legends/champions').body
matches = data.scan(/\/champion\/([a-z\-]*)-(\d{1,3})/).map { |m| [m[0].gsub('-', ' '), m[1].to_i] }

File.open('champ_ids.json', 'w') do |f|
  f.write(JSON.pretty_generate(Hash[matches]))
end
$stderr.puts "Probably great success! Check champ_ids.json"
