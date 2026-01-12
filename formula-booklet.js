// IB Math Formula Booklet
// Complete formula reference for all topics

const FormulaBooklet = {
    'Number & Algebra': {
        title: 'Number & Algebra',
        formulas: [
            {
                category: 'Sequences and Series',
                items: [
                    {
                        name: 'Arithmetic Sequence - nth term',
                        formula: '$u_n = u_1 + (n-1)d$',
                        description: 'where $u_1$ is the first term and $d$ is the common difference'
                    },
                    {
                        name: 'Arithmetic Series - Sum',
                        formula: '$S_n = \\frac{n}{2}(2u_1 + (n-1)d) = \\frac{n}{2}(u_1 + u_n)$'
                    },
                    {
                        name: 'Geometric Sequence - nth term',
                        formula: '$u_n = u_1 r^{n-1}$',
                        description: 'where $r$ is the common ratio'
                    },
                    {
                        name: 'Geometric Series - Sum (finite)',
                        formula: '$S_n = \\frac{u_1(r^n - 1)}{r - 1} = \\frac{u_1(1 - r^n)}{1 - r}$, $r \\neq 1$'
                    },
                    {
                        name: 'Geometric Series - Sum (infinite)',
                        formula: '$S_\\infty = \\frac{u_1}{1 - r}$, $|r| < 1$'
                    }
                ]
            },
            {
                category: 'Exponents and Logarithms',
                items: [
                    {
                        name: 'Laws of Exponents',
                        formula: '$a^m \\cdot a^n = a^{m+n}$, $\\frac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$'
                    },
                    {
                        name: 'Logarithm Definition',
                        formula: '$\\log_a x = y \\Leftrightarrow a^y = x$'
                    },
                    {
                        name: 'Laws of Logarithms',
                        formula: '$\\log_a (xy) = \\log_a x + \\log_a y$',
                        formula2: '$\\log_a \\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y$',
                        formula3: '$\\log_a x^n = n \\log_a x$',
                        formula4: '$\\log_a a = 1$, $\\log_a 1 = 0$'
                    },
                    {
                        name: 'Change of Base',
                        formula: '$\\log_a x = \\frac{\\log_b x}{\\log_b a}$'
                    }
                ]
            },
            {
                category: 'Binomial Theorem',
                items: [
                    {
                        name: 'Binomial Coefficient',
                        formula: '$\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$'
                    },
                    {
                        name: 'Binomial Expansion',
                        formula: '$(a + b)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^r$'
                    },
                    {
                        name: 'General Term',
                        formula: '$T_{r+1} = \\binom{n}{r} a^{n-r} b^r$'
                    }
                ]
            },
            {
                category: 'Complex Numbers',
                items: [
                    {
                        name: 'Cartesian Form',
                        formula: '$z = a + bi$',
                        description: 'where $a$ is the real part and $b$ is the imaginary part'
                    },
                    {
                        name: 'Modulus',
                        formula: '$|z| = \\sqrt{a^2 + b^2}$'
                    },
                    {
                        name: 'Argument',
                        formula: '$\\arg(z) = \\theta = \\arctan\\left(\\frac{b}{a}\\right)$'
                    },
                    {
                        name: 'Polar Form',
                        formula: '$z = r(\\cos\\theta + i\\sin\\theta) = re^{i\\theta}$',
                        description: 'where $r = |z|$ and $\\theta = \\arg(z)$'
                    },
                    {
                        name: 'De Moivre\'s Theorem',
                        formula: '$[r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta)$'
                    }
                ]
            }
        ]
    },
    'Functions': {
        title: 'Functions',
        formulas: [
            {
                category: 'General Functions',
                items: [
                    {
                        name: 'Composite Function',
                        formula: '$(f \\circ g)(x) = f(g(x))$'
                    },
                    {
                        name: 'Inverse Function',
                        formula: '$f^{-1}(f(x)) = x$ and $f(f^{-1}(x)) = x$'
                    },
                    {
                        name: 'One-to-One Function',
                        formula: 'If $f(a) = f(b)$, then $a = b$'
                    }
                ]
            },
            {
                category: 'Polynomial Functions',
                items: [
                    {
                        name: 'Quadratic Formula',
                        formula: '$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$'
                    },
                    {
                        name: 'Discriminant',
                        formula: '$\\Delta = b^2 - 4ac$',
                        description: '$\\Delta > 0$: two distinct roots, $\\Delta = 0$: one repeated root, $\\Delta < 0$: no real roots'
                    },
                    {
                        name: 'Sum and Product of Roots',
                        formula: '$\\alpha + \\beta = -\\frac{b}{a}$, $\\alpha\\beta = \\frac{c}{a}$',
                        description: 'for $ax^2 + bx + c = 0$ with roots $\\alpha$ and $\\beta$'
                    }
                ]
            },
            {
                category: 'Exponential and Logarithmic Functions',
                items: [
                    {
                        name: 'Exponential Function',
                        formula: '$f(x) = a^x$, $a > 0$, $a \\neq 1$'
                    },
                    {
                        name: 'Natural Exponential',
                        formula: '$f(x) = e^x$'
                    },
                    {
                        name: 'Logarithmic Function',
                        formula: '$f(x) = \\log_a x$, $a > 0$, $a \\neq 1$, $x > 0$'
                    },
                    {
                        name: 'Natural Logarithm',
                        formula: '$f(x) = \\ln x = \\log_e x$'
                    }
                ]
            },
            {
                category: 'Trigonometric Functions',
                items: [
                    {
                        name: 'Unit Circle',
                        formula: '$\\cos^2\\theta + \\sin^2\\theta = 1$'
                    },
                    {
                        name: 'Pythagorean Identities',
                        formula: '$1 + \\tan^2\\theta = \\sec^2\\theta$',
                        formula2: '$1 + \\cot^2\\theta = \\csc^2\\theta$'
                    },
                    {
                        name: 'Compound Angle Formulas',
                        formula: '$\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B$',
                        formula2: '$\\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B$',
                        formula3: '$\\tan(A \\pm B) = \\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A \\tan B}$'
                    },
                    {
                        name: 'Double Angle Formulas',
                        formula: '$\\sin 2A = 2\\sin A \\cos A$',
                        formula2: '$\\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A$',
                        formula3: '$\\tan 2A = \\frac{2\\tan A}{1 - \\tan^2 A}$'
                    }
                ]
            }
        ]
    },
    'Geometry & Trig': {
        title: 'Geometry & Trigonometry',
        formulas: [
            {
                category: 'Triangle Formulas',
                items: [
                    {
                        name: 'Area of Triangle',
                        formula: '$A = \\frac{1}{2}ab\\sin C$'
                    },
                    {
                        name: 'Sine Rule',
                        formula: '$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$',
                        description: 'where $R$ is the circumradius'
                    },
                    {
                        name: 'Cosine Rule',
                        formula: '$c^2 = a^2 + b^2 - 2ab\\cos C$',
                        formula2: '$\\cos C = \\frac{a^2 + b^2 - c^2}{2ab}$'
                    },
                    {
                        name: 'Right Triangle (SOH CAH TOA)',
                        formula: '$\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}$, $\\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}$, $\\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}}$'
                    }
                ]
            },
            {
                category: 'Circle Formulas',
                items: [
                    {
                        name: 'Circumference',
                        formula: '$C = 2\\pi r = \\pi d$'
                    },
                    {
                        name: 'Area',
                        formula: '$A = \\pi r^2$'
                    },
                    {
                        name: 'Arc Length',
                        formula: '$s = r\\theta$',
                        description: 'where $\\theta$ is in radians'
                    },
                    {
                        name: 'Sector Area',
                        formula: '$A = \\frac{1}{2}r^2\\theta$',
                        description: 'where $\\theta$ is in radians'
                    }
                ]
            },
            {
                category: '3D Geometry',
                items: [
                    {
                        name: 'Volume of Cylinder',
                        formula: '$V = \\pi r^2 h$'
                    },
                    {
                        name: 'Surface Area of Cylinder',
                        formula: '$SA = 2\\pi r^2 + 2\\pi rh$'
                    },
                    {
                        name: 'Volume of Cone',
                        formula: '$V = \\frac{1}{3}\\pi r^2 h$'
                    },
                    {
                        name: 'Surface Area of Cone',
                        formula: '$SA = \\pi r^2 + \\pi rl$',
                        description: 'where $l$ is the slant height'
                    },
                    {
                        name: 'Volume of Sphere',
                        formula: '$V = \\frac{4}{3}\\pi r^3$'
                    },
                    {
                        name: 'Surface Area of Sphere',
                        formula: '$SA = 4\\pi r^2$'
                    }
                ]
            },
            {
                category: 'Coordinate Geometry',
                items: [
                    {
                        name: 'Distance Formula',
                        formula: '$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$'
                    },
                    {
                        name: 'Midpoint Formula',
                        formula: '$M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$'
                    },
                    {
                        name: 'Gradient/Slope',
                        formula: '$m = \\frac{y_2 - y_1}{x_2 - x_1}$'
                    },
                    {
                        name: 'Equation of Line',
                        formula: '$y - y_1 = m(x - x_1)$ or $y = mx + c$'
                    }
                ]
            }
        ]
    },
    'Stats & Probability': {
        title: 'Statistics & Probability',
        formulas: [
            {
                category: 'Descriptive Statistics',
                items: [
                    {
                        name: 'Mean',
                        formula: '$\\bar{x} = \\frac{\\sum x}{n}$'
                    },
                    {
                        name: 'Median',
                        formula: 'Middle value when data is ordered'
                    },
                    {
                        name: 'Mode',
                        formula: 'Most frequently occurring value'
                    },
                    {
                        name: 'Standard Deviation',
                        formula: '$\\sigma = \\sqrt{\\frac{\\sum(x - \\bar{x})^2}{n}}$ or $s = \\sqrt{\\frac{\\sum(x - \\bar{x})^2}{n-1}}$'
                    },
                    {
                        name: 'Variance',
                        formula: '$\\sigma^2 = \\frac{\\sum(x - \\bar{x})^2}{n}$'
                    }
                ]
            },
            {
                category: 'Probability',
                items: [
                    {
                        name: 'Basic Probability',
                        formula: '$P(A) = \\frac{\\text{number of favorable outcomes}}{\\text{total number of outcomes}}$'
                    },
                    {
                        name: 'Complementary Events',
                        formula: '$P(A\') = 1 - P(A)$'
                    },
                    {
                        name: 'Mutually Exclusive Events',
                        formula: '$P(A \\cup B) = P(A) + P(B)$'
                    },
                    {
                        name: 'Independent Events',
                        formula: '$P(A \\cap B) = P(A) \\cdot P(B)$'
                    },
                    {
                        name: 'Conditional Probability',
                        formula: '$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$'
                    },
                    {
                        name: 'Bayes\' Theorem',
                        formula: '$P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$'
                    }
                ]
            },
            {
                category: 'Distributions',
                items: [
                    {
                        name: 'Binomial Distribution',
                        formula: '$P(X = r) = \\binom{n}{r} p^r (1-p)^{n-r}$',
                        description: 'Mean: $\\mu = np$, Variance: $\\sigma^2 = np(1-p)$'
                    },
                    {
                        name: 'Poisson Distribution',
                        formula: '$P(X = r) = \\frac{\\lambda^r e^{-\\lambda}}{r!}$',
                        description: 'Mean: $\\mu = \\lambda$, Variance: $\\sigma^2 = \\lambda$'
                    },
                    {
                        name: 'Normal Distribution',
                        formula: '$X \\sim N(\\mu, \\sigma^2)$',
                        description: 'Standardized: $Z = \\frac{X - \\mu}{\\sigma} \\sim N(0, 1)$'
                    }
                ]
            },
            {
                category: 'Regression and Correlation',
                items: [
                    {
                        name: 'Pearson\'s Correlation Coefficient',
                        formula: '$r = \\frac{\\sum(x - \\bar{x})(y - \\bar{y})}{\\sqrt{\\sum(x - \\bar{x})^2\\sum(y - \\bar{y})^2}}$'
                    },
                    {
                        name: 'Linear Regression',
                        formula: '$y = mx + c$',
                        description: 'where $m = \\frac{\\sum(x - \\bar{x})(y - \\bar{y})}{\\sum(x - \\bar{x})^2}$ and $c = \\bar{y} - m\\bar{x}$'
                    }
                ]
            }
        ]
    },
    'Calculus': {
        title: 'Calculus',
        formulas: [
            {
                category: 'Differentiation',
                items: [
                    {
                        name: 'Power Rule',
                        formula: '$\\frac{d}{dx}(x^n) = nx^{n-1}$'
                    },
                    {
                        name: 'Product Rule',
                        formula: '$\\frac{d}{dx}(uv) = u\\frac{dv}{dx} + v\\frac{du}{dx}$'
                    },
                    {
                        name: 'Quotient Rule',
                        formula: '$\\frac{d}{dx}\\left(\\frac{u}{v}\\right) = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2}$'
                    },
                    {
                        name: 'Chain Rule',
                        formula: '$\\frac{d}{dx}(f(g(x))) = f\'(g(x)) \\cdot g\'(x)$'
                    },
                    {
                        name: 'Common Derivatives',
                        formula: '$\\frac{d}{dx}(e^x) = e^x$, $\\frac{d}{dx}(\\ln x) = \\frac{1}{x}$',
                        formula2: '$\\frac{d}{dx}(\\sin x) = \\cos x$, $\\frac{d}{dx}(\\cos x) = -\\sin x$',
                        formula3: '$\\frac{d}{dx}(\\tan x) = \\sec^2 x$'
                    },
                    {
                        name: 'Second Derivative',
                        formula: '$f\'\'(x) = \\frac{d^2y}{dx^2}$'
                    }
                ]
            },
            {
                category: 'Integration',
                items: [
                    {
                        name: 'Power Rule',
                        formula: '$\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$, $n \\neq -1$'
                    },
                    {
                        name: 'Definite Integral',
                        formula: '$\\int_a^b f(x) dx = F(b) - F(a)$',
                        description: 'where $F\'(x) = f(x)$'
                    },
                    {
                        name: 'Integration by Parts',
                        formula: '$\\int u dv = uv - \\int v du$'
                    },
                    {
                        name: 'Common Integrals',
                        formula: '$\\int e^x dx = e^x + C$, $\\int \\frac{1}{x} dx = \\ln|x| + C$',
                        formula2: '$\\int \\sin x dx = -\\cos x + C$, $\\int \\cos x dx = \\sin x + C$',
                        formula3: '$\\int \\sec^2 x dx = \\tan x + C$'
                    },
                    {
                        name: 'Area Under Curve',
                        formula: '$A = \\int_a^b f(x) dx$'
                    },
                    {
                        name: 'Area Between Curves',
                        formula: '$A = \\int_a^b (f(x) - g(x)) dx$',
                        description: 'where $f(x) \\geq g(x)$ on $[a, b]$'
                    },
                    {
                        name: 'Volume of Revolution (x-axis)',
                        formula: '$V = \\pi \\int_a^b [f(x)]^2 dx$'
                    },
                    {
                        name: 'Volume of Revolution (y-axis)',
                        formula: '$V = \\pi \\int_a^b [f(y)]^2 dy$'
                    }
                ]
            },
            {
                category: 'Differential Equations',
                items: [
                    {
                        name: 'Separable Variables',
                        formula: '$\\frac{dy}{dx} = f(x)g(y) \\Rightarrow \\int \\frac{1}{g(y)} dy = \\int f(x) dx$'
                    },
                    {
                        name: 'Linear First Order',
                        formula: '$\\frac{dy}{dx} + P(x)y = Q(x)$',
                        description: 'Solution: $y = e^{-\\int P dx}\\left[\\int Q e^{\\int P dx} dx + C\\right]$'
                    }
                ]
            },
            {
                category: 'Limits and Continuity',
                items: [
                    {
                        name: 'L\'Hôpital\'s Rule',
                        formula: '$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f\'(x)}{g\'(x)}$',
                        description: 'when $\\lim_{x \\to a} f(x) = \\lim_{x \\to a} g(x) = 0$ or $\\pm \\infty$'
                    },
                    {
                        name: 'Continuity',
                        formula: '$f$ is continuous at $a$ if $\\lim_{x \\to a} f(x) = f(a)$'
                    }
                ]
            }
        ]
    }
};

