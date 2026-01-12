// Groups/Teams System
// Handles group creation, membership, and group competitions (robust + auth integration)

const GroupsSystem = {
  groups: {},

  // Initialize groups and subscribe to auth changes
  init() {
    this.loadGroups();
    // Update leaderboards when auth changes / on init
    document.addEventListener('auth:changed', () => {
      try { this.updateAllGroupLeaderboards(); } catch (e) { console.error(e); }
    });
  },

  loadGroups() {
    try {
      const saved = localStorage.getItem('ibMathGroups');
      this.groups = saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.warn('[GroupsSystem] loadGroups parse failed', e);
      this.groups = {};
      localStorage.removeItem('ibMathGroups');
    }
  },

  saveGroups() {
    try {
      localStorage.setItem('ibMathGroups', JSON.stringify(this.groups));
    } catch (e) {
      console.error('[GroupsSystem] saveGroups failed', e);
    }
  },

  createGroup(name, description, creatorId, isPublic = true) {
    if (!name || !creatorId) return { success: false, message: 'Missing name or creator' };
    const groupId = 'group_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    const newGroup = {
      id: groupId,
      name,
      description: description || '',
      creatorId,
      isPublic,
      createdAt: new Date().toISOString(),
      members: [creatorId],
      admins: [creatorId],
      leaderboard: {},
      stats: { totalQuestions: 0, totalMarks: 0, averageScore: 0 },
      competitions: []
    };

    this.groups[groupId] = newGroup;
    this.saveGroups();

    // Add to user's groups if AuthSystem present
    if (typeof AuthSystem !== 'undefined' && AuthSystem.users && AuthSystem.users[creatorId]) {
      AuthSystem.users[creatorId].groups = AuthSystem.users[creatorId].groups || [];
      if (!AuthSystem.users[creatorId].groups.includes(groupId)) {
        AuthSystem.users[creatorId].groups.push(groupId);
        if (typeof AuthSystem.saveUsers === 'function') AuthSystem.saveUsers();
      }
    }

    this.updateGroupLeaderboard(groupId);
    return { success: true, group: newGroup };
  },

  joinGroup(groupId, userId) {
    const group = this.groups[groupId];
    if (!group) return { success: false, message: 'Group not found' };
    if (!userId) return { success: false, message: 'User required' };
    if (!group.members.includes(userId)) group.members.push(userId);
    this.saveGroups();

    if (typeof AuthSystem !== 'undefined' && AuthSystem.users && AuthSystem.users[userId]) {
      AuthSystem.users[userId].groups = AuthSystem.users[userId].groups || [];
      if (!AuthSystem.users[userId].groups.includes(groupId)) {
        AuthSystem.users[userId].groups.push(groupId);
        if (typeof AuthSystem.saveUsers === 'function') AuthSystem.saveUsers();
      }
    }

    this.updateGroupLeaderboard(groupId);
    return { success: true, group };
  },

  leaveGroup(groupId, userId) {
    const group = this.groups[groupId];
    if (!group) return { success: false, message: 'Group not found' };
    group.members = group.members.filter(id => id !== userId);
    this.saveGroups();

    if (typeof AuthSystem !== 'undefined' && AuthSystem.users && AuthSystem.users[userId]) {
      AuthSystem.users[userId].groups = (AuthSystem.users[userId].groups || []).filter(id => id !== groupId);
      if (typeof AuthSystem.saveUsers === 'function') AuthSystem.saveUsers();
    }

    this.updateGroupLeaderboard(groupId);
    return { success: true };
  },

  updateGroupLeaderboard(groupId) {
    const group = this.groups[groupId];
    if (!group) return null;
    const memberStats = {};

    group.members.forEach(memberId => {
      const user = (typeof AuthSystem !== 'undefined' && AuthSystem.users) ? AuthSystem.users[memberId] : null;
      if (user) {
        memberStats[memberId] = {
          username: user.username || 'anonymous',
          totalQuestions: (user.stats && user.stats.totalQuestions) || 0,
          averageScore: (user.stats && Number(user.stats.averageScore)) || 0,
          currentStreak: (user.stats && user.stats.currentStreak) || 0,
          level: user.level || 1,
          levelName: user.levelName || (typeof AuthSystem !== 'undefined' ? AuthSystem.getLevelName(user.level || 1) : 'Beginner'),
          experience: user.experience || 0
        };
      }
    });

    const sorted = Object.entries(memberStats).sort((a, b) => {
      if (b[1].experience !== a[1].experience) return b[1].experience - a[1].experience;
      return b[1].averageScore - a[1].averageScore;
    });

    group.leaderboard = {};
    sorted.forEach(([userId, stats], index) => {
      group.leaderboard[userId] = { ...stats, rank: index + 1 };
    });

    // update stats
    const totalQuestions = Object.values(memberStats).reduce((sum, s) => sum + (s.totalQuestions || 0), 0);
    const totalScore = Object.values(memberStats).reduce((sum, s) => sum + (s.averageScore || 0), 0);
    const memberCount = Object.keys(memberStats).length;

    group.stats.totalQuestions = totalQuestions;
    group.stats.averageScore = memberCount > 0 ? Number((totalScore / memberCount).toFixed(1)) : 0;

    this.saveGroups();
    return group.leaderboard;
  },

  getGroupLeaderboard(groupId) {
    if (!this.groups[groupId]) return null;
    this.updateGroupLeaderboard(groupId);
    return this.groups[groupId].leaderboard;
  },

  getPublicGroups() {
    return Object.values(this.groups).filter(g => g.isPublic);
  },

  getUserGroups(userId) {
    if (typeof AuthSystem === 'undefined' || !AuthSystem.users[userId]) return [];
    const userGroups = AuthSystem.users[userId].groups || [];
    return userGroups.map(id => this.groups[id]).filter(Boolean);
  },

  getGroup(groupId) {
    return this.groups[groupId] || null;
  },

  updateAllGroupLeaderboards() {
    Object.keys(this.groups).forEach(gid => this.updateGroupLeaderboard(gid));
  }
};

// expose for non-module code
if (typeof window !== 'undefined') window.GroupsSystem = GroupsSystem;
