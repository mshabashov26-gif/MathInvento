// Advanced Features Integration
// Authentication, Groups, Leaderboards, Achievements

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AuthSystem !== 'undefined') {
        AuthSystem.init();
        if (!AuthSystem.checkAuthState()) {
            setTimeout(() => showAuthModal(), 500);
        } else {
            updateUserHeader();
        }
    }
    
    if (typeof GroupsSystem !== 'undefined') {
        GroupsSystem.init();
    }
    
    setupAdvancedFeatures();
});

function setupAdvancedFeatures() {
    setupAuthentication();
    setupLeaderboards();
    setupGroups();
    setupAchievements();
    updateNavigation();
}

// Authentication Setup
function setupAuthentication() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const closeAuth = document.getElementById('closeAuthModal');
    const signOutBtn = document.getElementById('signOutBtn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            const result = AuthSystem.signIn(username, password);
            if (result.success) {
                hideAuthModal();
                updateUserHeader();
                updateProfileDisplay();
                if (typeof updateStatisticsDisplay === 'function') updateStatisticsDisplay();
            } else {
                alert(result.message || 'Login failed');
            }
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('signupUsername').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const course = document.getElementById('signupCourse').value;
            const result = AuthSystem.signUp(username, email, password, course);
            if (result.success) {
                hideAuthModal();
                updateUserHeader();
                updateProfileDisplay();
            } else {
                alert(result.message || 'Signup failed');
            }
        });
    }
    
    if (showSignup) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('loginView').style.display = 'none';
            document.getElementById('signupView').style.display = 'block';
        });
    }
    
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('loginView').style.display = 'block';
            document.getElementById('signupView').style.display = 'none';
        });
    }
    
    if (closeAuth) closeAuth.addEventListener('click', hideAuthModal);
    if (signOutBtn) signOutBtn.addEventListener('click', () => { AuthSystem.signOut(); location.reload(); });
}

function showAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.style.display = 'flex';
}

function hideAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.style.display = 'none';
}

function updateUserHeader() {
    const user = AuthSystem.getCurrentUser();
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('headerUserName');
    const headerStreak = document.getElementById('headerStreak');
    const signOutBtn = document.getElementById('signOutBtn');
    
    if (user) {
        if (userInfo) userInfo.style.display = 'flex';
        if (userName) userName.textContent = user.username;
        if (headerStreak) headerStreak.textContent = `🔥 ${user.stats.currentStreak || 0}`;
        if (signOutBtn) signOutBtn.style.display = 'block';
    } else {
        if (userInfo) userInfo.style.display = 'none';
        if (signOutBtn) signOutBtn.style.display = 'none';
    }
}

// Leaderboards Setup
function setupLeaderboards() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            updateLeaderboardDisplay(e.target.dataset.filter);
        });
    });
}

function updateLeaderboardDisplay(category = 'overall') {
    const content = document.getElementById('leaderboardContent');
    if (!content || typeof LeaderboardSystem === 'undefined') return;
    
    let leaderboard = category === 'overall' 
        ? LeaderboardSystem.getGlobalLeaderboard(50)
        : LeaderboardSystem.getTopPerformers(category, 50);
    
    const currentUser = AuthSystem.getCurrentUser();
    
    let html = '<div class="leaderboard-table"><div class="leaderboard-header">';
    html += '<div>Rank</div><div>Username</div><div>Level</div><div>Score</div><div>Questions</div><div>Streak</div></div>';
    
    leaderboard.forEach(user => {
        const isCurrentUser = currentUser && user.id === currentUser.id;
        const levelName = user.levelName || (typeof AuthSystem !== 'undefined' ? AuthSystem.getLevelName(user.level || 1) : 'Beginner');
        html += `<div class="leaderboard-row ${isCurrentUser ? 'current-user' : ''}">`;
        html += `<div>${user.position}</div><div><strong>${user.username}</strong>${user.position <= 3 ? ' ' + ['🥇', '🥈', '🥉'][user.position - 1] : ''}</div>`;
        html += `<div>${levelName}</div><div>${(user.averageScore || 0).toFixed(1)}%</div>`;
        html += `<div>${user.totalQuestions}</div><div>🔥 ${user.currentStreak}</div></div>`;
    });
    
    html += '</div>';
    content.innerHTML = html;
}

// Groups Setup
function setupGroups() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.target.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            const targetTab = document.getElementById(tab + 'Tab');
            if (targetTab) targetTab.classList.add('active');
            if (tab === 'myGroups') displayMyGroups();
            else if (tab === 'exploreGroups') displayExploreGroups();
        });
    });
    
    const createBtn = document.getElementById('createGroupBtn');
    if (createBtn) {
        createBtn.addEventListener('click', () => {
            const name = document.getElementById('groupNameInput')?.value.trim();
            const desc = document.getElementById('groupDescInput')?.value.trim();
            const isPublic = document.getElementById('groupPublicCheck')?.checked;
            const user = AuthSystem.getCurrentUser();
            if (!user) { alert('Please sign in'); return; }
            if (!name) { alert('Enter group name'); return; }
            GroupsSystem.createGroup(name, desc, user.id, isPublic);
            alert('Group created!');
            document.getElementById('groupNameInput').value = '';
            document.getElementById('groupDescInput').value = '';
            displayMyGroups();
        });
    }
}

function displayMyGroups() {
    const user = AuthSystem.getCurrentUser();
    const list = document.getElementById('myGroupsList');
    if (!user) { list.innerHTML = '<p>Sign in to view groups</p>'; return; }
    const groups = GroupsSystem.getUserGroups(user.id);
    if (groups.length === 0) { list.innerHTML = '<p>No groups yet</p>'; return; }
    
    let html = '';
    groups.forEach(group => {
        GroupsSystem.updateGroupLeaderboard(group.id);
        const leaderboard = GroupsSystem.getGroupLeaderboard(group.id);
        const userRank = leaderboard[user.id]?.rank || '-';
        html += `<div class="group-card"><h3>${group.name}</h3><p>${group.description || ''}</p>`;
        html += `<div class="group-stats"><span>Members: ${group.members.length}</span><span>Your Rank: #${userRank}</span></div>`;
        html += `<button class="btn btn-secondary" onclick="viewGroup('${group.id}')">View</button></div>`;
    });
    list.innerHTML = html;
}

function displayExploreGroups() {
    const groups = GroupsSystem.getPublicGroups();
    const list = document.getElementById('exploreGroupsList');
    if (groups.length === 0) { list.innerHTML = '<p>No groups</p>'; return; }
    
    let html = '';
    groups.forEach(group => {
        const user = AuthSystem.getCurrentUser();
        const isMember = user && group.members.includes(user.id);
        html += `<div class="group-card"><h3>${group.name}</h3><p>${group.description || ''}</p>`;
        html += `<div class="group-stats"><span>Members: ${group.members.length}</span></div>`;
        html += isMember ? '<button disabled>Member</button>' : `<button class="btn btn-primary" onclick="joinGroup('${group.id}')">Join</button>`;
        html += '</div>';
    });
    list.innerHTML = html;
}

window.viewGroup = function(id) {
    const group = GroupsSystem.getGroup(id);
    const leaderboard = GroupsSystem.getGroupLeaderboard(id);
    
    let html = `<h3>${group.name} Leaderboard</h3>`;
    html += '<div class="leaderboard-table"><div class="leaderboard-header">';
    html += '<div>Rank</div><div>Username</div><div>Level</div><div>Questions</div><div>Avg Score</div><div>Streak</div></div>';
    
    Object.values(leaderboard).sort((a, b) => a.rank - b.rank).forEach(user => {
        const levelName = user.levelName || (typeof AuthSystem !== 'undefined' ? AuthSystem.getLevelName(user.level || 1) : 'Beginner');
        html += `<div class="leaderboard-row">`;
        html += `<div>#${user.rank}</div><div><strong>${user.username}</strong></div>`;
        html += `<div>${levelName}</div>`;
        html += `<div>${user.totalQuestions}</div><div>${user.averageScore}%</div><div>🔥 ${user.currentStreak}</div></div>`;
    });
    
    html += '</div>';
    
    // Create a temporary modal or use existing display
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content modal-large">
            <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
            ${html}
        </div>
    `;
    document.body.appendChild(modal);
};
window.joinGroup = function(id) {
    const user = AuthSystem.getCurrentUser();
    if (!user) { alert('Sign in first'); return; }
    GroupsSystem.joinGroup(id, user.id);
    displayExploreGroups();
    displayMyGroups();
};

// Achievements Setup
function setupAchievements() {
    const btn = document.getElementById('achievementsToggle');
    const modal = document.getElementById('achievementsModal');
    const close = document.getElementById('closeAchievementsModal');
    if (btn) btn.addEventListener('click', () => {
        displayAchievements();
        if (modal) modal.style.display = 'flex';
    });
    if (close) close.addEventListener('click', () => { if (modal) modal.style.display = 'none'; });
}

function displayAchievements() {
    const user = AuthSystem.getCurrentUser();
    const list = document.getElementById('achievementsList');
    if (!user) { list.innerHTML = '<p>Sign in</p>'; return; }
    if (user.achievements.length === 0) { list.innerHTML = '<p>No achievements</p>'; return; }
    
    let html = '<div class="achievements-grid">';
    user.achievements.forEach(a => {
        html += `<div class="achievement-card"><div class="achievement-icon">${a.icon || '🏆'}</div>`;
        html += `<h4>${a.name}</h4><p>${a.description}</p></div>`;
    });
    html += '</div>';
    list.innerHTML = html;
}

// Update navigation
function updateNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.target.dataset.section;
            navButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            document.querySelectorAll('.section-panel, #questionSection, #welcomeSection, #gdcLibraryPanel').forEach(p => p.style.display = 'none');
            
            switch(section) {
                case 'practice': document.getElementById('welcomeSection').style.display = 'block'; break;
                case 'mockExam': document.getElementById('mockExamSection').style.display = 'block'; break;
                case 'formulas': document.getElementById('formulasSection').style.display = 'block'; break;
                case 'leaderboard': document.getElementById('leaderboardSection').style.display = 'block'; updateLeaderboardDisplay(); break;
                case 'groups': document.getElementById('groupsSection').style.display = 'block'; displayMyGroups(); break;
                case 'profile': document.getElementById('profileSection').style.display = 'block'; break;
                case 'statistics': document.getElementById('statisticsSection').style.display = 'block'; break;
            }
        });
    });
}

