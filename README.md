# IB Math Mastery Engine

A specialized AI-powered tutoring platform for International Baccalaureate (IB) Mathematics students, designed to help achieve Grade 7 through rigorous practice, conceptual clarity, and exam-style feedback.

## Features

### 🎯 Core Capabilities

1. **Syllabus-Specific Question Generation**
   - Questions based on 5 IB Math topics (Number & Algebra, Functions, Geometry & Trig, Stats & Probability, Calculus)
   - Differentiation between Paper 1 (Non-calculator) and Paper 2 (Calculator/GDC required)
   - Paper 3 "Investigation" questions for HL students

2. **Step-by-Step Scaffolded Solutions**
   - Conceptual Approach → Method → Execution → Final Answer
   - Highlights common pitfalls where students lose Method Marks (M-marks)

3. **Mark Scheme Simulation**
   - Official IB criteria: M (Method), A (Answer), R (Reasoning), G (Graph/GDC use)
   - Detailed feedback on student submissions

4. **Exam Mode Toggle**
   - Practice Mode: Hints and solutions available
   - Exam Mode: Strict timing with no hints until submission

5. **Paper 3 Deep Dive**
   - Dedicated investigation questions for HL students
   - Complex mathematical pattern exploration

6. **GDC Command Library**
   - Quick-access instructions for Ti-Nspire CX and Casio CG-50
   - Step-by-step button-press sequences for:
     - Function intersections
     - Numerical derivatives and integrals
     - Normal distributions
     - Chi-squared tests
     - Matrix operations
     - Regression analysis
     - Equation solving

7. **Dynamic Difficulty Scaling**
   - **Foundation** (Grades 1-3): Basic recall and formula application
   - **Standard** (Grades 4-5): Multi-step problems similar to Section A
   - **Distinction** (Grades 6-7): Unfamiliar contexts and abstract proofs

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for MathJax LaTeX rendering)

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. No additional installation or dependencies required!

### Usage

1. **Select Your Course**
   - Choose from AA SL, AA HL, AI SL, or AI HL

2. **Choose a Topic**
   - Select from the 5 main IB Math topics

3. **Set Difficulty Level**
   - Foundation, Standard, or Distinction

4. **Select Paper Type**
   - Paper 1 (Non-calculator)
   - Paper 2 (Calculator/GDC)
   - Paper 3 (HL only - Investigations)

5. **Generate Questions**
   - Click "Generate Question" to start practicing
   - Use "Paper 3 Deep Dive" for investigation questions (HL only)

6. **Submit Answers**
   - Type your solution in the answer box
   - Use LaTeX for mathematical expressions: `$x^2 + 5x + 6$`
   - Click "Submit Answer" to receive feedback

7. **Get Help**
   - Use "Get Hint" for guidance (Practice Mode only)
   - Use "Show Solution" to see scaffolded solutions (Practice Mode only)
   - Access GDC commands via the 📱 button

8. **Exam Mode**
   - Toggle Exam Mode in the header
   - Timer automatically starts based on question marks
   - Hints and solutions disabled until submission

## LaTeX Usage

Use LaTeX syntax for mathematical expressions:

- **Inline math**: `$x^2 + 5x + 6$` → $x^2 + 5x + 6$
- **Display math**: `$$\int_0^2 (3x^2 - 2x + 1) dx$$` → Large centered equation

### Common LaTeX Commands

- Fractions: `$\frac{a}{b}$` → $\frac{a}{b}$
- Powers: `$x^2$` → $x^2$
- Subscripts: `$a_n$` → $a_n$
- Square roots: `$\sqrt{x}$` → $\sqrt{x}$
- Integrals: `$\int f(x) dx$` → $\int f(x) dx$
- Sums: `$\sum_{i=1}^n$` → $\sum_{i=1}^n$

## AI Integration

The system is designed to integrate with AI services (OpenAI, Anthropic, etc.). Currently, it includes a simulated feedback system. To connect to a real AI:

1. Replace the `simulateAIFeedback()` function in `script.js`
2. Add your API key and endpoint
3. Format the prompt using the master prompt system included in the code

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization

### Adding New Questions

Edit the `questionTemplates` object in `script.js`:

```javascript
questionTemplates.Distinction['Your Topic'] = [
    'Your question here with LaTeX: $x^2$',
    // Add more questions...
];
```

### Adding GDC Commands

Edit the `gdcCommands` object in `script.js`:

```javascript
gdcCommands['ti-nspire']['your-command'] = {
    title: 'Command Title',
    steps: [
        'Step 1 instructions',
        'Step 2 instructions',
        // ...
    ]
};
```

### Styling

Modify `styles.css` to change colors, fonts, or layout. CSS variables are defined in `:root` for easy customization.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Acknowledgments

- MathJax for LaTeX rendering
- IB Diploma Programme for the mathematics curriculum

---

**Note**: This is a frontend application. For production use with real AI integration, you'll need to set up a backend API service and securely manage API keys.

