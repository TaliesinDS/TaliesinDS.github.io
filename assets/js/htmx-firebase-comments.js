// htmx + Firebase comment system (test page only)
// Firebase config for htmx-comments-test
const firebaseConfig = {
  apiKey: "AIzaSyA9VGslfcHzQs2kPA8uGX3mkGjph4vXG90",
  authDomain: "htmx-comments-test.firebaseapp.com",
  projectId: "htmx-comments-test",
};

// Load Firebase SDKs
// (These will be loaded via CDN in the HTML, see next step)

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// --- HTML Escape Utility ---
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, function(tag) {
    const chars = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return chars[tag] || tag;
  });
}

// --- Google Auth ---
function updateAuthUI(user) {
  const loginBtn = document.getElementById('firebase-login-btn');
  const logoutBtn = document.getElementById('firebase-logout-btn');
  const commentForm = document.getElementById('firebase-comment-form');
  const userInfo = document.getElementById('firebase-user-info');
  if (user) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    commentForm.style.display = 'block';
    userInfo.innerHTML = `<img src="${user.photoURL}" class="comment-avatar" alt="${escapeHTML(user.displayName)}"> ${escapeHTML(user.displayName)}`;
  } else {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    commentForm.style.display = 'none';
    userInfo.innerHTML = '';
  }
}

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

function logout() {
  auth.signOut();
}

auth.onAuthStateChanged(user => {
  updateAuthUI(user);
});

// --- Comment Submission ---
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('firebase-comment-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const user = auth.currentUser;
      if (!user) return;
      const text = form.elements['comment'].value.trim();
      if (!text) return;
      const parentId = form.dataset.parentId || null;
      db.collection('comments').add({
        post: window.location.pathname,
        text: text,
        user: {
          name: user.displayName,
          avatar: user.photoURL,
          uid: user.uid
        },
        created: firebase.firestore.FieldValue.serverTimestamp(),
        parent: parentId
      }).then(() => {
        form.reset();
        form.removeAttribute('data-parent-id');
        form.querySelector('button[type="submit"]').textContent = 'Post Comment';
      });
    });
  }
  // --- Real-time comment loading ---
  const commentList = document.getElementById('firebase-comment-list');
  db.collection('comments')
    .where('post', '==', window.location.pathname)
    .orderBy('created', 'desc')
    .onSnapshot(snapshot => {
      // Build a map of comments by ID
      const commentsById = {};
      const topLevel = [];
      snapshot.forEach(doc => {
        const c = doc.data();
        c.id = doc.id;
        c.replies = [];
        commentsById[c.id] = c;
      });
      // Assign replies to their parent
      Object.values(commentsById).forEach(c => {
        if (c.parent) {
          if (commentsById[c.parent]) {
            commentsById[c.parent].replies.push(c);
          }
        } else {
          topLevel.push(c);
        }
      });
      // Render comments recursively
      function renderComment(c, depth = 0) {
        let html = `<div class="comment" style="margin-left:${depth * 2}em">
          <div class="comment-avatar-wrap"><img src="${c.user.avatar}" class="comment-avatar" alt="${escapeHTML(c.user.name)}"></div>
          <div class="comment-body">
            <div class="comment-meta"><span class="comment-author">${escapeHTML(c.user.name)}</span> <span class="comment-date">${c.created && c.created.toDate ? c.created.toDate().toLocaleString() : ''}</span></div>
            <div class="comment-text">${escapeHTML(c.text)}</div>
            <button class="btn btn--primary btn-reply" data-comment-id="${c.id}">Reply</button>
          </div>
        </div>`;
        if (c.replies && c.replies.length) {
          c.replies.sort((a, b) => b.created && a.created && b.created.seconds - a.created.seconds); // newest first
          html += c.replies.map(r => renderComment(r, depth + 1)).join('');
        }
        return html;
      }
      let html = topLevel.map(c => renderComment(c)).join('');
      commentList.innerHTML = html || '<div class="no-comments">No comments yet.</div>';

      // Add reply button listeners
      document.querySelectorAll('.btn-reply').forEach(btn => {
        btn.onclick = function() {
          const parentId = btn.getAttribute('data-comment-id');
          form.style.display = 'block';
          form.dataset.parentId = parentId;
          form.querySelector('button[type="submit"]').textContent = 'Post Reply';
          btn.scrollIntoView({behavior: 'smooth', block: 'center'});
        };
      });
    });
});
