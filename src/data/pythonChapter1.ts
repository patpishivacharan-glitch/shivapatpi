import { PythonQuestion } from './pythonQuestionTypes';

const chapter1Questions: PythonQuestion[] = [
  // ===== VARIABLES & ASSIGNMENT (1-15) =====
  {
    id: 1,
    question: 'What is the output of print(type(10))?',
    options: ["<class 'int'>", "<class 'float'>", "<class 'number'>", "<class 'integer'>"],
    correctAnswer: 0,
    explanation: 'Whole numbers in Python are of type int.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 2,
    question: 'Which of these is NOT a valid Python variable name?',
    options: ['my_var', '_hidden', '2nd_place', 'camelCase'],
    correctAnswer: 2,
    explanation: 'Variable names cannot start with a digit in Python.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 3,
    question: 'What is the result of type(3.14)?',
    options: ["<class 'int'>", "<class 'float'>", "<class 'decimal'>", "<class 'double'>"],
    correctAnswer: 1,
    explanation: 'Numbers with decimal points are of type float in Python.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 4,
    question: 'Which of these correctly creates a string variable in Python?',
    options: ['string s = "hello"', 's = "hello"', 'var s = "hello"', 'let s = "hello"'],
    correctAnswer: 1,
    explanation: 'Python uses simple assignment. No type declaration or keyword is needed.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 5,
    question: 'What does bool(0) return?',
    options: ['True', 'False', '0', 'None'],
    correctAnswer: 1,
    explanation: 'In Python, 0 is falsy. bool(0) returns False.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 6,
    question: 'What type does None belong to in Python?',
    options: ['bool', 'int', 'NoneType', 'void'],
    correctAnswer: 2,
    explanation: 'None is the sole value of the NoneType type in Python.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 7,
    question: 'What is the output of print("Hello" + " " + "World")?',
    options: ['Hello World', 'Hello  World', 'HelloWorld', 'Error'],
    correctAnswer: 0,
    explanation: 'The + operator concatenates strings. The space is included as " ".',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 8,
    question: 'What does len([1, 2, 3, 4]) return?',
    options: ['3', '4', '5', 'Error'],
    correctAnswer: 1,
    explanation: 'len() returns the number of elements. This list has 4 elements.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 9,
    question: 'Which syntax creates a single-line comment in Python?',
    options: ['// comment', '/* comment */', '# comment', '-- comment'],
    correctAnswer: 2,
    explanation: 'Python uses the # symbol for single-line comments.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 10,
    question: 'What does the expression 10 // 3 evaluate to?',
    options: ['3.33', '3', '4', '3.0'],
    correctAnswer: 1,
    explanation: 'The // operator performs floor division, returning the integer quotient.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 11,
    question: 'What does the ** operator do in Python?',
    options: ['Multiplication', 'Exponentiation', 'Floor division', 'Modulo'],
    correctAnswer: 1,
    explanation: '** raises the left operand to the power of the right. E.g., 2**3 = 8.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 12,
    question: 'What is the result of 17 % 5?',
    options: ['3', '2', '5', '12'],
    correctAnswer: 1,
    explanation: 'The modulo operator % returns the remainder. 17 ÷ 5 = 3 remainder 2.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 13,
    question: 'What type does 10 / 3 return in Python 3?',
    options: ['int', 'float', 'str', 'complex'],
    correctAnswer: 1,
    explanation: 'The / operator always returns a float in Python 3, even for whole results.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 14,
    question: 'What is the output of print("Ha" * 3)?',
    options: ['Ha3', 'HaHaHa', 'Ha Ha Ha', 'Error'],
    correctAnswer: 1,
    explanation: 'The * operator with a string and integer repeats the string that many times.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 15,
    question: 'How do you access the first character of s = "Python"?',
    options: ['s[1]', 's[0]', 's.first()', 's(0)'],
    correctAnswer: 1,
    explanation: 'Python uses zero-based indexing. The first character is at index 0.',
    difficulty: 'beginner',
    chapter: 1
  },
  // ===== DATA TYPES & INDEXING (16-25) =====
  {
    id: 16,
    question: 'What does s[-1] return if s = "Python"?',
    options: ['P', 'n', 'Error', 'y'],
    correctAnswer: 1,
    explanation: 'Negative indexing starts from the end. -1 is the last character: "n".',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 17,
    question: 'What happens when you try s[0] = "J" where s = "Hello"?',
    options: ['s becomes "Jello"', 'A TypeError is raised', 's becomes "JHello"', 'Nothing happens'],
    correctAnswer: 1,
    explanation: 'Strings are immutable in Python. You cannot change individual characters.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 18,
    question: 'What does int("42") return?',
    options: ['"42"', '42', '42.0', 'Error'],
    correctAnswer: 1,
    explanation: 'int() converts a string containing a valid integer to an int value.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 19,
    question: 'What does bool("") return?',
    options: ['True', 'False', 'None', '""'],
    correctAnswer: 1,
    explanation: 'An empty string is falsy in Python. bool("") returns False.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 20,
    question: 'Which of these values is truthy in Python?',
    options: ['0', '""', 'None', '"False"'],
    correctAnswer: 3,
    explanation: 'A non-empty string, even "False", is truthy. Only empty strings are falsy.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 21,
    question: 'What does int(7.9) return?',
    options: ['8', '7', '7.0', 'Error'],
    correctAnswer: 1,
    explanation: 'int() truncates toward zero. It removes the decimal part without rounding.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 22,
    question: 'What is the output of print(str(123))?',
    options: ['123', '"123"', 'Error', 'int'],
    correctAnswer: 0,
    explanation: 'str(123) converts the integer to the string "123", printed as 123.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 23,
    question: 'What does float("3.14") return?',
    options: ['"3.14"', '3', '3.14', 'Error'],
    correctAnswer: 2,
    explanation: 'float() converts a string representation of a number to a float value.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 24,
    question: 'What is the purpose of the id() function?',
    options: ['Returns the data type', 'Returns the unique identity of an object', 'Returns the length', 'Returns the hash'],
    correctAnswer: 1,
    explanation: 'id() returns a unique integer identifier for an object, typically its memory address.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 25,
    question: 'What is the difference between == and is in Python?',
    options: ['They are identical', '== compares values; is compares identity', '== compares types; is compares values', 'is is only for None'],
    correctAnswer: 1,
    explanation: '== checks value equality. is checks if two references point to the same object.',
    difficulty: 'intermediate',
    chapter: 1
  },
  // ===== OPERATORS & COMPARISONS (26-40) =====
  {
    id: 26,
    question: 'What is the result of 1 < 2 < 3 in Python?',
    options: ['True', 'False', 'Error', '(True, True)'],
    correctAnswer: 0,
    explanation: 'Python supports chained comparisons. This equals (1 < 2) and (2 < 3) = True.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 27,
    question: 'What does the expression 0 and 5 evaluate to?',
    options: ['True', 'False', '0', '5'],
    correctAnswer: 2,
    explanation: "Python's and returns the first falsy value. Since 0 is falsy, it returns 0.",
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 28,
    question: 'What does the expression 0 or 5 evaluate to?',
    options: ['True', '0', '5', 'False'],
    correctAnswer: 2,
    explanation: "Python's or returns the first truthy value. 0 is falsy, so it returns 5.",
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 29,
    question: 'After x = 10; x += 5, what is x?',
    options: ['10', '15', '5', '50'],
    correctAnswer: 1,
    explanation: '+= adds the right value to the variable and assigns it back. 10 + 5 = 15.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 30,
    question: 'What does "hello".upper() return?',
    options: ['"Hello"', '"HELLO"', '"hello"', 'Error'],
    correctAnswer: 1,
    explanation: 'upper() returns a new string with all characters in uppercase.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 31,
    question: 'What does "  hello  ".strip() return?',
    options: ['"  hello  "', '"hello"', '"hello  "', '"  hello"'],
    correctAnswer: 1,
    explanation: 'strip() removes leading and trailing whitespace from a string.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 32,
    question: 'What does "a,b,c".split(",") return?',
    options: ['"abc"', '["a", "b", "c"]', '("a", "b", "c")', '["a,b,c"]'],
    correctAnswer: 1,
    explanation: 'split() divides a string by the delimiter and returns a list of substrings.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 33,
    question: 'What does "-".join(["a", "b", "c"]) return?',
    options: ['["a-", "b-", "c-"]', '"a-b-c"', '"abc-"', '"-abc"'],
    correctAnswer: 1,
    explanation: 'join() concatenates list elements with the separator string between each.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 34,
    question: 'What does "hello world".replace("world", "Python") return?',
    options: ['"hello world"', '"hello Python"', '"Python hello"', 'Error'],
    correctAnswer: 1,
    explanation: 'replace() returns a new string with occurrences of the old substring replaced.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 35,
    question: 'What does "hello".find("xyz") return?',
    options: ['0', 'None', '-1', 'Error'],
    correctAnswer: 2,
    explanation: 'find() returns -1 when the substring is not found, unlike index() which raises an error.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 36,
    question: 'What does "Python".startswith("Py") return?',
    options: ['True', 'False', '"Py"', 'Error'],
    correctAnswer: 0,
    explanation: 'startswith() returns True if the string begins with the specified prefix.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 37,
    question: 'What is the output of: name = "World"; print(f"Hello, {name}!")?',
    options: ['Hello, {name}!', 'Hello, World!', 'f"Hello, World!"', 'Error'],
    correctAnswer: 1,
    explanation: 'f-strings allow embedding expressions inside curly braces within string literals.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 38,
    question: 'What does the escape sequence \\n represent?',
    options: ['A tab character', 'A newline character', 'A null character', 'A backslash'],
    correctAnswer: 1,
    explanation: '\\n is the escape sequence for a newline (line break) character.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 39,
    question: 'What is the purpose of a raw string like r"\\n\\t"?',
    options: ['Makes the string read-only', 'Treats backslashes as literal characters', 'Reverses the string', 'Removes whitespace'],
    correctAnswer: 1,
    explanation: 'Raw strings (r prefix) treat backslashes as literal characters, not escape sequences.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 40,
    question: 'How do you create a multi-line string in Python?',
    options: ['Using triple quotes (""" or \'\'\')', 'Using \\n only', 'Using multiline()', 'Using square brackets'],
    correctAnswer: 0,
    explanation: 'Triple quotes allow strings to span multiple lines, preserving line breaks.',
    difficulty: 'beginner',
    chapter: 1
  },
  // ===== STRING METHODS & FORMATTING (41-55) =====
  {
    id: 41,
    question: 'What does "abcabc".count("a") return?',
    options: ['1', '2', '3', '0'],
    correctAnswer: 1,
    explanation: 'count() returns the number of non-overlapping occurrences of a substring.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 42,
    question: 'What does "Hello"[1:4] return?',
    options: ['"Hel"', '"ell"', '"ello"', '"Helo"'],
    correctAnswer: 1,
    explanation: 'Slicing [1:4] extracts characters from index 1 up to (not including) index 4.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 43,
    question: 'What does "abcdef"[::2] return?',
    options: ['"ab"', '"ace"', '"bdf"', '"abcdef"'],
    correctAnswer: 1,
    explanation: '[::2] takes every 2nd character from the beginning: a, c, e.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 44,
    question: 'What does "Python"[::-1] return?',
    options: ['"Python"', '"nohtyP"', '"Pytho"', 'Error'],
    correctAnswer: 1,
    explanation: '[::-1] reverses the string by stepping backwards through it.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 45,
    question: 'What does "cat" in "concatenate" evaluate to?',
    options: ['True', 'False', '"cat"', 'Error'],
    correctAnswer: 0,
    explanation: 'The in operator checks if a substring exists within a string.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 46,
    question: 'What does "xyz" not in "hello" evaluate to?',
    options: ['True', 'False', '"xyz"', 'Error'],
    correctAnswer: 0,
    explanation: 'not in returns True when the substring is NOT found in the string.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 47,
    question: 'What is the output of print("a", "b", "c", sep="-")?',
    options: ['a b c', 'a-b-c', 'abc', 'a, b, c'],
    correctAnswer: 1,
    explanation: 'The sep parameter specifies the separator between multiple print arguments.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 48,
    question: 'What is the output of print("hello", end="!")?',
    options: ['hello\\n!', 'hello!', 'hello\\n', '!hello'],
    correctAnswer: 1,
    explanation: 'The end parameter replaces the default newline at the end of print output.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 49,
    question: 'What type does the input() function always return?',
    options: ['int', 'float', 'str', 'Depends on user input'],
    correctAnswer: 2,
    explanation: 'input() always returns a string. You must explicitly convert to other types.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 50,
    question: 'What does isinstance(42, int) return?',
    options: ['True', 'False', 'int', 'Error'],
    correctAnswer: 0,
    explanation: 'isinstance() checks if an object is an instance of a specified type.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 51,
    question: 'What does "Hello, {}!".format("World") return?',
    options: ['Hello, {}!', 'Hello, World!', 'Hello, {World}!', 'Error'],
    correctAnswer: 1,
    explanation: 'format() replaces {} placeholders with the provided arguments.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 52,
    question: 'What does "hello world".title() return?',
    options: ['"HELLO WORLD"', '"Hello World"', '"Hello world"', '"hello World"'],
    correctAnswer: 1,
    explanation: 'title() capitalizes the first letter of each word in the string.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 53,
    question: 'What does "hello world".capitalize() return?',
    options: ['"Hello World"', '"Hello world"', '"HELLO WORLD"', '"hello World"'],
    correctAnswer: 1,
    explanation: 'capitalize() only capitalizes the first character; the rest become lowercase.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 54,
    question: 'What does "12345".isdigit() return?',
    options: ['True', 'False', '"12345"', 'Error'],
    correctAnswer: 0,
    explanation: 'isdigit() returns True if all characters in the string are digits.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 55,
    question: 'What does "hello".isalpha() return?',
    options: ['True', 'False', '"hello"', 'Error'],
    correctAnswer: 0,
    explanation: 'isalpha() returns True if all characters in the string are alphabetic.',
    difficulty: 'intermediate',
    chapter: 1
  },
  // ===== BUILT-IN FUNCTIONS (56-72) =====
  {
    id: 56,
    question: 'What does abs(-5) return?',
    options: ['-5', '5', '0', 'Error'],
    correctAnswer: 1,
    explanation: 'abs() returns the absolute (non-negative) value of a number.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 57,
    question: 'What does round(3.7) return?',
    options: ['3', '4', '3.7', '3.0'],
    correctAnswer: 1,
    explanation: 'round() rounds a number to the nearest integer. 3.7 rounds up to 4.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 58,
    question: 'What does max([3, 1, 4, 1, 5]) return?',
    options: ['1', '3', '5', '4'],
    correctAnswer: 2,
    explanation: 'max() returns the largest item in an iterable.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 59,
    question: 'What does min([3, 1, 4, 1, 5]) return?',
    options: ['1', '3', '5', '4'],
    correctAnswer: 0,
    explanation: 'min() returns the smallest item in an iterable.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 60,
    question: 'What does sum([1, 2, 3, 4]) return?',
    options: ['[1, 2, 3, 4]', '10', '4', '24'],
    correctAnswer: 1,
    explanation: 'sum() adds up all elements in an iterable.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 61,
    question: 'What does sorted([3, 1, 2]) return?',
    options: ['[3, 1, 2]', '[1, 2, 3]', '[3, 2, 1]', 'None'],
    correctAnswer: 1,
    explanation: 'sorted() returns a new sorted list. The original is not modified.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 62,
    question: 'What does pow(2, 3) return?',
    options: ['6', '8', '9', '5'],
    correctAnswer: 1,
    explanation: 'pow(2, 3) computes 2 raised to the power 3 = 8.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 63,
    question: 'What does divmod(10, 3) return?',
    options: ['(3, 1)', '(3.33, 0)', '(1, 3)', '3.33'],
    correctAnswer: 0,
    explanation: 'divmod() returns (quotient, remainder). 10 ÷ 3 = 3 remainder 1.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 64,
    question: 'What does chr(65) return?',
    options: ['"65"', '"A"', '65', '"a"'],
    correctAnswer: 1,
    explanation: 'chr() converts a Unicode code point to its character. 65 is "A".',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 65,
    question: 'What does ord("A") return?',
    options: ['"A"', '65', '97', '1'],
    correctAnswer: 1,
    explanation: 'ord() returns the Unicode code point of a character. "A" is 65.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 66,
    question: 'What does hex(255) return?',
    options: ['"255"', '"0xff"', '"ff"', '255'],
    correctAnswer: 1,
    explanation: 'hex() converts an integer to a hexadecimal string prefixed with "0x".',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 67,
    question: 'What does bin(10) return?',
    options: ['"10"', '"0b1010"', '"1010"', '1010'],
    correctAnswer: 1,
    explanation: 'bin() converts an integer to a binary string prefixed with "0b".',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 68,
    question: 'After a, b = 1, 2, what are a and b?',
    options: ['a=(1,2), b undefined', 'a=1, b=2', 'Error', 'a=2, b=1'],
    correctAnswer: 1,
    explanation: 'Python supports tuple unpacking for multiple assignment.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 69,
    question: 'How do you swap a and b without a temp variable in Python?',
    options: ['a = b; b = a', 'a, b = b, a', 'swap(a, b)', 'a <-> b'],
    correctAnswer: 1,
    explanation: 'Python supports simultaneous assignment for elegant variable swapping.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 70,
    question: 'After a = b = 10, what are a and b?',
    options: ['a=0, b=10', 'a=10, b=10', 'a=10, b=0', 'Error'],
    correctAnswer: 1,
    explanation: 'Chained assignment assigns the same value to all variables.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 71,
    question: 'What does the del keyword do in Python?',
    options: ['Deletes a file from disk', 'Removes a variable from the namespace', 'Permanently erases memory', 'Deletes a module'],
    correctAnswer: 1,
    explanation: 'del removes the name binding from the namespace. The object may then be garbage-collected.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 72,
    question: 'After x = 10; x = "hello", what is type(x)?',
    options: ['int', 'str', 'Error', 'Both int and str'],
    correctAnswer: 1,
    explanation: 'Python is dynamically typed — variables can be reassigned to different types.',
    difficulty: 'intermediate',
    chapter: 1
  },
  // ===== INTERMEDIATE MISC (73-82) =====
  {
    id: 73,
    question: 'What is the output of print(1_000_000)?',
    options: ['1_000_000', '1000000', 'Error', '"1_000_000"'],
    correctAnswer: 1,
    explanation: 'Underscores in numeric literals are visual separators — they are ignored.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 74,
    question: 'What type is the value 3 + 4j?',
    options: ['int', 'float', 'complex', 'tuple'],
    correctAnswer: 2,
    explanation: 'Values with the j suffix are complex numbers with real and imaginary parts.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 75,
    question: 'Which is the correct way to check if x is None?',
    options: ['x == None', 'x is None', 'x.isNone()', 'type(x) == None'],
    correctAnswer: 1,
    explanation: 'The recommended way to check for None is using identity: x is None.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 76,
    question: 'What does "hello".index("xyz") do?',
    options: ['Returns -1', 'Raises ValueError', 'Returns None', 'Returns 0'],
    correctAnswer: 1,
    explanation: 'index() raises ValueError if not found, unlike find() which returns -1.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 77,
    question: 'What does type(None) return?',
    options: ["<class 'bool'>", "<class 'NoneType'>", "<class 'null'>", "<class 'void'>"],
    correctAnswer: 1,
    explanation: 'None is the only instance of the NoneType class.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 78,
    question: 'What does int(True) return?',
    options: ['0', '1', 'True', 'Error'],
    correctAnswer: 1,
    explanation: 'bool is a subclass of int. True converts to 1, False converts to 0.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 79,
    question: 'What is the output of print(not "")?',
    options: ['True', 'False', '""', 'Error'],
    correctAnswer: 0,
    explanation: 'An empty string is falsy, so not "" evaluates to True.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 80,
    question: 'What does the expression 5 & 3 compute (bitwise)?',
    options: ['8', '1', '15', '2'],
    correctAnswer: 1,
    explanation: '& is bitwise AND. 5 (101) & 3 (011) = 1 (001).',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 81,
    question: 'What does the expression 5 | 3 compute (bitwise)?',
    options: ['8', '1', '7', '15'],
    correctAnswer: 2,
    explanation: '| is bitwise OR. 5 (101) | 3 (011) = 7 (111).',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 82,
    question: 'What does the expression 5 ^ 3 compute (bitwise)?',
    options: ['8', '6', '15', '2'],
    correctAnswer: 1,
    explanation: '^ is bitwise XOR. 5 (101) ^ 3 (011) = 6 (110).',
    difficulty: 'advanced',
    chapter: 1
  },
  // ===== ADVANCED BASICS (83-100) =====
  {
    id: 83,
    question: 'What does 2 << 3 evaluate to?',
    options: ['6', '16', '8', '5'],
    correctAnswer: 1,
    explanation: '<< is left shift. 2 << 3 shifts bits left by 3: 2 × 2³ = 16.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 84,
    question: 'Which expression evaluates to True?',
    options: ['bool([])', 'bool(0)', 'bool({})', 'bool([0])'],
    correctAnswer: 3,
    explanation: 'A non-empty list (even containing falsy values) is truthy.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 85,
    question: 'What is the difference between repr() and str()?',
    options: ['They are identical', 'repr() is for developers; str() is for users', 'str() is for developers; repr() is for users', 'repr() only works with numbers'],
    correctAnswer: 1,
    explanation: 'repr() returns an unambiguous string for debugging; str() returns a readable string.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 86,
    question: 'What does dir([]) give you?',
    options: ['The list contents', 'All attributes and methods of the list object', 'The memory address', 'The length'],
    correctAnswer: 1,
    explanation: 'dir() returns a list of all attributes and methods defined on an object.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 87,
    question: 'What does globals() return?',
    options: ['A list of variable names', 'A dictionary of the current global symbol table', 'All imported modules', 'The Python version'],
    correctAnswer: 1,
    explanation: 'globals() returns a dictionary representing the current global namespace.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 88,
    question: 'What is the value of 0xFF?',
    options: ['"0xFF"', '255', 'FF', 'Error'],
    correctAnswer: 1,
    explanation: '0xFF is a hexadecimal literal. F=15, so 0xFF = 15×16 + 15 = 255.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 89,
    question: 'What does isinstance(True, int) return?',
    options: ['True', 'False', 'Error', 'None'],
    correctAnswer: 0,
    explanation: 'bool is a subclass of int, so True is an instance of both bool and int.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 90,
    question: 'What is the result of 0.1 + 0.2 == 0.3?',
    options: ['True', 'False', '0.3', 'Error'],
    correctAnswer: 1,
    explanation: 'Due to floating-point precision, 0.1 + 0.2 is 0.30000000000000004, not exactly 0.3.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 91,
    question: 'What is the walrus operator in Python?',
    options: ['==', ':=', '>=', '!='],
    correctAnswer: 1,
    explanation: ':= (walrus operator, Python 3.8+) assigns values within expressions.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 92,
    question: 'What is the output of: x = 5; print("big" if x > 3 else "small")?',
    options: ['big', 'small', '5', 'Error'],
    correctAnswer: 0,
    explanation: 'This is a ternary expression. Since 5 > 3 is True, "big" is printed.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 93,
    question: 'What does "42".zfill(5) return?',
    options: ['"42000"', '"00042"', '"42   "', '"   42"'],
    correctAnswer: 1,
    explanation: 'zfill() pads a string with leading zeros to the specified width.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 94,
    question: 'What does round(2.5) return in Python 3?',
    options: ['3', '2', '2.5', 'Error'],
    correctAnswer: 1,
    explanation: "Python 3 uses banker's rounding — it rounds to the nearest even number.",
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 95,
    question: 'What does "hello".encode("utf-8") return?',
    options: ['"hello"', 'b"hello"', '["h","e","l","l","o"]', 'Error'],
    correctAnswer: 1,
    explanation: 'encode() converts a string to a bytes object using the specified encoding.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 96,
    question: 'What happens when you use a Python keyword as a variable name?',
    options: ['SyntaxError is raised', 'The keyword is overridden', 'A warning is shown', 'It works fine'],
    correctAnswer: 0,
    explanation: 'Keywords like if, for, class are reserved and cannot be used as variable names.',
    difficulty: 'beginner',
    chapter: 1
  },
  {
    id: 97,
    question: 'What is the output of print(10 == 10.0)?',
    options: ['True', 'False', 'Error', 'None'],
    correctAnswer: 0,
    explanation: 'Python compares values across numeric types. 10 (int) equals 10.0 (float).',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 98,
    question: 'What does the help() function do?',
    options: ['Exits the program', 'Displays documentation for an object', 'Installs packages', 'Checks syntax errors'],
    correctAnswer: 1,
    explanation: 'help() invokes the built-in help system, displaying documentation and usage info.',
    difficulty: 'intermediate',
    chapter: 1
  },
  {
    id: 99,
    question: 'What does hash(42) return?',
    options: ['"42"', 'An integer hash value', 'None', 'Error'],
    correctAnswer: 1,
    explanation: 'hash() returns an integer hash value, used for dictionary keys and set membership.',
    difficulty: 'advanced',
    chapter: 1
  },
  {
    id: 100,
    question: 'What is the output of print(type(lambda: None))?',
    options: ["<class 'NoneType'>", "<class 'function'>", "<class 'lambda'>", "Error"],
    correctAnswer: 1,
    explanation: 'Lambda expressions create function objects. Their type is function.',
    difficulty: 'advanced',
    chapter: 1
  }
];

export default chapter1Questions;
