// Performance Analytics System
// Advanced analytics and insights

const PerformanceAnalytics = {
    // Get user performance insights
    getUserInsights(userId) {
        const user = AuthSystem.users[userId];
        if (!user) return null;

        const stats = user.stats;
        const insights = {
            overall: {
                totalQuestions: stats.totalQuestions,
                averageScore: stats.averageScore || 0,
                level: user.level,
                experience: user.experience,
                rank: LeaderboardSystem.getUserRanking(userId)?.position || 0
            },
            streaks: {
                current: stats.currentStreak,
                longest: stats.longestStreak,
                totalDaysActive: stats.totalDaysActive
            },
            trends: this.calculateTrends(userId),
            strengths: this.identifyStrengths(userId),
            weaknesses: this.identifyWeaknesses(userId),
            recommendations: this.getRecommendations(userId),
            achievements: user.achievements,
            goals: this.getUserGoals(userId)
        };

        return insights;
    },

    // Calculate performance trends
    calculateTrends(userId) {
        // This would analyze historical data
        // For now, return placeholder
        return {
            scoreTrend: 'improving', // improving, stable, declining
            activityTrend: 'consistent',
            improvementRate: 5.2 // percentage
        };
    },

    // Identify strengths
    identifyStrengths(userId) {
        const user = AuthSystem.users[userId];
        if (!user) return [];

        const strengths = [];
        if (user.stats.averageScore >= 85) {
            strengths.push({ topic: 'Overall Performance', score: user.stats.averageScore });
        }
        if (user.stats.currentStreak >= 7) {
            strengths.push({ topic: 'Consistency', score: user.stats.currentStreak + ' day streak' });
        }
        if (user.level >= 10) {
            const levelName = user.levelName || (typeof AuthSystem !== 'undefined' ? AuthSystem.getLevelName(user.level) : 'Beginner');
            strengths.push({ topic: 'Experience', score: levelName });
        }

        return strengths;
    },

    // Identify weaknesses
    identifyWeaknesses(userId) {
        const user = AuthSystem.users[userId];
        if (!user) return [];

        const weaknesses = [];
        if (user.stats.averageScore < 70) {
            weaknesses.push({ topic: 'Overall Performance', recommendation: 'Focus on fundamental concepts' });
        }
        if (user.stats.currentStreak < 3) {
            weaknesses.push({ topic: 'Consistency', recommendation: 'Try to practice daily' });
        }
        if (user.stats.totalQuestions < 50) {
            weaknesses.push({ topic: 'Practice Volume', recommendation: 'Complete more questions' });
        }

        return weaknesses;
    },

    // Get personalized recommendations
    getRecommendations(userId) {
        const user = AuthSystem.users[userId];
        if (!user) return [];

        const recommendations = [];

        if (user.stats.currentStreak === 0) {
            recommendations.push('Start a daily practice streak to build consistency!');
        } else if (user.stats.currentStreak < 7) {
            recommendations.push(`Keep going! You're ${7 - user.stats.currentStreak} days away from a weekly streak!`);
        }

        if (user.stats.averageScore < 70) {
            recommendations.push('Focus on Foundation level questions to build confidence.');
        } else if (user.stats.averageScore < 85) {
            recommendations.push('Try Standard difficulty questions to challenge yourself.');
        } else {
            recommendations.push('Excellent! Try Distinction level questions to reach Grade 7!');
        }

        if (user.stats.totalQuestions < 20) {
            recommendations.push('Complete more questions to unlock achievements and level up!');
        }

        return recommendations;
    },

    // Get user goals
    getUserGoals(userId) {
        const user = AuthSystem.users[userId];
        if (!user) return [];

        return [
            {
                id: 'streak_7',
                name: 'Weekly Warrior',
                description: 'Maintain a 7-day streak',
                progress: Math.min(user.stats.currentStreak / 7 * 100, 100),
                completed: user.stats.currentStreak >= 7
            },
            {
                id: 'questions_100',
                name: 'Century Club',
                description: 'Complete 100 questions',
                progress: Math.min(user.stats.totalQuestions / 100 * 100, 100),
                completed: user.stats.totalQuestions >= 100
            },
            {
                id: 'score_90',
                name: 'Grade 7 Goal',
                description: 'Achieve 90% average score',
                progress: Math.min((user.stats.averageScore || 0) / 90 * 100, 100),
                completed: (user.stats.averageScore || 0) >= 90
            },
            {
                id: 'level_advanced',
                name: 'Advanced Tier',
                description: 'Reach Advanced tier (Level 26+)',
                progress: Math.min(user.level / 26 * 100, 100),
                completed: user.level >= 26
            },
            {
                id: 'level_expert',
                name: 'Expert Torturing',
                description: 'Reach Expert Torturing tier (Level 51+)',
                progress: Math.min(user.level / 51 * 100, 100),
                completed: user.level >= 51
            }
        ];
    },

    // Get performance comparison
    getComparison(userId) {
        const user = AuthSystem.users[userId];
        if (!user) return null;

        const leaderboard = LeaderboardSystem.getGlobalLeaderboard(100);
        const userRank = leaderboard.findIndex(u => u.id === userId);
        
        if (userRank === -1) return null;

        const aboveUser = leaderboard[userRank - 1];
        const belowUser = leaderboard[userRank + 1];

        return {
            position: userRank + 1,
            above: aboveUser ? {
                username: aboveUser.username,
                score: aboveUser.rankingScore,
                difference: aboveUser.rankingScore - leaderboard[userRank].rankingScore
            } : null,
            below: belowUser ? {
                username: belowUser.username,
                score: belowUser.rankingScore,
                difference: leaderboard[userRank].rankingScore - belowUser.rankingScore
            } : null
        };
    }
};

