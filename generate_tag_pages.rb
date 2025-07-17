#!/usr/bin/env ruby
require 'yaml'
require 'fileutils'

begin
  puts "Script started"

  posts_dir = "_posts"
  tags_dir = "tag"

  FileUtils.mkdir_p(tags_dir)

  all_tags = []
  post_files = Dir.glob("#{posts_dir}/*.*")
  puts "Found #{post_files.length} post files in #{posts_dir}"
  if post_files.empty?
    puts "No post files found. Exiting."
    exit
  end

  post_files.each do |post_file|
    content = File.read(post_file)
    front_matter_block = nil
    if content =~ /\A---\s*\r?\n(.*?)\r?\n---/m
      front_matter_block = $1
    elsif content =~ /\A---\s*\n(.*?)\n---/m
      front_matter_block = $1
    else
      # Fallback: try to extract everything between first two ---
      if content =~ /---(.*?)---/m
        front_matter_block = $1
        puts "Fallback match used for #{post_file}"
      else
        puts "No front matter found in #{post_file}"
      end
    end
    if front_matter_block
      begin
        front_matter = YAML.safe_load(front_matter_block)
        tags = front_matter["tags"]
        if tags.is_a?(String)
          tags = tags.split # splits on whitespace
        end
        if tags
          tags = tags.map { |t| t.strip }
          puts "Found tags in #{post_file}: #{tags.inspect}"
          all_tags.concat(tags)
        else
          puts "No tags found in #{post_file}"
        end
      rescue Exception => e
        puts "YAML parse error in #{post_file}: #{e.message}"
      end
    end
  end

  if all_tags.empty?
    puts "No tags found in any posts. Exiting."
    exit
  end

  all_tags.uniq.each do |tag|
    normalized_tag = tag.strip.downcase.gsub(' ', '-')
    filename = File.join(tags_dir, "#{normalized_tag}.md")
    if File.exist?(filename)
      puts "Skipping existing file: #{filename}"
      next
    end
    File.open(filename, "w") do |f|
      f.puts <<~MARKDOWN
        ---
        layout: tag
        title: "Alle posts met de tag '#{tag}'"
        permalink: /tag/#{normalized_tag}/
        header: false
        ---

        <div class="tag-post-list">
        {% assign tagname = page.name | split: '.' | first %}
        {% assign tagged_posts = site.posts | where_exp: "post", "post.tags contains tagname" %}
            {% for post in tagged_posts %}
                {% if post.header and post.header.teaser %}
                    {% assign teaser = post.header.teaser %}
                {% elsif post.header and post.header['teaser'] %}
                    {% assign teaser = post.header['teaser'] %}
                {% elsif post['header'] and post['header']['teaser'] %}
                    {% assign teaser = post['header']['teaser'] %}
                {% else %}
                    {% assign teaser = '/assets/images/bull200px.webp' %}
                {% endif %}
                <a href="{{ post.url | relative_url }}" class="tag-post-item-link">
                    <div class="tag-post-item">
                        <div class="tag-post-teaser">
                            <img src="{{ teaser | relative_url }}" alt="Teaser" class="tag-post-img">
                        </div>
                        <div class="tag-post-content">
                            <h4 class="tag-post-title">
                                {{ post.title }}
                            </h4>
                            <div class="tag-post-date">
                                <span class="icon-calendar" aria-hidden="true">{% include icons/fontawesome/calendar-days.svg %}</span>
                                {{ post.date | date: "%b %-d, %Y" }}
                            </div>
                            <div class="tag-post-excerpt">{{ post.excerpt | strip_html | truncatewords: 40 }}</div>
                        </div>
                    </div>
                </a>
            {% endfor %}
        </div>
      MARKDOWN
    end
    puts "Created #{filename}"
  end
rescue Exception => e
  puts "Error: #{e.message}"
  puts e.backtrace
end

