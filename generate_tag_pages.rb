#!/usr/bin/env ruby
require 'yaml'
require 'fileutils'

# Paths to your _posts directories for each language
post_dirs = ["_posts/en", "_posts/nl"]
# Path to your tag pages directory
tags_dir = "tag"

FileUtils.mkdir_p(tags_dir)

# Collect all tags from posts
all_tags = []

post_dirs.each do |posts_dir|
  Dir.glob("#{posts_dir}/*.*") do |post_file|
    content = File.read(post_file)
    if content =~ /\A---\s*\n(.*?)\n---/m
      front_matter = YAML.safe_load($1)
      tags = front_matter["tags"]
      if tags.is_a?(String)
        tags = tags.split # splits on whitespace
      end
      all_tags.concat(tags) if tags
    end
  end
end

all_tags.uniq.each do |tag|
  filename = File.join(tags_dir, "#{tag.downcase.gsub(' ', '-')}.md")
  next if File.exist?(filename)
  File.open(filename, "w") do |f|
    f.puts <<~MARKDOWN
      ---
      layout: tag
      title: "Alle posts met de tag '#{tag}'"
      permalink: /:lang/tag/#{tag.downcase.gsub(' ', '-')}/
      header: false
      tagname: #{tag}
      ---
    MARKDOWN
  end
  puts "Created #{filename}"
end