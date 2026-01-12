// IB Math Mastery Engine - Questions Database
// Real questions from IB Question Bank, organized by topic, difficulty, and paper type

const questionsDatabase = {
    'Number & Algebra': {
        'Foundation': {
            'Paper1': [
                {
                    question: 'Solve the equation $2 \\ln x = \\ln 9 + 4$. Give your answer in the form $x = pe^q$ where $p, q \\in \\mathbb{Z}^+$.',
                    marks: 5,
                    paper: 'Paper 1',
                    topic: 'Number & Algebra'
                },
                {
                    question: 'In an arithmetic sequence, the first term is 3 and the second term is 7. (a) Find the common difference. (b) Find the tenth term. (c) Find the sum of the first ten terms of the sequence.',
                    marks: 6,
                    paper: 'Paper 1',
                    topic: 'Number & Algebra'
                },
                {
                    question: 'Consider $(_{a}^{11}) = \\frac{11!}{a!(11-a)!}$. (a) Find the value of $a$. (b) Hence or otherwise find the coefficient of the term in $x^9$ in the expansion of $(x + 3)^{11}$.',
                    marks: 6,
                    paper: 'Paper 1',
                    topic: 'Number & Algebra'
                }
            ],
            'Paper2': [
                {
                    question: 'Mia baked a very large apple pie that she cuts into slices to share with her friends. The smallest slice is cut first. The volume of each successive slice of pie forms a geometric sequence. The second smallest slice has a volume of 30 cm³. The fifth smallest slice has a volume of 240 cm³. (a) Find the common ratio of the sequence. (b) Find the volume of the smallest slice of pie. (c) The apple pie has a volume of 61,425 cm³. Find the total number of slices Mia can cut from this pie.',
                    marks: 6,
                    paper: 'Paper 2',
                    topic: 'Number & Algebra'
                },
                {
                    question: 'The $n$th term of an arithmetic sequence is given by $u_n = 15 - 3n$. (a) State the value of the first term $u_1$. (b) Given that the $n$th term of this sequence is $-33$, find the value of $n$. (c) Find the common difference, $d$.',
                    marks: 5,
                    paper: 'Paper 2',
                    topic: 'Number & Algebra'
                }
            ]
        },
        'Standard': {
            'Paper1': [
                {
                    question: 'Consider the series $\\ln x + p \\ln x + \\frac{1}{p} \\ln x + \\ldots$, where $x \\in \\mathbb{R}$, $x > 1$ and $p \\in \\mathbb{R}$, $p \\neq 0$. Consider the case where the series is geometric. (a)(i) Show that $p = \\pm \\frac{1}{\\sqrt{3}}$. (a)(ii) Given that $p > 0$ and $S_8 = 3 + \\sqrt{3}$, find the value of $x$.',
                    marks: 7,
                    paper: 'Paper 1',
                    topic: 'Number & Algebra'
                },
                {
                    question: 'Solve the equation $\\log_2 x - \\log_2 5 = 2 + \\log_2 3$.',
                    marks: 4,
                    paper: 'Paper 1',
                    topic: 'Number & Algebra'
                }
            ],
            'Paper2': [
                {
                    question: 'Juan buys a bicycle in a sale. He gets a discount of 30% off the original price and pays 560 US dollars (USD). To buy the bicycle, Juan takes a loan of 560 USD for 6 months at a nominal annual interest rate of 75%, compounded monthly. (a) Calculate the original price of the bicycle. (b) Calculate the difference between the original price of the bicycle and the total amount Juan will pay.',
                    marks: 6,
                    paper: 'Paper 2',
                    topic: 'Number & Algebra'
                }
            ]
        },
        'Distinction': {
            'Paper1': [
                {
                    question: 'Prove by contradiction that the equation $2x^3 + 6x + 1 = 0$ has no integer roots.',
                    marks: 4,
                    paper: 'Paper 1',
                    topic: 'Number & Algebra'
                },
                {
                    question: 'Consider the expansion of $(3x^2 - k)^9$, where $k > 0$. The coefficient of the term in $x^6$ is 6048. Find the value of $k$.',
                    marks: 5,
                    paper: 'Paper 1',
                    topic: 'Number & Algebra'
                }
            ],
            'Paper2': [
                {
                    question: 'Consider the quartic equation $z^4 + 4z^3 + 8z^2 + 80z + 400 = 0$, $z \\in \\mathbb{C}$. Two of the roots of this equation are $a + bi$ and $b + ai$, where $a, b \\in \\mathbb{Z}$. Find the possible values of $a$.',
                    marks: 7,
                    paper: 'Paper 2',
                    topic: 'Number & Algebra'
                }
            ]
        }
    },
    'Functions': {
        'Foundation': {
            'Paper1': [
                {
                    question: 'Find $f(3)$ if $f(x) = 2x^2 - 5x + 1$.',
                    marks: 3,
                    paper: 'Paper 1',
                    topic: 'Functions'
                },
                {
                    question: 'Determine the domain of $f(x) = \\sqrt{x - 4}$.',
                    marks: 3,
                    paper: 'Paper 1',
                    topic: 'Functions'
                }
            ],
            'Paper2': [
                {
                    question: 'A function $f$ is defined by $f(x) = \\frac{2x + 4}{x - 3}$, where $x \\in \\mathbb{R}$, $x \\neq 3$. (a) Write down the equation of the vertical asymptote. (b) Write down the equation of the horizontal asymptote. (c) Find the coordinates where the graph of $f$ crosses the $x$-axis and $y$-axis.',
                    marks: 5,
                    paper: 'Paper 2',
                    topic: 'Functions'
                }
            ]
        },
        'Standard': {
            'Paper1': [
                {
                    question: 'Given $f(x) = x^2 - 4x + 3$, find the vertex and axis of symmetry.',
                    marks: 4,
                    paper: 'Paper 1',
                    topic: 'Functions'
                },
                {
                    question: 'Find the range of $f(x) = \\frac{1}{x - 2}$.',
                    marks: 4,
                    paper: 'Paper 1',
                    topic: 'Functions'
                }
            ],
            'Paper2': [
                {
                    question: 'The function $f$ is defined by $f(x) = \\frac{2x - 1}{x + 1}$, where $x \\in \\mathbb{R}$, $x \\neq -1$. The graph of $y = f(x)$ has a vertical asymptote and a horizontal asymptote. (a) Write down the equation of the vertical asymptote. (b) Write down the equation of the horizontal asymptote. (c) On the set of axes below, sketch the graph of $y = f(x)$.',
                    marks: 5,
                    paper: 'Paper 2',
                    topic: 'Functions'
                }
            ]
        },
        'Distinction': {
            'Paper1': [
                {
                    question: 'Investigate the behavior of $f(x) = \\frac{x^3 - 1}{x^2 - 1}$ as $x \\to 1$.',
                    marks: 5,
                    paper: 'Paper 1',
                    topic: 'Functions'
                },
                {
                    question: 'Prove that $f(x) = x^3 + x$ is one-to-one.',
                    marks: 4,
                    paper: 'Paper 1',
                    topic: 'Functions'
                }
            ],
            'Paper2': [
                {
                    question: 'The function $f$ is defined by $f(x) = e^{2x} - 6e^x + 5$, $x \\in \\mathbb{R}$, $x \\leq a$. (a) Find the largest value of $a$ such that $f$ has an inverse function. (b) For this value of $a$, find an expression for $f^{-1}(x)$, stating its domain.',
                    marks: 8,
                    paper: 'Paper 2',
                    topic: 'Functions'
                }
            ]
        }
    },
    'Geometry & Trig': {
        'Foundation': {
            'Paper1': [
                {
                    question: 'In a right triangle, if one angle is $30°$ and the opposite side is 5 cm, find the hypotenuse.',
                    marks: 3,
                    paper: 'Paper 1',
                    topic: 'Geometry & Trig'
                },
                {
                    question: 'Convert $\\frac{5\\pi}{6}$ radians to degrees.',
                    marks: 2,
                    paper: 'Paper 1',
                    topic: 'Geometry & Trig'
                }
            ],
            'Paper2': [
                {
                    question: 'A park in the form of a triangle, $ABC$, is shown in the following diagram. $AB$ is 79 km and $BC$ is 62 km. Angle $ABC$ is $52°$. (a) Calculate the length of side $AC$ in km. (b) Calculate the area of the park.',
                    marks: 6,
                    paper: 'Paper 2',
                    topic: 'Geometry & Trig'
                },
                {
                    question: 'A solid right circular cone has a base radius of 21 cm and a slant height of 35 cm. A smaller right circular cone has a height of 12 cm and a slant height of 15 cm, and is removed from the top of the larger cone. (a) Calculate the radius of the base of the cone which has been removed. (b) Calculate the curved surface area of the cone which has been removed. (c) Calculate the curved surface area of the remaining solid.',
                    marks: 6,
                    paper: 'Paper 2',
                    topic: 'Geometry & Trig'
                }
            ]
        },
        'Standard': {
            'Paper1': [
                {
                    question: 'Solve triangle $ABC$ where $a = 8$, $b = 10$, and angle $C = 60°$.',
                    marks: 5,
                    paper: 'Paper 1',
                    topic: 'Geometry & Trig'
                },
                {
                    question: 'Find the exact value of $\\sin(75°)$ using compound angle formulas.',
                    marks: 4,
                    paper: 'Paper 1',
                    topic: 'Geometry & Trig'
                }
            ],
            'Paper2': [
                {
                    question: 'Points $A$ and $P$ lie on opposite banks of a river, such that $AP$ is the shortest distance across the river. Point $B$ represents the centre of a city which is located on the riverbank. $PB = 215$ km, $AP = 65$ km and $\\angle APB = 90°$. A boat travels at an average speed of 42 km/h. A bus travels along the straight road between $P$ and $B$ at an average speed of 84 km/h. Find the travel time, in hours, from $A$ to $B$ given that the boat is taken from $A$ to $P$, and the bus from $P$ to $B$.',
                    marks: 4,
                    paper: 'Paper 2',
                    topic: 'Geometry & Trig'
                }
            ]
        },
        'Distinction': {
            'Paper1': [
                {
                    question: 'Prove the cosine rule: $c^2 = a^2 + b^2 - 2ab\\cos C$.',
                    marks: 5,
                    paper: 'Paper 1',
                    topic: 'Geometry & Trig'
                },
                {
                    question: 'Solve $\\sin 2x = \\cos x$ for $0 \\leq x \\leq 2\\pi$.',
                    marks: 5,
                    paper: 'Paper 1',
                    topic: 'Geometry & Trig'
                }
            ],
            'Paper2': [
                {
                    question: 'The Tower of Pisa is well known worldwide for how it leans. Giovanni visits the Tower and wants to investigate how much it is leaning. He draws a diagram showing a non-right triangle, $ABC$. On Giovanni\'s diagram the length of $AB$ is 56 m, the length of $BC$ is 37 m, and angle $ACB$ is $60°$. $AX$ is the perpendicular height from $A$ to $BC$. (a) Use Giovanni\'s diagram to show that angle $ABC$, the angle at which the Tower is leaning relative to the horizontal, is $85°$ to the nearest degree. (b) Find the percentage error on Giovanni\'s diagram if the actual horizontal displacement $BX$ is 3.9 metres.',
                    marks: 9,
                    paper: 'Paper 2',
                    topic: 'Geometry & Trig'
                }
            ]
        }
    },
    'Stats & Probability': {
        'Foundation': {
            'Paper1': [
                {
                    question: 'Calculate the mean of the data set: 12, 15, 18, 20, 22.',
                    marks: 3,
                    paper: 'Paper 1',
                    topic: 'Stats & Probability'
                },
                {
                    question: 'A fair die is rolled. Find the probability of rolling a prime number.',
                    marks: 3,
                    paper: 'Paper 1',
                    topic: 'Stats & Probability'
                }
            ],
            'Paper2': [
                {
                    question: 'For a study, a researcher collected 200 leaves from oak trees. After measuring the lengths of the leaves, in cm, she produced a cumulative frequency graph. (a) Write down the median length of these leaves. (b) Write down the number of leaves with a length less than or equal to 8 cm. (c) The researcher finds that 10% of the leaves have a length greater than $k$ cm. Use the graph to find the value of $k$.',
                    marks: 5,
                    paper: 'Paper 2',
                    topic: 'Stats & Probability'
                },
                {
                    question: 'The marks obtained by nine Mathematical Studies SL students in their projects ($x$) and their final IB examination scores ($y$) were recorded. (a) Use your graphic display calculator to write down $\\bar{x}$, the mean project mark. (b) Use your graphic display calculator to write down $\\bar{y}$, the mean examination score. (c) Use your graphic display calculator to write down $r$, Pearson\'s product-moment correlation coefficient.',
                    marks: 4,
                    paper: 'Paper 2',
                    topic: 'Stats & Probability'
                }
            ]
        },
        'Standard': {
            'Paper1': [
                {
                    question: 'Calculate the standard deviation of: 10, 15, 20, 25, 30.',
                    marks: 4,
                    paper: 'Paper 1',
                    topic: 'Stats & Probability'
                },
                {
                    question: 'In a class of 30 students, 12 study Physics and 18 study Chemistry. If 8 study both, find the probability a randomly chosen student studies at least one.',
                    marks: 4,
                    paper: 'Paper 1',
                    topic: 'Stats & Probability'
                }
            ],
            'Paper2': [
                {
                    question: 'The following table shows the average body weight, $x$, and the average weight of the brain, $y$, of seven species of mammal. Both measured in kilograms (kg). (a) Find the range of the average body weights for these seven species of mammal. (b) For the data from these seven species calculate $r$, the Pearson\'s product-moment correlation coefficient. (c) Write down the equation of the regression line $y$ on $x$, in the form $y = mx + c$.',
                    marks: 6,
                    paper: 'Paper 2',
                    topic: 'Stats & Probability'
                }
            ]
        },
        'Distinction': {
            'Paper1': [
                {
                    question: 'A factory produces items with a defect rate of 5%. Using a normal approximation, find the probability that in a batch of 200 items, more than 12 are defective.',
                    marks: 5,
                    paper: 'Paper 1',
                    topic: 'Stats & Probability'
                },
                {
                    question: 'Derive the formula for the variance of a binomial distribution.',
                    marks: 6,
                    paper: 'Paper 1',
                    topic: 'Stats & Probability'
                }
            ],
            'Paper2': [
                {
                    question: 'A continuous random variable $X$ has a probability density function given by $f(x) = \\begin{cases} \\frac{2}{(b-a)(b-c)}(x-a) & a \\leq x \\leq c \\\\ 0 & \\text{otherwise} \\end{cases}$. Given that $c = \\frac{a+b}{2}$, find an expression for the median of $X$ in terms of $a$, $b$ and $c$.',
                    marks: 7,
                    paper: 'Paper 2',
                    topic: 'Stats & Probability'
                }
            ]
        }
    },
    'Calculus': {
        'Foundation': {
            'Paper1': [
                {
                    question: 'Differentiate: $f(x) = x^3 - 4x^2 + 2x - 1$.',
                    marks: 3,
                    paper: 'Paper 1',
                    topic: 'Calculus'
                },
                {
                    question: 'Find $\\frac{d}{dx}(\\sin x)$.',
                    marks: 2,
                    paper: 'Paper 1',
                    topic: 'Calculus'
                }
            ],
            'Paper2': [
                {
                    question: 'Evaluate $\\int_0^2 (3x^2 - 2x + 1) dx$.',
                    marks: 4,
                    paper: 'Paper 2',
                    topic: 'Calculus'
                }
            ]
        },
        'Standard': {
            'Paper1': [
                {
                    question: 'Use the product rule to differentiate $f(x) = x^2 \\sin x$.',
                    marks: 4,
                    paper: 'Paper 1',
                    topic: 'Calculus'
                },
                {
                    question: 'Find the equation of the tangent to $y = x^3 - 3x + 2$ at $x = 1$.',
                    marks: 5,
                    paper: 'Paper 1',
                    topic: 'Calculus'
                }
            ],
            'Paper2': [
                {
                    question: 'A water container is made in the shape of a cylinder with internal height $h$ cm and internal base radius $r$ cm. The water container has no top. The inner surfaces of the container are to be coated with a water-resistant material. The volume of the water container is 0.5 m³. The water container is designed so that the area to be coated is minimized. (a) Write down a formula for $A$, the surface area to be coated. (b) Show that $A = \\pi r^2 + \\frac{1,000,000}{r}$. (c) Find the value of $r$ which minimizes $A$.',
                    marks: 7,
                    paper: 'Paper 2',
                    topic: 'Calculus'
                }
            ]
        },
        'Distinction': {
            'Paper1': [
                {
                    question: 'Use L\'Hôpital\'s rule to evaluate $\\lim_{x \\to 0} \\frac{\\sin x}{x}$.',
                    marks: 4,
                    paper: 'Paper 1',
                    topic: 'Calculus'
                },
                {
                    question: 'Find the area enclosed by the curves $y = x^2$ and $y = 2x - x^2$.',
                    marks: 5,
                    paper: 'Paper 1',
                    topic: 'Calculus'
                }
            ],
            'Paper2': [
                {
                    question: 'The population, $P$, of a particular species of marsupial on a small remote island can be modelled by the logistic differential equation $\\frac{dP}{dt} = kP\\left(1 - \\frac{P}{N}\\right)$ where $t$ is the time measured in years and $k$, $N$ are positive constants. (a) Show that $\\frac{d^2P}{dt^2} = k^2P\\left(1 - \\frac{P}{N}\\right)\\left(1 - \\frac{2P}{N}\\right)$. (b) Hence show that the population of marsupials will increase at its maximum rate when $P = \\frac{N}{2}$.',
                    marks: 9,
                    paper: 'Paper 2',
                    topic: 'Calculus'
                }
            ]
        }
    }
};

// HL Paper 3 Investigation Questions
const paper3Questions = [
    {
        title: 'Differential Equations Investigation',
        question: `In this question you will be exploring the strategies required to solve a system of linear differential equations.

Consider the system of linear differential equations of the form:
$$\\frac{dx}{dt} = x - y \\quad \\text{and} \\quad \\frac{dy}{dt} = ax + y,$$
where $x, y, t \\in \\mathbb{R}^+$ and $a$ is a parameter.

First consider the case where $a = 0$.
(a)(i) By solving the differential equation $\\frac{dy}{dt} = y$, show that $y = Ae^t$ where $A$ is a constant.
(a)(ii) Show that $\\frac{dx}{dt} - x = -Ae^t$.
(a)(iii) Solve the differential equation in part (a)(ii) to find $x$ as a function of $t$.

Now consider the case where $a = -1$.
(b)(i) By differentiating $\\frac{dy}{dt} = -x + y$ with respect to $t$, show that $\\frac{d^2y}{dt^2} = 2\\frac{dy}{dt}$.
(b)(ii) By substituting $Y = \\frac{dy}{dt}$, show that $Y = Be^{2t}$ where $B$ is a constant.
(b)(iii) Hence find $y$ as a function of $t$.
(b)(iv) Hence show that $x = -\\frac{B}{2}e^{2t} + C$, where $C$ is a constant.`,
        marks: 20,
        paper: 'Paper 3',
        topic: 'Calculus',
        difficulty: 'Distinction'
    },
    {
        title: 'Hyperbolic Functions Investigation',
        question: `In this question you will explore some of the properties of special functions $f$ and $g$ and their relationship with the trigonometric functions, sine and cosine.

Consider $t$ and $u$, such that $t, u \\in \\mathbb{R}$.

Using $e^{iu} = \\cos u + i\\sin u$, find expressions, in terms of $\\sin u$ and $\\cos u$, for:
(a) $f(iu)$ and (b) $g(iu)$.

The functions $\\cos x$ and $\\sin x$ are known as circular functions as the general point $(\\cos \\theta, \\sin \\theta)$ defines points on the unit circle with equation $x^2 + y^2 = 1$.

The functions $f(x)$ and $g(x)$ are known as hyperbolic functions, as the general point $(f(\\theta), g(\\theta))$ defines points on a curve known as a hyperbola with equation $x^2 - y^2 = 1$.

(c) Show that $(f(t))^2 - (g(t))^2 = (f(iu))^2 - (g(iu))^2$.
(d) Sketch the graph of $x^2 - y^2 = 1$, stating the coordinates of any axis intercepts and the equation of each asymptote.`,
        marks: 20,
        paper: 'Paper 3',
        topic: 'Functions',
        difficulty: 'Distinction'
    },
    {
        title: 'Polynomial Root Investigation',
        question: `This question asks you to investigate conditions for the existence of complex roots of polynomial equations of degree 3 and 4.

The cubic equation $x^3 + px^2 + qx + r = 0$, where $p, q, r \\in \\mathbb{R}$, has roots $\\alpha$, $\\beta$ and $\\gamma$.

(a) By expanding $(x - \\alpha)(x - \\beta)(x - \\gamma)$ show that:
$$p = -(\\alpha + \\beta + \\gamma), \\quad q = \\alpha\\beta + \\beta\\gamma + \\gamma\\alpha, \\quad r = -\\alpha\\beta\\gamma.$$

(b)(i) Show that $p^2 - 2q = \\alpha^2 + \\beta^2 + \\gamma^2$.
(b)(ii) Hence show that $(\\alpha - \\beta)^2 + (\\beta - \\gamma)^2 + (\\gamma - \\alpha)^2 = 2p^2 - 6q$.

(c) Given that $p^2 < 3q$, deduce that $\\alpha$, $\\beta$ and $\\gamma$ cannot all be real.

Consider the equation $x^3 - 7x^2 + qx + 1 = 0$, where $q \\in \\mathbb{R}$.
(d) Using the result from part (c), show that when $q = 17$, this equation has at least one complex root.`,
        marks: 20,
        paper: 'Paper 3',
        topic: 'Number & Algebra',
        difficulty: 'Distinction'
    }
];

// Helper function to get a random question from the database
function getRandomQuestion(topic, difficulty, paperType) {
    const topicQuestions = questionsDatabase[topic];
    if (!topicQuestions) return null;
    
    const difficultyQuestions = topicQuestions[difficulty];
    if (!difficultyQuestions) return null;
    
    const paperQuestions = difficultyQuestions[paperType];
    if (!paperQuestions || paperQuestions.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * paperQuestions.length);
    return paperQuestions[randomIndex];
}

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questionsDatabase, paper3Questions, getRandomQuestion };
}

