
// htmx + Firebase comment system with 3-dots menu for actions
// Global guest avatar array
const guestAvatars = [
  '/assets/images/avatars/avatar1.webp',
  '/assets/images/avatars/avatar2.webp',
  '/assets/images/avatars/avatar3.webp',
  '/assets/images/avatars/avatar4.webp',
  '/assets/images/avatars/avatar5.webp'
];

// Deterministic avatar selection based on UID
function getGuestAvatar(uid) {
  if (!uid) return guestAvatars[0];
  let hash = 0;
  for (let i = 0; i < uid.length; i++) {
    hash = ((hash << 5) - hash) + uid.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % guestAvatars.length;
  return guestAvatars[idx];
}
const firebaseConfig = {
  apiKey: "AIzaSyA9VGslfcHzQs2kPA8uGX3mkGjph4vXG90",
  authDomain: "htmx-comments-test.firebaseapp.com",
  projectId: "htmx-comments-test",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

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
  const guestNameWrap = document.getElementById('firebase-guest-name-wrap');
  if (user) {
    loginBtn.style.display = 'none';
    if (anonBtn) anonBtn.style.display = 'none';
    if (upgradeBtn) upgradeBtn.style.display = user.isAnonymous ? 'inline-block' : 'none';
    logoutBtn.style.display = 'inline-block';
    commentForm.style.display = 'block';
    // Show/hide reCAPTCHA for guests only
    const captchaDiv = document.getElementById('firebase-captcha-wrap');
    if (captchaDiv) captchaDiv.style.display = user.isAnonymous ? 'block' : 'none';
    if (guestNameWrap) guestNameWrap.style.display = user.isAnonymous ? 'block' : 'none';
    if (user.isAnonymous) {
      // Use a deterministic avatar for guests based on UID
      const avatar = getGuestAvatar(user.uid);
      userInfo.innerHTML = `<img src="${avatar}" class="comment-avatar" alt="Guest"> Signed in as Guest`;
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
    const captchaDiv = document.getElementById('firebase-captcha-wrap');
    if (captchaDiv) captchaDiv.style.display = 'none';
    if (guestNameWrap) guestNameWrap.style.display = 'none';
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
  document.getElementById('firebase-switch-to-google-btn').onclick = function() {
    dialog.remove();
    // Log out, then show a new dialog with a button to continue with Google
    auth.signOut().then(() => {
      showContinueWithGoogleDialog();
    }).catch((e) => {
      alert('Sign out failed: ' + e.message);
    });
  };

// Show a dialog with a button to continue with Google login
function showContinueWithGoogleDialog() {
  // Remove any existing dialog
  const oldDialog = document.getElementById('firebase-continue-google-dialog');
  if (oldDialog) oldDialog.remove();
  // Create dialog
  const dialog = document.createElement('div');
  dialog.id = 'firebase-continue-google-dialog';
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
      <h3>Continue with Google</h3>
      <p>You have been signed out as guest.<br>To sign in with your Google account, click below:</p>
      <button id="firebase-continue-google-btn" class="btn btn--primary" style="margin: 1em 0;">Continue with Google</button><br>
      <button id="firebase-continue-google-close" class="btn">Close</button>
    </div>
  `;
  document.body.appendChild(dialog);
  document.getElementById('firebase-continue-google-close').onclick = function() {
    dialog.remove();
  };
  document.getElementById('firebase-continue-google-btn').onclick = function() {
    dialog.remove();
    loginWithGoogle();
  };
}
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
document.addEventListener('DOMContentLoaded', function() {
  // --- Real-time comment loading ---
  
  // Add reCAPTCHA widget to comment form (hidden by default, shown for guests)
  const mainForm = document.getElementById('firebase-comment-form');
  if (mainForm && !document.getElementById('firebase-captcha-wrap')) {
    const captchaDiv = document.createElement('div');
    captchaDiv.id = 'firebase-captcha-wrap';
    captchaDiv.style.display = 'none';
    captchaDiv.style.margin = '1em 0';
    captchaDiv.innerHTML = `
      <div id="firebase-captcha"></div>
    `;
    mainForm.insertBefore(captchaDiv, mainForm.querySelector('button[type="submit"]'));
    // Load reCAPTCHA script if not already present
    if (!window.grecaptcha) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }
  // Add guest name field if not present
  if (mainForm && !document.getElementById('firebase-guest-name')) {
    const nameDiv = document.createElement('div');
    nameDiv.id = 'firebase-guest-name-wrap';
    nameDiv.style.display = 'none';
    nameDiv.innerHTML = `
      <input type="text" id="firebase-guest-name" name="guestName" class="comment-form-textarea" maxlength="32" placeholder="Your name (optional)">
    `;
    mainForm.insertBefore(nameDiv, mainForm.querySelector('textarea'));
  }
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
  // --- Guest Rate Limiting ---
  let lastGuestCommentTime = 0;
  if (mainForm) {
    // Render reCAPTCHA when needed
    function renderCaptcha() {
      if (window.grecaptcha && document.getElementById('firebase-captcha')) {
        if (!document.getElementById('firebase-captcha').hasChildNodes()) {
          window.grecaptcha.render('firebase-captcha', {
            sitekey: '6LetuIcrAAAAAGPPCi6aWlBupDna_FV4Us-z22CO', // <-- Replace with your site key
            theme: 'light'
          });
        }
      } else {
        setTimeout(renderCaptcha, 500);
      }
    }
    // Show captcha for guests
    auth.onAuthStateChanged(user => {
      if (user && user.isAnonymous) renderCaptcha();
    });

    mainForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const user = auth.currentUser;
      if (!user) return;
      const text = mainForm.elements['comment'].value.trim();
      if (!text) return;
      // --- Guest rate limiting ---
      if (user.isAnonymous) {
        const now = Date.now();
        if (now - lastGuestCommentTime < 15000) {
          showRateLimitWarning();
          return;
        }
        // reCAPTCHA check
        if (!window.grecaptcha || !window.grecaptcha.getResponse) {
          alert('reCAPTCHA not loaded. Please try again.');
          return;
        }
        const captchaResponse = window.grecaptcha.getResponse();
        if (!captchaResponse) {
          alert('Please complete the CAPTCHA.');
          return;
        }
        // Optionally: verify captchaResponse with your backend for extra security
        lastGuestCommentTime = now;
        window.grecaptcha.reset();
      }
      // Support anonymous user info
      let name = user.displayName;
      let avatar = user.photoURL;
      if (user.isAnonymous) {
        const guestNameInput = document.getElementById('firebase-guest-name');
        const guestName = guestNameInput ? guestNameInput.value.trim() : '';
        name = guestName || 'Guest';
        // Pick a deterministic avatar based on UID
        avatar = getGuestAvatar(user.uid);
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

  // Show popup warning for guest rate limit
  function showRateLimitWarning() {
    // Remove any existing dialog
    const oldDialog = document.getElementById('firebase-rate-limit-dialog');
    if (oldDialog) oldDialog.remove();
    // Create dialog
    const dialog = document.createElement('div');
    dialog.id = 'firebase-rate-limit-dialog';
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
        <h3>Rate Limit</h3>
        <p>As a guest, you can only post one comment every 15 seconds.<br>Please wait before posting again.</p>
        <button id="firebase-rate-limit-close" class="btn">Close</button>
      </div>
    `;
    document.body.appendChild(dialog);
    document.getElementById('firebase-rate-limit-close').onclick = function() {
      dialog.remove();
    };
  }

  // Guest login button event handler
  const anonBtn = document.getElementById('firebase-anon-btn');
  if (anonBtn) {
    anonBtn.addEventListener('click', function(e) {
      e.preventDefault();
      loginAnonymously();
    });
  }
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
        const container = document.createElement('div');
        container.className = 'comment';
        container.style.marginLeft = (depth === 0 ? 0 : 1) + 'em'; // Replies always 1em relative to parent
        const currentUser = auth.currentUser;
        const ADMIN_UIDS = ["SeV4YgBfa2e2ojIJspY8eSavPRy2"];
        let isOwner = false, isAdmin = false;
        if (currentUser) {
          isOwner = currentUser.uid === c.user.uid;
          isAdmin = ADMIN_UIDS.includes(currentUser.uid);
        }
        // 3-dots menu for actions (Edit/Delete only)
        let actionMenu = '';
        if (isOwner || isAdmin) {
          actionMenu = `
            <div class="comment-menu-wrap">
              <button class="comment-menu-btn" aria-label="Comment actions">
                <span class="comment-menu-icon">&#8942;</span>
              </button>
              <div class="comment-menu-popup">
                <button class="comment-menu-edit" data-comment-id="${c.id}">Edit</button>
                <button class="comment-menu-delete" data-comment-id="${c.id}">Delete</button>
              </div>
            </div>
          `;
        } else {
          actionMenu = `<div class="comment-menu-wrap">
            <button class="comment-menu-btn disabled" aria-label="Comment actions" disabled>
              <span class="comment-menu-icon">&#8942;</span>
            </button>
          </div>`;
        }
        // Format date
        let formattedDate = '';
        if (c.created && c.created.toDate) {
          const d = c.created.toDate();
          formattedDate = d.toLocaleString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
          }).replace(',', ' at');
        }
        container.innerHTML = `
          <div class="comment-main">
            <div class="comment-avatar-wrap"><img src="${c.user.avatar}" class="comment-avatar" alt="${escapeHTML(c.user.name)}"></div>
            <div class="comment-body">
              <div class="comment-row">
                <div class="comment-row-main">
                  <div class="comment-meta">
                    <span class="comment-author">${escapeHTML(c.user.name) || 'Guest'}</span>
                    <span class="comment-date">${formattedDate}</span>
                  </div>
                  <div class="comment-text">${escapeHTML(c.text)}</div>
                </div>
                <div class="comment-menu-align">${actionMenu}</div>
              </div>
              <div class="comment-actions"><button class="btn btn--primary btn-reply" data-comment-id="${c.id}">Reply</button></div>
            </div>
          </div>
        `;
        // 3-dots menu logic
        const menuBtn = container.querySelector('.comment-menu-btn');
        const menuPopup = container.querySelector('.comment-menu-popup');
        if (menuBtn && menuPopup) {
          menuBtn.onclick = function(e) {
            e.stopPropagation();
            document.querySelectorAll('.comment-menu-popup').forEach(p => { if (p !== menuPopup) p.style.display = 'none'; });
            menuPopup.style.display = (menuPopup.style.display === 'block') ? 'none' : 'block';
          };
          document.addEventListener('click', function hideMenu(e) {
            if (!container.contains(e.target)) menuPopup.style.display = 'none';
          });
          // Edit action
          const editBtn = menuPopup.querySelector('.comment-menu-edit');
          if (editBtn) {
            editBtn.onclick = function() {
              menuPopup.style.display = 'none';
              document.querySelectorAll('.edit-form').forEach(f => f.parentNode && f.parentNode.removeChild(f));
              const commentTextDiv = container.querySelector('.comment-text');
              if (commentTextDiv) commentTextDiv.style.display = 'none';
              const form = document.createElement('form');
              form.className = 'edit-form';
              form.innerHTML = `<textarea name="edit-comment" rows="2" required class="comment-form-textarea">${escapeHTML(c.text)}</textarea><button type="submit" class="btn btn--primary">Save</button><button type="button" class="btn btn--secondary btn-cancel-edit">Cancel</button>`;
              form.onsubmit = function(e) {
                e.preventDefault();
                const newText = form.elements['edit-comment'].value.trim();
                if (!newText) return;
                db.collection('comments').doc(c.id).update({ text: newText })
                  .then(() => {
                    form.remove();
                    if (commentTextDiv) {
                      commentTextDiv.textContent = newText;
                      commentTextDiv.style.display = '';
                    }
                  })
                  .catch(err => {
                    alert('Failed to update comment: ' + err.message);
                  });
              };
              form.querySelector('.btn-cancel-edit').onclick = function() {
                form.remove();
                if (commentTextDiv) commentTextDiv.style.display = '';
              };
              commentTextDiv.parentNode.insertBefore(form, commentTextDiv.nextSibling);
              form.querySelector('textarea').focus();
            };
          }
          // Delete action
          const deleteBtn = menuPopup.querySelector('.comment-menu-delete');
          if (deleteBtn) {
            deleteBtn.onclick = function() {
              menuPopup.style.display = 'none';
              showAccessibleConfirmDialog({
                message: 'Are you sure you want to delete this comment? This will also delete all replies.',
                onConfirm: () => {
                  deleteCommentAndChildren(c.id)
                    .then(() => {})
                    .catch(err => {
                      showAccessibleAlertDialog('Failed to delete comment: ' + err.message);
                    });
                }
              });
            };
          }
        }
        // Reply button logic (outside menu)
        const replyBtn = container.querySelector('.btn-reply');
        if (replyBtn) {
          replyBtn.onclick = function() {
            // Remove any existing reply forms
            document.querySelectorAll('.reply-form').forEach(f => f.parentNode && f.parentNode.removeChild(f));
            // Hide the reply button while the reply form is active
            replyBtn.style.display = 'none';
            const replyForm = createReplyForm(c.id, () => {
              // When reply form is closed (on submit or cancel), show the reply button again
              replyBtn.style.display = '';
            });
            // Insert reply form directly after the .comment-row element
            const commentRow = container.querySelector('.comment-row');
            if (commentRow && commentRow.parentNode) {
              commentRow.parentNode.insertBefore(replyForm, commentRow.nextSibling);
            } else {
              container.appendChild(replyForm);
            }
            replyForm.querySelector('textarea').focus();
          };
        }
        // Render replies
        if (c.replies && c.replies.length) {
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

  // Helper to create a reply form
  function createReplyForm(parentId, onClose) {
    const form = document.createElement('form');
    form.className = 'comment-form reply-form';
    form.innerHTML = `
      <textarea name="comment" rows="2" placeholder="Write a reply..." required class="comment-form-textarea"></textarea>
      <div id="firebase-reply-captcha-wrap" style="display:none; margin:1em 0;"><div id="firebase-reply-captcha"></div></div>
      <button type="submit" class="btn btn--primary">Post Reply</button>
    `;
    let dirty = false;
    const textarea = form.querySelector('textarea');
    textarea.addEventListener('input', () => { dirty = textarea.value.trim().length > 0; });

    // Helper to render reCAPTCHA in reply form for guests
    let replyWidgetId = null;
    function renderReplyCaptcha() {
      // Hide any other visible captchas
      document.querySelectorAll('#firebase-captcha-wrap, #firebase-reply-captcha-wrap').forEach(div => {
        if (div !== replyCaptchaWrap) div.style.display = 'none';
      });
      if (window.grecaptcha && replyCaptcha && !replyCaptcha.hasChildNodes()) {
        replyWidgetId = window.grecaptcha.render('firebase-reply-captcha', {
          sitekey: '6LetuIcrAAAAAGPPCi6aWlBupDna_FV4Us-z22CO',
          theme: 'light'
        });
      } else if (!window.grecaptcha) {
        // Load reCAPTCHA script if not present
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        setTimeout(renderReplyCaptcha, 500);
      }
      replyCaptchaWrap.style.display = 'block';
    }

    const replyCaptchaWrap = form.querySelector('#firebase-reply-captcha-wrap');
    const replyCaptcha = form.querySelector('#firebase-reply-captcha');

    // Show captcha for guests
    auth.onAuthStateChanged(user => {
      if (user && user.isAnonymous) {
        renderReplyCaptcha();
      }
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const user = auth.currentUser;
      if (!user) return;
      const text = textarea.value.trim();
      if (!text) return;
      let name = user.displayName;
      let avatar = user.photoURL;
      // --- Guest protections ---
      if (user.isAnonymous) {
        // Rate limiting for replies
        if (!window.lastGuestReplyTime) window.lastGuestReplyTime = 0;
        const now = Date.now();
        if (now - window.lastGuestReplyTime < 15000) {
          showRateLimitWarning();
          return;
        }
        // reCAPTCHA check for replies (use reply form's captcha)
        if (!window.grecaptcha || typeof window.grecaptcha.getResponse !== 'function') {
          alert('reCAPTCHA not loaded. Please try again.');
          return;
        }
        // Use the reply form's widget ID
        const captchaResponse = replyWidgetId !== null ? window.grecaptcha.getResponse(replyWidgetId) : '';
        if (!captchaResponse) {
          alert('Please complete the CAPTCHA.');
          return;
        }
        window.lastGuestReplyTime = now;
        if (replyWidgetId !== null) window.grecaptcha.reset(replyWidgetId);
        // Try to get the main guest name field if present, else fallback to 'Guest'
        const guestNameInput = document.getElementById('firebase-guest-name');
        const guestName = guestNameInput ? guestNameInput.value.trim() : '';
        name = guestName || 'Guest';
        // Pick a deterministic avatar based on UID
        avatar = getGuestAvatar(user.uid);
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
        textarea.value = '';
        // Hide the reply captcha after submit
        if (replyCaptchaWrap) replyCaptchaWrap.style.display = 'none';
      });
    });
    function handleClickOutside(e) {
      if (!form.contains(e.target)) {
        if (dirty && textarea.value.trim().length > 0) {
          if (confirm('You have started typing a reply. Discard your changes?')) {
            cleanup();
          }
        } else {
          cleanup();
        }
      }
    }
    function cleanup() {
      document.removeEventListener('mousedown', handleClickOutside);
      if (form.parentNode) form.parentNode.removeChild(form);
      if (onClose) onClose();
      // Hide the reply captcha if present
      if (replyCaptchaWrap) replyCaptchaWrap.style.display = 'none';
      // If no other reply forms are open, re-show and re-render the main captcha for guests
      setTimeout(() => {
        if (!document.querySelector('.reply-form')) {
          const user = auth.currentUser;
          const captchaDiv = document.getElementById('firebase-captcha-wrap');
          if (user && user.isAnonymous && captchaDiv) {
            captchaDiv.style.display = 'block';
            // Re-render if not present
            if (window.grecaptcha && document.getElementById('firebase-captcha') && !document.getElementById('firebase-captcha').hasChildNodes()) {
              window.grecaptcha.render('firebase-captcha', {
                sitekey: '6LetuIcrAAAAAGPPCi6aWlBupDna_FV4Us-z22CO',
                theme: 'light'
              });
            }
          }
        }
      }, 100);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return form;
  }

  // ...existing code...

  // Recursively delete a comment and all its children (replies)
  async function deleteCommentAndChildren(commentId) {
    const childrenSnap = await db.collection('comments').where('parent', '==', commentId).get();
    for (const doc of childrenSnap.docs) {
      await deleteCommentAndChildren(doc.id);
    }
    await db.collection('comments').doc(commentId).delete();
  }

  // Accessible confirmation dialog
  function showAccessibleConfirmDialog({ message, onConfirm }) {
    const oldDialog = document.getElementById('firebase-accessible-dialog');
    if (oldDialog) oldDialog.remove();
    const dialog = document.createElement('div');
    dialog.id = 'firebase-accessible-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('tabindex', '-1');
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
      <div style="background: #fff; padding: 2em; border-radius: 8px; max-width: 400px; text-align: center; box-shadow: 0 2px 16px rgba(0,0,0,0.2);" role="document">
        <h3 id="firebase-accessible-dialog-title">Confirm Delete</h3>
        <p id="firebase-accessible-dialog-desc">${message}</p>
        <button id="firebase-accessible-dialog-confirm" class="btn btn--danger">Delete</button>
        <button id="firebase-accessible-dialog-cancel" class="btn btn--secondary">Cancel</button>
      </div>
    `;
    document.body.appendChild(dialog);
    const confirmBtn = document.getElementById('firebase-accessible-dialog-confirm');
    const cancelBtn = document.getElementById('firebase-accessible-dialog-cancel');
    confirmBtn.focus();
    dialog.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        dialog.remove();
      } else if (e.key === 'Tab') {
        if (document.activeElement === confirmBtn && !e.shiftKey) {
          e.preventDefault();
          cancelBtn.focus();
        } else if (document.activeElement === cancelBtn && e.shiftKey) {
          e.preventDefault();
          confirmBtn.focus();
        }
      }
    });
    confirmBtn.onclick = function() {
      dialog.remove();
      if (onConfirm) onConfirm();
    };
    cancelBtn.onclick = function() {
      dialog.remove();
    };
  }

  // Accessible alert dialog
  function showAccessibleAlertDialog(message) {
    const oldDialog = document.getElementById('firebase-accessible-dialog');
    if (oldDialog) oldDialog.remove();
    const dialog = document.createElement('div');
    dialog.id = 'firebase-accessible-dialog';
    dialog.setAttribute('role', 'alertdialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('tabindex', '-1');
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
      <div style="background: #fff; padding: 2em; border-radius: 8px; max-width: 400px; text-align: center; box-shadow: 0 2px 16px rgba(0,0,0,0.2);" role="document">
        <h3 id="firebase-accessible-dialog-title">Error</h3>
        <p id="firebase-accessible-dialog-desc">${message}</p>
        <button id="firebase-accessible-dialog-close" class="btn btn--primary">Close</button>
      </div>
    `;
    document.body.appendChild(dialog);
    const closeBtn = document.getElementById('firebase-accessible-dialog-close');
    closeBtn.focus();
    dialog.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' || e.key === 'Enter') {
        dialog.remove();
      }
    });
    closeBtn.onclick = function() {
      dialog.remove();
    };
  }

});
