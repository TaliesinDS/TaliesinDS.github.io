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
      const mainForm = document.getElementById('firebase-comment-form');
      if (mainForm) {
        mainForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const user = auth.currentUser;
          if (!user) return;
          const text = mainForm.elements['comment'].value.trim();
          if (!text) return;
          db.collection('comments').add({
            post: window.location.pathname,
            text: text,
            user: {
              name: user.displayName,
              avatar: user.photoURL,
              uid: user.uid
            },
            created: firebase.firestore.FieldValue.serverTimestamp(),
            parent: null
          }).then(() => {
            mainForm.reset();
          });
        });
      }

      // Helper to create a reply form
      function createReplyForm(parentId, onClose) {
        const form = document.createElement('form');
        form.className = 'comment-form reply-form';
        form.innerHTML = `
          <textarea name="comment" rows="2" placeholder="Write a reply..." required class="comment-form-textarea"></textarea>
          <button type="submit" class="btn btn--primary">Post Reply</button>
        `;
        let dirty = false;
        const textarea = form.querySelector('textarea');
        textarea.addEventListener('input', () => { dirty = textarea.value.trim().length > 0; });
        // Submit handler
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          const user = auth.currentUser;
          if (!user) return;
          const text = textarea.value.trim();
          if (!text) return;
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
            if (onClose) onClose();
          });
        });
        // Blur/click-outside handler
        function handleClickOutside(e) {
          if (!form.contains(e.target)) {
            if (dirty && textarea.value.trim().length > 0) {
              if (confirm('You have started typing a reply. Discard your changes?')) {
                cleanup();
              } // else, keep form open
            } else {
              cleanup();
            }
          }
        }
        function cleanup() {
          document.removeEventListener('mousedown', handleClickOutside);
          if (form.parentNode) form.parentNode.removeChild(form);
          if (onClose) onClose();
        }
        document.addEventListener('mousedown', handleClickOutside);
        return form;
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
        // Create the comment container
        const container = document.createElement('div');
        container.className = 'comment';
        container.style.marginLeft = (depth * 2) + 'em';
        container.innerHTML = `
          <div class="comment-avatar-wrap"><img src="${c.user.avatar}" class="comment-avatar" alt="${escapeHTML(c.user.name)}"></div>
          <div class="comment-body">
            <div class="comment-meta"><span class="comment-author">${escapeHTML(c.user.name)}</span> <span class="comment-date">${c.created && c.created.toDate ? c.created.toDate().toLocaleString() : ''}</span></div>
            <div class="comment-text">${escapeHTML(c.text)}</div>
            <button class="btn btn--primary btn-reply" data-comment-id="${c.id}">Reply</button>
          </div>
        `;
        // Reply form logic
        const replyBtn = container.querySelector('.btn-reply');
        replyBtn.onclick = function() {
          // Remove any existing reply forms
          document.querySelectorAll('.reply-form').forEach(f => f.parentNode && f.parentNode.removeChild(f));
          // Insert a new reply form after this comment
          const replyForm = createReplyForm(c.id, () => {});
          container.appendChild(replyForm);
          replyForm.querySelector('textarea').focus();
        };
        // Render replies
        if (c.replies && c.replies.length) {
          // Sort replies by oldest first (ascending)
          c.replies.sort((a, b) => {
            if (!a.created || !b.created) return 0;
            return a.created.seconds - b.created.seconds;
          });
          c.replies.forEach(r => {
            container.appendChild(renderComment(r, depth + 1));
          });
        }
        return container;
      }
      // Render all top-level comments
      commentList.innerHTML = '';
      if (topLevel.length === 0) {
        commentList.innerHTML = '<div class="no-comments">No comments yet.</div>';
      } else {
        topLevel.forEach(c => {
          commentList.appendChild(renderComment(c));
        });
      }
    });
});
