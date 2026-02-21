import { PythonQuestion } from './pythonQuestionTypes';

const chapter3Questions: PythonQuestion[] = [
  // ===== FUNCTION BASICS (1-15) =====
  {
    id: 201,
    question: 'Which keyword is used to define a function in Python?',
    options: ['function', 'func', 'def', 'define'],
    correctAnswer: 2,
    explanation: 'Python uses the def keyword to define functions.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 202,
    question: 'What does a function return if there is no return statement?',
    options: ['0', '""', 'None', 'Error'],
    correctAnswer: 2,
    explanation: 'A function without a return statement implicitly returns None.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 203,
    question: 'What is the output of:\ndef greet(name):\n    return f"Hi {name}"\nprint(greet("Alice"))',
    options: ['Hi Alice', 'Hi {name}', 'greet("Alice")', 'Error'],
    correctAnswer: 0,
    explanation: 'The function returns "Hi Alice" using an f-string, which is then printed.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 204,
    question: 'What is the output of:\ndef add(a, b):\n    return a + b\nresult = add(3, 4)\nprint(result)',
    options: ['34', '7', 'None', 'Error'],
    correctAnswer: 1,
    explanation: 'The function adds 3 + 4 = 7 and returns it.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 205,
    question: 'What happens if you call a function with fewer arguments than defined?',
    options: ['Missing args become None', 'TypeError is raised', 'Missing args become 0', 'Function runs with defaults'],
    correctAnswer: 1,
    explanation: 'Python raises TypeError when required arguments are missing.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 206,
    question: 'What is the output of:\ndef power(base, exp=2):\n    return base ** exp\nprint(power(3))',
    options: ['6', '9', '3', 'Error'],
    correctAnswer: 1,
    explanation: 'exp defaults to 2, so power(3) computes 3**2 = 9.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 207,
    question: 'What is the output of:\ndef power(base, exp=2):\n    return base ** exp\nprint(power(2, 3))',
    options: ['4', '8', '6', 'Error'],
    correctAnswer: 1,
    explanation: 'The explicit argument 3 overrides the default. 2**3 = 8.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 208,
    question: 'What is the output of:\ndef func():\n    return 1, 2, 3\nx = func()\nprint(type(x))',
    options: ["<class 'list'>", "<class 'tuple'>", "<class 'int'>", "Error"],
    correctAnswer: 1,
    explanation: 'Multiple return values are packed into a tuple automatically.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 209,
    question: 'What is the output of:\ndef func():\n    return 1, 2, 3\na, b, c = func()\nprint(b)',
    options: ['1', '2', '3', 'Error'],
    correctAnswer: 1,
    explanation: 'Tuple unpacking assigns 1 to a, 2 to b, 3 to c.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 210,
    question: 'Can a function be assigned to a variable in Python?',
    options: ['No', 'Yes — functions are first-class objects', 'Only built-in functions', 'Only with decorators'],
    correctAnswer: 1,
    explanation: 'Functions are first-class objects — they can be assigned, passed, and returned.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 211,
    question: 'What does the pass keyword do inside a function body?',
    options: ['Returns None', 'Skips the function', 'Acts as a placeholder doing nothing', 'Passes arguments forward'],
    correctAnswer: 2,
    explanation: 'pass is a no-op placeholder, useful for stubbing out functions.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 212,
    question: 'What is a docstring?',
    options: ['A comment using #', 'A triple-quoted string as the first statement in a function', 'A type annotation', 'A return value description'],
    correctAnswer: 1,
    explanation: 'A docstring is a triple-quoted string at the start of a function/class/module for documentation.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 213,
    question: 'How do you access a function\'s docstring?',
    options: ['func.doc', 'func.__docstring__', 'func.__doc__', 'func.help()'],
    correctAnswer: 2,
    explanation: 'The __doc__ attribute stores the docstring of a function.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 214,
    question: 'What are type hints in Python?',
    options: ['Enforced type checks', 'Optional annotations for expected types', 'Compiler directives', 'Runtime type validation'],
    correctAnswer: 1,
    explanation: 'Type hints are optional annotations. Python does not enforce them at runtime.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 215,
    question: 'What is the output of:\ndef func(a: int, b: int) -> int:\n    return a + b\nprint(func("x", "y"))',
    options: ['Error — type mismatch', 'xy', '0', 'None'],
    correctAnswer: 1,
    explanation: 'Type hints are not enforced. Python concatenates the strings, returning "xy".',
    difficulty: 'intermediate',
    chapter: 3
  },
  // ===== ARGS & KWARGS (16-30) =====
  {
    id: 216,
    question: 'What does *args allow in a function definition?',
    options: ['Keyword arguments', 'A variable number of positional arguments', 'Default arguments', 'Type-checked arguments'],
    correctAnswer: 1,
    explanation: '*args collects extra positional arguments into a tuple.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 217,
    question: 'What does **kwargs allow in a function definition?',
    options: ['A variable number of positional arguments', 'A variable number of keyword arguments', 'Only two arguments', 'Sorted arguments'],
    correctAnswer: 1,
    explanation: '**kwargs collects extra keyword arguments into a dictionary.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 218,
    question: 'What is the type of args inside a function defined as def f(*args)?',
    options: ['list', 'tuple', 'dict', 'set'],
    correctAnswer: 1,
    explanation: '*args collects positional arguments into a tuple (not a list).',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 219,
    question: 'What is the type of kwargs inside def f(**kwargs)?',
    options: ['list', 'tuple', 'dict', 'set'],
    correctAnswer: 2,
    explanation: '**kwargs collects keyword arguments into a dictionary.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 220,
    question: 'What is the output of:\ndef f(*args):\n    print(args)\nf(1, 2, 3)',
    options: ['[1, 2, 3]', '(1, 2, 3)', '1 2 3', 'Error'],
    correctAnswer: 1,
    explanation: '*args packs arguments into a tuple: (1, 2, 3).',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 221,
    question: 'What is the output of:\ndef f(**kwargs):\n    print(kwargs)\nf(a=1, b=2)',
    options: ["{'a': 1, 'b': 2}", '(1, 2)', '[1, 2]', 'Error'],
    correctAnswer: 0,
    explanation: "**kwargs packs keyword arguments into a dict: {'a': 1, 'b': 2}.",
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 222,
    question: 'What is the correct parameter order in a function definition?',
    options: ['*args, normal, **kwargs, defaults', 'normal, defaults, *args, **kwargs', '**kwargs, *args, normal', 'Any order is fine'],
    correctAnswer: 1,
    explanation: 'The correct order is: positional, defaults, *args, keyword-only, **kwargs.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 223,
    question: 'What is a keyword-only argument?',
    options: ['An argument with a default value', 'An argument that must be passed by name (after *)', 'An argument using **kwargs', 'An argument with a type hint'],
    correctAnswer: 1,
    explanation: 'Parameters defined after * or *args must be passed as keyword arguments.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 224,
    question: 'What does def f(a, /, b) mean?',
    options: ['a is keyword-only', 'a is positional-only (Python 3.8+)', 'b is positional-only', 'Syntax error'],
    correctAnswer: 1,
    explanation: 'Parameters before / are positional-only — they cannot be passed by name.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 225,
    question: 'What is the output of:\ndef f(a, b, *rest):\n    print(rest)\nf(1, 2, 3, 4, 5)',
    options: ['(1, 2, 3, 4, 5)', '(3, 4, 5)', '[3, 4, 5]', 'Error'],
    correctAnswer: 1,
    explanation: 'a=1, b=2 are assigned. The remaining 3, 4, 5 go into rest as a tuple.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 226,
    question: 'How do you unpack a list as positional arguments when calling a function?',
    options: ['f(list)', 'f(*list)', 'f(**list)', 'f(unpack(list))'],
    correctAnswer: 1,
    explanation: 'The * operator unpacks a list/tuple into positional arguments.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 227,
    question: 'How do you unpack a dictionary as keyword arguments?',
    options: ['f(dict)', 'f(*dict)', 'f(**dict)', 'f(unpack(dict))'],
    correctAnswer: 2,
    explanation: 'The ** operator unpacks a dictionary into keyword arguments.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 228,
    question: 'What is wrong with: def f(a=[]):\n    a.append(1)\n    return a',
    options: ['Nothing — it works perfectly', 'The default mutable list is shared across calls', 'Lists cannot be default values', 'append is not a list method'],
    correctAnswer: 1,
    explanation: 'Mutable default arguments are created once and shared. Use None as default instead.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 229,
    question: 'What is the proper fix for mutable default arguments?',
    options: ['def f(a=None): a = a or []', 'def f(a=None): a = a if a is not None else []', 'Both A and B work', 'Use def f(a=list()):'],
    correctAnswer: 2,
    explanation: 'Use None as default, then create a new list inside the function. Both approaches work.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 230,
    question: 'Does Python pass arguments by value or by reference?',
    options: ['By value', 'By reference', 'By object reference (pass by assignment)', 'It depends on the type'],
    correctAnswer: 2,
    explanation: 'Python uses pass-by-object-reference. The variable binding is passed, not the object itself.',
    difficulty: 'advanced',
    chapter: 3
  },
  // ===== LAMBDA & HIGHER ORDER (31-45) =====
  {
    id: 231,
    question: 'What is a lambda function?',
    options: ['A named function', 'An anonymous single-expression function', 'A class method', 'A generator'],
    correctAnswer: 1,
    explanation: 'Lambda creates an anonymous function limited to a single expression.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 232,
    question: 'What is the output of: print((lambda x, y: x + y)(3, 4))?',
    options: ['34', '7', 'Error', 'lambda'],
    correctAnswer: 1,
    explanation: 'The lambda adds x and y. Called immediately with (3, 4), it returns 7.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 233,
    question: 'Can a lambda function contain multiple statements?',
    options: ['Yes', 'No — only a single expression', 'Yes, with semicolons', 'Only with return'],
    correctAnswer: 1,
    explanation: 'Lambda functions are limited to a single expression. Use def for multiple statements.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 234,
    question: 'What does sorted(["banana","apple","cherry"], key=lambda x: len(x)) return?',
    options: ['["apple","banana","cherry"]', '["apple","cherry","banana"]', '["cherry","banana","apple"]', '["banana","apple","cherry"]'],
    correctAnswer: 0,
    explanation: 'Sorted by string length: apple(5), banana(6), cherry(6). banana and cherry tie.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 235,
    question: 'What does map(str, [1, 2, 3]) return?',
    options: ['["1","2","3"]', 'A map object (iterator)', '("1","2","3")', 'Error'],
    correctAnswer: 1,
    explanation: 'map() returns a lazy map object (iterator), not a list. Use list() to convert.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 236,
    question: 'What does list(map(lambda x: x**2, [1,2,3])) return?',
    options: ['[1, 2, 3]', '[1, 4, 9]', '[2, 4, 6]', 'Error'],
    correctAnswer: 1,
    explanation: 'map applies the lambda (square) to each element: 1, 4, 9.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 237,
    question: 'What does list(filter(None, [0, 1, "", "hi", None, 3])) return?',
    options: ['[0, 1, "", "hi", None, 3]', '[1, "hi", 3]', '[0, "", None]', 'Error'],
    correctAnswer: 1,
    explanation: 'filter(None, ...) removes falsy values. Only 1, "hi", and 3 are truthy.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 238,
    question: 'Which module contains reduce()?',
    options: ['builtins', 'functools', 'itertools', 'operator'],
    correctAnswer: 1,
    explanation: 'reduce() was moved to functools in Python 3. It is no longer a built-in.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 239,
    question: 'What does functools.reduce(lambda a,b: a+b, [1,2,3,4]) return?',
    options: ['[1, 2, 3, 4]', '10', '24', 'Error'],
    correctAnswer: 1,
    explanation: 'reduce applies the function cumulatively: ((1+2)+3)+4 = 10.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 240,
    question: 'What is a higher-order function?',
    options: ['A function with many parameters', 'A function that takes or returns another function', 'A recursive function', 'A class method'],
    correctAnswer: 1,
    explanation: 'Higher-order functions accept functions as arguments or return them.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 241,
    question: 'What is the output of:\ndef apply(func, x):\n    return func(x)\nprint(apply(abs, -5))',
    options: ['-5', '5', 'Error', 'None'],
    correctAnswer: 1,
    explanation: 'apply calls abs(-5), which returns 5. Functions can be passed as arguments.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 242,
    question: 'What does functools.partial(pow, 2) create?',
    options: ['A function that computes pow(x, 2)', 'A function that computes pow(2, x)', 'The value 4', 'Error'],
    correctAnswer: 1,
    explanation: 'partial freezes the first argument to 2, creating a function: pow(2, x).',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 243,
    question: 'What does callable(42) return?',
    options: ['True', 'False', 'Error', 'None'],
    correctAnswer: 1,
    explanation: 'callable() checks if an object can be called. 42 is not callable.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 244,
    question: 'What does callable(print) return?',
    options: ['True', 'False', 'Error', 'None'],
    correctAnswer: 0,
    explanation: 'print is a built-in function and is callable.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 245,
    question: 'What is the output of:\nsquare = lambda x: x ** 2\nprint(square.__name__)',
    options: ['"square"', '"<lambda>"', 'Error', 'None'],
    correctAnswer: 1,
    explanation: 'Lambda functions are anonymous. Their __name__ attribute is always "<lambda>".',
    difficulty: 'advanced',
    chapter: 3
  },
  // ===== SCOPE & CLOSURES (46-60) =====
  {
    id: 246,
    question: 'What does LEGB stand for in Python scope resolution?',
    options: ['Local, External, Global, Built-in', 'Local, Enclosing, Global, Built-in', 'Local, Enclosing, General, Basic', 'Level, Enclosing, Global, Base'],
    correctAnswer: 1,
    explanation: 'LEGB: Local → Enclosing → Global → Built-in is the scope lookup order.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 247,
    question: 'What is the output of:\nx = 10\ndef f():\n    print(x)\nf()',
    options: ['10', 'Error', 'None', '0'],
    correctAnswer: 0,
    explanation: 'x is not local, so Python looks in the global scope and finds x=10.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 248,
    question: 'What is the output of:\nx = 10\ndef f():\n    x = 20\n    print(x)\nf()\nprint(x)',
    options: ['20\\n20', '20\\n10', '10\\n10', 'Error'],
    correctAnswer: 1,
    explanation: 'Inside f(), x=20 is local. Outside, the global x=10 is unchanged.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 249,
    question: 'What does the global keyword do?',
    options: ['Creates a new global variable', 'Allows a function to modify a global variable', 'Makes a variable immutable', 'Imports a global module'],
    correctAnswer: 1,
    explanation: 'global declares that a variable inside a function refers to the global scope.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 250,
    question: 'What is the output of:\nx = 10\ndef f():\n    global x\n    x = 20\nf()\nprint(x)',
    options: ['10', '20', 'Error', 'None'],
    correctAnswer: 1,
    explanation: 'global x makes f() modify the global x. After f(), x is 20.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 251,
    question: 'What does the nonlocal keyword do?',
    options: ['Accesses global scope', 'Accesses the enclosing (non-global) scope', 'Creates a new scope', 'Deletes a local variable'],
    correctAnswer: 1,
    explanation: 'nonlocal allows a nested function to modify a variable in its enclosing function.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 252,
    question: 'What is a closure in Python?',
    options: ['A function that closes files', 'A nested function that remembers variables from its enclosing scope', 'A class destructor', 'A finally block'],
    correctAnswer: 1,
    explanation: 'A closure is a function that retains access to variables from its enclosing scope even after that scope ends.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 253,
    question: 'What is the output of:\ndef outer():\n    x = 10\n    def inner():\n        return x\n    return inner\nf = outer()\nprint(f())',
    options: ['10', 'Error', 'None', '0'],
    correctAnswer: 0,
    explanation: 'inner is a closure — it remembers x=10 from outer even after outer returns.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 254,
    question: 'What is the output of:\ndef counter():\n    count = 0\n    def inc():\n        nonlocal count\n        count += 1\n        return count\n    return inc\nc = counter()\nprint(c(), c())',
    options: ['1 1', '1 2', '0 1', 'Error'],
    correctAnswer: 1,
    explanation: 'nonlocal allows inc to modify count. Each call increments: 1, then 2.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 255,
    question: 'What is the output of:\nx = 5\ndef f():\n    print(x)\n    x = 10\nf()',
    options: ['5', '10', 'UnboundLocalError', 'None'],
    correctAnswer: 2,
    explanation: 'The assignment x=10 makes x local. Reading it before assignment causes UnboundLocalError.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 256,
    question: 'Can you modify a global mutable object (like a list) inside a function without global keyword?',
    options: ['No — you always need global', 'Yes — mutating does not rebind the name', 'Only with nonlocal', 'Only tuples'],
    correctAnswer: 1,
    explanation: 'You can mutate (append, extend) a global list without global. You need global only to reassign it.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 257,
    question: 'If you pass a list to a function and append to it, is the original list affected?',
    options: ['No — a copy is passed', 'Yes — lists are mutable and passed by reference', 'Only if you use global', 'It depends on the list size'],
    correctAnswer: 1,
    explanation: 'Lists are mutable. The function receives the same object, so mutations are visible outside.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 258,
    question: 'If you pass an integer to a function and reassign it, is the original affected?',
    options: ['Yes', 'No — integers are immutable; reassignment creates a new binding', 'Only with global', 'It depends'],
    correctAnswer: 1,
    explanation: 'Integers are immutable. Reassigning inside the function only changes the local binding.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 259,
    question: 'What does locals() return inside a function?',
    options: ['Global variables', 'A dictionary of the local symbol table', 'Function parameters only', 'None'],
    correctAnswer: 1,
    explanation: 'locals() returns a dictionary of the current local scope variables and their values.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 260,
    question: 'What happens if you define a function inside another function?',
    options: ['Error — not allowed', 'The inner function is created each time the outer runs', 'The inner function is global', 'It only works with lambda'],
    correctAnswer: 1,
    explanation: 'Python allows nested functions. The inner function is recreated on each call to the outer.',
    difficulty: 'intermediate',
    chapter: 3
  },
  // ===== DECORATORS (61-72) =====
  {
    id: 261,
    question: 'What is a decorator in Python?',
    options: ['A comment syntax', 'A function that modifies another function', 'A class attribute', 'A type hint'],
    correctAnswer: 1,
    explanation: 'A decorator is a function that takes another function and extends its behavior.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 262,
    question: 'What does the @decorator_name syntax do?',
    options: ['Calls the function immediately', 'Applies a decorator to the function below it', 'Comments out the function', 'Makes the function private'],
    correctAnswer: 1,
    explanation: '@decorator above a function is syntactic sugar for func = decorator(func).',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 263,
    question: 'What is the output of:\ndef double(func):\n    def wrapper(*args):\n        return func(*args) * 2\n    return wrapper\n\n@double\ndef add(a, b):\n    return a + b\nprint(add(3, 4))',
    options: ['7', '14', '34', 'Error'],
    correctAnswer: 1,
    explanation: 'The decorator doubles the result. add(3,4) = 7, then * 2 = 14.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 264,
    question: 'What does functools.wraps do in a decorator?',
    options: ['Makes the decorator faster', 'Preserves the original function metadata (__name__, __doc__)', 'Makes the function recursive', 'Adds error handling'],
    correctAnswer: 1,
    explanation: 'functools.wraps copies the original function name, docstring, and other attributes to the wrapper.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 265,
    question: 'Can multiple decorators be stacked on one function?',
    options: ['No — only one allowed', 'Yes — they apply bottom-up', 'Yes — they apply top-down', 'Only two at most'],
    correctAnswer: 1,
    explanation: 'Multiple decorators stack. @A\\n@B\\ndef f: is equivalent to f = A(B(f)). Bottom decorator applies first.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 266,
    question: 'What is @staticmethod used for?',
    options: ['Making a function recursive', 'Defining a method that does not receive self or cls', 'Making a method private', 'Caching return values'],
    correctAnswer: 1,
    explanation: '@staticmethod defines a method that belongs to the class but does not access instance or class.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 267,
    question: 'What is @classmethod used for?',
    options: ['Creating an instance method', 'Defining a method that receives the class (cls) as first argument', 'Making a method abstract', 'Preventing inheritance'],
    correctAnswer: 1,
    explanation: '@classmethod receives the class itself as the first argument (cls) instead of an instance.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 268,
    question: 'What does @property do?',
    options: ['Makes an attribute private', 'Allows a method to be accessed like an attribute', 'Makes a method static', 'Prevents attribute deletion'],
    correctAnswer: 1,
    explanation: '@property lets you define a method that is accessed like an attribute (no parentheses).',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 269,
    question: 'What is @functools.lru_cache used for?',
    options: ['Logging function calls', 'Caching function results (memoization)', 'Making functions thread-safe', 'Sorting results'],
    correctAnswer: 1,
    explanation: 'lru_cache caches function results based on arguments, speeding up repeated calls.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 270,
    question: 'What is the output of:\nimport functools\n@functools.lru_cache\ndef fib(n):\n    if n < 2: return n\n    return fib(n-1) + fib(n-2)\nprint(fib(10))',
    options: ['10', '55', '89', 'Error'],
    correctAnswer: 1,
    explanation: 'fib(10) = 55. lru_cache memoizes results, making recursive Fibonacci efficient.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 271,
    question: 'Can a decorator accept arguments?',
    options: ['No', 'Yes — by nesting three levels of functions', 'Only built-in decorators', 'Only with **kwargs'],
    correctAnswer: 1,
    explanation: 'Parameterized decorators use a factory function that returns the actual decorator.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 272,
    question: 'What is the output of:\ndef repeat(n):\n    def decorator(func):\n        def wrapper(*args):\n            return [func(*args) for _ in range(n)]\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef greet():\n    return "hi"\nprint(greet())',
    options: ['hi', '["hi", "hi", "hi"]', 'hihihi', 'Error'],
    correctAnswer: 1,
    explanation: 'The parameterized decorator calls greet() 3 times and collects results in a list.',
    difficulty: 'advanced',
    chapter: 3
  },
  // ===== GENERATORS (73-82) =====
  {
    id: 273,
    question: 'What makes a function a generator function?',
    options: ['Using return', 'Using the yield keyword', 'Using *args', 'Using a for loop'],
    correctAnswer: 1,
    explanation: 'A function containing yield becomes a generator function. It returns a generator object.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 274,
    question: 'What does a generator function return when called?',
    options: ['The first yielded value', 'A generator object (iterator)', 'None', 'A list of all values'],
    correctAnswer: 1,
    explanation: 'Calling a generator function returns a generator object. Use next() or a loop to get values.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 275,
    question: 'What is the output of:\ndef gen():\n    yield 1\n    yield 2\n    yield 3\ng = gen()\nprint(next(g), next(g))',
    options: ['1 1', '1 2', '1 2 3', 'Error'],
    correctAnswer: 1,
    explanation: 'Each next() call resumes the generator until the next yield. First gives 1, second gives 2.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 276,
    question: 'What happens when a generator is fully exhausted?',
    options: ['It restarts', 'StopIteration is raised', 'It returns None', 'It returns the last value'],
    correctAnswer: 1,
    explanation: 'When there are no more yields, next() raises StopIteration.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 277,
    question: 'How does yield differ from return?',
    options: ['They are the same', 'yield pauses execution and can resume; return terminates', 'return pauses; yield terminates', 'yield only works in classes'],
    correctAnswer: 1,
    explanation: 'yield suspends the function, saving state. return ends it permanently.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 278,
    question: 'What does yield from do?',
    options: ['Yields a value from a file', 'Delegates to a sub-generator', 'Imports a generator', 'Yields from a dictionary'],
    correctAnswer: 1,
    explanation: 'yield from delegates iteration to another iterable or sub-generator.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 279,
    question: 'What is the output of:\ndef gen():\n    yield from [1, 2, 3]\nprint(list(gen()))',
    options: ['[[1, 2, 3]]', '[1, 2, 3]', '(1, 2, 3)', 'Error'],
    correctAnswer: 1,
    explanation: 'yield from iterates over the list, yielding each element individually.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 280,
    question: 'What method sends a value into a generator?',
    options: ['gen.push(value)', 'gen.send(value)', 'gen.put(value)', 'gen.input(value)'],
    correctAnswer: 1,
    explanation: 'send() resumes the generator and sends a value that becomes the result of yield.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 281,
    question: 'Are generators more memory-efficient than lists for large datasets?',
    options: ['No — lists are always better', 'Yes — generators produce values lazily', 'They are equal', 'Only for small datasets'],
    correctAnswer: 1,
    explanation: 'Generators produce values one at a time (lazy evaluation), using O(1) memory.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 282,
    question: 'Can you iterate over a generator more than once?',
    options: ['Yes', 'No — generators are single-use', 'Only with reset()', 'Only in for loops'],
    correctAnswer: 1,
    explanation: 'Generators are exhausted after one full iteration. Create a new generator to iterate again.',
    difficulty: 'intermediate',
    chapter: 3
  },
  // ===== MODULES & IMPORTS (83-100) =====
  {
    id: 283,
    question: 'What does import math do?',
    options: ['Imports specific functions from math', 'Imports the entire math module', 'Creates a math variable', 'Installs the math package'],
    correctAnswer: 1,
    explanation: 'import math loads the entire module. Access functions via math.sqrt(), math.pi, etc.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 284,
    question: 'What does from math import sqrt do?',
    options: ['Imports the entire math module', 'Imports only the sqrt function', 'Creates an alias for math', 'Installs sqrt'],
    correctAnswer: 1,
    explanation: 'from...import imports a specific name. You can use sqrt() directly without math prefix.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 285,
    question: 'What does import numpy as np do?',
    options: ['Installs numpy', 'Imports numpy with the alias np', 'Renames the numpy package', 'Creates a copy of numpy'],
    correctAnswer: 1,
    explanation: 'The as keyword creates an alias. You can access numpy functions via np.array(), etc.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 286,
    question: 'What does from module import * do?',
    options: ['Imports nothing', 'Imports all public names from the module', 'Imports the module object', 'Creates a wildcard variable'],
    correctAnswer: 1,
    explanation: 'import * imports all public names (those not starting with _). Generally discouraged.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 287,
    question: 'What is the purpose of __name__ == "__main__"?',
    options: ['Checks if the module is imported', 'Checks if the script is run directly (not imported)', 'Defines the main function', 'Creates a namespace'],
    correctAnswer: 1,
    explanation: '__name__ is "__main__" only when the file is executed directly, not when imported.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 288,
    question: 'What is __init__.py used for?',
    options: ['Initializing variables', 'Marking a directory as a Python package', 'Setting up the interpreter', 'Defining the main function'],
    correctAnswer: 1,
    explanation: '__init__.py marks a directory as a Python package, allowing imports from it.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 289,
    question: 'What is the difference between a module and a package?',
    options: ['They are the same', 'A module is a .py file; a package is a directory with __init__.py', 'A package is a .py file; a module is a directory', 'Modules are built-in; packages are third-party'],
    correctAnswer: 1,
    explanation: 'A module is a single .py file. A package is a directory containing __init__.py and modules.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 290,
    question: 'Where does Python look for modules to import?',
    options: ['Only the current directory', 'Paths listed in sys.path', 'Only the Python installation directory', 'The home directory'],
    correctAnswer: 1,
    explanation: 'Python searches directories in sys.path, which includes the script dir, PYTHONPATH, and installed packages.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 291,
    question: 'How do you install a third-party package in Python?',
    options: ['import package', 'pip install package', 'python install package', 'download package'],
    correctAnswer: 1,
    explanation: 'pip is the package installer for Python. Use pip install <package> from the command line.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 292,
    question: 'What does __all__ control in a module?',
    options: ['All variables in the module', 'What is exported by from module import *', 'All methods', 'All classes'],
    correctAnswer: 1,
    explanation: '__all__ is a list of names that are exported when from module import * is used.',
    difficulty: 'advanced',
    chapter: 3
  },
  {
    id: 293,
    question: 'What is a recursive function?',
    options: ['A function with many parameters', 'A function that calls itself', 'A function inside a class', 'A function with decorators'],
    correctAnswer: 1,
    explanation: 'A recursive function calls itself to solve a problem by breaking it into smaller subproblems.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 294,
    question: 'What is the output of:\ndef factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n-1)\nprint(factorial(5))',
    options: ['5', '15', '120', '25'],
    correctAnswer: 2,
    explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 295,
    question: 'What must every recursive function have to avoid infinite recursion?',
    options: ['A decorator', 'A base case', 'A global variable', 'Multiple return statements'],
    correctAnswer: 1,
    explanation: 'A base case stops the recursion. Without it, the function calls itself indefinitely.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 296,
    question: 'What built-in module provides math functions like sqrt, ceil, floor?',
    options: ['numbers', 'math', 'decimal', 'arithmetic'],
    correctAnswer: 1,
    explanation: 'The math module provides mathematical functions like sqrt(), ceil(), floor(), etc.',
    difficulty: 'beginner',
    chapter: 3
  },
  {
    id: 297,
    question: 'What does random.randint(1, 10) return?',
    options: ['A float between 1 and 10', 'An integer between 1 and 10 inclusive', 'An integer between 1 and 9', 'Always 1 or 10'],
    correctAnswer: 1,
    explanation: 'randint(a, b) returns a random integer N such that a <= N <= b (both inclusive).',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 298,
    question: 'What does os.path.join("dir", "file.txt") return on a system using /?',
    options: ['"dir/file.txt"', '"dir\\\\file.txt"', '"dir file.txt"', 'Error'],
    correctAnswer: 0,
    explanation: 'os.path.join creates OS-appropriate paths. On Unix-like systems: "dir/file.txt".',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 299,
    question: 'What does sys.argv contain?',
    options: ['System environment variables', 'Command-line arguments passed to the script', 'The Python version', 'Import paths'],
    correctAnswer: 1,
    explanation: 'sys.argv is a list of command-line arguments. sys.argv[0] is the script name.',
    difficulty: 'intermediate',
    chapter: 3
  },
  {
    id: 300,
    question: 'What happens if you import a module that has already been imported?',
    options: ['It is re-executed', 'Python uses the cached version (no re-execution)', 'An error is raised', 'It creates a duplicate'],
    correctAnswer: 1,
    explanation: 'Python caches imported modules in sys.modules. Subsequent imports use the cache.',
    difficulty: 'advanced',
    chapter: 3
  }
];

export default chapter3Questions;
