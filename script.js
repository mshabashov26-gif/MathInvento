// IB Math Mastery Engine - Main JavaScript

// Application State
const appState = {
    currentCourse: 'AA SL',
    currentTopic: null,
    currentDifficulty: 'Foundation',
    currentPaper: 'Paper1',
    examMode: false,
    currentQuestion: null,
    timer: null,
    timeRemaining: 0,
    hintUsed: false
};

// Master Prompt System (IB Math Mastery Engine)
const masterPrompt = `You are the "IB Math Mastery Engine," a specialized AI tutor for the International Baccalaureate (IB) Diploma Programme. You have exhaustive knowledge of the Mathematics: Analysis and Approaches (AA) and Applications and Interpretation (AI) syllabi for both SL and HL levels. Your goal is to help students achieve a Grade 7 by providing rigorous practice, conceptual clarity, and exam-style feedback.

Core Functions & Capabilities:
1. Syllabus-Specific Question Generation: Generate original questions based on the 5 IB Math topics. Differentiate between Paper 1 (Non-calculator) and Paper 2 (Calculator/GDC required). For HL students, generate Paper 3 style "Investigation" questions.
2. Step-by-Step Scaffolded Solutions: Provide breakdown: Conceptual Approach → Method → Execution → Final Answer. Highlight common pitfalls where students lose Method Marks (M-marks).
3. Mark Scheme Simulation: Analyze student answers. Assign marks based on official IB criteria: M (Method), A (Answer), R (Reasoning), and G (Graph/GDC use).
4. GDC Optimization: Explain specifically how to use Ti-Nspire or Casio CG-50 for complex operations.

Tone: Encouraging, precise, and academically rigorous.
Formatting: Use LaTeX for all mathematical expressions (inline: $...$, display: $$...$$).`;

// GDC Command Library
const gdcCommands = {
    'ti-nspire': {
        intersection: {
            title: 'Finding Function Intersection',
            steps: [
                'Open the Graphs application (press [home] → select Graphs)',
                'Enter the first function in f1(x), e.g., f1(x) = x^2 + 3',
                'Enter the second function in f2(x), e.g., f2(x) = 2x + 5',
                'Press [menu] → Analyze Graph → Intersection',
                'Select the first curve (f1), then the second curve (f2)',
                'Move the cursor near the intersection point and press [enter]',
                'The coordinates will be displayed: (x, y)'
            ]
        },
        derivative: {
            title: 'Numerical Derivative',
            steps: [
                'In the Calculator application, use the derivative template',
                'Press [menu] → Calculus → Numerical Derivative',
                'Enter the function, e.g., derivative(x^2, x)',
                'Or use the template: d/dx(f(x), x) at x = a',
                'For example: d/dx(x^3 + 2x, x) | x = 2',
                'Press [enter] to get the numerical value'
            ]
        },
        integral: {
            title: 'Numerical Integration',
            steps: [
                'In Calculator, press [menu] → Calculus → Numerical Integral',
                'Use the template: ∫(f(x), x, a, b)',
                'Enter: ∫(x^2, x, 0, 5) for the definite integral from 0 to 5',
                'Press [enter] to get the numerical result',
                'Alternative: In Graphs, press [menu] → Analyze Graph → Integral'
            ]
        },
        normal: {
            title: 'Normal Distribution',
            steps: [
                'Press [menu] → Statistics → Distributions → Normal Cdf',
                'Enter the lower bound, upper bound, mean, and standard deviation',
                'For P(X < a): NormalCdf(-∞, a, μ, σ)',
                'For inverse normal: Normal Inverse (Menu → Statistics → Distributions)',
                'Use NormalPdf for probability density function values'
            ]
        },
        'chi-squared': {
            title: 'Chi-Squared Test',
            steps: [
                'Enter your data into lists (press [home] → Lists & Spreadsheet)',
                'Press [menu] → Statistics → Stat Tests → χ² Goodness-of-fit',
                'Or use χ² 2-way test for contingency tables',
                'Select your observed data list and expected data list',
                'Press [enter] to perform the test',
                'Results include: χ² statistic, p-value, and degrees of freedom'
            ]
        },
        matrix: {
            title: 'Matrix Operations',
            steps: [
                'Press [home] → Calculator',
                'Press [ctrl] + [×] to insert a matrix template',
                'Enter matrix dimensions (rows × columns)',
                'Enter matrix elements',
                'Operations: Press [×] for multiplication, [^] for power',
                'For inverse: Use the template or raise matrix to power -1',
                'For determinant: Use det() function'
            ]
        },
        regression: {
            title: 'Regression Analysis',
            steps: [
                'Enter data in Lists & Spreadsheet application',
                'Name columns: xList and yList',
                'Insert a new Data & Statistics page',
                'Add variables to x and y axes',
                'Press [menu] → Analyze → Regression → [choose type]',
                'Options: Linear (mx+b), Quadratic, Exponential, etc.',
                'The equation and correlation coefficient (r²) will be displayed'
            ]
        },
        solve: {
            title: 'Equation Solver',
            steps: [
                'In Calculator, use the solve() function',
                'Syntax: solve(equation, variable)',
                'Example: solve(x^2 + 5x + 6 = 0, x)',
                'For systems: solve({eq1, eq2}, {x, y})',
                'For numerical solving: nSolve(equation, variable, guess)',
                'Alternative: Use the Equations app for systems'
            ]
        }
    },
    'casio-cg50': {
        intersection: {
            title: 'Finding Function Intersection',
            steps: [
                'Press [MENU] → Graph',
                'Enter Y1: x^2 + 3 and Y2: 2x + 5',
                'Press [F6] (DRAW) to plot the graphs',
                'Press [SHIFT] [F5] (G-Solv) → [F5] (ISCT)',
                'The calculator will find and display the intersection point',
                'Use [◄] [►] to switch between intersection points if multiple exist'
            ]
        },
        derivative: {
            title: 'Numerical Derivative',
            steps: [
                'Press [MENU] → Run-Matrix',
                'Press [OPTN] → [F2] (CALC) → [F1] (d/dx)',
                'Enter the function, e.g., d/dx(x^2, x)',
                'Enter the value of x where you want the derivative',
                'Press [EXE] to calculate',
                'For example: d/dx(x^3 + 2x, x)|x=2'
            ]
        },
        integral: {
            title: 'Numerical Integration',
            steps: [
                'Press [MENU] → Run-Matrix',
                'Press [OPTN] → [F2] (CALC) → [F4] (∫dx)',
                'Enter: ∫(x^2, 0, 5) for definite integral from 0 to 5',
                'Or use the template: ∫(function, lower limit, upper limit)',
                'Press [EXE] to calculate',
                'For improper integrals, use appropriate limits'
            ]
        },
        normal: {
            title: 'Normal Distribution',
            steps: [
                'Press [MENU] → Statistics',
                'Press [F5] (DIST) → [F1] (NORM)',
                'Select [F2] (Ncd) for cumulative distribution',
                'Enter Lower: -10^99 (or very negative), Upper: a, σ: σ, μ: μ',
                'Press [EXE] to get P(X < a)',
                'For inverse: [F3] (InvN) to find x such that P(X < x) = p'
            ]
        },
        'chi-squared': {
            title: 'Chi-Squared Test',
            steps: [
                'Enter data in Statistics mode ([MENU] → Statistics)',
                'Choose appropriate test: [F3] (TEST) → [F3] (CHI)',
                'For goodness-of-fit: [F1] (GOF)',
                'For 2-way test: [F2] (2WAY)',
                'Enter observed frequencies in matrix A',
                'Enter expected frequencies (if needed)',
                'Press [EXE] to perform test and view results'
            ]
        },
        matrix: {
            title: 'Matrix Operations',
            steps: [
                'Press [MENU] → Run-Matrix',
                'Press [F1] (MAT) to access matrix editor',
                'Define matrices: Press [F1] (Dim) to set dimensions',
                'Enter matrix elements',
                'Use [OPTN] → [F2] (MAT) for operations',
                'Operations: × (multiply), [F3] (det) for determinant, [x^-1] for inverse'
            ]
        },
        regression: {
            title: 'Regression Analysis',
            steps: [
                'Enter data in Statistics mode ([MENU] → Statistics)',
                'Enter x-values in List 1, y-values in List 2',
                'Press [F1] (GRAPH) → [F1] (GRAPH1) to plot scatter',
                'Press [F2] (CALC) → Select regression type',
                'Options: [F1] (X) Linear, [F2] (Med) Med-Med, [F3] (X^2) Quadratic, etc.',
                'Press [F6] (DRAW) to overlay regression line',
                'View equation and correlation coefficient'
            ]
        },
        solve: {
            title: 'Equation Solver',
            steps: [
                'Press [MENU] → Equation',
                'Select [F1] (Simul Equation) for systems',
                'Or [F2] (Polynomial) for polynomial equations',
                'Enter the degree/number of equations',
                'Enter coefficients',
                'Press [EXE] to solve',
                'For numerical solving: Use SOLVE function in Run-Matrix mode'
            ]
        }
    }
};

// Difficulty-based question templates
const questionTemplates = {
    Foundation: {
        'Number & Algebra': [
            'Solve the linear equation: $3x + 7 = 22$',
            'Simplify: $(2x + 3)(x - 4)$',
            'Factorize: $x^2 - 5x + 6$',
            'Find the value of $x$ if $2^{x+1} = 32$'
        ],
        Functions: [
            'Find $f(3)$ if $f(x) = 2x^2 - 5x + 1$',
            'Determine the domain of $f(x) = \\sqrt{x - 4}$',
            'Find the inverse of $f(x) = 3x - 2$'
        ],
        'Geometry & Trig': [
            'In a right triangle, if one angle is $30°$ and the opposite side is 5 cm, find the hypotenuse.',
            'Convert $\\frac{5\\pi}{6}$ radians to degrees.',
            'Find the area of a triangle with sides 5, 6, and 7 cm.'
        ],
        'Stats & Probability': [
            'Calculate the mean of the data set: 12, 15, 18, 20, 22',
            'A fair die is rolled. Find the probability of rolling a prime number.',
            'Find the median of: 3, 7, 9, 12, 15, 18, 22'
        ],
        Calculus: [
            'Differentiate: $f(x) = x^3 - 4x^2 + 2x - 1$',
            'Find $\\frac{d}{dx}(\\sin x)$',
            'Evaluate $\\int 3x^2 dx$'
        ]
    },
    Standard: {
        'Number & Algebra': [
            'Solve the quadratic equation $2x^2 - 7x + 3 = 0$ using the quadratic formula.',
            'Simplify $\\frac{x^2 - 9}{x^2 - 5x + 6}$',
            'Solve the system: $2x + 3y = 11$ and $x - y = 2$'
        ],
        Functions: [
            'Given $f(x) = x^2 - 4x + 3$, find the vertex and axis of symmetry.',
            'Find the range of $f(x) = \\frac{1}{x-2}$',
            'If $f(x) = 2x + 1$ and $g(x) = x^2$, find $(f \\circ g)(x)$'
        ],
        'Geometry & Trig': [
            'Solve triangle ABC where $a = 8$, $b = 10$, and angle $C = 60°$.',
            'Prove that $\\sin^2 \\theta + \\cos^2 \\theta = 1$',
            'Find the exact value of $\\sin(75°)$ using compound angle formulas.'
        ],
        'Stats & Probability': [
            'Calculate the standard deviation of: 10, 15, 20, 25, 30',
            'In a class of 30 students, 12 study Physics and 18 study Chemistry. If 8 study both, find the probability a randomly chosen student studies at least one.',
            'A binomial experiment has $n = 20$, $p = 0.3$. Find $P(X = 5)$'
        ],
        Calculus: [
            'Use the product rule to differentiate $f(x) = x^2 \\sin x$',
            'Find the equation of the tangent to $y = x^3 - 3x + 2$ at $x = 1$',
            'Evaluate $\\int_0^2 (3x^2 - 2x + 1) dx$'
        ]
    },
    Distinction: {
        'Number & Algebra': [
            'Prove that $\\sqrt{2}$ is irrational.',
            'Solve the equation $2^{x+1} + 2^{x-1} = 10$',
            'Find all complex solutions to $z^3 = 8i$'
        ],
        Functions: [
            'Investigate the behavior of $f(x) = \\frac{x^3 - 1}{x^2 - 1}$ as $x \\to 1$',
            'Prove that $f(x) = x^3 + x$ is one-to-one.',
            'Find the inverse of $f(x) = \\ln(x + \\sqrt{x^2 + 1})$'
        ],
        'Geometry & Trig': [
            'Prove the cosine rule: $c^2 = a^2 + b^2 - 2ab\\cos C$',
            'Solve $\\sin 2x = \\cos x$ for $0 \\leq x \\leq 2\\pi$',
            'Find the exact area of the triangle with vertices at $(0,0)$, $(3,4)$, and $(5,2)$ using determinants.'
        ],
        'Stats & Probability': [
            'A factory produces items with a defect rate of 5%. Using a normal approximation, find the probability that in a batch of 200 items, more than 12 are defective.',
            'Perform a chi-squared test on the following contingency table: [data]',
            'Derive the formula for the variance of a binomial distribution.'
        ],
        Calculus: [
            'Use L\'Hôpital\'s rule to evaluate $\\lim_{x \\to 0} \\frac{\\sin x}{x}$',
            'Find the area enclosed by the curves $y = x^2$ and $y = 2x - x^2$',
            'Investigate the convergence of $\\int_1^\\infty \\frac{1}{x^p} dx$ for different values of $p$'
        ]
    }
};

// Paper 3 Investigation Templates
const paper3Investigations = [
    {
        title: 'Pattern Investigation: Pascal\'s Triangle',
        question: `Investigate the patterns in Pascal's triangle. Consider:
        1. The relationship between row $n$ and the binomial coefficients $\\binom{n}{r}$
        2. The sum of each row
        3. Patterns in the diagonals
        4. Generalize your findings and prove at least one pattern algebraically.`
    },
    {
        title: 'Sequences and Series',
        question: `Consider the sequence defined by $a_n = \\frac{n^2}{2^n}$.
        1. Calculate the first 10 terms
        2. Investigate the behavior as $n \\to \\infty$
        3. Find $\\lim_{n \\to \\infty} a_n$ and justify your answer
        4. Determine if the series $\\sum_{n=1}^{\\infty} a_n$ converges`
    },
    {
        title: 'Optimization Problem',
        question: `A cylindrical can must hold $V$ cm³ of liquid. The material for the top and bottom costs $c_1$ per cm², while the side costs $c_2$ per cm².
        1. Express the total cost as a function of the radius $r$
        2. Find the dimensions that minimize cost
        3. Investigate how the ratio $\\frac{c_1}{c_2}$ affects the optimal dimensions
        4. Generalize your findings`
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    updateUI();
    initializeNewFeatures();
});

function initializeEventListeners() {
    // Course selection
    document.getElementById('courseSelect').addEventListener('change', (e) => {
        appState.currentCourse = e.target.value;
        updatePaper3Visibility();
        updateUI();
    });

    // Topic selection
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            appState.currentTopic = e.target.dataset.topic;
        });
    });

    // Difficulty selection
    document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.currentDifficulty = e.target.value;
        });
    });

    // Paper selection
    document.querySelectorAll('input[name="paper"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.currentPaper = e.target.value;
        });
    });

    // Exam mode toggle
    document.getElementById('examModeToggle').addEventListener('change', (e) => {
        appState.examMode = e.target.checked;
        updateModeLabel();
        if (appState.examMode) {
            startExamMode();
        } else {
            stopExamMode();
        }
    });

    // Generate question button
    document.getElementById('generateQuestionBtn').addEventListener('click', generateQuestion);
    
    // Random question button
    const randomBtn = document.getElementById('randomQuestionBtn');
    if (randomBtn) {
        randomBtn.addEventListener('click', generateRandomQuestion);
    }

    // Paper 3 button
    document.getElementById('paper3Btn').addEventListener('click', generatePaper3Question);

    // Answer submission
    document.getElementById('submitAnswerBtn').addEventListener('click', submitAnswer);

    // Hint button
    document.getElementById('hintBtn').addEventListener('click', showHint);

    // Show solution button
    document.getElementById('showSolutionBtn').addEventListener('click', showSolution);

    // Start practice button - auto-generate random question
    document.getElementById('startPracticeBtn').addEventListener('click', () => {
        generateRandomQuestion();
    });

    // GDC Library toggle
    document.getElementById('gdcLibraryToggle').addEventListener('click', toggleGDCLibrary);

    // GDC model selection
    document.getElementById('gdcModelSelect').addEventListener('change', updateGDCInstructions);

    // GDC command buttons
    document.querySelectorAll('.gdc-command-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const command = e.target.dataset.command;
            showGDCInstructions(command, e.target);
        });
    });

    // Submit exam button
    document.getElementById('submitExamBtn').addEventListener('click', () => {
        stopExamMode();
        submitAnswer();
    });
}

function updateUI() {
    updatePaper3Visibility();
    updateModeLabel();
}

function updatePaper3Visibility() {
    const isHL = appState.currentCourse.includes('HL');
    const paper3Option = document.getElementById('paper3Option');
    const paper3Btn = document.getElementById('paper3Btn');
    
    if (isHL) {
        paper3Option.style.display = 'block';
        paper3Btn.style.display = 'block';
    } else {
        paper3Option.style.display = 'none';
        paper3Btn.style.display = 'none';
        if (appState.currentPaper === 'Paper3') {
            document.querySelector('input[name="paper"][value="Paper1"]').checked = true;
            appState.currentPaper = 'Paper1';
        }
    }
}

function updateModeLabel() {
    const label = document.getElementById('modeLabel');
    label.textContent = appState.examMode ? 'Exam Mode' : 'Practice Mode';
}

// Generate random question with random filters
function generateRandomQuestion() {
    // Random topic
    const topics = ['Number & Algebra', 'Functions', 'Geometry & Trig', 'Stats & Probability', 'Calculus'];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    // Random difficulty
    const difficulties = ['Foundation', 'Standard', 'Distinction'];
    const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    
    // Random paper (but check if HL for Paper 3)
    const isHL = appState.currentCourse.includes('HL');
    const papers = ['Paper1', 'Paper2', ...(isHL ? ['Paper3'] : [])];
    const randomPaper = papers[Math.floor(Math.random() * papers.length)];
    
    // Set random values
    appState.currentTopic = randomTopic;
    appState.currentDifficulty = randomDifficulty;
    appState.currentPaper = randomPaper;
    
    // Update UI to reflect random selections with smooth transitions
    document.querySelectorAll('.topic-btn').forEach(btn => {
        const wasActive = btn.classList.contains('active');
        const isActive = btn.dataset.topic === randomTopic;
        if (wasActive !== isActive) {
            btn.style.transition = 'all var(--transition-base)';
            btn.classList.toggle('active', isActive);
        }
    });
    
    document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
        radio.checked = radio.value === randomDifficulty;
    });
    
    document.querySelectorAll('input[name="paper"]').forEach(radio => {
        radio.checked = radio.value === randomPaper;
    });
    
    // Generate question with random settings
    generateQuestionWithSettings();
}

function generateQuestion() {
    if (!appState.currentTopic) {
        // Show helpful message instead of alert
        const welcomeSection = document.getElementById('welcomeSection');
        if (welcomeSection) {
            welcomeSection.style.transition = 'all var(--transition-base)';
            welcomeSection.innerHTML = `
                <div class="welcome-card">
                    <h2>📚 Select a Topic First!</h2>
                    <p style="margin: 1rem 0; font-size: 1.1rem;">Please choose a topic from the sidebar, or click "🎲 Random Question" to get started instantly!</p>
                    <button class="btn btn-primary btn-large" onclick="location.reload()">Go Back</button>
                </div>
            `;
        }
        return;
    }
    
    generateQuestionWithSettings();
}

function generateQuestionWithSettings() {
    // Smooth transitions
    const welcomeSection = document.getElementById('welcomeSection');
    const questionSection = document.getElementById('questionSection');
    const gdcPanel = document.getElementById('gdcLibraryPanel');
    
    if (welcomeSection && welcomeSection.style.display !== 'none') {
        welcomeSection.style.transition = 'opacity var(--transition-base), transform var(--transition-base)';
        welcomeSection.style.opacity = '0';
        welcomeSection.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            welcomeSection.style.display = 'none';
        }, 300);
    }
    
    if (questionSection) {
        questionSection.style.display = 'block';
        questionSection.style.opacity = '0';
        questionSection.style.transform = 'translateY(20px)';
        setTimeout(() => {
            questionSection.style.transition = 'opacity var(--transition-base), transform var(--transition-base)';
            questionSection.style.opacity = '1';
            questionSection.style.transform = 'translateY(0)';
        }, 50);
    }
    
    if (gdcPanel) gdcPanel.style.display = 'none';

    // Try to get a real IB question from the database first
    const paperKey = appState.currentPaper === 'Paper1' ? 'Paper1' : 
                     appState.currentPaper === 'Paper2' ? 'Paper2' : 
                     appState.currentPaper === 'Paper3' ? 'Paper2' : 'Paper1';
    
    let selectedQuestion = null;
    let selectedMarks = 0;
    
    // Try to get from database
    if (typeof getRandomQuestion !== 'undefined') {
        selectedQuestion = getRandomQuestion(appState.currentTopic, appState.currentDifficulty, paperKey);
    }
    
    // Fall back to templates if no database question found
    if (!selectedQuestion) {
        const templates = questionTemplates[appState.currentDifficulty]?.[appState.currentTopic];
        if (templates && templates.length > 0) {
            const randomQuestion = templates[Math.floor(Math.random() * templates.length)];
            selectedQuestion = {
                question: randomQuestion,
                marks: appState.currentDifficulty === 'Foundation' ? 4 : 
                       appState.currentDifficulty === 'Standard' ? 6 : 8
            };
        }
    }
    
    if (!selectedQuestion) {
        // Better error handling with UI
        if (questionSection) {
            questionSection.innerHTML = `
                <div class="welcome-card" style="text-align: center; padding: 3rem;">
                    <h2>⚠️ No Questions Available</h2>
                    <p style="margin: 1.5rem 0;">No questions found for this combination. Try:</p>
                    <ul style="text-align: left; margin: 1.5rem auto; max-width: 400px; line-height: 2;">
                        <li>Selecting a different topic</li>
                        <li>Choosing a different difficulty level</li>
                        <li>Clicking "🎲 Random Question" for a surprise!</li>
                    </ul>
                    <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
                </div>
            `;
        }
        return;
    }
    
    selectedMarks = selectedQuestion.marks || 
                    (appState.currentDifficulty === 'Foundation' ? 4 : 
                     appState.currentDifficulty === 'Standard' ? 6 : 8);
    
    appState.currentQuestion = {
        question: selectedQuestion.question,
        topic: appState.currentTopic,
        difficulty: appState.currentDifficulty,
        paper: appState.currentPaper,
        course: appState.currentCourse,
        marks: selectedMarks
    };

    displayQuestion(appState.currentQuestion);
    
    // Reset answer and feedback with smooth transitions
    const answerInput = document.getElementById('studentAnswer');
    const feedbackSection = document.getElementById('feedbackSection');
    if (answerInput) {
        answerInput.value = '';
        answerInput.style.transition = 'all var(--transition-base)';
    }
    if (feedbackSection) {
        feedbackSection.style.display = 'none';
        feedbackSection.style.opacity = '0';
    }
    appState.hintUsed = false;
    
    // Set marks with animation
    const marksEl = document.getElementById('questionMarks');
    if (marksEl) {
        marksEl.textContent = `[${selectedMarks} marks]`;
        marksEl.style.animation = 'pulse 0.5s ease-in-out';
    }
    
    // Start timer if in exam mode
    if (appState.examMode) {
        const timeLimit = selectedMarks * 1.5; // 1.5 minutes per mark
        startTimer(timeLimit * 60); // Convert to seconds
    }
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function generatePaper3Question() {
    if (!appState.currentCourse.includes('HL')) {
        alert('Paper 3 is only available for HL students!');
        return;
    }

    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('questionSection').style.display = 'block';
    document.getElementById('gdcLibraryPanel').style.display = 'none';

    // Try to get a real Paper 3 question from database first
    let investigation = null;
    
    if (typeof paper3Questions !== 'undefined' && paper3Questions.length > 0) {
        investigation = paper3Questions[Math.floor(Math.random() * paper3Questions.length)];
    } else {
        // Fall back to templates
        investigation = paper3Investigations[Math.floor(Math.random() * paper3Investigations.length)];
        investigation.marks = 20;
    }
    
    appState.currentQuestion = {
        question: investigation.question || `<h4>${investigation.title}</h4><p>${investigation.question}</p>`,
        topic: investigation.topic || 'Investigation',
        difficulty: investigation.difficulty || 'Distinction',
        paper: 'Paper3',
        course: appState.currentCourse,
        isInvestigation: true,
        marks: investigation.marks || 20
    };

    displayQuestion(appState.currentQuestion);
    
    document.getElementById('studentAnswer').value = '';
    document.getElementById('feedbackSection').style.display = 'none';
    appState.hintUsed = false;
    document.getElementById('questionMarks').textContent = `[${appState.currentQuestion.marks} marks]`;
    
    if (appState.examMode) {
        startTimer(1800); // 30 minutes for Paper 3
    }
}

function displayQuestion(question) {
    const questionContent = document.getElementById('questionContent');
    if (!questionContent) return;
    
    questionContent.style.opacity = '0';
    questionContent.style.transition = 'opacity var(--transition-base)';
    
    questionContent.innerHTML = `
        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(168, 213, 226, 0.1); border-radius: 12px; border-left: 4px solid var(--primary-color);">
            <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">
                <strong>Course:</strong> ${question.course || appState.currentCourse} | 
                <strong>Paper:</strong> ${question.paper || appState.currentPaper} | 
                <strong>Difficulty:</strong> ${question.difficulty || appState.currentDifficulty}
            </p>
        </div>
        <div class="question-text">${question.question}</div>
    `;
    
    // Smooth fade in
    setTimeout(() => {
        questionContent.style.opacity = '1';
    }, 50);
    
    // Render LaTeX
    MathJax.typesetPromise([questionContent]).catch((err) => {
        console.error('MathJax rendering error:', err);
        // Retry once
        setTimeout(() => {
            MathJax.typesetPromise([questionContent]).catch(e => console.error('MathJax retry failed:', e));
        }, 500);
    });
}

function startExamMode() {
    const examBar = document.getElementById('examModeBar');
    examBar.style.display = 'flex';
    
    // Disable hints in exam mode
    document.getElementById('hintBtn').disabled = true;
    document.getElementById('showSolutionBtn').disabled = true;
    
    if (appState.currentQuestion) {
        const marksEl = document.getElementById('questionMarks');
    const marks = marksEl ? parseInt(marksEl.textContent.match(/\d+/)?.[0] || question.marks || 5) : (question.marks || 5);
        const timeLimit = marks * 1.5 * 60;
        startTimer(timeLimit);
    }
}

function stopExamMode() {
    const examBar = document.getElementById('examModeBar');
    examBar.style.display = 'none';
    
    if (appState.timer) {
        clearInterval(appState.timer);
        appState.timer = null;
    }
    
    // Re-enable hints
    document.getElementById('hintBtn').disabled = false;
    document.getElementById('showSolutionBtn').disabled = false;
}

function startTimer(seconds) {
    if (appState.timer) {
        clearInterval(appState.timer);
    }
    
    appState.timeRemaining = seconds;
    updateTimerDisplay();
    
    appState.timer = setInterval(() => {
        appState.timeRemaining--;
        updateTimerDisplay();
        
        if (appState.timeRemaining <= 0) {
            clearInterval(appState.timer);
            alert('Time is up! Submitting your answer...');
            submitAnswer();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(appState.timeRemaining / 60);
    const seconds = appState.timeRemaining % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timerDisplay').textContent = display;
    
    // Change color when time is running low
    if (appState.timeRemaining < 60) {
        document.getElementById('timerDisplay').style.color = '#ff0000';
    } else {
        document.getElementById('timerDisplay').style.color = 'white';
    }
}

function submitAnswer() {
    const answer = document.getElementById('studentAnswer').value.trim();
    
    if (!answer) {
        alert('Please enter an answer before submitting!');
        return;
    }
    
    // Stop timer
    if (appState.timer) {
        clearInterval(appState.timer);
        appState.timer = null;
    }
    
    // Generate feedback using AI prompt system
    generateFeedback(answer);
}

function generateFeedback(studentAnswer) {
    const question = appState.currentQuestion;
    const feedbackSection = document.getElementById('feedbackSection');
    const feedbackContent = document.getElementById('feedbackContent');
    const markingBreakdown = document.getElementById('markingBreakdown');
    
    // Simulate AI-generated feedback (in a real implementation, this would call an AI API)
    const feedback = simulateAIFeedback(question, studentAnswer);
    
    feedbackContent.innerHTML = feedback.text;
    markingBreakdown.innerHTML = feedback.marking;
    
    feedbackSection.style.display = 'block';
    
    // Render LaTeX in feedback
    MathJax.typesetPromise([feedbackContent, markingBreakdown]).catch((err) => {
        console.error('MathJax rendering error:', err);
    });
    
    // Record statistics and update user stats
    if (question) {
        const marks = question.marks || parseInt(document.getElementById('questionMarks').textContent.match(/\d+/)?.[0] || 0);
        const earnedMarks = parseInt(feedback.marking.match(/Total.*?(\d+)/)?.[1] || Math.floor(marks * 0.7));
        
        // Update AuthSystem user stats (new system - prioritized)
        if (typeof AuthSystem !== 'undefined') {
            const user = AuthSystem.getCurrentUser();
            if (user) {
                user.stats.totalQuestions++;
                user.stats.totalMarks += marks;
                user.stats.earnedMarks = (user.stats.earnedMarks || 0) + earnedMarks;
                user.stats.averageScore = ((user.stats.earnedMarks / user.stats.totalMarks) * 100).toFixed(1);
                
                AuthSystem.updateStreak(user);
                AuthSystem.calculateLevel(user);
                AuthSystem.checkAchievements(user);
                AuthSystem.saveUsers();
                
                // Update groups leaderboards
                if (typeof GroupsSystem !== 'undefined' && user.groups) {
                    user.groups.forEach(groupId => {
                        GroupsSystem.updateGroupLeaderboard(groupId);
                    });
                }
                
                if (typeof updateUserHeader === 'function') updateUserHeader();
            }
        }
        
        // Update ProfileManager (old system - fallback)
        if (typeof ProfileManager !== 'undefined') {
            ProfileManager.recordAttempt(
                question.topic || 'Unknown',
                question.difficulty || 'Foundation',
                question.paper || 'Paper1',
                marks,
                earnedMarks
            );
        }
    }
    
    // Scroll to feedback
    feedbackSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function simulateAIFeedback(question, answer) {
    // This simulates what the AI would generate
    // In production, this would be an API call to OpenAI, Anthropic, etc.
    
    const marksEl = document.getElementById('questionMarks');
    const marks = marksEl ? parseInt(marksEl.textContent.match(/\d+/)?.[0] || question.marks || 5) : (question.marks || 5);
    const awardedMarks = Math.floor(marks * (0.6 + Math.random() * 0.3)); // Simulate 60-90% marks
    
    const feedbackText = `
        <h4>Feedback:</h4>
        <p><strong>Conceptual Approach:</strong> Your approach shows understanding of the ${question.topic} topic. 
        ${answer.length > 50 ? 'You have provided a detailed solution.' : 'Consider expanding your explanation to show more working.'}</p>
        
        <p><strong>Method:</strong> The method you've used is appropriate. Remember to clearly show all steps, 
        as method marks (M-marks) are awarded for correct processes even if the final answer is incorrect.</p>
        
        <p><strong>Common Pitfalls:</strong> Make sure to:
        <ul>
            <li>Show clear working for each step</li>
            <li>Use correct mathematical notation</li>
            <li>Check your answer makes sense in context</li>
        </ul></p>
        
        <p><strong>Suggestions for Improvement:</strong> To improve your Grade 7 potential, practice more 
        ${question.difficulty === 'Distinction' ? 'proof-based and investigation-style questions' : 
          question.difficulty === 'Standard' ? 'multi-step problems that require deeper analysis' : 
          'fundamental techniques and build confidence'}. Consider timing yourself to improve exam performance.</p>
    `;
    
    const markingHTML = `
        <h4>Marking Breakdown:</h4>
        <div class="mark awarded">
            <span><strong>Method Marks (M):</strong> ${Math.floor(awardedMarks * 0.6)} / ${Math.floor(marks * 0.6)}</span>
        </div>
        <div class="mark ${awardedMarks >= marks * 0.8 ? 'awarded' : 'not-awarded'}">
            <span><strong>Answer Marks (A):</strong> ${Math.floor(awardedMarks * 0.3)} / ${Math.floor(marks * 0.3)}</span>
        </div>
        <div class="mark ${awardedMarks >= marks * 0.9 ? 'awarded' : 'not-awarded'}">
            <span><strong>Reasoning Marks (R):</strong> ${Math.floor(awardedMarks * 0.1)} / ${Math.floor(marks * 0.1)}</span>
        </div>
        <div class="mark total" style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border-color);">
            <span><strong>Total:</strong> ${awardedMarks} / ${marks}</span>
        </div>
        <p style="margin-top: 1rem;"><em>Note: This is an AI-generated assessment. Actual IB marking may vary.</em></p>
    `;
    
    return { text: feedbackText, marking: markingHTML };
}

function showHint() {
    if (appState.examMode) {
        alert('Hints are not available in Exam Mode!');
        return;
    }
    
    appState.hintUsed = true;
    const question = appState.currentQuestion;
    
    const hints = {
        'Number & Algebra': 'Remember to use algebraic manipulation techniques. Check if you can factorize or use substitution.',
        'Functions': 'Consider the domain and range. Think about transformations and inverse operations.',
        'Geometry & Trig': 'Use trigonometric identities and the unit circle. Remember SOH CAH TOA for right triangles.',
        'Stats & Probability': 'Check if you need to use probability rules (addition, multiplication) or statistical tests.',
        'Calculus': 'Apply differentiation/integration rules systematically. Check your constants of integration.'
    };
    
    const hint = hints[question.topic] || 'Break down the problem into smaller steps. Show all your working clearly.';
    
    alert(`Hint: ${hint}`);
}

function showSolution() {
    if (appState.examMode) {
        alert('Solutions are not available in Exam Mode!');
        return;
    }
    
    const question = appState.currentQuestion;
    const solution = generateSolution(question);
    
    const feedbackSection = document.getElementById('feedbackSection');
    const feedbackContent = document.getElementById('feedbackContent');
    
    feedbackContent.innerHTML = `
        <h4>Complete Solution:</h4>
        ${solution}
        <p style="margin-top: 1rem;"><strong>Key Takeaways:</strong> This solution demonstrates the scaffolded approach: 
        Conceptual Understanding → Method Selection → Execution → Verification. Practice similar problems to build fluency.</p>
    `;
    
    feedbackSection.style.display = 'block';
    
    MathJax.typesetPromise([feedbackContent]).catch((err) => {
        console.error('MathJax rendering error:', err);
    });
    
    feedbackSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function generateSolution(question) {
    // Generate scaffolded solution
    return `
        <p><strong>Step 1: Understanding the Problem</strong><br>
        Identify what is being asked and what information is given.</p>
        
        <p><strong>Step 2: Choose the Method</strong><br>
        Select the appropriate technique for this ${question.difficulty}-level problem in ${question.topic}.</p>
        
        <p><strong>Step 3: Execute the Solution</strong><br>
        Show all working clearly. For example, if solving an equation:
        $$\\text{Show each algebraic step}$$
        $$\\text{Check your answer by substitution}$$</p>
        
        <p><strong>Step 4: Final Answer</strong><br>
        Present your answer clearly and check if it makes sense in context.</p>
        
        <p><em>Note: This is a template solution. The actual solution depends on the specific question.</em></p>
    `;
}

function toggleGDCLibrary() {
    const panel = document.getElementById('gdcLibraryPanel');
    const questionSection = document.getElementById('questionSection');
    const welcomeSection = document.getElementById('welcomeSection');
    
    if (panel.style.display === 'none' || !panel.style.display) {
        panel.style.display = 'block';
        questionSection.style.display = 'none';
        welcomeSection.style.display = 'none';
    } else {
        panel.style.display = 'none';
    }
}

function updateGDCInstructions() {
    const model = document.getElementById('gdcModelSelect').value;
    // Update instructions if a command was already selected
    const activeBtn = document.querySelector('.gdc-command-btn.active');
    if (activeBtn) {
        showGDCInstructions(activeBtn.dataset.command, activeBtn);
    }
}

function showGDCInstructions(command, clickedBtn) {
    const model = document.getElementById('gdcModelSelect').value;
    const instructionContent = document.getElementById('gdcInstructionContent');
    
    // Remove active class from all buttons
    document.querySelectorAll('.gdc-command-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }
    
    const instruction = gdcCommands[model][command];
    
    if (instruction) {
        instructionContent.innerHTML = `
            <h4>${instruction.title}</h4>
            <ol>
                ${instruction.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        `;
    } else {
        instructionContent.innerHTML = '<p>Instructions not available for this command.</p>';
    }
}

// ============ NEW FEATURES INTEGRATION ============

function initializeNewFeatures() {
    // Initialize authentication and systems
    if (typeof AuthSystem !== 'undefined') {
        AuthSystem.init();
        checkAuthAndShowModal();
    }
    
    if (typeof GroupsSystem !== 'undefined') {
        GroupsSystem.init();
    }
    
    // Initialize profile display
    if (typeof ProfileManager !== 'undefined') {
        ProfileManager.init();
        updateProfileDisplay();
    }
    
    // Initialize statistics display
    updateStatisticsDisplay();
    
    // Setup navigation
    setupNavigation();
    
    // Setup AI chat
    setupAIChat();
    
    // Setup formula booklet
    setupFormulaBooklet();
    
    // Setup mock exam
    setupMockExam();
    
    // Setup authentication UI
    setupAuthentication();
    
    // Setup leaderboards
    setupLeaderboards();
    
    // Setup groups
    setupGroups();
    
    // Setup achievements
    setupAchievements();
}

// Navigation between sections
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.target.dataset.section;
            
            // Remove active class from all buttons
            navButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Hide all sections
            document.querySelectorAll('.section-panel, #questionSection, #welcomeSection, #gdcLibraryPanel').forEach(panel => {
                panel.style.display = 'none';
            });
            
            // Show selected section
            switch(section) {
                case 'practice':
                    document.getElementById('welcomeSection').style.display = 'block';
                    break;
                case 'mockExam':
                    document.getElementById('mockExamSection').style.display = 'block';
                    updateMockExamDisplay();
                    break;
                case 'formulas':
                    document.getElementById('formulasSection').style.display = 'block';
                    displayFormulaBooklet('Number & Algebra');
                    break;
                case 'profile':
                    document.getElementById('profileSection').style.display = 'block';
                    updateProfileDisplay();
                    break;
                case 'statistics':
                    document.getElementById('statisticsSection').style.display = 'block';
                    updateStatisticsDisplay();
                    break;
            }
        });
    });
}

// Profile Management
function updateProfileDisplay() {
    // Try AuthSystem first (new system)
    if (typeof AuthSystem !== 'undefined') {
        const user = AuthSystem.getCurrentUser();
        if (user) {
            const nameEl = document.getElementById('profileName');
            const courseEl = document.getElementById('profileCourse');
            const totalEl = document.getElementById('totalQuestions');
            const avgEl = document.getElementById('averageScore');
            const memberEl = document.getElementById('memberSince');
            
            if (nameEl) nameEl.textContent = user.username || 'Student';
            if (courseEl) courseEl.textContent = user.course || 'AA SL';
            if (totalEl) totalEl.textContent = user.stats.totalQuestions || 0;
            if (avgEl) avgEl.textContent = (user.stats.averageScore || 0) + '%';
            
            const levelEl = document.getElementById('userLevel');
            if (levelEl) {
                const levelName = user.levelName || (typeof AuthSystem !== 'undefined' ? AuthSystem.getLevelName(user.level || 1) : 'Beginner');
                levelEl.textContent = levelName;
            }
            
            const streakEl = document.getElementById('currentStreak');
            if (streakEl) streakEl.textContent = (user.stats.currentStreak || 0) + ' 🔥';
            
            const joinDate = user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : '-';
            if (memberEl) memberEl.textContent = joinDate;
            
            // Update name button
            const updateBtn = document.getElementById('updateNameBtn');
            if (updateBtn && !updateBtn.onclick) {
                updateBtn.onclick = () => {
                    const newName = document.getElementById('nameInput')?.value.trim();
                    if (newName) {
                        user.username = newName;
                        AuthSystem.saveUsers();
                        updateProfileDisplay();
                        updateUserHeader();
                        const nameInput = document.getElementById('nameInput');
                        if (nameInput) nameInput.value = '';
                    }
                };
            }
            return;
        }
    }
    
    // Fallback to ProfileManager (old system)
    if (typeof ProfileManager !== 'undefined') {
        const profile = ProfileManager.getProfile();
        const nameEl = document.getElementById('profileName');
        const courseEl = document.getElementById('profileCourse');
        const totalEl = document.getElementById('totalQuestions');
        const avgEl = document.getElementById('averageScore');
        const memberEl = document.getElementById('memberSince');
        
        if (nameEl) nameEl.textContent = profile.name || 'Student';
        if (courseEl) courseEl.textContent = profile.course || 'AA SL';
        if (totalEl) totalEl.textContent = profile.totalQuestions || 0;
        if (avgEl) avgEl.textContent = (profile.averageScore || 0) + '%';
        
        const joinDate = profile.joinedDate ? new Date(profile.joinedDate).toLocaleDateString() : '-';
        if (memberEl) memberEl.textContent = joinDate;
        
        // Update name button
        const updateBtn = document.getElementById('updateNameBtn');
        if (updateBtn && !updateBtn.onclick) {
            updateBtn.onclick = () => {
                const newName = document.getElementById('nameInput')?.value.trim();
                if (newName) {
                    ProfileManager.updateName(newName);
                    updateProfileDisplay();
                    const nameInput = document.getElementById('nameInput');
                    if (nameInput) nameInput.value = '';
                }
            };
        }
    }
}

// Statistics Display
function updateStatisticsDisplay() {
    if (typeof ProfileManager === 'undefined') return;
    
    const bestWorst = ProfileManager.getBestWorstTopics();
    const stats = ProfileManager.getStatistics();
    
    // Best and worst topics
    const bestEl = document.getElementById('bestTopic');
    const worstEl = document.getElementById('worstTopic');
    
    if (bestEl && bestWorst.best) {
        bestEl.innerHTML = `
            <strong>${bestWorst.best.name}</strong><br>
            Score: ${bestWorst.best.averageScore}%<br>
            Attempts: ${bestWorst.best.attempts}
        `;
    }
    
    if (worstEl && bestWorst.worst) {
        worstEl.innerHTML = `
            <strong>${bestWorst.worst.name}</strong><br>
            Score: ${bestWorst.worst.averageScore}%<br>
            Attempts: ${bestWorst.worst.attempts}
        `;
    }
    
    // Topic stats list
    const topicList = document.getElementById('topicStatsList');
    if (topicList) {
        topicList.innerHTML = bestWorst.all.map(topic => `
            <div class="topic-stat-item">
                <strong>${topic.name}</strong>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${topic.averageScore}%"></div>
                </div>
                <span>${topic.averageScore}% (${topic.attempts} attempts)</span>
            </div>
        `).join('');
    }
    
    // Recent activity
    const activityList = document.getElementById('recentActivityList');
    if (activityList && stats.recentActivity) {
        activityList.innerHTML = stats.recentActivity.slice(0, 10).map(activity => `
            <div class="activity-item">
                <span>${new Date(activity.date).toLocaleString()}</span>
                <span>${activity.topic} - ${activity.difficulty}</span>
                <span>${activity.score} (${activity.marks})</span>
            </div>
        `).join('') || '<p>No recent activity</p>';
    }
}

// AI Chat Setup
function setupAIChat() {
    if (typeof AIChatHelper === 'undefined') return;
    
    const chatToggle = document.getElementById('aiChatToggle');
    const chatPanel = document.getElementById('aiChatPanel');
    const closeChat = document.getElementById('closeChatBtn');
    const sendBtn = document.getElementById('sendChatBtn');
    const chatInput = document.getElementById('chatInput');
    
    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            if (chatPanel) {
                chatPanel.style.display = chatPanel.style.display === 'none' ? 'block' : 'none';
                if (chatPanel.style.display === 'block') {
                    loadChatHistory();
                }
            }
        });
    }
    
    if (closeChat) {
        closeChat.addEventListener('click', () => {
            if (chatPanel) chatPanel.style.display = 'none';
        });
    }
    
    const sendMessage = async () => {
        if (!chatInput) return;
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message to UI
        addChatMessage('user', message);
        chatInput.value = '';
        
        // Get AI response
        const context = {
            currentTopic: appState.currentTopic,
            currentDifficulty: appState.currentDifficulty
        };
        
        const response = await AIChatHelper.sendMessage(message, context);
        addChatMessage('assistant', response);
        
        // Render MathJax
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            MathJax.typesetPromise([chatMessages]).catch(err => console.error(err));
        }
    };
    
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
}

function addChatMessage(role, content) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role === 'user' ? 'user-message' : 'ai-message'}`;
    messageDiv.innerHTML = `<p>${content}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function loadChatHistory() {
    if (typeof AIChatHelper === 'undefined') return;
    
    const history = AIChatHelper.getChatHistory();
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    // Clear existing messages except the initial greeting
    const greeting = chatMessages.querySelector('.ai-message');
    chatMessages.innerHTML = '';
    if (greeting) chatMessages.appendChild(greeting);
    
    history.forEach(msg => {
        if (msg.role !== 'system') {
            addChatMessage(msg.role, msg.content);
        }
    });
    
    MathJax.typesetPromise([chatMessages]).catch(err => console.error(err));
}

// Formula Booklet Setup
function setupFormulaBooklet() {
    const topicButtons = document.querySelectorAll('.formula-topic-btn');
    topicButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            topicButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const topic = e.target.dataset.topic;
            displayFormulaBooklet(topic);
        });
    });
}

function displayFormulaBooklet(topic) {
    if (typeof FormulaBooklet === 'undefined') return;
    
    const topicData = FormulaBooklet[topic];
    if (!topicData) return;
    
    const content = document.getElementById('formulaContent');
    if (!content) return;
    
    let html = `<h3>${topicData.title}</h3>`;
    
    topicData.formulas.forEach(category => {
        html += `<div class="formula-category"><h4>${category.category}</h4>`;
        category.items.forEach(item => {
            html += `<div class="formula-item">`;
            html += `<div class="formula-name"><strong>${item.name}</strong></div>`;
            if (item.formula) {
                html += `<div class="formula">${item.formula}</div>`;
            }
            if (item.formula2) {
                html += `<div class="formula">${item.formula2}</div>`;
            }
            if (item.formula3) {
                html += `<div class="formula">${item.formula3}</div>`;
            }
            if (item.formula4) {
                html += `<div class="formula">${item.formula4}</div>`;
            }
            if (item.description) {
                html += `<div class="formula-description">${item.description}</div>`;
            }
            html += `</div>`;
        });
        html += `</div>`;
    });
    
    content.innerHTML = html;
    
    // Render MathJax
    MathJax.typesetPromise([content]).catch(err => console.error(err));
}

// Mock Exam Setup
function setupMockExam() {
    const createBtn = document.getElementById('createExamBtn');
    if (createBtn) {
        createBtn.addEventListener('click', () => {
            const courseEl = document.getElementById('examCourseSelect');
            const paperEl = document.getElementById('examPaperSelect');
            if (!courseEl || !paperEl) return;
            
            const course = courseEl.value;
            const paperType = paperEl.value;
            const duration = paperType === 'Paper3' ? 60 : 90;
            
            if (typeof MockExamManager !== 'undefined') {
                const exam = MockExamManager.createExam(course, paperType, duration);
                MockExamManager.startExam();
                displayMockExam();
            }
        });
    }
    
    updateMockExamDisplay();
}

function displayMockExam() {
    if (typeof MockExamManager === 'undefined' || !MockExamManager.currentExam) return;
    
    const setupEl = document.getElementById('mockExamSetup');
    const activeEl = document.getElementById('mockExamActive');
    if (setupEl) setupEl.style.display = 'none';
    if (activeEl) activeEl.style.display = 'block';
    
    const exam = MockExamManager.currentExam;
    const navigation = document.getElementById('examNavigation');
    
    // Display current question
    updateMockExamQuestion();
    
    // Create navigation
    if (navigation) {
        let navHTML = '<div class="exam-nav-buttons">';
        exam.questions.forEach((q, index) => {
            navHTML += `<button class="exam-nav-btn" onclick="goToMockExamQuestion(${index})">Q${q.questionNumber}</button>`;
        });
        navHTML += '</div>';
        navHTML += '<button class="btn btn-primary" onclick="submitMockExam()">Submit Exam</button>';
        navigation.innerHTML = navHTML;
    }
}

function updateMockExamQuestion() {
    if (typeof MockExamManager === 'undefined') return;
    
    const currentQ = MockExamManager.examQuestions[MockExamManager.currentQuestionIndex];
    if (!currentQ) return;
    
    const questionDisplay = document.getElementById('examQuestionDisplay');
    if (!questionDisplay) return;
    
    questionDisplay.innerHTML = `
        <div class="exam-question-card">
            <div class="exam-question-header">
                <span>Question ${currentQ.questionNumber} (${currentQ.section})</span>
                <span>[${currentQ.marks} marks]</span>
            </div>
            <div class="exam-question-content">${currentQ.question}</div>
            <textarea class="exam-answer-input" id="examAnswerInput" placeholder="Write your answer here...">${MockExamManager.examAnswers[MockExamManager.currentQuestionIndex] || ''}</textarea>
            <button class="btn btn-secondary" onclick="saveMockExamAnswer()">Save Answer</button>
        </div>
    `;
    
    MathJax.typesetPromise([questionDisplay]).catch(err => console.error(err));
}

// Global functions for mock exam (called from HTML onclick)
window.goToMockExamQuestion = function(index) {
    if (typeof MockExamManager === 'undefined') return;
    
    // Save current answer
    saveMockExamAnswer();
    
    MockExamManager.goToQuestion(index);
    updateMockExamQuestion();
};

window.saveMockExamAnswer = function() {
    if (typeof MockExamManager === 'undefined') return;
    
    const answerInput = document.getElementById('examAnswerInput');
    const answer = answerInput ? answerInput.value : '';
    MockExamManager.saveAnswer(MockExamManager.currentQuestionIndex, answer);
};

window.submitMockExam = function() {
    if (typeof MockExamManager === 'undefined') return;
    
    if (!confirm('Are you sure you want to submit? You cannot change answers after submission.')) {
        return;
    }
    
    // Save current answer
    saveMockExamAnswer();
    
    // End exam
    const exam = MockExamManager.endExam();
    const score = MockExamManager.calculateScore();
    
    // Save to history
    if (typeof ProfileManager !== 'undefined') {
        ProfileManager.saveMockExamResult({
            course: exam.course,
            paper: exam.paper,
            score: score.percentage,
            grade: score.grade,
            totalMarks: score.totalMarks,
            earnedMarks: score.earnedMarks
        });
    }
    
    // Display results
    const activeEl = document.getElementById('mockExamActive');
    if (activeEl) {
        activeEl.innerHTML = `
            <div class="exam-results">
                <h2>Exam Complete!</h2>
                <div class="result-card">
                    <div class="result-stat">
                        <span>Total Marks: ${score.totalMarks}</span>
                        <span>Your Score: ${score.earnedMarks}</span>
                        <span>Percentage: ${score.percentage}%</span>
                        <span><strong>Grade: ${score.grade}</strong></span>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="resetMockExam()">Start New Exam</button>
            </div>
        `;
    }
};

window.resetMockExam = function() {
    if (typeof MockExamManager !== 'undefined') {
        MockExamManager.reset();
    }
    const setupEl = document.getElementById('mockExamSetup');
    const activeEl = document.getElementById('mockExamActive');
    if (setupEl) setupEl.style.display = 'block';
    if (activeEl) activeEl.style.display = 'none';
    updateMockExamDisplay();
};

function updateMockExamDisplay() {
    if (typeof ProfileManager === 'undefined') return;
    
    const history = ProfileManager.getMockExamHistory();
    const historyList = document.getElementById('examHistoryList');
    
    if (historyList) {
        if (history.length === 0) {
            historyList.innerHTML = '<p>No past exams</p>';
        } else {
            historyList.innerHTML = history.slice(0, 5).map(exam => `
                <div class="exam-history-item">
                    <span>${new Date(exam.date).toLocaleDateString()}</span>
                    <span>${exam.course} - ${exam.paper}</span>
                    <span>${exam.percentage}% (Grade ${exam.grade})</span>
                </div>
            `).join('');
        }
    }
}

