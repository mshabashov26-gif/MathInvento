// Groups/Teams System
// Handles group creation, membership, and group competitions

const GroupsSystem = {
    groups: {},

    // Initialize groups
    init() {
        this.loadGroups();
    },

    // Load groups from localStorage
    loadGroups() {
        const saved = localStorage.getItem('ibMathGroups');
        if (saved) {
            this.groups = JSON.parse(saved);
        }
    },

    // Save groups to localStorage
    saveGroups() {
        localStorage.setItem('ibMathGroups', JSON.stringify(this.groups));
    },

    // Create a new group
    createGroup(name, description, creatorId, isPublic = true) {
        const groupId = 'group_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        const newGroup = {
            id: groupId,
            name: name,
            description: description,
            creatorId: creatorId,
            isPublic: isPublic,
            createdAt: new Date().toISOString(),
            members: [creatorId],
            admins: [creatorId],
            leaderboard: {},
            stats: {
                totalQuestions: 0,
                totalMarks: 0,
                averageScore: 0
            },
            competitions: []
        };

        this.groups[groupId] = newGroup;
        this.saveGroups();

        // Add group to user's groups
        if (AuthSystem.users[creatorId]) {
            if (!AuthSystem.users[creatorId].groups) {
                AuthSystem.users[creatorId].groups = [];
            }
            AuthSystem.users[creatorId].groups.push(groupId);
            AuthSystem.saveUsers();
        }

        return newGroup;
    },

    // Join a group
    joinGroup(groupId, userId) {
        if (!this.groups[groupId]) {
            return { success: false, message: 'Group not found' };
        }

        const group = this.groups[groupId];
        
        if (group.members.includes(userId)) {
            return { success: false, message: 'Already a member' };
        }

        group.members.push(userId);
        this.saveGroups();

        // Add to user's groups
        if (AuthSystem.users[userId]) {
            if (!AuthSystem.users[userId].groups) {
                AuthSystem.users[userId].groups = [];
            }
            if (!AuthSystem.users[userId].groups.includes(groupId)) {
                AuthSystem.users[userId].groups.push(groupId);
                AuthSystem.saveUsers();
            }
        }

        return { success: true, group: group };
    },

    // Leave a group
    leaveGroup(groupId, userId) {
        if (!this.groups[groupId]) {
            return { success: false, message: 'Group not found' };
        }

        const group = this.groups[groupId];
        group.members = group.members.filter(id => id !== userId);
        this.saveGroups();

        // Remove from user's groups
        if (AuthSystem.users[userId]) {
            AuthSystem.users[userId].groups = (AuthSystem.users[userId].groups || []).filter(id => id !== groupId);
            AuthSystem.saveUsers();
        }

        return { success: true };
    },

    // Update group leaderboard
    updateGroupLeaderboard(groupId) {
        if (!this.groups[groupId]) return;

        const group = this.groups[groupId];
        const memberStats = {};

        group.members.forEach(memberId => {
            const user = AuthSystem.users[memberId];
            if (user) {
                // Ensure levelName is set
                if (!user.levelName && typeof AuthSystem.getLevelName === 'function') {
                    user.levelName = AuthSystem.getLevelName(user.level || 1);
                }
                
                memberStats[memberId] = {
                    username: user.username,
                    totalQuestions: user.stats.totalQuestions,
                    averageScore: user.stats.averageScore,
                    currentStreak: user.stats.currentStreak,
                    level: user.level,
                    levelName: user.levelName || AuthSystem.getLevelName(user.level || 1) || 'Beginner',
                    experience: user.experience
                };
            }
        });

        // Sort by experience (primary) and average score (secondary)
        const sorted = Object.entries(memberStats).sort((a, b) => {
            if (b[1].experience !== a[1].experience) {
                return b[1].experience - a[1].experience;
            }
            return b[1].averageScore - a[1].averageScore;
        });

        group.leaderboard = {};
        sorted.forEach(([userId, stats], index) => {
            group.leaderboard[userId] = {
                ...stats,
                rank: index + 1
            };
        });

        // Update group stats
        const totalQuestions = Object.values(memberStats).reduce((sum, s) => sum + s.totalQuestions, 0);
        const totalScore = Object.values(memberStats).reduce((sum, s) => sum + s.averageScore, 0);
        const memberCount = Object.keys(memberStats).length;

        group.stats.totalQuestions = totalQuestions;
        group.stats.averageScore = memberCount > 0 ? (totalScore / memberCount).toFixed(1) : 0;

        this.saveGroups();
        return group.leaderboard;
    },

    // Get group leaderboard
    getGroupLeaderboard(groupId) {
        if (!this.groups[groupId]) return null;
        
        this.updateGroupLeaderboard(groupId);
        return this.groups[groupId].leaderboard;
    },

    // Get all public groups
    getPublicGroups() {
        return Object.values(this.groups).filter(g => g.isPublic);
    },

    // Get user's groups
    getUserGroups(userId) {
        if (!AuthSystem.users[userId]) return [];
        
        const userGroups = AuthSystem.users[userId].groups || [];
        return userGroups.map(groupId => this.groups[groupId]).filter(g => g);
    },

    // Get group by ID
    getGroup(groupId) {
        return this.groups[groupId];
    },

    // Create competition
    createCompetition(groupId, name, description, startDate, endDate) {
        if (!this.groups[groupId]) return null;

        const competition = {
            id: 'comp_' + Date.now(),
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate,
            groupId: groupId,
            participants: {},
            leaderboard: {}
        };

        this.groups[groupId].competitions.push(competition);
        this.saveGroups();

        return competition;
    }
};

