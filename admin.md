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
  <div id="admin-page-filter" style="margin-bottom:1em;"></div>
  <table id="admin-comments-table" style="width:100%; border-collapse:collapse; display:none;">
    <thead>
      <tr>
        <th>Select</th>
        <th>Post</th>
        <th>User</th>
        <th>Date</th>
        <th>Comment</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
  <div id="admin-deleted-comments" style="margin-top:2em; display:none;">
    <h3>Recently Deleted (last 3 hours)</h3>
    <div id="admin-deleted-list">Loading...</div>
  </div>
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
  const commentsContainer = document.getElementById('admin-comments-container');
  if (!user) {
    authDiv.innerHTML = `<button id="admin-login-btn" class="btn btn--primary">Sign in with Google</button>`;
    document.getElementById('admin-login-btn').onclick = loginWithGoogle;
    document.getElementById('admin-comments-table').style.display = 'none';
    document.getElementById('admin-comments-loading').style.display = 'none';
    commentsContainer.style.display = 'none';
  } else if (user.uid !== ADMIN_UID) {
    authDiv.innerHTML = `<div style="color:red; font-weight:bold;">Access denied. You are not authorized to view this page.</div><button id="admin-logout-btn" class="btn btn--primary" style="margin-top:1em;">Sign out</button>`;
    document.getElementById('admin-logout-btn').onclick = logout;
    document.getElementById('admin-comments-table').style.display = 'none';
    document.getElementById('admin-comments-loading').style.display = 'none';
    commentsContainer.style.display = 'none';
  } else {
    authDiv.innerHTML = `<div style="color:green; font-weight:bold;">Welcome, ${escapeHTML(user.displayName || 'Admin')}!</div><button id="admin-logout-btn" class="btn btn--primary" style="margin-top:1em;">Sign out</button>`;
    document.getElementById('admin-logout-btn').onclick = logout;
    document.getElementById('admin-comments-loading').style.display = '';
    commentsContainer.style.display = '';
  }
}

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}
function logout() {
  auth.signOut();
}

let allComments = [];
let allPages = new Set();
let allUsers = new Set();
let currentPageFilter = '';
let currentUserFilter = '';
let currentDateSort = 'desc';
let selectedCommentIds = new Set();

function renderComments(pageFilter = '', userFilter = '', dateSort = 'desc') {
  const table = document.getElementById('admin-comments-table');
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';
  let filtered = allComments;
  if (pageFilter) filtered = filtered.filter(c => c.post === pageFilter);
  if (userFilter) filtered = filtered.filter(c => (c.user && c.user.name) === userFilter);
  filtered = filtered.slice();
  filtered.sort((a, b) => {
    if (!a.created || !b.created) return 0;
    const ta = a.created.seconds || a.created.toDate().getTime() / 1000;
    const tb = b.created.seconds || b.created.toDate().getTime() / 1000;
    return dateSort === 'desc' ? tb - ta : ta - tb;
  });
  filtered.forEach(c => {
    let formattedDate = '';
    if (c.created && c.created.toDate) {
      const d = c.created.toDate();
      formattedDate = d.toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
      }).replace(',', ' at');
    }
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="checkbox" class="admin-comment-checkbox" data-id="${escapeHTML(c.id)}" ${selectedCommentIds.has(c.id) ? 'checked' : ''}></td>
      <td>${escapeHTML(c.post || '')}</td>
      <td>${escapeHTML((c.user && c.user.name) || 'Guest')}</td>
      <td>${escapeHTML(formattedDate)}</td>
      <td>${escapeHTML(c.text)}</td>
    `;
    tbody.appendChild(row);
  });
  // Checkbox event listeners
  tbody.querySelectorAll('.admin-comment-checkbox').forEach(cb => {
    cb.onchange = function() {
      const id = this.getAttribute('data-id');
      if (this.checked) selectedCommentIds.add(id);
      else selectedCommentIds.delete(id);
    };
  });
}

function renderDeleteButton() {
  const table = document.getElementById('admin-comments-table');
  let btn = document.getElementById('admin-delete-selected-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'admin-delete-selected-btn';
    btn.className = 'btn btn--danger';
    btn.textContent = 'Delete Selected';
    btn.style.marginBottom = '1em';
    table.parentNode.insertBefore(btn, table);
    btn.onclick = async function() {
      if (selectedCommentIds.size === 0) {
        alert('No comments selected.');
        return;
      }
      if (!confirm('Are you sure you want to delete the selected comments? You can restore them within 3 hours.')) return;
      btn.disabled = true;
      const now = Date.now();
      for (const id of selectedCommentIds) {
        try {
          // Get the comment data
          const docRef = db.collection('comments').doc(id);
          const docSnap = await docRef.get();
          if (docSnap.exists) {
            const commentData = docSnap.data();
            // Move to deleted_comments with deletion timestamp
            await db.collection('deleted_comments').doc(id).set({
              ...commentData,
              deletedAt: now
            });
            // Delete from comments
            await docRef.delete();
          }
        } catch (e) {
          alert('Failed to delete comment: ' + e.message);
        }
      }
      selectedCommentIds.clear();
      // Refresh comments directly
      db.collection('comments').orderBy('created', 'desc').get().then(snapshot => {
        allComments = [];
        allPages.clear();
        allUsers.clear();
        snapshot.forEach(doc => {
          const c = doc.data();
          c.id = doc.id;
          allComments.push(c);
          if (c.post) allPages.add(c.post);
          if (c.user && c.user.name) allUsers.add(c.user.name);
        });
        renderFilters();
        renderComments(currentPageFilter, currentUserFilter, currentDateSort);
        btn.disabled = false;
      });
    };
  }
}

function renderFilters() {
  const filterDiv = document.getElementById('admin-page-filter');
  filterDiv.innerHTML = '';
  // Page filter
  const pageSelect = document.createElement('select');
  pageSelect.id = 'admin-page-select';
  pageSelect.innerHTML = `<option value="">All Pages</option>` + Array.from(allPages).map(p => `<option value="${escapeHTML(p)}">${escapeHTML(p)}</option>`).join('');
  pageSelect.value = currentPageFilter;
  pageSelect.onchange = function() {
    currentPageFilter = this.value;
    renderComments(currentPageFilter, currentUserFilter, currentDateSort);
  };
  filterDiv.appendChild(pageSelect);
  // User filter
  const userSelect = document.createElement('select');
  userSelect.id = 'admin-user-select';
  userSelect.style.marginLeft = '1em';
  userSelect.innerHTML = `<option value="">All Users</option>` + Array.from(allUsers).map(u => `<option value="${escapeHTML(u)}">${escapeHTML(u)}</option>`).join('');
  userSelect.value = currentUserFilter;
  userSelect.onchange = function() {
    currentUserFilter = this.value;
    renderComments(currentPageFilter, currentUserFilter, currentDateSort);
  };
  filterDiv.appendChild(userSelect);
  // Date sort
  const sortSelect = document.createElement('select');
  sortSelect.id = 'admin-date-sort';
  sortSelect.style.marginLeft = '1em';
  sortSelect.innerHTML = `<option value="desc">Newest First</option><option value="asc">Oldest First</option>`;
  sortSelect.value = currentDateSort;
  sortSelect.onchange = function() {
    currentDateSort = this.value;
    renderComments(currentPageFilter, currentUserFilter, currentDateSort);
  };
  filterDiv.appendChild(sortSelect);
}

function renderRecentlyDeleted() {
  const container = document.getElementById('admin-comments-container');
  let deletedDiv = document.getElementById('admin-deleted-comments');
  if (!deletedDiv) {
    deletedDiv = document.createElement('div');
    deletedDiv.id = 'admin-deleted-comments';
    deletedDiv.style.marginTop = '2em';
    container.appendChild(deletedDiv);
  }
  deletedDiv.style.display = '';
  deletedDiv.innerHTML = '<h3>Recently Deleted (last 3 hours)</h3><div id="admin-deleted-list">Loading...</div>';
  const deletedList = deletedDiv.querySelector('#admin-deleted-list');
  // Purge comments older than 3 hours
  const threeHoursAgo = Date.now() - 3 * 60 * 60 * 1000;
  db.collection('deleted_comments').get().then(snapshot => {
    let toShow = [];
    let toDelete = [];
    snapshot.forEach(doc => {
      const c = doc.data();
      c.id = doc.id;
      if (c.deletedAt < threeHoursAgo) {
        toDelete.push(doc.id);
      } else {
        toShow.push(c);
      }
    });
    // Purge old deleted comments
    toDelete.forEach(id => db.collection('deleted_comments').doc(id).delete());
    if (toShow.length === 0) {
      deletedList.innerHTML = '<em>No recently deleted comments.</em>';
      return;
    }
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.innerHTML = `<thead><tr><th>Restore</th><th>Post</th><th>User</th><th>Date</th><th>Comment</th></tr></thead><tbody></tbody>`;
    const tbody = table.querySelector('tbody');
    toShow.forEach(c => {
      let formattedDate = '';
      if (c.created && c.created.toDate) {
        const d = c.created.toDate();
        formattedDate = d.toLocaleString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
        }).replace(',', ' at');
      }
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><button class="btn btn--primary admin-restore-btn" data-id="${escapeHTML(c.id)}">Restore</button></td>
        <td>${escapeHTML(c.post || '')}</td>
        <td>${escapeHTML((c.user && c.user.name) || 'Guest')}</td>
        <td>${escapeHTML(formattedDate)}</td>
        <td>${escapeHTML(c.text)}</td>
      `;
      tbody.appendChild(row);
    });
    deletedList.innerHTML = '';
    deletedList.appendChild(table);
    // Restore button logic
    tbody.querySelectorAll('.admin-restore-btn').forEach(btn => {
      btn.onclick = async function() {
        const id = this.getAttribute('data-id');
        const docRef = db.collection('deleted_comments').doc(id);
        const docSnap = await docRef.get();
        if (docSnap.exists) {
          const commentData = docSnap.data();
          // Restore to comments
          await db.collection('comments').doc(id).set(commentData);
          // Remove from deleted_comments
          await docRef.delete();
          renderRecentlyDeleted();
          // Refresh main comments
          db.collection('comments').orderBy('created', 'desc').get().then(snapshot => {
            allComments = [];
            allPages.clear();
            allUsers.clear();
            snapshot.forEach(doc => {
              const c = doc.data();
              c.id = doc.id;
              allComments.push(c);
              if (c.post) allPages.add(c.post);
              if (c.user && c.user.name) allUsers.add(c.user.name);
            });
            renderFilters();
            renderComments(currentPageFilter, currentUserFilter, currentDateSort);
          });
        }
      };
    });
  });
}

auth.onAuthStateChanged(user => {
  showAuthUI(user);
  if (!user || user.uid !== ADMIN_UID) return;
  db.collection('comments').orderBy('created', 'desc').get().then(snapshot => {
    allComments = [];
    allPages.clear();
    allUsers.clear();
    snapshot.forEach(doc => {
      const c = doc.data();
      c.id = doc.id;
      allComments.push(c);
      if (c.post) allPages.add(c.post);
      if (c.user && c.user.name) allUsers.add(c.user.name);
    });
    renderFilters();
    renderComments(currentPageFilter, currentUserFilter, currentDateSort);
    renderDeleteButton();
    renderRecentlyDeleted();
    document.getElementById('admin-comments-loading').style.display = 'none';
    document.getElementById('admin-comments-table').style.display = '';
  });
});
</script>
