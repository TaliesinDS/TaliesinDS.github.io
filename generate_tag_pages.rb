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
              <a href="{{ post.url | relative_url }}" class="tag-post-item-link">
                  <div class="tag-post-item">
                      <div class="tag-post-teaser">
                          <img src="{{ post.teaser | default: '/assets/images/bull200px.webp' }}" alt="Teaser" class="tag-post-img">
                      </div>
                      <div class="tag-post-content">
                          <h2 class="tag-post-title">
                              {{ post.title }}
                          </h2>
                          <div class="tag-post-date">
                              <span class="icon-calendar" aria-hidden="true">{% include icons/fontawesome/calendar-days.svg %}</span>
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

