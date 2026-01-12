// Leaderboard System
// Global rankings and performance tracking (robust/fault-tolerant)

const LeaderboardSystem = {
  // Build a safe list of users from AuthSystem (returns [] if AuthSystem missing)
  _getUsersSafe() {
    try {
      if (typeof AuthSystem === 'undefined' || typeof AuthSystem.getAllUsers !== 'function') return [];
      return AuthSystem.getAllUsers() || [];
    } catch (e) {
      console.error('[LeaderboardSystem] _getUsersSafe error', e);
      return [];
    }
  },

  _normalizeUser(u) {
    return {
      id: u.id || '',
      username: u.username || 'anonymous',
      level: Number(u.level || 1),
      levelName: u.levelName || (typeof AuthSystem !== 'undefined' ? AuthSystem.getLevelName(Number(u.level || 1)) : 'Beginner'),
      experience: Number(u.experience || 0),
      totalQuestions: Number((u.stats && u.stats.totalQuestions) || 0),
      averageScore: Number((u.stats && u.stats.averageScore) || 0),
      currentStreak: Number((u.stats && u.stats.currentStreak) || 0),
      longestStreak: Number((u.stats && u.stats.longestStreak) || 0),
      totalDaysActive: Number((u.stats && u.stats.totalDaysActive) || 0),
      achievements: Array.isArray(u.achievements) ? u.achievements.length : 0
    };
  },

  // Get global leaderboard
  getGlobalLeaderboard(limit = 100) {
    const users = this._getUsersSafe().map(u => this._normalizeUser(u));

    // Compute rankingScore
    const ranked = users.map(u => {
      const rankingScore = u.experience + (u.averageScore || 0) * 100 + u.currentStreak * 50 + u.totalQuestions * 5;
      return { ...u, rankingScore };
    });

    ranked.sort((a, b) => b.rankingScore - a.rankingScore);

    ranked.forEach((user, index) => {
      user.position = index + 1;
    });

    return ranked.slice(0, limit);
  },

  // Get user ranking (single object)
  getUserRanking(userId) {
    if (!userId) return null;
    const lb = this.getGlobalLeaderboard(1000);
    return lb.find(u => u.id === userId) || null;
  },

  // Get top performers by category
  getTopPerformers(category = 'overall', limit = 10) {
    const users = this._getUsersSafe().map(u => this._normalizeUser(u));
    let ranked = [];

    switch (category) {
      case 'questions':
        ranked = users.map(u => ({ ...u, score: u.totalQuestions })).sort((a, b) => b.score - a.score);
        break;
      case 'streak':
        ranked = users.map(u => ({ ...u, score: u.currentStreak })).sort((a, b) => b.score - a.score);
        break;
      case 'score':
        ranked = users.map(u => ({ ...u, score: u.averageScore })).sort((a, b) => b.score - a.score);
        break;
      case 'level':
        ranked = users.map(u => ({ ...u, score: u.level })).sort((a, b) => b.score - a.score);
        break;
      default:
        return this.getGlobalLeaderboard(limit);
    }

    ranked.forEach((user, index) => user.position = index + 1);
    return ranked.slice(0, limit);
  },

  // Daily and topic leaderboards (placeholders but safe)
  getTopicLeaderboard(topic, limit = 10) {
    return this.getGlobalLeaderboard(limit);
  },

  getDailyLeaderboard() {
    const today = new Date().toDateString();
    const users = this._getUsersSafe();
    const todayActive = users
      .filter(u => {
        const last = u.stats && u.stats.lastActivityDate ? new Date(u.stats.lastActivityDate).toDateString() : null;
        return last === today;
      })
      .map(u => this._normalizeUser(u))
      .sort((a, b) => (b.totalQuestions || 0) - (a.totalQuestions || 0));
    todayActive.forEach((u, i) => u.position = i + 1);
    return todayActive;
  }
};

// expose for non-module code
if (typeof window !== 'undefined') window.LeaderboardSystem = LeaderboardSystem;
