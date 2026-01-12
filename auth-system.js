// Authentication System (improved/debuggable)
// Handles user sign in, sign out, and account management

const AuthSystem = {
  currentUser: null,
  users: {},

  // Initialize authentication
  init() {
    console.debug("[AuthSystem] init()");
    this.loadUsers();
    const signed = this.checkAuthState();
    console.debug("[AuthSystem] checkAuthState ->", signed, "currentUser:", this.currentUser && this.currentUser.username);
    // Notify other code that auth state is known
    document.dispatchEvent(new CustomEvent("auth:initialized", { detail: { signedIn: signed, user: this.currentUser } }));
    return signed;
  },

  // Load users from localStorage (safe parse)
  loadUsers() {
    const saved = localStorage.getItem("ibMathUsers");
    if (!saved) {
      this.users = {};
      return;
    }
    try {
      this.users = JSON.parse(saved) || {};
    } catch (err) {
      console.warn("[AuthSystem] loadUsers: parse error, resetting users", err);
      this.users = {};
      localStorage.removeItem("ibMathUsers");
    }
  },

  // Save users to localStorage
  saveUsers() {
    try {
      localStorage.setItem("ibMathUsers", JSON.stringify(this.users));
    } catch (err) {
      console.error("[AuthSystem] saveUsers failed:", err);
    }
  },

  // Check if user is logged in (reads currentUserId)
  checkAuthState() {
    const currentUserId = localStorage.getItem("currentUserId");
    if (currentUserId && this.users[currentUserId]) {
      this.currentUser = this.users[currentUserId];
      return true;
    }
    this.currentUser = null;
    return false;
  },

  // Is someone signed in?
  isSignedIn() {
    return !!this.currentUser;
  },

  // Sign up new user
  signUp(username, email, password, course = "AA SL") {
    console.debug("[AuthSystem] signUp", username, email, course);
    if (!username || !email || !password) {
      return { success: false, message: "Missing username, email or password" };
    }

    // Prevent duplicates
    const existingUser = Object.values(this.users).find(
      (u) => u.username === username || u.email === email
    );
    if (existingUser) {
      return { success: false, message: "Username or email already exists" };
    }

    const userId = "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    const newUser = {
      id: userId,
      username,
      email,
      password, // Demo only — do not store plain passwords in production
      course,
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
    const signInResult = this.signIn(username, password);
    // Dispatch event
    document.dispatchEvent(new CustomEvent("auth:changed", { detail: { signedIn: signInResult.success ? true : false, user: this.currentUser } }));
    return { success: true, user: newUser };
  },

  // Sign in by username or email + password
  signIn(identifier, password) {
    console.debug("[AuthSystem] signIn", identifier);
    if (!identifier || !password) return { success: false, message: "Missing identifier or password" };

    const user = Object.values(this.users).find(
      (u) => (u.username === identifier || u.email === identifier) && u.password === password
    );

    if (user) {
      this.currentUser = user;
      user.lastLogin = new Date().toISOString();
      this.updateStreak(user);
      try {
        localStorage.setItem("currentUserId", user.id);
      } catch (err) {
        console.error("[AuthSystem] set currentUserId failed:", err);
      }
      this.saveUsers();
      document.dispatchEvent(new CustomEvent("auth:changed", { detail: { signedIn: true, user: this.currentUser } }));
      return { success: true, user };
    }

    return { success: false, message: "Invalid username/email or password" };
  },

  // Sign out
  signOut() {
    console.debug("[AuthSystem] signOut");
    this.currentUser = null;
    localStorage.removeItem("currentUserId");
    document.dispatchEvent(new CustomEvent("auth:changed", { detail: { signedIn: false, user: null } }));
  },

  // Update streak helper
  updateStreak(user) {
    try {
      const today = new Date().toDateString();
      const lastActivity = user.stats.lastActivityDate ? new Date(user.stats.lastActivityDate).toDateString() : null;
      if (lastActivity === today) return;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      if (lastActivity === yesterdayStr) user.stats.currentStreak++;
      else user.stats.currentStreak = 1;

      if (user.stats.currentStreak > user.stats.longestStreak) user.stats.longestStreak = user.stats.currentStreak;
      if (lastActivity !== today) user.stats.totalDaysActive = (user.stats.totalDaysActive || 0) + 1;
      user.stats.lastActivityDate = new Date().toISOString();
      this.saveUsers();
    } catch (err) {
      console.error("[AuthSystem] updateStreak error", err);
    }
  },

  // Update user stats
  updateStats(userId, stats) {
    if (this.users[userId]) {
      Object.assign(this.users[userId].stats, stats);
      // Optional: recalc level/achievements if you have those functions
      this.saveUsers();
      if (this.currentUser && this.currentUser.id === userId) this.currentUser = this.users[userId];
    }
  },

  // Utility: get current user
  getCurrentUser() {
    return this.currentUser;
  },

  // Utility: get all users
  getAllUsers() {
    return Object.values(this.users);
  },

  // Debug helper: sign in by id (useful for testing)
  signInById(userId) {
    if (this.users[userId]) {
      this.currentUser = this.users[userId];
      localStorage.setItem("currentUserId", userId);
      document.dispatchEvent(new CustomEvent("auth:changed", { detail: { signedIn: true, user: this.currentUser } }));
      return true;
    }
    return false;
  }
};

// Expose globally
if (typeof window !== "undefined") {
  window.AuthSystem = AuthSystem;
  // expose a global stub just in case other code calls this before auth-system is parsed
  if (typeof window.checkAuthAndShowModal === "undefined") {
    window.checkAuthAndShowModal = function() {
      try {
        if (AuthSystem && !AuthSystem.checkAuthState()) {
          const modal = document.getElementById("authModal");
          if (modal) modal.style.display = "flex";
          return true;
        } else {
          const modal = document.getElementById("authModal");
          if (modal) modal.style.display = "none";
          return false;
        }
      } catch (e) {
        console.error("checkAuthAndShowModal fallback error:", e);
        return null;
      }
    };
  }
}
