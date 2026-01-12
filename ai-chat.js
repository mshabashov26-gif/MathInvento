// AI Chat Helper
// Provides AI-powered math assistance and tutoring

const AIChatHelper = {
    chatHistory: [],
    isOpen: false,

    // Initialize chat
    init() {
        this.loadChatHistory();
    },

    // Get chat history
    getChatHistory() {
        return this.chatHistory;
    },

    // Save chat history
    saveChatHistory() {
        localStorage.setItem('ibMathChatHistory', JSON.stringify(this.chatHistory));
    },

    // Load chat history
    loadChatHistory() {
        const saved = localStorage.getItem('ibMathChatHistory');
        if (saved) {
            this.chatHistory = JSON.parse(saved);
        }
    },

    // Clear chat history
    clearHistory() {
        this.chatHistory = [];
        this.saveChatHistory();
    },

    // Send message to AI
    async sendMessage(userMessage, context = {}) {
        const timestamp = new Date().toISOString();
        
        // Add user message to history
        this.chatHistory.push({
            role: 'user',
            content: userMessage,
            timestamp: timestamp
        });
        
        // Generate AI response (simulated - in production, this would call an AI API)
        const aiResponse = await this.generateAIResponse(userMessage, context);
        
        // Add AI response to history
        this.chatHistory.push({
            role: 'assistant',
            content: aiResponse,
            timestamp: new Date().toISOString()
        });
        
        // Save history
        this.saveChatHistory();
        
        return aiResponse;
    },

    // Generate AI response (simulated)
    async generateAIResponse(userMessage, context) {
        // In production, this would call OpenAI, Anthropic, or similar API
        // For now, we'll use a rule-based system with the master prompt
        
        const message = userMessage.toLowerCase();
        
        // Check for specific math questions
        if (message.includes('derivative') || message.includes('differentiate')) {
            return `To find the derivative, remember these key rules:

**Power Rule**: If $f(x) = x^n$, then $f'(x) = nx^{n-1}$

**Product Rule**: If $f(x) = u(x) \cdot v(x)$, then $f'(x) = u'v + uv'$

**Quotient Rule**: If $f(x) = \\frac{u(x)}{v(x)}$, then $f'(x) = \\frac{u'v - uv'}{v^2}$

**Chain Rule**: If $f(x) = g(h(x))$, then $f'(x) = g'(h(x)) \cdot h'(x)$

Can you share the specific function you're working with? I can help you apply the appropriate rule!`;
        }
        
        if (message.includes('integral') || message.includes('integrate')) {
            return `For integration, remember:

**Power Rule**: $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$ (when $n \\neq -1$)

**Definite Integral**: $\\int_a^b f(x) dx = F(b) - F(a)$ where $F'(x) = f(x)$

**Common Integrals**:
- $\\int e^x dx = e^x + C$
- $\\int \\frac{1}{x} dx = \\ln|x| + C$
- $\\int \\sin x dx = -\\cos x + C$
- $\\int \\cos x dx = \\sin x + C$

What specific integral are you trying to solve?`;
        }
        
        if (message.includes('solve') && (message.includes('equation') || message.includes('='))) {
            return `To solve equations, consider:

1. **Linear equations**: Isolate the variable using inverse operations
   Example: $2x + 5 = 13 \\Rightarrow 2x = 8 \\Rightarrow x = 4$

2. **Quadratic equations**: Use factoring, completing the square, or quadratic formula
   $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

3. **Exponential/Logarithmic**: Use logarithms to solve
   $a^x = b \\Rightarrow x = \\log_a b$

Share the equation and I can guide you through solving it step by step!`;
        }
        
        if (message.includes('sequence') || message.includes('series')) {
            return `For sequences and series:

**Arithmetic Sequence**: $u_n = u_1 + (n-1)d$ where $d$ is the common difference

**Arithmetic Series**: $S_n = \\frac{n}{2}(2u_1 + (n-1)d)$

**Geometric Sequence**: $u_n = u_1 r^{n-1}$ where $r$ is the common ratio

**Geometric Series**: $S_n = \\frac{u_1(r^n - 1)}{r - 1}$ (when $r \\neq 1$)

**Infinite Geometric**: $S_\\infty = \\frac{u_1}{1 - r}$ (when $|r| < 1$)

What type of sequence or series are you working with?`;
        }
        
        if (message.includes('probability') || message.includes('statistics')) {
            return `For probability and statistics:

**Basic Probability**: $P(A) = \\frac{\\text{favorable outcomes}}{\\text{total outcomes}}$

**Independent Events**: $P(A \\cap B) = P(A) \\cdot P(B)$

**Conditional Probability**: $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$

**Binomial Distribution**: $P(X = r) = \\binom{n}{r} p^r (1-p)^{n-r}$

**Normal Distribution**: Use $Z = \\frac{X - \\mu}{\\sigma}$ for standardization

What probability or statistics problem are you working on?`;
        }
        
        if (message.includes('trig') || message.includes('triangle')) {
            return `For trigonometry and triangles:

**Right Triangle (SOH CAH TOA)**:
- $\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}$
- $\\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}$
- $\\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}}$

**Sine Rule**: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$

**Cosine Rule**: $c^2 = a^2 + b^2 - 2ab\\cos C$

**Area**: $A = \\frac{1}{2}ab\\sin C$

What triangle problem can I help you with?`;
        }
        
        // General helpful response
        return `I'm here to help you with IB Mathematics! I can assist with:

📚 **Topics**: Number & Algebra, Functions, Geometry & Trig, Statistics & Probability, Calculus

🔧 **I can help you**:
- Solve equations and problems step-by-step
- Explain concepts and formulas
- Provide hints for practice questions
- Review your solutions
- Prepare for exams

**Please ask me a specific math question**, and I'll guide you through it using IB Math Mastery Engine principles. Remember to use proper mathematical notation!

For example:
- "How do I find the derivative of $x^3 + 2x^2$?"
- "Explain the quadratic formula"
- "Help me solve $\\log_2(x+3) = 5$"`;
    },

    // Format message for display
    formatMessage(content) {
        // Convert LaTeX notation for MathJax
        return content;
    }
};

