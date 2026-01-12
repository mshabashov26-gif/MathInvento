// Mock Exam System
// Creates and manages full-length IB Math mock exams

const MockExamManager = {
    currentExam: null,
    examStartTime: null,
    examQuestions: [],
    currentQuestionIndex: 0,
    examAnswers: [],
    examTimer: null,

    // Create a new mock exam
    createExam(course, paperType, duration = 90) {
        const topics = ['Number & Algebra', 'Functions', 'Geometry & Trig', 'Stats & Probability', 'Calculus'];
        const difficulties = ['Foundation', 'Standard', 'Distinction'];
        
        // Generate exam questions based on IB paper structure
        const questions = [];
        
        // Section A: Foundation to Standard questions (about 60% of marks)
        const sectionAQuestions = 6;
        const sectionAMarks = Math.floor(duration * 0.6);
        
        for (let i = 0; i < sectionAQuestions; i++) {
            const topic = topics[Math.floor(Math.random() * topics.length)];
            const difficulty = i < 2 ? 'Foundation' : 'Standard';
            const marks = difficulty === 'Foundation' ? 4 : 6;
            
            let question = null;
            if (typeof getRandomQuestion !== 'undefined') {
                question = getRandomQuestion(topic, difficulty, paperType);
            }
            
            if (!question) {
                // Fallback to template
                const templates = questionTemplates[difficulty]?.[topic];
                if (templates && templates.length > 0) {
                    question = {
                        question: templates[Math.floor(Math.random() * templates.length)],
                        marks: marks,
                        topic: topic,
                        difficulty: difficulty
                    };
                }
            }
            
            if (question) {
                questions.push({
                    ...question,
                    questionNumber: i + 1,
                    section: 'A'
                });
            }
        }
        
        // Section B: Standard to Distinction questions (about 40% of marks)
        const sectionBQuestions = 4;
        for (let i = 0; i < sectionBQuestions; i++) {
            const topic = topics[Math.floor(Math.random() * topics.length)];
            const difficulty = i < 2 ? 'Standard' : 'Distinction';
            const marks = difficulty === 'Standard' ? 7 : 9;
            
            let question = null;
            if (typeof getRandomQuestion !== 'undefined') {
                question = getRandomQuestion(topic, difficulty, paperType);
            }
            
            if (!question) {
                const templates = questionTemplates[difficulty]?.[topic];
                if (templates && templates.length > 0) {
                    question = {
                        question: templates[Math.floor(Math.random() * templates.length)],
                        marks: marks,
                        topic: topic,
                        difficulty: difficulty
                    };
                }
            }
            
            if (question) {
                questions.push({
                    ...question,
                    questionNumber: sectionAQuestions + i + 1,
                    section: 'B'
                });
            }
        }
        
        this.currentExam = {
            course: course,
            paper: paperType,
            duration: duration, // in minutes
            totalMarks: questions.reduce((sum, q) => sum + (q.marks || 0), 0),
            questions: questions,
            startTime: null,
            endTime: null,
            answers: []
        };
        
        return this.currentExam;
    },

    // Start the mock exam
    startExam() {
        if (!this.currentExam) return;
        
        this.currentExam.startTime = new Date();
        this.examStartTime = Date.now();
        this.examQuestions = this.currentExam.questions;
        this.examAnswers = new Array(this.examQuestions.length).fill('');
        this.currentQuestionIndex = 0;
        
        // Start timer
        const totalSeconds = this.currentExam.duration * 60;
        this.startTimer(totalSeconds);
        
        return this.currentExam;
    },

    // Timer management
    startTimer(seconds) {
        if (this.examTimer) {
            clearInterval(this.examTimer);
        }
        
        let timeRemaining = seconds;
        
        this.examTimer = setInterval(() => {
            timeRemaining--;
            this.updateTimerDisplay(timeRemaining);
            
            if (timeRemaining <= 0) {
                this.endExam();
            }
        }, 1000);
        
        this.updateTimerDisplay(timeRemaining);
    },

    updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        const timerElement = document.getElementById('mockExamTimer');
        if (timerElement) {
            timerElement.textContent = display;
            if (seconds < 300) { // Less than 5 minutes
                timerElement.style.color = '#ef4444';
            }
        }
    },

    // Save answer for current question
    saveAnswer(questionIndex, answer) {
        if (questionIndex >= 0 && questionIndex < this.examAnswers.length) {
            this.examAnswers[questionIndex] = answer;
            this.currentExam.answers[questionIndex] = answer;
        }
    },

    // Navigate to question
    goToQuestion(index) {
        if (index >= 0 && index < this.examQuestions.length) {
            this.currentQuestionIndex = index;
            return this.examQuestions[index];
        }
        return null;
    },

    // End exam
    endExam() {
        if (this.examTimer) {
            clearInterval(this.examTimer);
            this.examTimer = null;
        }
        
        if (this.currentExam) {
            this.currentExam.endTime = new Date();
            this.currentExam.answers = this.examAnswers;
        }
        
        return this.currentExam;
    },

    // Calculate exam score (simplified - in real implementation, would use AI)
    calculateScore() {
        if (!this.currentExam) return null;
        
        let totalMarks = 0;
        let earnedMarks = 0;
        
        this.currentExam.questions.forEach((q, index) => {
            totalMarks += q.marks || 0;
            // Simulate scoring - in production, this would use AI to grade
            const answerLength = this.examAnswers[index]?.length || 0;
            const estimatedScore = Math.min(q.marks || 0, Math.floor((answerLength / 200) * (q.marks || 0) * (0.6 + Math.random() * 0.3)));
            earnedMarks += estimatedScore;
        });
        
        const percentage = ((earnedMarks / totalMarks) * 100).toFixed(1);
        
        return {
            totalMarks: totalMarks,
            earnedMarks: earnedMarks.toFixed(1),
            percentage: percentage,
            grade: this.getGrade(percentage)
        };
    },

    // Convert percentage to IB grade
    getGrade(percentage) {
        if (percentage >= 85) return '7';
        if (percentage >= 75) return '6';
        if (percentage >= 65) return '5';
        if (percentage >= 55) return '4';
        if (percentage >= 45) return '3';
        if (percentage >= 35) return '2';
        return '1';
    },

    // Reset exam
    reset() {
        if (this.examTimer) {
            clearInterval(this.examTimer);
        }
        this.currentExam = null;
        this.examStartTime = null;
        this.examQuestions = [];
        this.currentQuestionIndex = 0;
        this.examAnswers = [];
    }
};

