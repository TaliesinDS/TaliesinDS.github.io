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
  const anonBtn = document.getElementById('firebase-anon-btn');
  const upgradeBtn = document.getElementById('firebase-upgrade-btn');
  const logoutBtn = document.getElementById('firebase-logout-btn');
  const commentForm = document.getElementById('firebase-comment-form');
  const userInfo = document.getElementById('firebase-user-info');
  if (user) {
    loginBtn.style.display = 'none';
    if (anonBtn) anonBtn.style.display = 'none';
    if (upgradeBtn) upgradeBtn.style.display = user.isAnonymous ? 'inline-block' : 'none';
    logoutBtn.style.display = 'inline-block';
    commentForm.style.display = 'block';
    if (user.isAnonymous) {
      userInfo.innerHTML = `<img src="https://www.gravatar.com/avatar/?d=mp&s=40" class="comment-avatar" alt="Guest"> Signed in as Guest`;
    } else {
      userInfo.innerHTML = `<img src="${user.photoURL}" class="comment-avatar" alt="${escapeHTML(user.displayName)}"> ${escapeHTML(user.displayName)}`;
    }
  } else {
    loginBtn.style.display = 'inline-block';
    if (anonBtn) anonBtn.style.display = 'inline-block';
    if (upgradeBtn) upgradeBtn.style.display = 'none';
    logoutBtn.style.display = 'none';
    commentForm.style.display = 'none';
    userInfo.innerHTML = '';
  }
}
// --- Upgrade Anonymous to Google ---
function upgradeAnonymousToGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.currentUser.linkWithPopup(provider)
    .then((result) => {
      // Upgraded successfully
      alert('Your guest account has been upgraded to Google!');
      updateAuthUI(result.user);
    })
    .catch((error) => {
      if (error.code === 'auth/credential-already-in-use') {
        // Show a custom dialog with explanation and a Sign in with Google button
        showUpgradeFailedDialog();
      } else {
        alert('Upgrade failed: ' + error.message);
      }
    });

// Show a custom dialog when upgrade fails due to existing link
function showUpgradeFailedDialog() {
  // Remove any existing dialog
  const oldDialog = document.getElementById('firebase-upgrade-failed-dialog');
  if (oldDialog) oldDialog.remove();
  // Create dialog
  const dialog = document.createElement('div');
  dialog.id = 'firebase-upgrade-failed-dialog';
  dialog.style.position = 'fixed';
  dialog.style.top = '0';
  dialog.style.left = '0';
  dialog.style.width = '100vw';
  dialog.style.height = '100vh';
  dialog.style.background = 'rgba(0,0,0,0.5)';
  dialog.style.display = 'flex';
  dialog.style.alignItems = 'center';
  dialog.style.justifyContent = 'center';
  dialog.style.zIndex = '9999';
  dialog.innerHTML = `
    <div style="background: #fff; padding: 2em; border-radius: 8px; max-width: 400px; text-align: center; box-shadow: 0 2px 16px rgba(0,0,0,0.2);">
      <h3>Upgrade Failed</h3>
      <p>This Google account is already linked to another user.<br><br>
      <strong>Tip:</strong> If you want to keep your comments and replies, please upgrade to Google <em>before</em> posting as a guest.<br><br>
      You can sign in with your Google account now, but your guest comments will not transfer.</p>
      <button id="firebase-switch-to-google-btn" class="btn btn--primary" style="margin: 1em 0;">Sign in with Google</button><br>
      <button id="firebase-upgrade-failed-close" class="btn">Close</button>
    </div>
  `;
  document.body.appendChild(dialog);
  document.getElementById('firebase-upgrade-failed-close').onclick = function() {
    dialog.remove();
  };
  document.getElementById('firebase-switch-to-google-btn').onclick = async function() {
    dialog.remove();
    // Log out, then wait for sign-out to complete, then prompt Google login
    try {
      await auth.signOut();
      // Now, immediately trigger Google login as part of the same user gesture
      loginWithGoogle();
    } catch (e) {
      alert('Sign out failed: ' + e.message);
    }
  };
}
}
// --- Anonymous Auth ---
function loginAnonymously() {
  auth.signInAnonymously()
    .catch((error) => {
      alert('Anonymous login failed: ' + error.message);
    });
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
  // Add Upgrade button if not present
  const authDiv2 = document.querySelector('.comments-auth');
  if (authDiv2 && !document.getElementById('firebase-upgrade-btn')) {
    const upgradeBtn = document.createElement('button');
    upgradeBtn.id = 'firebase-upgrade-btn';
    upgradeBtn.className = 'btn btn--primary';
    upgradeBtn.textContent = 'Upgrade to Google account';
    upgradeBtn.onclick = upgradeAnonymousToGoogle;
    upgradeBtn.style.display = 'none';
    authDiv2.insertBefore(upgradeBtn, document.getElementById('firebase-logout-btn'));
  }
  // Add Anonymous Login button if not present
  const authDiv = document.querySelector('.comments-auth');
  if (authDiv && !document.getElementById('firebase-anon-btn')) {
    const anonBtn = document.createElement('button');
    anonBtn.id = 'firebase-anon-btn';
    anonBtn.className = 'btn btn--primary';
    anonBtn.textContent = 'Sign in as Guest';
    anonBtn.onclick = loginAnonymously;
    authDiv.insertBefore(anonBtn, document.getElementById('firebase-logout-btn'));
  }
      const mainForm = document.getElementById('firebase-comment-form');
      if (mainForm) {
        mainForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const user = auth.currentUser;
          if (!user) return;
          const text = mainForm.elements['comment'].value.trim();
          if (!text) return;
          // Support anonymous user info
          let name = user.displayName;
          let avatar = user.photoURL;
          if (user.isAnonymous) {
            name = 'Guest';
            avatar = 'https://www.gravatar.com/avatar/?d=mp&s=40';
          }
          db.collection('comments').add({
            post: window.location.pathname,
            text: text,
            user: {
              name: name,
              avatar: avatar,
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
          let name = user.displayName;
          let avatar = user.photoURL;
          if (user.isAnonymous) {
            name = 'Guest';
            avatar = 'https://www.gravatar.com/avatar/?d=mp&s=40';
          }
          db.collection('comments').add({
            post: window.location.pathname,
            text: text,
            user: {
              name: name,
              avatar: avatar,
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
