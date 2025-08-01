---
permalink: /admin/
title: "Admin Overview"
layout: single
author_profile: true
---

<div id="admin-auth-container"></div>
<div id="admin-comments-container" style="display:none;">
  <h2>All Comments Overview</h2>
  <div id="admin-comments-loading">Loading comments...</div>
  <table id="admin-comments-table" style="width:100%; border-collapse:collapse; display:none;">
    <thead>
      <tr>
        <th>Post</th>
        <th>User</th>
        <th>Date</th>
        <th>Comment</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</div>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
<script>
const firebaseConfig = {
  apiKey: "AIzaSyA9VGslfcHzQs2kPA8uGX3mkGjph4vXG90",
  authDomain: "htmx-comments-test.firebaseapp.com",
  projectId: "htmx-comments-test",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

const ADMIN_UID = "SeV4YgBfa2e2ojIJspY8eSavPRy2";

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

function showAuthUI(user) {
  const authDiv = document.getElementById('admin-auth-container');
  if (!user) {
    authDiv.innerHTML = `<button id="admin-login-btn" class="btn btn--primary">Sign in with Google</button>`;
    document.getElementById('admin-login-btn').onclick = loginWithGoogle;
    document.getElementById('admin-comments-table').style.display = 'none';
    document.getElementById('admin-comments-loading').style.display = 'none';
  } else if (user.uid !== ADMIN_UID) {
    authDiv.innerHTML = `<div style="color:red; font-weight:bold;">Access denied. You are not authorized to view this page.</div><button id="admin-logout-btn" class="btn btn--primary" style="margin-top:1em;">Sign out</button>`;
    document.getElementById('admin-logout-btn').onclick = logout;
    document.getElementById('admin-comments-table').style.display = 'none';
    document.getElementById('admin-comments-loading').style.display = 'none';
  } else {
    authDiv.innerHTML = `<div style="color:green; font-weight:bold;">Welcome, ${escapeHTML(user.displayName || 'Admin')}!</div><button id="admin-logout-btn" class="btn btn--primary" style="margin-top:1em;">Sign out</button>`;
    document.getElementById('admin-logout-btn').onclick = logout;
    document.getElementById('admin-comments-loading').style.display = '';
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
  showAuthUI(user);
  if (!user || user.uid !== ADMIN_UID) return;
  db.collection('comments').orderBy('created', 'desc').get().then(snapshot => {
    const table = document.getElementById('admin-comments-table');
    const tbody = table.querySelector('tbody');
    const loading = document.getElementById('admin-comments-loading');
    tbody.innerHTML = '';
    snapshot.forEach(doc => {
      const c = doc.data();
      let formattedDate = '';
      if (c.created && c.created.toDate) {
        const d = c.created.toDate();
        formattedDate = d.toLocaleString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
        }).replace(',', ' at');
      }
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${escapeHTML(c.post || '')}</td>
        <td>${escapeHTML((c.user && c.user.name) || 'Guest')}</td>
        <td>${escapeHTML(formattedDate)}</td>
        <td>${escapeHTML(c.text)}</td>
      `;
      tbody.appendChild(row);
    });
    loading.style.display = 'none';
    table.style.display = '';
  });
});
</script>
