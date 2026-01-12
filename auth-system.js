// Authentication System
// Handles user sign in, sign out, and account management

const AuthSystem = {
  currentUser: null,
  users: {},

  // Initialize authentication
  init() {
    this.loadUsers();
    this.checkAuthState();
  },

  // Load users from localStorage
  loadUsers() {
    const saved = localStorage.getItem("ibMathUsers");
    if (saved) {
      try {
        this.users = JSON.parse(saved);
      } catch (e) {
        console.warn("Failed to parse ibMathUsers, resetting", e);
        this.users = {};
      }
    }
  },

  // Save users to localStorage
  saveUsers() {
    localStorage.setItem("ibMathUsers", JSON.stringify(this.users));
  },

  // Check if user is logged in
  checkAuthState() {
    const currentUserId = localStorage.getItem("currentUserId");
    if (currentUserId && this.users[currentUserId]) {
      this.currentUser = this.users[currentUserId];
      return true;
    }
    return false;
  },

  // Sign up new user
  signUp(username, email, password, course = "AA SL") {
    const existingUser = Object.values(this.users).find(
      (u) => u.username === username || u.email === email
    );
    if (existingUser) {
      return { success: false, message: "Username or email already exists" };
    }

    const userId = "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    const newUser = {
      id: userId,
      username: username,
      email: email,
      password: password, // Demo only - NOT secure in production
      course: course,
      joinedDate: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      stats: {
        totalQuestions: 0,
        totalMarks: 0,
        averageScore: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null,
        totalDaysActive: 0
      },
      achievements: [],
      groups: [],
      level: 1,
      levelName: "Beginner",
      experience: 0
    };

    this.users[userId] = newUser;
    this.saveUsers();

    // Auto sign in
    this.signIn(username, password);

    return { success: true, user: newUser };
  },

  // Sign in
  signIn(username, password) {
    const user = Object.values(this.users).find(
      (u) => (u.username === username || u.email === username) && u.password === password
    );

    if (user) {
      this.currentUser = user;
      user.lastLogin = new Date().toISOString();
      this.updateStreak(user);
      localStorage.setItem("currentUserId", user.id);
      this.saveUsers();
      return { success: true, user: user };
    }

    return { success: false, message: "Invalid username or password" };
  },

  // Sign out
  signOut() {
    this.currentUser = null;
    localStorage.removeItem("currentUserId");
  },

  // Update streak
  updateStreak(user) {
    const today = new Date().toDateString();
    const lastActivity = user.stats.lastActivityDate ? new Date(user.stats.lastActivityDate).toDateString() : null;

    if (lastActivity === today) {
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastActivity === yesterdayStr) {
      user.stats.currentStreak++;
    } else if (lastActivity !== today) {
      user.stats.currentStreak = 1;
    }

    if (user.stats.currentStreak > user.stats.longestStreak) {
      user.stats.longestStreak = user.stats.currentStreak;
    }

    if (lastActivity !== today) {
      user.stats.totalDaysActive++;
    }

    user.stats.lastActivityDate = new Date().toISOString();
    this.saveUsers();
  },

  // Update user stats
  updateStats(userId, stats) {
    if (this.users[userId]) {
      Object.assign(this.users[userId].stats, stats);
      this.calculateLevel(this.users[userId]);
      this.checkAchievements(this.users[userId]);
      this.saveUsers();

      if (this.currentUser && this.currentUser.id === userId) {
        this.currentUser = this.users[userId];
      }
    }
  },

  // Level helpers
  getLevelName(numericLevel) {
    if (numericLevel <= 10) return "Beginner";
    if (numericLevel <= 25) return "Intermediate";
    if (numericLevel <= 50) return "Advanced";
    return "Expert Torturing";
  },

  calculateLevel(user) {
    const oldLevel = user.level;
    user.level = Math.floor(Math.sqrt(user.experience / 100)) + 1;

    const questionsXP = user.stats.totalQuestions * 10;
    const streakXP = user.stats.currentStreak * 5;
    const scoreXP = Math.floor(user.stats.averageScore * 2);

    user.experience = questionsXP + streakXP + scoreXP;

    const oldLevelName = this.getLevelName(oldLevel);
    const newLevelName = this.getLevelName(user.level);

    if (user.level > oldLevel) {
      if (oldLevelName !== newLevelName) {
        this.addAchievement(user, {
          id: `tier_${newLevelName.toLowerCase().replace(" ", "_")}`,
          name: `${newLevelName}!`,
          description: `You've reached ${newLevelName} tier!`,
          icon: newLevelName === "Expert Torturing" ? "🔥" : "🎯"
        });
      } else {
        this.addAchievement(user, {
          id: "level_up",
          name: `Level ${user.level}!`,
          description: `You've reached level ${user.level}!`,
          icon: "⭐"
        });
      }
    }

    user.levelName = newLevelName;
  },

  // Achievements
  checkAchievements(user) {
    const achievements = [
      { id: "first_question", name: "Getting Started", description: "Complete your first question", icon: "🎓", check: () => user.stats.totalQuestions >= 1 },
      { id: "ten_questions", name: "Practice Makes Perfect", description: "Complete 10 questions", icon: "📚", check: () => user.stats.totalQuestions >= 10 },
      { id: "hundred_questions", name: "Dedicated Learner", description: "Complete 100 questions", icon: "🏆", check: () => user.stats.totalQuestions >= 100 },
      { id: "streak_7", name: "Weekly Warrior", description: "Maintain a 7-day streak", icon: "🔥", check: () => user.stats.currentStreak >= 7 },
      { id: "streak_30", name: "Monthly Master", description: "Maintain a 30-day streak", icon: "⭐", check: () => user.stats.currentStreak >= 30 },
      { id: "score_90", name: "Near Perfect", description: "Achieve 90% average score", icon: "💯", check: () => user.stats.averageScore >= 90 },
      { id: "top_performer", name: "Top Performer", description: "Rank in top 10", icon: "👑", check: () => { const ranking = typeof LeaderboardSystem !== "undefined" ? LeaderboardSystem.getUserRanking(user.id) : null; return ranking && ranking.position <= 10; } }
    ];

    achievements.forEach((achievement) => {
      if (!user.achievements.find((a) => a.id === achievement.id) && achievement.check()) {
        this.addAchievement(user, achievement);
      }
    });
  },

  addAchievement(user, achievement) {
    if (!user.achievements.find((a) => a.id === achievement.id)) {
      achievement.unlockedAt = new Date().toISOString();
      user.achievements.push(achievement);
      this.saveUsers();
      return achievement;
    }
    return null;
  },

  getCurrentUser() {
    return this.currentUser;
  },

  getAllUsers() {
    return Object.values(this.users);
  }
};

// Compatibility helper (global) used by other scripts.
// Defines checkAuthAndShowModal early so script.js calls don't fail.
function checkAuthAndShowModal() {
  try {
    if (typeof AuthSystem !== "undefined") {
      if (!AuthSystem.checkAuthState()) {
        const modal = document.getElementById("authModal");
        if (modal) modal.style.display = "flex";
        return true;
      } else {
        const modal = document.getElementById("authModal");
        if (modal) modal.style.display = "none";
        return false;
      }
    } else {
      const modal = document.getElementById("authModal");
      if (modal) modal.style.display = "flex";
      return null;
    }
  } catch (e) {
    console.error("checkAuthAndShowModal error:", e);
    return null;
  }
}

// Expose globally so other non-module scripts can access AuthSystem + helper
if (typeof window !== "undefined") {
  window.AuthSystem = AuthSystem;
  window.checkAuthAndShowModal = checkAuthAndShowModal;
}
