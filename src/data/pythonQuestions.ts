// 50 original Python MCQs across Beginner, Intermediate, and Advanced levels
// Each quiz session randomly selects 10 questions for variety

export interface PythonQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const pythonQuestionPool: PythonQuestion[] = [
  // ===== BEGINNER (1–18) =====
  {
    id: 1,
    question: 'What is the correct way to create a variable in Python?',
    options: ['var x = 5', 'int x = 5', 'x = 5', 'declare x = 5'],
    correctAnswer: 2,
    difficulty: 'beginner',
    explanation: 'Python uses dynamic typing — simply assign a value with x = 5. No type declaration or keyword is needed.'
  },
  {
    id: 2,
    question: 'Which of these is a valid Python comment?',
    options: ['// comment', '/* comment */', '# comment', '<!-- comment -->'],
    correctAnswer: 2,
    difficulty: 'beginner',
    explanation: 'Python uses # for single-line comments. Multi-line comments typically use triple quotes as docstrings.'
  },
  {
    id: 3,
    question: 'What does len("Hello") return?',
    options: ['4', '5', '6', 'Error'],
    correctAnswer: 1,
    difficulty: 'beginner',
    explanation: 'len() returns the number of characters in a string. "Hello" has 5 characters.'
  },
  {
    id: 4,
    question: 'How do you start a for loop in Python?',
    options: ['for (i = 0; i < 5; i++)', 'for i in range(5):', 'foreach i in range(5)', 'loop i from 0 to 5'],
    correctAnswer: 1,
    difficulty: 'beginner',
    explanation: 'Python for loops use the syntax: for variable in iterable: — range(5) generates 0 through 4.'
  },
  {
    id: 5,
    question: 'What data type is the result of: 10 / 3?',
    options: ['int', 'float', 'str', 'complex'],
    correctAnswer: 1,
    difficulty: 'beginner',
    explanation: 'In Python 3, the / operator always returns a float (3.333...). Use // for integer (floor) division.'
  },
  {
    id: 6,
    question: 'Which keyword is used to define a function in Python?',
    options: ['function', 'func', 'def', 'method'],
    correctAnswer: 2,
    difficulty: 'beginner',
    explanation: 'The "def" keyword is used to define functions in Python: def my_function():'
  },
  {
    id: 7,
    question: 'What does the "in" keyword check in Python?',
    options: [
      'If a variable is defined',
      'If a value exists in a sequence',
      'If a file exists',
      'If a module is installed'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    explanation: 'The "in" keyword checks membership — whether a value exists in a list, string, tuple, set, or dictionary keys.'
  },
  {
    id: 8,
    question: 'What will print(type(3.14)) output?',
    options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'decimal'>"],
    correctAnswer: 1,
    difficulty: 'beginner',
    explanation: 'Python uses "float" for all floating-point numbers. There is no "double" type in Python.'
  },
  {
    id: 9,
    question: 'How do you create an empty list in Python?',
    options: ['list = {}', 'list = []', 'list = ()', 'list = new List()'],
    correctAnswer: 1,
    difficulty: 'beginner',
    explanation: 'Square brackets [] create a list. Curly braces {} create a dict or set. Parentheses () create a tuple.'
  },
  {
    id: 10,
    question: 'What does the "append()" method do on a list?',
    options: [
      'Inserts an element at the beginning',
      'Adds an element to the end',
      'Removes the last element',
      'Sorts the list'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    explanation: 'append() adds a single element to the end of a list. Use insert() for a specific position.'
  },
  {
    id: 11,
    question: 'What is the output of: "hello".upper()?',
    options: ['"Hello"', '"HELLO"', '"hello"', 'Error'],
    correctAnswer: 1,
    difficulty: 'beginner',
    explanation: 'The upper() method returns a new string with all characters converted to uppercase.'
  },
  {
    id: 12,
    question: 'Which operator is used for exponentiation in Python?',
    options: ['^', '**', 'exp()', '^^'],
    correctAnswer: 1,
    difficulty: 'beginner',
    explanation: 'Python uses ** for exponentiation: 2**3 equals 8. The ^ operator is bitwise XOR in Python.'
  },
  {
    id: 13,
    question: 'What will bool("") return?',
    options: ['True', 'False', 'None', 'Error'],
    correctAnswer: 1,
    difficulty: 'beginner',
    explanation: 'An empty string is falsy in Python. bool("") returns False. Non-empty strings return True.'
  },
  {
    id: 14,
    question: 'How do you handle exceptions in Python?',
    options: ['if/catch', 'try/except', 'try/catch', 'begin/rescue'],
    correctAnswer: 1,
    difficulty: 'beginner',
    explanation: 'Python uses try/except blocks for exception handling, optionally with else and finally clauses.'
  },
  {
    id: 15,
    question: 'What does the "break" statement do inside a loop?',
    options: [
      'Skips the current iteration',
      'Terminates the loop immediately',
      'Restarts the loop',
      'Pauses the loop for 1 second'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    explanation: '"break" exits the nearest enclosing loop immediately. Use "continue" to skip to the next iteration.'
  },
  {
    id: 16,
    question: 'What is the output of: [1, 2, 3] + [4, 5]?',
    options: ['[5, 7]', '[1, 2, 3, 4, 5]', 'Error', '[[1, 2, 3], [4, 5]]'],
    correctAnswer: 1,
    difficulty: 'beginner',
    explanation: 'The + operator concatenates two lists, producing a new combined list.'
  },
  {
    id: 17,
    question: 'Which built-in function converts a string to an integer?',
    options: ['str()', 'int()', 'float()', 'number()'],
    correctAnswer: 1,
    difficulty: 'beginner',
    explanation: 'int() converts a string or float to an integer: int("42") returns 42.'
  },
  {
    id: 18,
    question: 'What does the "pass" statement do?',
    options: [
      'Returns None from a function',
      'Skips the current loop iteration',
      'Acts as a placeholder that does nothing',
      'Passes arguments to a function'
    ],
    correctAnswer: 2,
    difficulty: 'beginner',
    explanation: '"pass" is a null operation — it does nothing. It\'s used as a placeholder where code is syntactically required.'
  },

  // ===== INTERMEDIATE (19–36) =====
  {
    id: 19,
    question: 'What is a list comprehension in Python?',
    options: [
      'A way to sort lists',
      'A concise syntax for creating lists from iterables',
      'A method that compresses a list',
      'A function that checks list contents'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: 'List comprehensions like [x**2 for x in range(5)] provide a concise way to create lists from iterables with optional filtering.'
  },
  {
    id: 20,
    question: 'What does the "zip()" function do?',
    options: [
      'Compresses files',
      'Combines two or more iterables element-wise into tuples',
      'Removes duplicates from a list',
      'Encrypts data'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: 'zip() pairs elements from multiple iterables: zip([1,2], ["a","b"]) produces [(1,"a"), (2,"b")].'
  },
  {
    id: 21,
    question: 'What is the difference between "is" and "==" in Python?',
    options: [
      'They are identical',
      '"is" checks identity (same object), "==" checks equality (same value)',
      '"==" checks identity, "is" checks equality',
      '"is" only works with strings'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: '"is" checks if two variables point to the same object in memory, while "==" checks if their values are equal.'
  },
  {
    id: 22,
    question: 'What is *args used for in a function definition?',
    options: [
      'To define required arguments',
      'To accept a variable number of positional arguments as a tuple',
      'To unpack a dictionary',
      'To create keyword arguments'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: '*args collects extra positional arguments into a tuple, allowing a function to accept any number of arguments.'
  },
  {
    id: 23,
    question: 'What does **kwargs do in a function definition?',
    options: [
      'Doubles all arguments',
      'Creates two copies of each argument',
      'Accepts a variable number of keyword arguments as a dictionary',
      'Defines default parameter values'
    ],
    correctAnswer: 2,
    difficulty: 'intermediate',
    explanation: '**kwargs collects extra keyword arguments into a dictionary: def f(**kwargs) can be called as f(name="Bob", age=30).'
  },
  {
    id: 24,
    question: 'What is the output of: {1, 2, 3} & {2, 3, 4}?',
    options: ['{1, 2, 3, 4}', '{2, 3}', '{1, 4}', 'Error'],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: 'The & operator computes the intersection of two sets — elements present in both: {2, 3}.'
  },
  {
    id: 25,
    question: 'What does the "enumerate()" function return?',
    options: [
      'The length of an iterable',
      'An iterator of (index, value) pairs',
      'A sorted copy of the iterable',
      'A reversed copy of the iterable'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: 'enumerate() adds a counter to an iterable: for i, val in enumerate(["a","b"]) gives (0,"a"), (1,"b").'
  },
  {
    id: 26,
    question: 'What is a lambda function in Python?',
    options: [
      'A named function defined with def',
      'A small anonymous function defined with the lambda keyword',
      'A built-in mathematical function',
      'A function that runs in parallel'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: 'Lambda functions are small, anonymous functions: lambda x: x**2 returns the square of x.'
  },
  {
    id: 27,
    question: 'What does the "map()" function do?',
    options: [
      'Creates a geographic map',
      'Applies a function to every item of an iterable',
      'Maps dictionary keys to values',
      'Creates a hash map'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: 'map() applies a function to each item: list(map(str.upper, ["a","b"])) returns ["A","B"].'
  },
  {
    id: 28,
    question: 'How do you open a file for reading in Python?',
    options: [
      'file.read("data.txt")',
      'open("data.txt", "r")',
      'File.open("data.txt")',
      'read("data.txt")'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: 'open() is the built-in function to open files. "r" mode is for reading (and is the default mode).'
  },
  {
    id: 29,
    question: 'What is a dictionary comprehension?',
    options: [
      'A way to read dictionary files',
      'A concise syntax for creating dictionaries from iterables',
      'A method to compress dictionaries',
      'A function that merges dictionaries'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: 'Dict comprehensions like {k: v**2 for k, v in pairs} create dictionaries concisely from iterables.'
  },
  {
    id: 30,
    question: 'What does the "with" statement do when working with files?',
    options: [
      'Locks the file from other processes',
      'Ensures the file is properly closed after the block executes',
      'Encrypts the file contents',
      'Opens the file in binary mode'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: 'The "with" statement is a context manager that automatically closes the file even if an exception occurs.'
  },
  {
    id: 31,
    question: 'What is the purpose of the "__str__" method in a class?',
    options: [
      'Converts a string to the class type',
      'Defines the string representation of an object for print()',
      'Validates string inputs',
      'Creates a static string attribute'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: '__str__ returns a human-readable string representation of an object, used by print() and str().'
  },
  {
    id: 32,
    question: 'What does the "filter()" function do?',
    options: [
      'Sorts elements by a condition',
      'Returns elements from an iterable where a function returns True',
      'Removes None values from a list',
      'Filters file contents by keyword'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: 'filter() returns an iterator of elements for which the given function returns True.'
  },
  {
    id: 33,
    question: 'What is a Python module?',
    options: [
      'A section of a Python file',
      'A file containing Python code that can be imported',
      'A built-in data type',
      'A virtual environment'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: 'A module is a .py file containing Python definitions and statements that can be imported into other scripts.'
  },
  {
    id: 34,
    question: 'What is the difference between "copy()" and "deepcopy()"?',
    options: [
      'There is no difference',
      'copy() creates a shallow copy; deepcopy() copies nested objects recursively',
      'deepcopy() is faster',
      'copy() only works on strings'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: 'copy() creates a new object but references the same nested objects. deepcopy() recursively copies everything.'
  },
  {
    id: 35,
    question: 'What will sorted([3, 1, 2], reverse=True) return?',
    options: ['[1, 2, 3]', '[3, 2, 1]', '[2, 1, 3]', 'Error'],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: 'sorted() returns a new sorted list. reverse=True sorts in descending order: [3, 2, 1].'
  },
  {
    id: 36,
    question: 'What does the "global" keyword do inside a function?',
    options: [
      'Creates a new global variable',
      'Allows the function to modify a variable defined outside it',
      'Makes the function accessible globally',
      'Imports all global modules'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    explanation: 'The "global" keyword tells Python that a variable inside a function refers to the global scope variable, allowing modification.'
  },

  // ===== ADVANCED (37–50) =====
  {
    id: 37,
    question: 'What is a Python generator and how does it differ from a list?',
    options: [
      'Generators store all values in memory like lists',
      'Generators produce values lazily one at a time, saving memory',
      'Generators are faster versions of lists',
      'Generators can only produce numbers'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    explanation: 'Generators use yield to produce values on-demand (lazily), rather than storing all values in memory at once like a list.'
  },
  {
    id: 38,
    question: 'What is the Global Interpreter Lock (GIL) in CPython?',
    options: [
      'A security feature that encrypts Python code',
      'A mutex that prevents multiple native threads from executing Python bytecodes simultaneously',
      'A tool for managing global variables',
      'A locking mechanism for file I/O'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    explanation: 'The GIL is a mutex in CPython that allows only one thread to execute Python bytecode at a time, limiting true parallelism.'
  },
  {
    id: 39,
    question: 'What is a metaclass in Python?',
    options: [
      'A class that inherits from multiple parents',
      'A class whose instances are themselves classes',
      'An abstract base class',
      'A class defined inside another class'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    explanation: 'A metaclass is the "class of a class" — it defines how classes themselves behave. The default metaclass is "type".'
  },
  {
    id: 40,
    question: 'What does the @property decorator do?',
    options: [
      'Makes a method private',
      'Turns a method into a read-only attribute that can be accessed without parentheses',
      'Creates a static variable',
      'Registers the method as an event handler'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    explanation: '@property allows you to define a method that can be accessed like an attribute, enabling computed properties with getter/setter logic.'
  },
  {
    id: 41,
    question: 'What is the Method Resolution Order (MRO) in Python?',
    options: [
      'The order in which methods are defined in a file',
      'The order in which Python searches base classes when looking up a method',
      'The order in which arguments are resolved',
      'The order in which decorators are applied'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    explanation: 'MRO defines the order Python looks through base classes for a method, using the C3 linearization algorithm for multiple inheritance.'
  },
  {
    id: 42,
    question: 'What is the purpose of __slots__ in a Python class?',
    options: [
      'Defines time slots for scheduled execution',
      'Restricts instance attributes and reduces memory usage by avoiding __dict__',
      'Creates slots for method overloading',
      'Enables multi-threading slots'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    explanation: '__slots__ declares fixed attributes, preventing __dict__ creation per instance and significantly reducing memory usage.'
  },
  {
    id: 43,
    question: 'What does "async def" define in Python?',
    options: [
      'A multi-threaded function',
      'A coroutine function that can use await expressions',
      'A function that runs in a separate process',
      'A synchronized (thread-safe) function'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    explanation: '"async def" defines a coroutine — an asynchronous function that can pause with "await" and resume later, using the asyncio event loop.'
  },
  {
    id: 44,
    question: 'What is a context manager and which dunder methods does it use?',
    options: [
      '__init__ and __del__',
      '__enter__ and __exit__',
      '__start__ and __stop__',
      '__open__ and __close__'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    explanation: 'Context managers implement __enter__ and __exit__ methods. They are used with the "with" statement for resource management.'
  },
  {
    id: 45,
    question: 'What is the difference between @staticmethod and @classmethod?',
    options: [
      'They are identical',
      '@staticmethod takes no implicit first argument; @classmethod receives the class (cls)',
      '@classmethod is private; @staticmethod is public',
      '@staticmethod only works in abstract classes'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    explanation: '@staticmethod behaves like a regular function. @classmethod receives the class as its first argument (cls), useful for factory methods.'
  },
  {
    id: 46,
    question: 'What does the walrus operator (:=) do in Python 3.8+?',
    options: [
      'Compares two values',
      'Assigns a value to a variable as part of an expression',
      'Defines a type annotation',
      'Creates a named tuple'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    explanation: 'The walrus operator (:=) assigns a value as part of an expression: while (n := len(data)) > 10: allows assign-and-test in one step.'
  },
  {
    id: 47,
    question: 'What is the purpose of the "abc" module in Python?',
    options: [
      'Provides alphabetical sorting',
      'Defines Abstract Base Classes that cannot be instantiated directly',
      'Handles basic arithmetic',
      'Manages ASCII/binary conversions'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    explanation: 'The abc module provides tools for defining Abstract Base Classes. Subclasses must implement abstract methods before instantiation.'
  },
  {
    id: 48,
    question: 'What does functools.lru_cache do?',
    options: [
      'Caches files on disk',
      'Memoizes function results using a Least Recently Used eviction policy',
      'Creates a thread-safe cache',
      'Compresses function arguments'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    explanation: '@lru_cache memoizes function return values — if called with the same arguments again, it returns the cached result instantly.'
  },
  {
    id: 49,
    question: 'What are type hints in Python and are they enforced at runtime?',
    options: [
      'They are enforced and cause errors if violated',
      'They are optional annotations for documentation and tools, not enforced at runtime',
      'They are only used in Python 2',
      'They replace docstrings'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    explanation: 'Type hints (e.g., def greet(name: str) -> str) are annotations used by IDEs and tools like mypy. Python does NOT enforce them at runtime.'
  },
  {
    id: 50,
    question: 'What is a descriptor in Python?',
    options: [
      'A docstring that describes a module',
      'An object defining __get__, __set__, or __delete__ to customize attribute access',
      'A metadata tag for functions',
      'A type of iterator'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    explanation: 'Descriptors are objects that define __get__, __set__, or __delete__ methods to control how attributes are accessed on another object. Properties use descriptors internally.'
  }
];

export default pythonQuestionPool;

/**
 * Randomly selects a balanced set of questions from the pool.
 * Picks from each difficulty level proportionally, then shuffles.
 */
export function getRandomPythonQuestions(count: number = 10): PythonQuestion[] {
  const beginners = pythonQuestionPool.filter(q => q.difficulty === 'beginner');
  const intermediates = pythonQuestionPool.filter(q => q.difficulty === 'intermediate');
  const advanced = pythonQuestionPool.filter(q => q.difficulty === 'advanced');

  // Pick proportionally: ~3 beginner, ~4 intermediate, ~3 advanced
  const bCount = Math.round(count * 0.3);
  const iCount = Math.round(count * 0.4);
  const aCount = count - bCount - iCount;

  const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const picked = [
    ...shuffle(beginners).slice(0, bCount),
    ...shuffle(intermediates).slice(0, iCount),
    ...shuffle(advanced).slice(0, aCount),
  ];

  // Re-number IDs sequentially and shuffle the final set
  return shuffle(picked).map((q, index) => ({ ...q, id: index + 1 }));
}
