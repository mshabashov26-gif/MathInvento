// fixes-ui.js
// Small last-loaded fix that redefines key UI functions safely to repair broken display/listener behavior.
// Load this AFTER script.js and advanced-features.js in index.html.

(function () {
  'use strict';

  // Defensive helper: safely call MathJax typeset
  function typesetSafe(nodes) {
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      try {
        return MathJax.typesetPromise(nodes);
      } catch (e) {
        console.warn('MathJax typesetPromise failed', e);
      }
    }
    return Promise.resolve();
  }

  // Safe displayQuestion: only responsible for rendering the question, not binding buttons
  window.displayQuestion = function (question) {
    try {
      // Ensure welcome is hidden and question section shown
      const welcome = document.getElementById('welcomeSection');
      const questionSection = document.getElementById('questionSection');
      if (welcome) welcome.style.display = 'none';
      if (questionSection) questionSection.style.display = 'block';

      const content = document.getElementById('questionContent');
      if (!content) return;

      content.style.opacity = '0';
      content.style.transition = 'opacity 0.25s ease';

      content.innerHTML = `
        <div class="meta" style="margin-bottom:0.6rem;color:var(--text-secondary);font-size:0.9rem;">
          <strong>Course:</strong> ${question.course || 'N/A'} |
          <strong>Paper:</strong> ${question.paper || 'N/A'} |
          <strong>Difficulty:</strong> ${question.difficulty || 'N/A'}
        </div>
        <div class="question-text">${question.question || '<em>No question text</em>'}</div>
      `;

      setTimeout(() => { content.style.opacity = '1'; }, 50);
      typesetSafe([content]);
    } catch (e) {
      console.error('displayQuestion (fixes-ui) error:', e);
    }
  };

  // Safe updatePaper3Visibility - only toggles UI elements, no stray html
  window.updatePaper3Visibility = function () {
    try {
      const isHL = (window.appState && String(window.appState.currentCourse || '').includes('HL'));
      const paper3Option = document.getElementById('paper3Option');
      const paper3Btn = document.getElementById('paper3Btn');
      if (paper3Option) paper3Option.style.display = isHL ? 'block' : 'none';
      if (paper3Btn) paper3Btn.style.display = isHL ? 'inline-block' : 'none';
      // If current paper was Paper3 but course not HL, switch it
      if (!isHL && window.appState && window.appState.currentPaper === 'Paper3') {
        window.appState.currentPaper = 'Paper1';
        const paper1Input = document.querySelector('input[name="paper"][value="Paper1"]');
        if (paper1Input) paper1Input.checked = true;
      }
    } catch (e) {
      console.error('updatePaper3Visibility (fixes-ui) error:', e);
    }
  };

  // Regenerate question using existing DB function if available or fall back to templates.
  window.generateQuestionWithSettings = function () {
    try {
      // Hide welcome and ensure question panel visible
      const welcome = document.getElementById('welcomeSection');
      const questionSection = document.getElementById('questionSection');
      if (welcome) welcome.style.display = 'none';
      if (questionSection) questionSection.style.display = 'block';

      // try DB first
      let selectedQuestion = null;
      if (typeof getRandomQuestion === 'function') {
        try { selectedQuestion = getRandomQuestion(window.appState.currentTopic, window.appState.currentDifficulty, window.appState.currentPaper); }
        catch (e) { console.warn('getRandomQuestion threw', e); selectedQuestion = null; }
      }

      // fallback to templates
      if (!selectedQuestion) {
        const templates = (window.questionTemplates && window.questionTemplates[window.appState.currentDifficulty] &&
          window.questionTemplates[window.appState.currentDifficulty][window.appState.currentTopic]) || null;
        if (templates && templates.length) {
          const text = templates[Math.floor(Math.random() * templates.length)];
          selectedQuestion = { question: text, marks: (window.appState.currentDifficulty === 'Foundation' ? 4 : window.appState.currentDifficulty === 'Standard' ? 6 : 8) };
        } else {
          selectedQuestion = { question: '<em>No questions available for this selection.</em>', marks: 0 };
        }
      }

      window.appState.currentQuestion = {
        question: selectedQuestion.question,
        marks: selectedQuestion.marks || 0,
        topic: window.appState.currentTopic,
        difficulty: window.appState.currentDifficulty,
        paper: window.appState.currentPaper,
        course: window.appState.currentCourse
      };

      // Render
      if (typeof window.displayQuestion === 'function') window.displayQuestion(window.appState.currentQuestion);

      // Reset answer/feedback UI
      const answerEl = document.getElementById('studentAnswer');
      if (answerEl) answerEl.value = '';
      const feedback = document.getElementById('feedbackSection');
      if (feedback) { feedback.style.display = 'none'; feedback.innerHTML = ''; }

    } catch (e) {
      console.error('generateQuestionWithSettings (fixes-ui) error:', e);
    }
  };

  // Ensure event listeners are attached only once
  function safeBind(id, event, fn) {
    const el = document.getElementById(id);
    if (!el) return;
    const marker = '__bound_' + event;
    if (el.dataset[marker]) return;
    el.addEventListener(event, fn);
    el.dataset[marker] = '1';
  }

  // Rebind controls (this will be idempotent)
  function bindControlsOnce() {
    try {
      safeBind('generateQuestionBtn', 'click', () => { if (typeof window.generateQuestion === 'function') window.generateQuestion(); else window.generateQuestionWithSettings(); });
      safeBind('randomQuestionBtn', 'click', generateRandomQuestion);
      safeBind('paper3Btn', 'click', generatePaper3Question);
      safeBind('submitAnswerBtn', 'click', submitAnswer);
      safeBind('hintBtn', 'click', showHint);
      safeBind('showSolutionBtn', 'click', showSolution);
      safeBind('startPracticeBtn', 'click', generateRandomQuestion);
      safeBind('gdcLibraryToggle', 'click', toggleGDCLibrary);
      const gdcSelect = document.getElementById('gdcModelSelect');
      if (gdcSelect && !gdcSelect.dataset.bound_change) {
        gdcSelect.addEventListener('change', updateGDCInstructions);
        gdcSelect.dataset.bound_change = '1';
      }
      // gdc-command buttons (delegated)
      document.querySelectorAll('.gdc-command-btn').forEach(btn => {
        if (!btn.dataset.bound_click) {
          btn.addEventListener('click', (e) => {
            const command = e.currentTarget.dataset.command;
            showGDCInstructions(command, e.currentTarget);
          });
          btn.dataset.bound_click = '1';
        }
      });
    } catch (e) {
      console.error('bindControlsOnce (fixes-ui) error:', e);
    }
  }

  // Run fixes after DOM is ready (also re-run if called repeatedly)
  function initFixes() {
    bindControlsOnce();
    // fix paper3 visibility immediately
    if (typeof window.updatePaper3Visibility === 'function') window.updatePaper3Visibility();
    // ensure nav hides/shows sections correctly (no overlap)
    document.querySelectorAll('.nav-btn').forEach(btn => {
      if (!btn.dataset.fixedNav) {
        btn.dataset.fixedNav = '1';
        btn.addEventListener('click', (e) => {
          document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          const sec = e.currentTarget.dataset.section;
          // Hide major sections
          document.querySelectorAll('.section-panel, #questionSection, #welcomeSection, #gdcLibraryPanel').forEach(p => { if (p) p.style.display = 'none'; });
          // Show the selected panel if it exists
          const showEl = document.getElementById(sec + 'Section') || document.getElementById(sec);
          if (showEl) showEl.style.display = 'block';
          // Special behavior: if practice selected and no question, show welcome
          if (sec === 'practice') {
            const q = window.appState && window.appState.currentQuestion;
            const welcome = document.getElementById('welcomeSection');
            if (!q && welcome) welcome.style.display = 'block';
          }
        });
      }
    });
  }

  // Initialize on DOMContentLoaded and also run a short retry later to catch late-loaded DOM
  document.addEventListener('DOMContentLoaded', () => {
    try { initFixes(); } catch (e) { console.error('initFixes DOMContentLoaded error', e); }
    // second pass in 500ms (helps if original scripts mutate DOM late)
    setTimeout(() => { try { initFixes(); } catch (e) { console.error('initFixes timeout error', e); } }, 500);
  });

  // Also expose a manual initializer for debugging
  window.__applyUIFixes = initFixes;

})();
