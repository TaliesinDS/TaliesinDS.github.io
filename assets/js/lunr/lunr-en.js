
var idx = lunr(function () {
  this.field('title')
  this.field('excerpt')
  this.field('categories')
  this.field('tags')
  this.ref('id')

  this.pipeline.remove(lunr.trimmer)

  for (var item in store) {
    this.add({
      title: store[item].title,
      excerpt: store[item].excerpt,
      categories: store[item].categories,
      tags: store[item].tags,
      id: item
    })
  }
});
function cleanExcerpt(text) {
  if (!text) return "";
  // Remove Liquid tags
  text = text.replace(/{%.*?%}/g, '');
  text = text.replace(/{{.*?}}/g, '');
  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, '');
  // Optionally, trim whitespace
  return text.trim();
}
$(document).ready(function() {
  $('input#search').on('keyup', function () {
    var resultdiv = $('#results');
    var query = $(this).val().toLowerCase();
    var result =
      idx.query(function (q) {
        query.split(lunr.tokenizer.separator).forEach(function (term) {
          q.term(term, { boost: 100 })
          if(query.lastIndexOf(" ") != query.length-1){
            q.term(term, {  usePipeline: false, wildcard: lunr.Query.wildcard.TRAILING, boost: 10 })
          }
          if (term != ""){
            q.term(term, {  usePipeline: false, editDistance: 1, boost: 1 })
          }
        })
      });
    resultdiv.empty();
    resultdiv.prepend('<p class="results__found">'+result.length+' {{ site.data.ui-text[site.locale].results_found | default: "Result(s) found" }}</p>');
    for (var item in result) {
      var ref = result[item].ref;
      var searchitem = '';
      if(store[ref].teaser){
        searchitem =
          '<div class="list__item">' +
            '<article class="archive__item archive__item--with-image" itemscope itemtype="https://schema.org/CreativeWork" style="display: flex; align-items: flex-start;">' +
              '<div class="archive__item-teaser" style="flex: 0 0 auto; margin-right: 1em;">' +
                '<img src="'+store[ref].teaser+'" alt="" style="max-width: 120px; height: auto; display: block;">' +
              '</div>' +
              '<div class="archive__item-content" style="flex: 1 1 0%;">' +
                '<h2 class="archive__item-title" itemprop="headline" style="margin-top:0;">' +
                  '<a href="'+store[ref].url+'" rel="permalink">'+store[ref].title+'</a>' +
                '</h2>' +
                '<p class="archive__item-excerpt" itemprop="description">'+cleanExcerpt(store[ref].excerpt).split(" ").splice(0,40).join(" ")+'...</p>' +
              '</div>' +
            '</article>' +
          '</div>';
      }
      else{
        searchitem =
          '<div class="list__item">' +
            '<article class="archive__item archive__item--with-image" itemscope itemtype="https://schema.org/CreativeWork" style="display: flex; align-items: flex-start;">' +
              '<div class="archive__item-teaser" style="flex: 0 0 auto; margin-right: 1em;">' +
                '<img src="/assets/images/bull200px.webp" alt="Default image" style="max-width: 120px; height: auto; display: block;">' +
              '</div>' +
              '<div class="archive__item-content" style="flex: 1 1 0%;">' +
                '<h2 class="archive__item-title" itemprop="headline" style="margin-top:0;">' +
                  '<a href="'+store[ref].url+'" rel="permalink">'+store[ref].title+'</a>' +
                '</h2>' +
                '<p class="archive__item-excerpt" itemprop="description">'+cleanExcerpt(store[ref].excerpt).split(" ").splice(0,40).join(" ")+'...</p>' +
              '</div>' +
            '</article>' +
          '</div>';
      }
      resultdiv.append(searchitem);
    }
  });
});
