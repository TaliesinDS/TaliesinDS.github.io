require 'yaml'

def has_lang?(front_matter)
  fm = YAML.safe_load(front_matter) rescue {}
  fm.is_a?(Hash) && fm.key?('lang')
end

Dir.glob("**/*.{md,markdown,html}") do |file|
  next if file.start_with?('_site/') || file.start_with?('assets/') || file.start_with?('_includes/') || file.start_with?('_layouts/') || file.start_with?('_data/')
  content = File.read(file)
  if content =~ /\A---\s*\n(.*?)\n---/m
    front_matter = $1
    unless has_lang?(front_matter)
      puts "Missing lang: #{file}"
    end
  end
end