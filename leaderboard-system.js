// Leaderboard System
// Global rankings and performance tracking

const LeaderboardSystem = {
    // Get global leaderboard
    getGlobalLeaderboard(limit = 100) {
        const users = AuthSystem.getAllUsers();
        
        // Calculate ranking score (weighted combination of stats)
        const ranked = users.map(user => {
            // Ensure levelName is set
            if (!user.levelName && typeof AuthSystem !== 'undefined') {
                user.levelName = AuthSystem.getLevelName(user.level || 1);
            }
            
            return {
                id: user.id,
                username: user.username,
                level: user.level,
                levelName: user.levelName || AuthSystem?.getLevelName(user.level || 1) || 'Beginner',
                experience: user.experience,
                totalQuestions: user.stats.totalQuestions,
                averageScore: user.stats.averageScore || 0,
                currentStreak: user.stats.currentStreak,
                longestStreak: user.stats.longestStreak,
                totalDaysActive: user.stats.totalDaysActive,
                achievements: user.achievements.length,
                // Ranking score: experience + (avg score * 100) + (streak * 50) + (questions * 5)
                rankingScore: user.experience + 
                             (user.stats.averageScore || 0) * 100 + 
                             user.stats.currentStreak * 50 + 
                             user.stats.totalQuestions * 5
            };
        });

        // Sort by ranking score
        ranked.sort((a, b) => b.rankingScore - a.rankingScore);

        // Add position
        ranked.forEach((user, index) => {
            user.position = index + 1;
        });

        return ranked.slice(0, limit);
    },

    // Get user ranking
    getUserRanking(userId) {
        const leaderboard = this.getGlobalLeaderboard(1000);
        return leaderboard.find(u => u.id === userId);
    },

    // Get top performers by category
    getTopPerformers(category = 'overall', limit = 10) {
        const users = AuthSystem.getAllUsers();
        
        let ranked;
        
        switch(category) {
            case 'questions':
                ranked = users
                    .map(u => ({ ...u, score: u.stats.totalQuestions }))
                    .sort((a, b) => b.score - a.score);
                break;
            case 'streak':
                ranked = users
                    .map(u => ({ ...u, score: u.stats.currentStreak }))
                    .sort((a, b) => b.score - a.score);
                break;
            case 'score':
                ranked = users
                    .map(u => ({ ...u, score: u.stats.averageScore || 0 }))
                    .sort((a, b) => b.score - a.score);
                break;
            case 'level':
                ranked = users
                    .map(u => ({ ...u, score: u.level }))
                    .sort((a, b) => b.score - a.score);
                break;
            default: // overall
                return this.getGlobalLeaderboard(limit);
        }

        ranked.forEach((user, index) => {
            user.position = index + 1;
        });

        return ranked.slice(0, limit);
    },

    // Get leaderboard by topic
    getTopicLeaderboard(topic, limit = 10) {
        // This would require topic-specific stats tracking
        // For now, return overall leaderboard
        return this.getGlobalLeaderboard(limit);
    },

    // Get daily leaderboard (most active today)
    getDailyLeaderboard() {
        const today = new Date().toDateString();
        const users = AuthSystem.getAllUsers();
        
        const todayActive = users
            .filter(u => {
                const lastActivity = u.stats.lastActivityDate 
                    ? new Date(u.stats.lastActivityDate).toDateString() 
                    : null;
                return lastActivity === today;
            })
            .map(u => ({
                id: u.id,
                username: u.username,
                questionsToday: 0, // Would need daily tracking
                level: u.level
            }))
            .sort((a, b) => b.questionsToday - a.questionsToday);

        todayActive.forEach((user, index) => {
            user.position = index + 1;
        });

        return todayActive;
    }
};

