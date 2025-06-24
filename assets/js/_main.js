/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function () {
  // FitVids init
  $("#main").fitVids();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").toggleClass("is--visible");
    $(".author__urls-wrapper").find("button").toggleClass("open");
  });

  // Close search screen with Esc key
  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      if ($(".initial-content").hasClass("is--hidden")) {
        $(".search-content").toggleClass("is--visible");
        $(".initial-content").toggleClass("is--hidden");
      }
    }
  });

  // Search toggle
  $(".search__toggle").on("click", function () {
    $(".search-content").toggleClass("is--visible");
    $(".initial-content").toggleClass("is--hidden");
    // set focus on input
    setTimeout(function () {
      $(".search-content input").focus();
    }, 400);
  });

  // Smooth scrolling
  var scroll = new SmoothScroll('a[href*="#"]', {
    offset: 20,
    speed: 400,
    speedAsDuration: true,
    durationMax: 500,
  });

  // Gumshoe scroll spy init
  if ($("nav.toc").length > 0) {
    var spy = new Gumshoe("nav.toc a", {
      // Active classes
      navClass: "active", // applied to the nav list item
      contentClass: "active", // applied to the content

      // Nested navigation
      nested: false, // if true, add classes to parents of active link
      nestedClass: "active", // applied to the parent items

      // Offset & reflow
      offset: 20, // how far from the top of the page to activate a content area
      reflow: true, // if true, listen for reflows

      // Event support
      events: true, // if true, emit custom events
    });
  }

  // Auto scroll sticky ToC with content
  const scrollTocToContent = function (event) {
    var target = event.target;
    var scrollOptions = { behavior: "auto", block: "nearest", inline: "start" };

    var tocElement = document.querySelector("aside.sidebar__right.sticky");
    if (!tocElement) return;
    if (window.getComputedStyle(tocElement).position !== "sticky") return;

    if (target.parentElement.classList.contains("toc__menu") && target == target.parentElement.firstElementChild) {
      // Scroll to top instead
      document.querySelector("nav.toc header").scrollIntoView(scrollOptions);
    } else {
      target.scrollIntoView(scrollOptions);
    }
  };

  // Has issues on Firefox, whitelist Chrome for now
  if (!!window.chrome) {
    document.addEventListener("gumshoeActivate", scrollTocToContent);
  }

  // add lightbox class to all image links
  $(
    "a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif'],a[href$='.webp']"
  ).has("> img").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: "image",
    tLoading: "Loading image #%curr%...",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: "mfp-zoom-in",
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
      },
    },
    closeOnContentClick: true,
    midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  // Add anchors for headings
  (function () {
    var pageContentElement = document.querySelector(".page__content");
    if (!pageContentElement) return;

    pageContentElement
      .querySelectorAll("h1, h2, h3, h4, h5, h6")
      .forEach(function (element) {
        var id = element.getAttribute("id");
        if (id) {
          var anchor = document.createElement("a");
          anchor.className = "header-link";
          anchor.href = "#" + id;
          anchor.innerHTML =
            '<span class="sr-only">Permalink</span><i class="fas fa-link"></i>';
          anchor.title = "Permalink";
          element.appendChild(anchor);
        }
      });
  })();

  // Add copy button for <pre> blocks
  var copyText = function (text) {
    if (document.queryCommandEnabled("copy") && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => true,
        () => console.error("Failed to copy text to clipboard: " + text)
      );
      return true;
    } else {
      var isRTL = document.documentElement.getAttribute("dir") === "rtl";

      var textarea = document.createElement("textarea");
      textarea.className = "clipboard-helper";
      textarea.style[isRTL ? "right" : "left"] = "-9999px";
      // Move element to the same position vertically
      var yPosition = window.pageYOffset || document.documentElement.scrollTop;
      textarea.style.top = yPosition + "px";

      textarea.setAttribute("readonly", "");
      textarea.value = text;
      document.body.appendChild(textarea);

      var success = true;
      try {
        textarea.select();
        success = document.execCommand("copy");
      } catch (e) {
        success = false;
      }
      textarea.parentNode.removeChild(textarea);
      return success;
    }
  };

  var copyButtonEventListener = function (event) {
    var thisButton = event.target;

    // Locate the <code> element
    var codeBlock = thisButton.nextElementSibling;
    while (codeBlock && codeBlock.tagName.toLowerCase() !== "code") {
      codeBlock = codeBlock.nextElementSibling;
    }
    if (!codeBlock) {
      // No <code> found - wtf?
      console.warn(thisButton);
      throw new Error("No code block found for this button.");
    }

    // Skip line numbers if present (i.e. {% highlight lineno %})
    var realCodeBlock = codeBlock.querySelector("td.code, td.rouge-code");
    if (realCodeBlock) {
      codeBlock = realCodeBlock;
    }
    var result = copyText(codeBlock.innerText);
    // Restore the focus to the button
    thisButton.focus();
    if (result) {
      if (thisButton.interval !== null) {
        clearInterval(thisButton.interval);
      }
      thisButton.classList.add('copied');
      thisButton.interval = setTimeout(function () {
        thisButton.classList.remove('copied');
        clearInterval(thisButton.interval);
        thisButton.interval = null;
      }, 1500);
    }
    return result;
  };

  if (window.enable_copy_code_button) {
    document
      .querySelectorAll(".page__content pre.highlight > code")
      .forEach(function (element, index, parentList) {
        // Locate the <pre> element
        var container = element.parentElement;
        // Sanity check - don't add an extra button if there's already one
        if (container.firstElementChild.tagName.toLowerCase() !== "code") {
          return;
        }
        var copyButton = document.createElement("button");
        copyButton.title = "Copy to clipboard";
        copyButton.className = "clipboard-copy-button";
        copyButton.innerHTML = '<span class="sr-only">Copy code</span><i class="far fa-fw fa-copy"></i><i class="fas fa-fw fa-check copied"></i>';
        copyButton.addEventListener("click", copyButtonEventListener);
        container.prepend(copyButton);
      });
  }
});

function initNotes() {
  const noteSection = document.getElementById('note-section');
  if (noteSection) {
      // Format note timestamp
      function formatDate(stringDate) {
          const date = new Date(stringDate);
          const now = new Date();
          const diffMs = now - date;
          const diffSeconds = Math.floor(diffMs / 1000);
          const diffMinutes = Math.floor(diffSeconds / 60);
          const diffHours = Math.floor(diffMinutes / 60);

          if (diffHours >= 24) {
              const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
              return date.toLocaleDateString(undefined, options);
          } else if (diffHours >= 1) {
              return `(${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago)`;
          } else if (diffMinutes >= 1) {
              return `(${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago)`;
          } else {
              return `(just now)`;
          }
      }

      // Escape HTML characters
      function escapeHtml(text) {
          const map = {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              '"': '&quot;',
              "'": '&#039;'
          };
          return text.replace(/[&<>"']/g, (m) => map[m]);
      }

      // Parse CSV to note objects
      function parseCsv(data) {
        const rows = [];
        let insideQuotes = false, field = '', row = [];
    
        for (let i = 0; i < data.length; i++) {
          const char = data[i], next = data[i + 1];
    
          if (char === '"' && next === '"' && insideQuotes) {
            field += '"'; i++;
          } else if (char === '"') {
            insideQuotes = !insideQuotes;
          } else if (char === ',' && !insideQuotes) {
            row.push(field); field = '';
          } else if ((char === '\n' || char === '\r') && !insideQuotes) {
            if (char === '\r' && next === '\n') i++;
            row.push(field);
            if (row.length >= 4) {
              rows.push({ timestamp: row[0], name: row[1], note: row[2], isAuthor: row[3] });
            }
            field = ''; row = [];
          } else {
            field += char;
          }
        }
    
        // Final line
        if (field || row.length > 0) {
          row.push(field);
          if (row.length >= 4) {
            rows.push({ timestamp: row[0], name: row[1], note: row[2], isAuthor: row[3] });
          }
        }
    
        return rows;
      }

      // Display notes
      function displayNotes(notes) {
          const noNotes = document.getElementById('notes-list');
          const noteSection = document.getElementById('noteSection');

          if (!notes) {
              if (visibleNotes.length === 0) {
                  noNotes.style.display = 'block';
                  noNotes.textContent = "There are currently no notes on this post. Be the first to add one below.";
              }
              return;
          }

          const noteList = parseCsv(notes);

          noteList.forEach(element => {
              if (visibleNotes.includes(JSON.stringify(element))) {
                  return;
              }

              // Determine the appropriate badge
              const authorBadge = element.isAuthor === "TRUE" 
                  ? `<span class="name">${escapeHtml(element.name)} <span class="author-badge">Author</span></span>` 
                  : `<span class="name">${escapeHtml(element.name)}</span>`;

              const newItem = document.createElement('div');
              newItem.className = 'note-item';
              newItem.innerHTML = `
                  <p class="note-name">
                      ${authorBadge}
                      <small>${formatDate(element.timestamp)}</small>
                  </p>
                  <div>
                      <p>${escapeHtml(element.note).replace(/\r?\n/g, '<br />')}</p>
                  </div>
              `;

              newItem.style.display = 'none';
              noteSection.appendChild(newItem);
              newItem.style.display = 'block';
              visibleNotes.push(JSON.stringify(element));

              noNotes.style.display = 'none';
          });
      }

      // Reload notes
      function reloadNotes() {
          const sqlStatement = encodeURIComponent(`SELECT A, C, D, E WHERE B = '${thisPageUrl}'`);
          fetch(`https://docs.google.com/spreadsheets/d/1hVRP9tYl8f4bsBjJP52hv74DwZ2pYpatxaNMG2rNY_M/gviz/tq?tqx=out:csv&sheet=notes&tq=${sqlStatement}&headers=0`)
              .then(response => response.text())
              .then(response => displayNotes(response));
      }

      // Get cookie by name
      function getCookie(name) {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
      }

      // Set a cookie
      function setCookie(name, value, days) {
          const d = new Date();
          d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
          const expires = `expires=${d.toUTCString()}`;
          document.cookie = `${name}=${value};${expires};path=/`;
      }

      // Check for banned words
      async function checkBannedWords(note) {
          const bannedWords = await fetch('/assets/js/bannedwords.json').then(res => res.json());
          const lowerNote = note.toLowerCase();
          const foundWords = bannedWords.filter(word => lowerNote.includes(word));
          return foundWords;
      }

      // Rate limit notes (2 in 5 minutes)
      function canPostNote() {
          const noteHistory = JSON.parse(getCookie('noteHistory') || '[]');
          const now = Date.now();
          const fiveMinutesAgo = now - 5 * 60 * 1000;

          const recentNotes = noteHistory.filter(time => time > fiveMinutesAgo);

          if (recentNotes.length >= 2) {
              return false;
          }

          recentNotes.push(now);
          setCookie('noteHistory', JSON.stringify(recentNotes), 1);

          return true;
      }

      // Post a new note
      async function postNote(event) {
          event.preventDefault();
          const username = document.getElementById('note-name').value;
          const note = document.getElementById('note-content').value;

          const bannedWords = await checkBannedWords(note);
          if (bannedWords.length > 0) {
              alert(`Please avoid using the following words: ${bannedWords.join(', ')}. Kindly modify your note and try again.`);
              return;
          }

          if (!canPostNote()) {
              alert("You've reached the limit of 2 notes in 5 minutes. Please wait for 5 minutes before posting again.");
              return;
          }

          setCookie('notePosterName', username, 365);

          fetch(`https://docs.google.com/forms/d/e/1FAIpQLSehE6misroMb1QUK57ReR8JeO_eVxztTlojKRcXCbWDwYtHTQ/formResponse`, {
              method: 'POST',
              mode: 'no-cors',
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
              },
              body: encodeFormData({
                  "entry.46315812": thisPageUrl,
                  "entry.361353560": username,
                  "entry.1184144290": note
              })
          }).then(() => {
              document.getElementById('note-content').value = '';
              reloadNotes();
          }).catch(error => console.log(error));
      }

      // Encode form data
      function encodeFormData(data) {
          return Object.keys(data)
              .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
              .join('&');
      }

      // Initialize notes on load
      const thisPageUrl = window.location.href.split(/[?#]/)[0];
      let visibleNotes = [];

      reloadNotes();

      document.addEventListener('swup:contentReplaced', () => {
          reloadNotes();
      });

      const noteForm = document.getElementById('note-form');
      if (noteForm) {
          noteForm.addEventListener('submit', postNote);
      }

      const notePosterName = getCookie('notePosterName');
      if (notePosterName) {
          document.getElementById('note-name').value = notePosterName;
      }
  }
}
