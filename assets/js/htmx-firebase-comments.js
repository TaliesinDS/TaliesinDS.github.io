// Minimal Firebase + htmx comment system
const firebaseConfig = {
  apiKey: "AIzaSyA9VGslfcHzQs2kPA8uGX3mkGjph4vXG90",
  authDomain: "htmx-comments-test.firebaseapp.com",
  projectId: "htmx-comments-test"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, function(tag) {
    const chars = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
    return chars[tag] || tag;
  });
}

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

function loginAnonymously() {
  auth.signInAnonymously();
}

function logout() {
  auth.signOut();
}

function updateAuthUI(user) {
  const loginBtn = document.getElementById('firebase-login-btn');
  const anonBtn = document.getElementById('firebase-anon-btn');
  const logoutBtn = document.getElementById('firebase-logout-btn');
  const commentForm = document.getElementById('firebase-comment-form');
  const userInfo = document.getElementById('firebase-user-info');
  if (!loginBtn || !anonBtn || !logoutBtn || !commentForm || !userInfo) return;
  if (user) {
    loginBtn.style.display = 'none';
    anonBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    commentForm.style.display = 'block';
    if (user.isAnonymous) {
      userInfo.innerHTML = `<img src="https://www.gravatar.com/avatar/?d=mp&s=40" class="comment-avatar" alt="Guest"> Guest`;
    } else {
      userInfo.innerHTML = `<img src="${user.photoURL}" class="comment-avatar" alt="${escapeHTML(user.displayName)}"> ${escapeHTML(user.displayName)}`;
    }
  } else {
    loginBtn.style.display = 'inline-block';
    anonBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    commentForm.style.display = 'none';
    userInfo.innerHTML = '';
  }
}

auth.onAuthStateChanged(updateAuthUI);

document.addEventListener('DOMContentLoaded', function() {
  const mainForm = document.getElementById('firebase-comment-form');
  if (mainForm) {
    mainForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const user = auth.currentUser;
      if (!user) return;
      const text = mainForm.elements['comment'].value.trim();
      if (!text) return;
      let name = user.displayName;
      let avatar = user.photoURL;
      if (user.isAnonymous) {
        const guestNameInput = document.getElementById('firebase-guest-name');
        let guestName = guestNameInput ? guestNameInput.value.trim() : '';
        if (!guestName) guestName = 'Guest';
        name = guestName;
        avatar = 'https://www.gravatar.com/avatar/?d=mp&s=40';
      }
      db.collection('comments').add({
        post: window.location.pathname,
        text: text,
        user: { name, avatar, uid: user.uid },
        created: firebase.firestore.FieldValue.serverTimestamp(),
        parent: null
      }).then(() => {
        mainForm.reset();
      });
    });
  }

  // Add Name field for guests if not present
  if (mainForm && !document.getElementById('firebase-guest-name')) {
    const nameDiv = document.createElement('div');
    nameDiv.id = 'firebase-guest-name-wrap';
    nameDiv.style.display = 'none';
    nameDiv.style.marginBottom = '0.5em';
    nameDiv.innerHTML = `
      <input type="text" id="firebase-guest-name" name="guestName" maxlength="32" placeholder="Your name (optional)" class="comment-form-textarea" style="resize:none;" autocomplete="off">
    `;
    mainForm.insertBefore(nameDiv, mainForm.querySelector('textarea'));
  }

  // Show/hide name field for guests
  auth.onAuthStateChanged(user => {
    const nameDiv = document.getElementById('firebase-guest-name-wrap');
    if (nameDiv) nameDiv.style.display = (user && user.isAnonymous) ? 'block' : 'none';
  });

  // Load and render comments
  const commentList = document.getElementById('firebase-comment-list');
  db.collection('comments')
    .where('post', '==', window.location.pathname)
    .orderBy('created', 'desc')
    .onSnapshot(snapshot => {
      if (!commentList) return;
      commentList.innerHTML = '';
      if (snapshot.empty) {
        commentList.innerHTML = '<div class="no-comments">No comments yet.</div>';
        return;
      }
      snapshot.forEach(doc => {
        const c = doc.data();
        let formattedDate = '';
        if (c.created && c.created.toDate) {
          const d = c.created.toDate();
          formattedDate = d.toLocaleString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
          }).replace(',', ' at');
        }
        const div = document.createElement('div');
        div.className = 'comment';
        div.innerHTML = `
          <div class="comment-avatar-wrap"><img src="${c.user.avatar}" class="comment-avatar" alt="${escapeHTML(c.user.name)}"></div>
          <div class="comment-body">
            <div class="comment-meta"><span class="comment-author">${escapeHTML(c.user.name)}</span> <span class="comment-date">${formattedDate}</span></div>
            <div class="comment-text">${escapeHTML(c.text)}</div>
          </div>
        `;
        commentList.appendChild(div);
      });
    });
});
