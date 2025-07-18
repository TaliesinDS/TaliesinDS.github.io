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
      db.collection('comments').add({
        post: window.location.pathname,
        text: text,
        user: {
          name: user.displayName,
          avatar: user.photoURL,
          uid: user.uid
        },
        created: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        form.reset();
      });
    });
  }
  // --- Real-time comment loading ---
  const commentList = document.getElementById('firebase-comment-list');
  db.collection('comments')
    .where('post', '==', window.location.pathname)
    .orderBy('created', 'asc')
    .onSnapshot(snapshot => {
      let html = '';
      snapshot.forEach(doc => {
        const c = doc.data();
        html += `<div class="comment">
          <div class="comment-avatar-wrap"><img src="${c.user.avatar}" class="comment-avatar" alt="${escapeHTML(c.user.name)}"></div>
          <div class="comment-body">
            <div class="comment-meta"><span class="comment-author">${escapeHTML(c.user.name)}</span> <span class="comment-date">${c.created && c.created.toDate ? c.created.toDate().toLocaleString() : ''}</span></div>
            <div class="comment-text">${escapeHTML(c.text)}</div>
          </div>
        </div>`;
      });
      commentList.innerHTML = html || '<div class="no-comments">No comments yet.</div>';
    });
});
