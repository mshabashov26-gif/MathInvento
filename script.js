// IB Math Mastery Engine - Main JavaScript (cleaned, fixed)
// This file is a corrected/sanitized replacement of the previous script.js
// It focuses on structural integrity, defensive checks, and core functionality
// (question generation, display, solution, timers, and initialization wiring).

/* =========================
   Application State
   ========================= */
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
window.appState = window.appState || appState;

/* =========================
   Master prompt, templates and GDC commands (kept from original)
   (Shortened / safe copies; expand as needed)
   ========================= */
const masterPrompt = `You are the "IB Math Mastery Engine," a specialized AI tutor...`;

// Minimal GDC commands and templates (kept concise; original content can be restored)
const gdcCommands = {
  'ti-nspire': {
    intersection: { title: 'Finding Function Intersection', steps: ['Open Graphs', 'Enter f1 and f2', 'Menu → Analyze → Intersection'] }
    // ... add others as required
  },
  'casio-cg50': {
    intersection: { title: 'Finding Function Intersection', steps: ['MENU → Graph', 'Enter Y1 and Y2', 'G-Solv → ISCT'] }
  }
};

const questionTemplates = {
  Foundation: {
    'Number & Algebra': ['Solve: $3x+7=22$'],
    Functions: ['Find $f(3)$ if $f(x)=2x^2-5x+1$'],
    'Geometry & Trig': ['Area of a triangle with sides 5,6,7'],
    'Stats & Probability': ['Calculate the mean of: 12,15,18'],
    Calculus: ['Differentiate $x^3 - 4x^2 + 2x - 1$']
  },
  Standard: {
    'Number & Algebra': ['Solve $2x^2-7x+3=0$'],
    Functions: ['Find vertex of $x^2-4x+3$'],
    'Geometry & Trig': ['Solve triangle with given sides/angles'],
    'Stats & Probability': ['Calculate standard deviation of a small set'],
    Calculus: ['Use product rule to differentiate $x^2 \\sin x$']
  },
  Distinction: {
    'Number & Algebra': ['Prove $\\sqrt{2}$ is irrational.'],
    Functions: ['Investigate $f(x) = (x^3-1)/(x^2-1)$ near $x=1$'],
    'Geometry & Trig': ['Prove cosine rule.'],
    'Stats & Probability': ['Normal approximation problem.'],
    Calculus: ['Use L\\\'Hôpital\\'s rule for $\\lim_{x\\to 0} \\frac{\\sin x}{x}$']
  }
};

const paper3Investigations = [
  { title: "Pascal's Triangle", question: 'Investigate patterns in Pascal\\'s triangle.' },
  { title: 'Sequence a_n = n^2 / 2^n', question: 'Investigate convergence and series.' }
];

/* =========================
   Utility: safe MathJax typeset
   ========================= */
function safeTypeset(elements = []) {
  if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
    try {
      return MathJax.typesetPromise(elements);
    } catch (err) {
      console.error('MathJax typesetPromise error:', err);
      return Promise.resolve();
    }
  }
  return Promise.resolve();
}

/* =========================
   Event listeners & UI wiring
   ========================= */
function initializeEventListeners() {
  // defensive DOM lookup and binding
  const courseSelect = document.getElementById('courseSelect');
  if (courseSelect) {
    courseSelect.addEventListener('change', (e) => {
      appState.currentCourse = e.target.value;
      updatePaper3Visibility();
      updateUI();
    });
  }

  document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      appState.currentTopic = e.target.dataset.topic;
    });
  });

  document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      appState.currentDifficulty = e.target.value;
    });
  });

  document.querySelectorAll('input[name="paper"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      appState.currentPaper = e.target.value;
    });
  });

  const examModeToggle = document.getElementById('examModeToggle');
  if (examModeToggle) {
    examModeToggle.addEventListener('change', (e) => {
      appState.examMode = e.target.checked;
      updateModeLabel();
      if (appState.examMode) startExamMode(); else stopExamMode();
    });
  }

  // Buttons and controls
  const genBtn = document.getElementById('generateQuestionBtn');
  if (genBtn) genBtn.addEventListener('click', generateQuestion);

  const randomBtn = document.getElementById('randomQuestionBtn');
  if (randomBtn) randomBtn.addEventListener('click', generateRandomQuestion);

  const paper3Btn = document.getElementById('paper3Btn');
  if (paper3Btn) paper3Btn.addEventListener('click', generatePaper3Question);

  const submitBtn = document.getElementById('submitAnswerBtn');
  if (submitBtn) submitBtn.addEventListener('click', submitAnswer);

  const hintBtn = document.getElementById('hintBtn');
  if (hintBtn) hintBtn.addEventListener('click', showHint);

  const showSolBtn = document.getElementById('showSolutionBtn');
  if (showSolBtn) showSolBtn.addEventListener('click', showSolution);

  const startPracticeBtn = document.getElementById('startPracticeBtn');
  if (startPracticeBtn) startPracticeBtn.addEventListener('click', generateRandomQuestion);

  const gdcToggle = document.getElementById('gdcLibraryToggle');
  if (gdcToggle) gdcToggle.addEventListener('click', toggleGDCLibrary);

  const gdcModelSelect = document.getElementById('gdcModelSelect');
  if (gdcModelSelect) gdcModelSelect.addEventListener('change', updateGDCInstructions);

  document.querySelectorAll('.gdc-command-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const command = e.target.dataset.command;
      showGDCInstructions(command, e.target);
    });
  });

  const submitExamBtn = document.getElementById('submitExamBtn');
  if (submitExamBtn) submitExamBtn.addEventListener('click', () => { stopExamMode(); submitAnswer(); });
}

/* =========================
   UI helpers
   ========================= */
function updateUI() {
  updatePaper3Visibility();
  updateModeLabel();
}

function updatePaper3Visibility() {
  const isHL = appState.currentCourse && appState.currentCourse.includes('HL');
  const paper3Option = document.getElementById('paper3Option');
  const paper3Btn = document.getElementById('paper3Btn');
  if (paper3Option) paper3Option.style.display = isHL ? 'block' : 'none';
  if (paper3Btn) paper3Btn.style.display = isHL ? 'inline-block' : 'none';
}

function updateModeLabel() {
  const label = document.getElementById('modeLabel');
  if (label) label.textContent = appState.examMode ? 'Exam Mode' : 'Practice Mode';
}

/* =========================
   Question generation & display
   ========================= */
function generateRandomQuestion() {
  const topics = Object.keys(questionTemplates.Foundation || {
    'Number & Algebra': 1, Functions: 1, 'Geometry & Trig': 1, 'Stats & Probability': 1, Calculus: 1
  });
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  const difficulties = Object.keys(questionTemplates);
  const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  const isHL = appState.currentCourse && appState.currentCourse.includes('HL');
  const papers = ['Paper1', 'Paper2', ...(isHL ? ['Paper3'] : [])];
  const randomPaper = papers[Math.floor(Math.random() * papers.length)];

  appState.currentTopic = randomTopic;
  appState.currentDifficulty = randomDifficulty;
  appState.currentPaper = randomPaper;

  // Update UI classes
  document.querySelectorAll('.topic-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.topic === randomTopic));
  document.querySelectorAll('input[name="difficulty"]').forEach(r => r.checked = r.value === randomDifficulty);
  document.querySelectorAll('input[name="paper"]').forEach(r => r.checked = r.value === randomPaper);

  generateQuestionWithSettings();
}

function generateQuestion() {
  if (!appState.currentTopic) {
    const welcomeSection = document.getElementById('welcomeSection');
    if (welcomeSection) {
      welcomeSection.innerHTML = `<div class="welcome-card"><h2>Select a Topic First</h2><p>Click a topic or use "Random Question".</p></div>`;
    } else {
      alert('Please select a topic first.');
    }
    return;
  }
  generateQuestionWithSettings();
}

function generateQuestionWithSettings() {
  // UI transitions
  const welcomeSection = document.getElementById('welcomeSection');
  const questionSection = document.getElementById('questionSection');
  if (welcomeSection) welcomeSection.style.display = 'none';
  if (questionSection) questionSection.style.display = 'block';

  // Prefer db question if available
  let selectedQuestion = null;
  if (typeof getRandomQuestion === 'function') {
    try {
      selectedQuestion = getRandomQuestion(appState.currentTopic, appState.currentDifficulty, appState.currentPaper);
    } catch (e) {
      console.warn('getRandomQuestion threw', e);
      selectedQuestion = null;
    }
  }

  // Fallback to templates
  if (!selectedQuestion) {
    const templates = (questionTemplates[appState.currentDifficulty] || {})[appState.currentTopic] || [];
    const randomQuestionText = templates[Math.floor(Math.random() * templates.length)];
    selectedQuestion = {
      question: randomQuestionText || 'No question available for this combination.',
      marks: appState.currentDifficulty === 'Foundation' ? 4 : appState.currentDifficulty === 'Standard' ? 6 : 8
    };
  }

  appState.currentQuestion = {
    question: selectedQuestion.question,
    marks: selectedQuestion.marks || 5,
    topic: appState.currentTopic,
    difficulty: appState.currentDifficulty,
    paper: appState.currentPaper,
    course: appState.currentCourse
  };

  displayQuestion(appState.currentQuestion);

  // Reset answer and feedback UI
  const answerInput = document.getElementById('studentAnswer');
  if (answerInput) answerInput.value = '';
  const feedbackSection = document.getElementById('feedbackSection');
  if (feedbackSection) { feedbackSection.style.display = 'none'; feedbackSection.innerHTML = ''; }
  appState.hintUsed = false;
}

function generatePaper3Question() {
  if (!appState.currentCourse || !appState.currentCourse.includes('HL')) {
    alert('Paper 3 is only available for HL students.');
    return;
  }

  const investigation = paper3Investigations[Math.floor(Math.random() * paper3Investigations.length)];
  appState.currentQuestion = {
    question: investigation.question || investigation.title,
    marks: investigation.marks || 20,
    topic: 'Investigation',
    difficulty: 'Distinction',
    paper: 'Paper3',
    isInvestigation: true
  };

  displayQuestion(appState.currentQuestion);
}

/* Display question safely and typeset LaTeX */
function displayQuestion(question) {
  try {
    const content = document.getElementById('questionContent');
    if (!content) return;
    content.style.opacity = '0';
    content.innerHTML = `
      <div class="meta">
        <small>Course: ${question.course} | Paper: ${question.paper} | Difficulty: ${question.difficulty}</small>
      </div>
      <div class="question-text">${question.question}</div>
    `;
    setTimeout(() => content.style.opacity = '1', 50);
    safeTypeset([content]).catch(err => console.error('MathJax typeset failed', err));
  } catch (e) {
    console.error('displayQuestion error', e);
  }
}

/* =========================
   Timer / Exam mode
   ========================= */
function startExamMode() {
  const examBar = document.getElementById('examModeBar');
  if (examBar) examBar.style.display = 'flex';
  const hintBtn = document.getElementById('hintBtn');
  const showSolBtn = document.getElementById('showSolutionBtn');
  if (hintBtn) hintBtn.disabled = true;
  if (showSolBtn) showSolBtn.disabled = true;

  if (appState.currentQuestion && appState.currentQuestion.marks) {
    const timeLimit = Math.round(appState.currentQuestion.marks * 1.5 * 60);
    startTimer(timeLimit);
  }
}

function stopExamMode() {
  const examBar = document.getElementById('examModeBar');
  if (examBar) examBar.style.display = 'none';
  if (appState.timer) { clearInterval(appState.timer); appState.timer = null; }
  const hintBtn = document.getElementById('hintBtn');
  const showSolBtn = document.getElementById('showSolutionBtn');
  if (hintBtn) hintBtn.disabled = false;
  if (showSolBtn) showSolBtn.disabled = false;
}

function startTimer(seconds) {
  if (appState.timer) clearInterval(appState.timer);
  appState.timeRemaining = seconds;
  updateTimerDisplay();
  appState.timer = setInterval(() => {
    appState.timeRemaining--;
    updateTimerDisplay();
    if (appState.timeRemaining <= 0) {
      clearInterval(appState.timer);
      appState.timer = null;
      alert('Time is up! Submitting your answer...');
      submitAnswer();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const displayEl = document.getElementById('timerDisplay');
  if (!displayEl) return;
  const mm = String(Math.floor(appState.timeRemaining / 60)).padStart(2, '0');
  const ss = String(appState.timeRemaining % 60).padStart(2, '0');
  displayEl.textContent = `${mm}:${ss}`;
  if (appState.timeRemaining < 60) displayEl.style.color = '#ff0000';
  else displayEl.style.color = '#ffffff';
}

/* =========================
   Submit / feedback / marking
   ========================= */
function submitAnswer() {
  try {
    const answerInput = document.getElementById('studentAnswer');
    const answer = answerInput ? answerInput.value.trim() : '';
    if (!answer) { alert('Please enter an answer before submitting'); return; }

    if (appState.timer) { clearInterval(appState.timer); appState.timer = null; }

    generateFeedback(answer);
  } catch (e) {
    console.error('submitAnswer error', e);
  }
}

function generateFeedback(studentAnswer) {
  const q = appState.currentQuestion;
  if (!q) return;
  const feedbackSection = document.getElementById('feedbackSection');
  const feedbackContent = document.getElementById('feedbackContent');
  const markingBreakdown = document.getElementById('markingBreakdown');
  if (!feedbackSection || !feedbackContent || !markingBreakdown) return;

  const feedback = simulateAIFeedback(q, studentAnswer);

  feedbackContent.innerHTML = feedback.text;
  markingBreakdown.innerHTML = feedback.marking;
  feedbackSection.style.display = 'block';
  safeTypeset([feedbackContent, markingBreakdown]).catch(err => console.error(err));

  // Update stats if AuthSystem present (defensive)
  try {
    const marks = q.marks || 0;
    const earnedMatches = (feedback.marking || '').match(/Total.*?(\d+)/);
    const earnedMarks = earnedMatches ? parseInt(earnedMatches[1], 10) : Math.floor(marks * 0.7);

    if (typeof AuthSystem !== 'undefined' && AuthSystem.getCurrentUser) {
      const user = AuthSystem.getCurrentUser();
      if (user) {
        user.stats = user.stats || {};
        user.stats.totalQuestions = (user.stats.totalQuestions || 0) + 1;
        user.stats.totalMarks = (user.stats.totalMarks || 0) + marks;
        user.stats.earnedMarks = (user.stats.earnedMarks || 0) + earnedMarks;
        user.stats.averageScore = user.stats.totalMarks ? ((user.stats.earnedMarks / user.stats.totalMarks) * 100).toFixed(1) : 0;
        if (AuthSystem.updateStreak) AuthSystem.updateStreak(user);
        if (AuthSystem.calculateLevel) AuthSystem.calculateLevel(user);
        if (AuthSystem.checkAchievements) AuthSystem.checkAchievements(user);
        if (AuthSystem.saveUsers) AuthSystem.saveUsers();
      }
    }

    if (typeof ProfileManager !== 'undefined' && ProfileManager.recordAttempt) {
      ProfileManager.recordAttempt(q.topic || 'Unknown', q.difficulty || 'Foundation', q.paper || 'Paper1', marks, earnedMarks);
    }

    // Update groups leaderboards if present
    if (typeof GroupsSystem !== 'undefined' && typeof GroupsSystem.updateAllGroupLeaderboards === 'function') {
      GroupsSystem.updateAllGroupLeaderboards();
    }

    if (typeof updateUserHeader === 'function') updateUserHeader();
  } catch (e) {
    console.error('Error updating user stats after feedback:', e);
  }
}

/* Simulated AI feedback (placeholder) */
function simulateAIFeedback(question, answer) {
  const marks = question.marks || 5;
  const awardedMarks = Math.max(0, Math.min(marks, Math.floor(marks * (0.6 + Math.random() * 0.35))));
  const text = `
    <h4>Feedback</h4>
    <p><strong>Conceptual Approach:</strong> Your approach is noted.</p>
    <p><strong>Method:</strong> Show all steps clearly.</p>
    <p><strong>Suggestions:</strong> Practice similar problems.</p>
  `;
  const marking = `
    <h4>Marking Breakdown:</h4>
    <div><strong>Total:</strong> ${awardedMarks} / ${marks}</div>
  `;
  return { text, marking };
}

/* =========================
   Solution & Hint
   ========================= */
function generateSolution(question) {
  if (!question) return '<p>No solution available.</p>';
  if (question.solution) return question.solution;
  return `
    <p><strong>Step 1:</strong> Understand the problem.</p>
    <p><strong>Step 2:</strong> Choose the method.</p>
    <p><strong>Step 3:</strong> Execute the method and show all steps.</p>
    <p><strong>Final:</strong> State the answer clearly.</p>
  `;
}

function showSolution() {
  if (appState.examMode) { alert('Solutions not available in Exam Mode'); return; }
  const q = appState.currentQuestion;
  if (!q) { alert('No question to show solution for'); return; }
  const feedbackSection = document.getElementById('feedbackSection');
  const feedbackContent = document.getElementById('feedbackContent');
  if (!feedbackSection || !feedbackContent) return;

  const solution = generateSolution(q);
  feedbackContent.innerHTML = `<h4>Solution</h4>${solution}`;
  feedbackSection.style.display = 'block';
  safeTypeset([feedbackContent]).catch(err => console.error(err));
  feedbackSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showHint() {
  if (appState.examMode) { alert('Hints are disabled in Exam Mode'); return; }
  const q = appState.currentQuestion;
  if (!q) { alert('No current question'); return; }
  appState.hintUsed = true;
  const hints = {
    'Number & Algebra': 'Try algebraic rearrangement or factorisation.',
    'Functions': 'Consider composition or inverse functions.',
    'Geometry & Trig': 'Use standard trig identities or sine/cosine rules.',
    'Stats & Probability': 'Check independent/complement rules.',
    'Calculus': 'Apply differentiation or integration rules.'
  };
  alert('Hint: ' + (hints[q.topic] || 'Break the problem into smaller steps.'));
}

/* =========================
   GDC & UI Helpers
   ========================= */
function toggleGDCLibrary() {
  const panel = document.getElementById('gdcLibraryPanel');
  const questionSection = document.getElementById('questionSection');
  const welcomeSection = document.getElementById('welcomeSection');
  if (!panel) return;
  const currentlyHidden = !panel.style.display || panel.style.display === 'none';
  panel.style.display = currentlyHidden ? 'block' : 'none';
  if (questionSection) questionSection.style.display = currentlyHidden ? 'none' : 'block';
  if (welcomeSection) welcomeSection.style.display = 'none';
}

function updateGDCInstructions() {
  const model = document.getElementById('gdcModelSelect')?.value || 'ti-nspire';
  const activeBtn = document.querySelector('.gdc-command-btn.active');
  if (activeBtn) showGDCInstructions(activeBtn.dataset.command, activeBtn);
}

function showGDCInstructions(command, clickedBtn) {
  const model = document.getElementById('gdcModelSelect')?.value || 'ti-nspire';
  const instructionContent = document.getElementById('gdcInstructionContent');
  if (!instructionContent) return;
  document.querySelectorAll('.gdc-command-btn').forEach(b => b.classList.remove('active'));
  if (clickedBtn) clickedBtn.classList.add('active');
  const instruction = (gdcCommands[model] && gdcCommands[model][command]) || null;
  if (instruction) {
    instructionContent.innerHTML = `<h4>${instruction.title}</h4><ol>${instruction.steps.map(s => `<li>${s}</li>`).join('')}</ol>`;
  } else {
    instructionContent.innerHTML = '<p>Instructions not available.</p>';
  }
}

/* =========================
   Initialization wiring
   ========================= */
function setupQuestionControls() {
  // This binds the showSolution and hint buttons safely (already done in initializeEventListeners),
  // but keep here as an additional safeguard for dynamic UI.
  const showSolutionBtn = document.getElementById('showSolutionBtn');
  if (showSolutionBtn) {
    showSolutionBtn.removeEventListener('click', showSolution);
    showSolutionBtn.addEventListener('click', showSolution);
  }
  const hintBtn = document.getElementById('hintBtn');
  if (hintBtn) {
    hintBtn.removeEventListener('click', showHint);
    hintBtn.addEventListener('click', showHint);
  }
}

function initializeNewFeatures() {
  // Initialize Auth / Groups / Leaderboard if present
  if (typeof AuthSystem !== 'undefined' && typeof AuthSystem.init === 'function') {
    try { AuthSystem.init(); } catch (e) { console.warn('AuthSystem.init failed', e); }
  }
  if (typeof GroupsSystem !== 'undefined' && typeof GroupsSystem.init === 'function') {
    try { GroupsSystem.init(); } catch (e) { console.warn('GroupsSystem.init failed', e); }
  }
  if (typeof LeaderboardSystem !== 'undefined') {
    try { LeaderboardSystem.getGlobalLeaderboard && LeaderboardSystem.getGlobalLeaderboard(5); } catch (e) { console.warn(e); }
  }

  // Setup UI parts that rely on JS
  setupQuestionControls();
  setupAIChat && setupAIChat();
  setupFormulaBooklet && setupFormulaBooklet();
  setupMockExam && setupMockExam();

  // Hook into auth change events to refresh UI
  document.addEventListener('auth:changed', () => {
    if (typeof updateUserHeader === 'function') updateUserHeader();
    if (typeof displayMyGroups === 'function') displayMyGroups();
    if (typeof updateLeaderboardDisplay === 'function') updateLeaderboardDisplay();
  });
}

/* =========================
   Navigation & Profile / Stats placeholders
   ========================= */
function setupNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const section = e.target.dataset.section;
      document.querySelectorAll('.section-panel, #questionSection, #welcomeSection, #gdcLibraryPanel').forEach(p => p.style.display = 'none');
      switch (section) {
        case 'practice': document.getElementById('welcomeSection') && (document.getElementById('welcomeSection').style.display = 'block'); break;
        case 'mockExam': document.getElementById('mockExamSection') && (document.getElementById('mockExamSection').style.display = 'block'); if (typeof displayMockExam === 'function') displayMockExam(); break;
        case 'formulas': document.getElementById('formulasSection') && (document.getElementById('formulasSection').style.display = 'block'); if (typeof displayFormulaBooklet === 'function') displayFormulaBooklet('Number & Algebra'); break;
        case 'leaderboard': document.getElementById('leaderboardSection') && (document.getElementById('leaderboardSection').style.display = 'block'); if (typeof updateLeaderboardDisplay === 'function') updateLeaderboardDisplay(); break;
        case 'groups': document.getElementById('groupsSection') && (document.getElementById('groupsSection').style.display = 'block'); if (typeof displayMyGroups === 'function') displayMyGroups(); break;
        case 'profile': document.getElementById('profileSection') && (document.getElementById('profileSection').style.display = 'block'); if (typeof updateProfileDisplay === 'function') updateProfileDisplay(); break;
        case 'statistics': document.getElementById('statisticsSection') && (document.getElementById('statisticsSection').style.display = 'block'); if (typeof updateStatisticsDisplay === 'function') updateStatisticsDisplay(); break;
      }
    });
  });
}

function updateProfileDisplay() {
  // Safe fallback display - if AuthSystem present prefer it, else use ProfileManager
  if (typeof AuthSystem !== 'undefined' && AuthSystem.getCurrentUser) {
    const user = AuthSystem.getCurrentUser();
    if (!user) return;
    const nameEl = document.getElementById('profileName');
    if (nameEl) nameEl.textContent = user.username || 'Student';
    const courseEl = document.getElementById('profileCourse');
    if (courseEl) courseEl.textContent = user.course || 'AA SL';
  } else if (typeof ProfileManager !== 'undefined') {
    const profile = ProfileManager.getProfile && ProfileManager.getProfile();
    if (!profile) return;
    const nameEl = document.getElementById('profileName');
    if (nameEl) nameEl.textContent = profile.name || 'Student';
  }
}

function updateStatisticsDisplay() {
  if (typeof ProfileManager === 'undefined') return;
  try {
    const bestWorst = ProfileManager.getBestWorstTopics && ProfileManager.getBestWorstTopics();
    const stats = ProfileManager.getStatistics && ProfileManager.getStatistics();
    const bestEl = document.getElementById('bestTopic');
    if (bestEl && bestWorst && bestWorst.best) bestEl.innerHTML = `<strong>${bestWorst.best.name}</strong><br/>Score: ${bestWorst.best.averageScore}%`;
  } catch (e) {
    console.error('updateStatisticsDisplay error', e);
  }
}

/* =========================
   AI Chat helpers (light-weight)
   ========================= */
function setupAIChat() {
  if (typeof AIChatHelper === 'undefined') return;
  const chatToggle = document.getElementById('aiChatToggle');
  if (chatToggle) {
    chatToggle.addEventListener('click', () => {
      const panel = document.getElementById('aiChatPanel');
      if (!panel) return;
      panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
      if (panel.style.display === 'block' && typeof loadChatHistory === 'function') loadChatHistory();
    });
  }
}

function addChatMessage(role, content) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  const div = document.createElement('div');
  div.className = `chat-message ${role === 'user' ? 'user-message' : 'ai-message'}`;
  div.innerHTML = `<p>${content}</p>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function loadChatHistory() {
  if (typeof AIChatHelper === 'undefined') return;
  const history = AIChatHelper.getChatHistory && AIChatHelper.getChatHistory();
  if (!history) return;
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  chatMessages.innerHTML = '';
  history.forEach(m => { if (m.role !== 'system') addChatMessage(m.role, m.content); });
}

/* =========================
   Mock exam UI glue (placeholders)
   ========================= */
function setupMockExam() {
  // placeholder - actual MockExamManager should provide API
  if (typeof MockExamManager === 'undefined') return;
  // bind create button etc handled in initializeEventListeners where possible
}

function displayMockExam() {
  // placeholder for mock exam rendering if MockExamManager exists
  if (typeof MockExamManager === 'undefined') return;
}

/* =========================
   Initialization on DOM ready
   ========================= */
document.addEventListener('DOMContentLoaded', () => {
  try {
    initializeEventListeners();
    setupNavigation();
    initializeNewFeatures();
    updateUI();
  } catch (e) {
    console.error('Initialization error:', e);
  }
});
