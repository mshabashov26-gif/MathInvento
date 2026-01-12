// --- Question display / solution handling & initialization wiring ---

// Global application state (minimal)
window.appState = window.appState || {};
appState.currentQuestion = null;

// Display a generated question object in the UI
// question should be an object like { question: 'text or latex', marks: 5, solution: '...' , topic: '...' }
function displayQuestion(question) {
  try {
    appState.currentQuestion = question || null;
    const content = document.getElementById('questionContent');
    const number = document.getElementById('questionNumber');
    const marks = document.getElementById('questionMarks');

    if (!content) {
      console.warn('displayQuestion: #questionContent not found');
      return;
    }

    // Build HTML safely
    let html = '';
    if (question) {
      html += `<div class="question-text">${question.question || ''}</div>`;
      if (question.extra) html += `<div class="question-extra">${question.extra}</div>`;
      // store solution not displayed until user requests it
    } else {
      html = '<em>No question available</em>';
    }

    content.innerHTML = html;

    if (number) number.textContent = question && question.questionNumber ? `Question ${question.questionNumber}` : 'Question';
    if (marks) marks.textContent = question && question.marks ? `[${question.marks} marks]` : '';

    // ensure the question section is visible
    const questionSection = document.getElementById('questionSection');
    if (questionSection) questionSection.style.display = 'block';

    // run MathJax to typeset any LaTeX if available
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      MathJax.typesetPromise([content]).catch(e => console.error('MathJax typeset error', e));
    }
  } catch (e) {
    console.error('displayQuestion error', e);
  }
}

// Generate and display solution for current question
function generateSolution(question) {
  // If the question already contains a prepared solution string, use it.
  // Otherwise, generate a basic solution placeholder.
  if (!question) return '<p>No solution available.</p>';

  if (question.solution) return question.solution;

  // Basic fallback "solution" — replace with your scaffolded solution generator
  let sol = '<div class="solution">';
  sol += '<p><strong>Solution (auto-generated):</strong></p>';
  sol += `<p>Topic: ${question.topic || 'General'}</p>`;
  if (question.marks) sol += `<p>Marks: ${question.marks}</p>`;
  sol += '<p>Work through the appropriate method to reach the answer.</p>';
  sol += '</div>';
  return sol;
}

// Show solution UI (called by "Show Solution" button)
function showSolution() {
  try {
    const question = appState.currentQuestion;
    if (!question) {
      alert('No question to show solution for.');
      return;
    }
    const feedback = document.getElementById('feedbackContent') || document.getElementById('solutionContent');
    // if feedbackContent not present, create a modal or fallback place
    let target = feedback;
    if (!target) {
      // create a simple modal container
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.style.display = 'flex';
      modal.innerHTML = `<div class="modal-content"><span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span><div id="solutionTemp"></div></div>`;
      document.body.appendChild(modal);
      target = document.getElementById('solutionTemp');
    } else {
      // ensure feedback section visible
      const feedbackSection = document.getElementById('feedbackSection');
      if (feedbackSection) feedbackSection.style.display = 'block';
    }

    const solutionHTML = generateSolution(question);
    target.innerHTML = solutionHTML;

    // Typeset with MathJax if available
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      MathJax.typesetPromise([target]).catch(e => console.error('MathJax typeset error', e));
    }
  } catch (e) {
    console.error('showSolution error', e);
  }
}

// Hook up buttons (safe binding)
function setupQuestionControls() {
  const showSolutionBtn = document.getElementById('showSolutionBtn');
  if (showSolutionBtn) {
    showSolutionBtn.removeEventListener('click', showSolution);
    showSolutionBtn.addEventListener('click', showSolution);
  }

  const hintBtn = document.getElementById('hintBtn');
  if (hintBtn) {
    hintBtn.removeEventListener('click', () => {});
    hintBtn.addEventListener('click', () => {
      alert('Hint: break the question into smaller steps (method → execution → answer).');
    });
  }
}

// Initialization wiring - ensure AuthSystem & Groups & Leaderboards are initialized before UI uses them
function initializeApp() {
  try {
    // AuthSystem should exist and initialize first
    if (typeof AuthSystem !== 'undefined' && typeof AuthSystem.init === 'function') {
      AuthSystem.init();
    }

    // Groups and Leaderboard initializations (if modules exist)
    if (typeof GroupsSystem !== 'undefined' && typeof GroupsSystem.init === 'function') GroupsSystem.init();
    if (typeof LeaderboardSystem !== 'undefined') {
      // just a warm-up call
      try { LeaderboardSystem.getGlobalLeaderboard(5); } catch (e) { console.warn(e); }
    }

    // Setup UI controls
    setupQuestionControls();

    // If you have a function to wire navigation, call it (e.g., setupNavigation)
    if (typeof setupNavigation === 'function') setupNavigation();

    // Listen for auth changes to refresh groups/leaderboard UI
    document.addEventListener('auth:changed', (e) => {
      // your UI update functions (if present)
      if (typeof updateUserHeader === 'function') updateUserHeader();
      if (typeof displayMyGroups === 'function') displayMyGroups();
      if (typeof updateLeaderboardDisplay === 'function') updateLeaderboardDisplay();
    });
  } catch (e) {
    console.error('initializeApp error', e);
  }
}

// run initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});
