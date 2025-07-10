#!/usr/bin/env ruby
require 'yaml'
require 'fileutils'

# Path to your _posts directory
posts_dir = "_posts"
# Path to your tag pages directory
tags_dir = "tag"

FileUtils.mkdir_p(tags_dir)

# Collect all tags from posts
all_tags = []

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

all_tags.uniq.each do |tag|
  filename = File.join(tags_dir, "#{tag.downcase.gsub(' ', '-')}.md")
  next if File.exist?(filename)
  File.open(filename, "w") do |f|
    f.puts <<~MARKDOWN
      ---
      layout: tag
      title: "Alle posts met de tag '#{tag}'"
      permalink: /tag/#{tag.downcase.gsub(' ', '-')}/
      header: false
      ---

      <div class="tag-post-list">
      {% assign tagname = page.name | split: '.' | first %}
      {% assign tagged_posts = site.posts | where_exp: "post", "post.tags contains tagname" %}
          {% for post in tagged_posts %}
              <a href="{{ post.url | relative_url }}" class="tag-post-item-link" style="text-decoration: none; color: inherit;">
                  <div class="tag-post-item" style="display: flex; align-items: flex-start; margin-bottom: 2em;">
                      <div class="tag-post-teaser" style="flex: 0 0 120px; margin-right: 1em; border-radius: 4px;">
                          <img src="{{ post.teaser | default: '/assets/images/bull200px.webp' }}" alt="Teaser" style="max-width: 120px; height: auto; display: block;">
                      </div>
                      <div class="tag-post-content" style="flex: 1 1 0%;">
                          <h2 style="margin-top:0;">
                              {{ post.title }}
                          </h2>
                          <div class="tag-post-date" style="color: #888; font-size: 0.9em; margin-bottom: 0.5em;">
                              <i class="fas fa-fw fa-calendar-alt" aria-hidden="true"></i>
                              {{ post.date | date: "%b %-d, %Y" }}
                          </div>
                          <p>{{ post.excerpt | strip_html | truncatewords: 40 }}</p>
                      </div>
                  </div>
              </a>
          {% endfor %}
      </div>
    MARKDOWN
  end
  puts "Created #{filename}"
end

