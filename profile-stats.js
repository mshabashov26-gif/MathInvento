// Profile and Statistics Management
// Handles user profile, progress tracking, and statistics

const ProfileManager = {
    // Initialize user profile
    init() {
        this.loadProfile();
        this.loadStatistics();
    },

    // Get or create user profile
    getProfile() {
        let profile = localStorage.getItem('ibMathProfile');
        if (!profile) {
            profile = {
                name: 'Student',
                course: 'AA SL',
                level: 'SL',
                joinedDate: new Date().toISOString(),
                totalQuestions: 0,
                totalMarks: 0,
                averageScore: 0
            };
            this.saveProfile(profile);
        } else {
            profile = JSON.parse(profile);
        }
        return profile;
    },

    // Save profile to localStorage
    saveProfile(profile) {
        localStorage.setItem('ibMathProfile', JSON.stringify(profile));
    },

    // Update profile name
    updateName(name) {
        const profile = this.getProfile();
        profile.name = name;
        this.saveProfile(profile);
        return profile;
    },

    // Get statistics
    getStatistics() {
        let stats = localStorage.getItem('ibMathStatistics');
        if (!stats) {
            stats = {
                topics: {
                    'Number & Algebra': { attempts: 0, correct: 0, totalMarks: 0, earnedMarks: 0, averageScore: 0 },
                    'Functions': { attempts: 0, correct: 0, totalMarks: 0, earnedMarks: 0, averageScore: 0 },
                    'Geometry & Trig': { attempts: 0, correct: 0, totalMarks: 0, earnedMarks: 0, averageScore: 0 },
                    'Stats & Probability': { attempts: 0, correct: 0, totalMarks: 0, earnedMarks: 0, averageScore: 0 },
                    'Calculus': { attempts: 0, correct: 0, totalMarks: 0, earnedMarks: 0, averageScore: 0 }
                },
                difficulties: {
                    'Foundation': { attempts: 0, averageScore: 0 },
                    'Standard': { attempts: 0, averageScore: 0 },
                    'Distinction': { attempts: 0, averageScore: 0 }
                },
                papers: {
                    'Paper1': { attempts: 0, averageScore: 0 },
                    'Paper2': { attempts: 0, averageScore: 0 },
                    'Paper3': { attempts: 0, averageScore: 0 }
                },
                recentActivity: [],
                mockExams: []
            };
            this.saveStatistics(stats);
        } else {
            stats = JSON.parse(stats);
        }
        return stats;
    },

    // Save statistics
    saveStatistics(stats) {
        localStorage.setItem('ibMathStatistics', JSON.stringify(stats));
    },

    // Record question attempt
    recordAttempt(topic, difficulty, paper, totalMarks, earnedMarks) {
        const stats = this.getStatistics();
        const profile = this.getProfile();

        // Update topic stats
        if (stats.topics[topic]) {
            stats.topics[topic].attempts++;
            stats.topics[topic].totalMarks += totalMarks;
            stats.topics[topic].earnedMarks += earnedMarks;
            stats.topics[topic].averageScore = (stats.topics[topic].earnedMarks / stats.topics[topic].totalMarks * 100).toFixed(1);
            if (earnedMarks >= totalMarks * 0.8) {
                stats.topics[topic].correct++;
            }
        }

        // Update difficulty stats
        if (stats.difficulties[difficulty]) {
            stats.difficulties[difficulty].attempts++;
            const currentAvg = stats.difficulties[difficulty].averageScore * (stats.difficulties[difficulty].attempts - 1);
            stats.difficulties[difficulty].averageScore = ((currentAvg + (earnedMarks / totalMarks * 100)) / stats.difficulties[difficulty].attempts).toFixed(1);
        }

        // Update paper stats
        if (stats.papers[paper]) {
            stats.papers[paper].attempts++;
            const currentAvg = stats.papers[paper].averageScore * (stats.papers[paper].attempts - 1);
            stats.papers[paper].averageScore = ((currentAvg + (earnedMarks / totalMarks * 100)) / stats.papers[paper].attempts).toFixed(1);
        }

        // Update profile
        profile.totalQuestions++;
        profile.totalMarks += totalMarks;
        profile.averageScore = (profile.totalMarks > 0) ? (stats.topics[topic].earnedMarks / stats.topics[topic].totalMarks * 100).toFixed(1) : 0;

        // Add to recent activity
        stats.recentActivity.unshift({
            date: new Date().toISOString(),
            topic: topic,
            difficulty: difficulty,
            paper: paper,
            score: (earnedMarks / totalMarks * 100).toFixed(1) + '%',
            marks: `${earnedMarks}/${totalMarks}`
        });

        // Keep only last 50 activities
        if (stats.recentActivity.length > 50) {
            stats.recentActivity = stats.recentActivity.slice(0, 50);
        }

        this.saveStatistics(stats);
        this.saveProfile(profile);

        return stats;
    },

    // Get best and worst topics
    getBestWorstTopics() {
        const stats = this.getStatistics();
        const topics = Object.keys(stats.topics).map(key => ({
            name: key,
            ...stats.topics[key]
        })).filter(t => t.attempts > 0);

        topics.sort((a, b) => parseFloat(b.averageScore) - parseFloat(a.averageScore));

        return {
            best: topics[0] || null,
            worst: topics[topics.length - 1] || null,
            all: topics
        };
    },

    // Save mock exam result
    saveMockExamResult(examData) {
        const stats = this.getStatistics();
        stats.mockExams.push({
            ...examData,
            date: new Date().toISOString()
        });
        this.saveStatistics(stats);
    },

    // Get mock exam history
    getMockExamHistory() {
        const stats = this.getStatistics();
        return stats.mockExams.sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    // Reset statistics
    resetStatistics() {
        localStorage.removeItem('ibMathStatistics');
        localStorage.removeItem('ibMathProfile');
        this.init();
    }
};

