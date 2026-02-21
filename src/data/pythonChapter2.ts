import { PythonQuestion } from './pythonQuestionTypes';

const chapter2Questions: PythonQuestion[] = [
  // ===== IF / ELIF / ELSE (1-15) =====
  {
    id: 101,
    question: 'What is the correct syntax for an if statement in Python?',
    options: ['if (x > 5) {}', 'if x > 5:', 'if x > 5 then:', 'if (x > 5) then'],
    correctAnswer: 1,
    explanation: 'Python uses a colon after the condition and indentation for the body — no parentheses or braces required.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 102,
    question: 'What is the output of: x = 10; print("yes") if x > 5 else print("no")?',
    options: ['yes', 'no', 'Error', 'None'],
    correctAnswer: 0,
    explanation: 'Since x=10 > 5, the condition is True, so "yes" is printed.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 103,
    question: 'What keyword is used for "else if" in Python?',
    options: ['else if', 'elseif', 'elif', 'elsif'],
    correctAnswer: 2,
    explanation: 'Python uses elif (not "else if") for additional conditional branches.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 104,
    question: 'How many elif blocks can an if statement have?',
    options: ['Only 1', 'Up to 3', 'Up to 10', 'Unlimited'],
    correctAnswer: 3,
    explanation: 'Python allows any number of elif blocks in an if/elif/else chain.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 105,
    question: 'What is the output of:\nx = 15\nif x > 20:\n    print("A")\nelif x > 10:\n    print("B")\nelif x > 5:\n    print("C")',
    options: ['A', 'B', 'C', 'B and C'],
    correctAnswer: 1,
    explanation: 'Only the first matching elif executes. x=15 > 10, so "B" prints. The third branch is skipped.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 106,
    question: 'What is the output of:\nif 0:\n    print("A")\nelse:\n    print("B")',
    options: ['A', 'B', 'Error', '0'],
    correctAnswer: 1,
    explanation: '0 is falsy in Python, so the else branch executes.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 107,
    question: 'Which of these is a valid condition in an if statement?',
    options: ['if x = 5:', 'if x == 5:', 'if x equals 5:', 'if x := 5:'],
    correctAnswer: 1,
    explanation: '== is the comparison operator. = is assignment and := is walrus operator (also valid but different purpose).',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 108,
    question: 'What is the output of:\nif True and False:\n    print("A")\nelse:\n    print("B")',
    options: ['A', 'B', 'Error', 'True'],
    correctAnswer: 1,
    explanation: 'True and False evaluates to False, so the else branch executes.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 109,
    question: 'What is the output of:\nif not False:\n    print("yes")',
    options: ['yes', 'No output', 'Error', 'False'],
    correctAnswer: 0,
    explanation: 'not False evaluates to True, so "yes" is printed.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 110,
    question: 'Can you have an if statement without an else block?',
    options: ['No, else is required', 'Yes, else is optional', 'Only with elif', 'Only in functions'],
    correctAnswer: 1,
    explanation: 'The else block is optional. An if statement can stand alone.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 111,
    question: 'What is the output of:\nx = 5\nif x > 3:\n    if x > 10:\n        print("A")\n    else:\n        print("B")',
    options: ['A', 'B', 'No output', 'Error'],
    correctAnswer: 1,
    explanation: 'x=5 > 3 enters outer if. x=5 is not > 10, so inner else prints "B".',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 112,
    question: 'What does the expression "A" if True else "B" evaluate to?',
    options: ['"A"', '"B"', 'True', 'Error'],
    correctAnswer: 0,
    explanation: 'This is a ternary expression. Since the condition is True, "A" is returned.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 113,
    question: 'What is the output of: print("even" if 4 % 2 == 0 else "odd")?',
    options: ['even', 'odd', '0', 'Error'],
    correctAnswer: 0,
    explanation: '4 % 2 == 0 is True, so "even" is printed.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 114,
    question: 'What happens if the body of an if block is empty?',
    options: ['Nothing — it is allowed', 'IndentationError', 'Use pass as placeholder', 'SyntaxError always'],
    correctAnswer: 2,
    explanation: 'An empty block causes an error. Use pass as a placeholder for an intentionally empty block.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 115,
    question: 'What is the output of: print("yes") if [] else print("no")?',
    options: ['yes', 'no', 'Error', '[]'],
    correctAnswer: 1,
    explanation: 'An empty list is falsy, so the else branch executes and prints "no".',
    difficulty: 'intermediate',
    chapter: 2
  },
  // ===== FOR LOOPS (16-30) =====
  {
    id: 116,
    question: 'What does range(5) generate?',
    options: ['1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '0, 1, 2, 3, 4, 5', '1, 2, 3, 4'],
    correctAnswer: 1,
    explanation: 'range(5) generates numbers from 0 up to (not including) 5.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 117,
    question: 'What does range(2, 8) generate?',
    options: ['2, 3, 4, 5, 6, 7', '2, 3, 4, 5, 6, 7, 8', '3, 4, 5, 6, 7', '2, 8'],
    correctAnswer: 0,
    explanation: 'range(2, 8) generates numbers from 2 up to (not including) 8.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 118,
    question: 'What does range(0, 10, 2) generate?',
    options: ['0, 2, 4, 6, 8', '0, 2, 4, 6, 8, 10', '2, 4, 6, 8', '0, 1, 2, 3, 4'],
    correctAnswer: 0,
    explanation: 'range(0, 10, 2) starts at 0, steps by 2, stops before 10.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 119,
    question: 'What does range(5, 0, -1) generate?',
    options: ['5, 4, 3, 2, 1', '5, 4, 3, 2, 1, 0', '0, 1, 2, 3, 4, 5', 'Empty — nothing'],
    correctAnswer: 0,
    explanation: 'range(5, 0, -1) counts down from 5 to 1 (stops before 0).',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 120,
    question: 'What is the output of:\nfor c in "abc":\n    print(c, end=" ")',
    options: ['abc', 'a b c ', '"a" "b" "c"', 'Error'],
    correctAnswer: 1,
    explanation: 'Iterating over a string yields each character. end=" " prints them space-separated.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 121,
    question: 'What does enumerate(["a", "b", "c"]) produce?',
    options: ['["a", "b", "c"]', '[(0,"a"), (1,"b"), (2,"c")]', '[0, 1, 2]', '{"a":0, "b":1, "c":2}'],
    correctAnswer: 1,
    explanation: 'enumerate() yields (index, value) tuples starting from 0 by default.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 122,
    question: 'What does zip([1,2], ["a","b"]) produce?',
    options: ['[(1,"a"), (2,"b")]', '[[1,"a"], [2,"b"]]', '{1:"a", 2:"b"}', '[(1,2), ("a","b")]'],
    correctAnswer: 0,
    explanation: 'zip() pairs corresponding elements from each iterable into tuples.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 123,
    question: 'What happens when you zip lists of different lengths?',
    options: ['Error is raised', 'Stops at the shortest', 'Pads with None', 'Stops at the longest'],
    correctAnswer: 1,
    explanation: 'zip() stops when the shortest iterable is exhausted.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 124,
    question: 'What is the output of:\nfor i in range(3):\n    print(i, end=" ")',
    options: ['1 2 3 ', '0 1 2 ', '0 1 2 3 ', '1 2 '],
    correctAnswer: 1,
    explanation: 'range(3) generates 0, 1, 2. Each is printed with a trailing space.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 125,
    question: 'What is the output of:\nfor k in {"a": 1, "b": 2}:\n    print(k, end=" ")',
    options: ['1 2 ', 'a b ', '("a",1) ("b",2) ', 'Error'],
    correctAnswer: 1,
    explanation: 'Iterating over a dictionary yields its keys by default.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 126,
    question: 'How do you iterate over both keys and values of a dictionary?',
    options: ['for k,v in dict:', 'for k,v in dict.items():', 'for k,v in dict.values():', 'for k,v in dict.keys():'],
    correctAnswer: 1,
    explanation: 'dict.items() returns (key, value) pairs that can be unpacked in a for loop.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 127,
    question: 'What is the output of:\nfor i, v in enumerate(["x","y"], start=1):\n    print(i, v)',
    options: ['0 x\\n1 y', '1 x\\n2 y', 'x 1\\ny 2', 'Error'],
    correctAnswer: 1,
    explanation: 'enumerate() with start=1 begins the counter at 1 instead of 0.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 128,
    question: 'What does reversed(range(5)) produce?',
    options: ['4, 3, 2, 1, 0', '5, 4, 3, 2, 1', '0, 1, 2, 3, 4', 'Error'],
    correctAnswer: 0,
    explanation: 'reversed() returns an iterator that yields items in reverse order.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 129,
    question: 'Is range() a list or an iterator in Python 3?',
    options: ['A list', 'An iterator', 'A lazy sequence object', 'A generator'],
    correctAnswer: 2,
    explanation: 'range() returns a range object — a lazy sequence that generates values on demand.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 130,
    question: 'How do you iterate over a list in reverse without modifying it?',
    options: ['for x in list.reverse():', 'for x in reversed(list):', 'for x in list.sort(reverse=True):', 'for x in list(-1):'],
    correctAnswer: 1,
    explanation: 'reversed() returns a reverse iterator without modifying the original list.',
    difficulty: 'intermediate',
    chapter: 2
  },
  // ===== WHILE LOOPS (31-40) =====
  {
    id: 131,
    question: 'What is the correct syntax for a while loop?',
    options: ['while (x > 0) {}', 'while x > 0:', 'while x > 0 do:', 'loop while x > 0:'],
    correctAnswer: 1,
    explanation: 'Python while loops use a colon after the condition, no parentheses or braces.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 132,
    question: 'What is the output of:\nx = 3\nwhile x > 0:\n    print(x, end=" ")\n    x -= 1',
    options: ['3 2 1 ', '3 2 1 0 ', '2 1 0 ', '1 2 3 '],
    correctAnswer: 0,
    explanation: 'x starts at 3, prints and decrements. Stops when x becomes 0 (not > 0).',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 133,
    question: 'How do you create an intentional infinite loop?',
    options: ['for ever:', 'while True:', 'loop:', 'while infinity:'],
    correctAnswer: 1,
    explanation: 'while True: creates an infinite loop since the condition is always True.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 134,
    question: 'What keyword exits a loop immediately?',
    options: ['exit', 'break', 'stop', 'return'],
    correctAnswer: 1,
    explanation: 'break immediately terminates the innermost enclosing loop.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 135,
    question: 'What keyword skips the current iteration and continues to the next?',
    options: ['skip', 'next', 'continue', 'pass'],
    correctAnswer: 2,
    explanation: 'continue skips the rest of the current iteration and moves to the next one.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 136,
    question: 'What does the pass statement do?',
    options: ['Exits the loop', 'Skips to next iteration', 'Does nothing — acts as placeholder', 'Passes a value'],
    correctAnswer: 2,
    explanation: 'pass is a no-op statement used as a placeholder where code is syntactically required.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 137,
    question: 'What is the output of:\nfor i in range(5):\n    if i == 3:\n        break\n    print(i, end=" ")',
    options: ['0 1 2 3 ', '0 1 2 ', '0 1 2 3 4 ', '3 '],
    correctAnswer: 1,
    explanation: 'break exits when i==3, so only 0, 1, 2 are printed.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 138,
    question: 'What is the output of:\nfor i in range(5):\n    if i == 3:\n        continue\n    print(i, end=" ")',
    options: ['0 1 2 4 ', '0 1 2 3 4 ', '0 1 2 ', '3 '],
    correctAnswer: 0,
    explanation: 'continue skips i==3 but continues the loop. All except 3 are printed.',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 139,
    question: 'What is the output of:\ni = 0\nwhile i < 3:\n    i += 1\nprint(i)',
    options: ['0', '2', '3', 'Error'],
    correctAnswer: 2,
    explanation: 'i increments to 1, 2, 3. When i=3, the condition fails. After loop, i is 3.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 140,
    question: 'What happens if a while loop condition is initially False?',
    options: ['Runs once', 'Never executes', 'Error', 'Runs forever'],
    correctAnswer: 1,
    explanation: 'If the condition is False from the start, the loop body never executes.',
    difficulty: 'beginner',
    chapter: 2
  },
  // ===== LOOP ELSE & NESTED (41-55) =====
  {
    id: 141,
    question: 'When does the else clause of a for loop execute?',
    options: ['Always', 'When the loop body raises an error', 'When the loop completes without break', 'When break is used'],
    correctAnswer: 2,
    explanation: 'The else after a for loop runs only if the loop finished without a break.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 142,
    question: 'What is the output of:\nfor i in range(3):\n    pass\nelse:\n    print("done")',
    options: ['No output', 'done', 'Error', 'pass'],
    correctAnswer: 1,
    explanation: 'The loop completes normally (no break), so the else block executes.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 143,
    question: 'What is the output of:\nfor i in range(3):\n    if i == 1:\n        break\nelse:\n    print("done")',
    options: ['done', 'No output', '1', 'Error'],
    correctAnswer: 1,
    explanation: 'break was used, so the else block does NOT execute.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 144,
    question: 'Does a while loop also support an else clause?',
    options: ['No', 'Yes, runs if no break occurred', 'Yes, runs if break occurred', 'Only in Python 2'],
    correctAnswer: 1,
    explanation: 'while loops also have an optional else that runs if the loop finishes without break.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 145,
    question: 'In nested loops, which loop does break terminate?',
    options: ['All loops', 'The outermost loop', 'The innermost enclosing loop', 'It depends on the condition'],
    correctAnswer: 2,
    explanation: 'break only terminates the innermost loop that contains it.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 146,
    question: 'What is the total number of iterations for:\nfor i in range(3):\n    for j in range(4):\n        pass',
    options: ['7', '12', '3', '4'],
    correctAnswer: 1,
    explanation: 'The inner loop runs 4 times for each of 3 outer iterations: 3 × 4 = 12.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 147,
    question: 'What is the output of:\nfor i in range(3):\n    for j in range(3):\n        if j == 1:\n            break\n    print(i, end=" ")',
    options: ['0 ', '0 1 2 ', '0 0 0 ', 'No output'],
    correctAnswer: 1,
    explanation: 'break exits inner loop only. The outer loop continues, printing 0 1 2.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 148,
    question: 'What is the output of:\nresult = []\nfor i in range(3):\n    for j in range(3):\n        if i == j:\n            result.append((i,j))\nprint(result)',
    options: ['[(0,0), (1,1), (2,2)]', '[(0,0)]', '[(0,1), (1,2)]', '[]'],
    correctAnswer: 0,
    explanation: 'When i equals j, the pair is appended. This happens at (0,0), (1,1), (2,2).',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 149,
    question: 'What does the loop variable equal after a for loop completes?\nfor x in [10, 20, 30]:\n    pass\nprint(x)',
    options: ['Error — x is undefined', '10', '30', 'None'],
    correctAnswer: 2,
    explanation: 'In Python, the loop variable retains its last value after the loop ends.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 150,
    question: 'Does a for loop in Python create a new scope?',
    options: ['Yes', 'No — the variable leaks into the enclosing scope', 'Only inside functions', 'Only for nested loops'],
    correctAnswer: 1,
    explanation: 'Python for loops do NOT create a new scope. The loop variable persists after the loop.',
    difficulty: 'advanced',
    chapter: 2
  },
  // ===== LIST COMPREHENSION (56-70) =====
  {
    id: 151,
    question: 'What does [x**2 for x in range(5)] produce?',
    options: ['[1, 4, 9, 16, 25]', '[0, 1, 4, 9, 16]', '[0, 2, 4, 6, 8]', '[0, 1, 2, 3, 4]'],
    correctAnswer: 1,
    explanation: 'range(5) gives 0-4. Each is squared: 0, 1, 4, 9, 16.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 152,
    question: 'What does [x for x in range(10) if x % 2 == 0] produce?',
    options: ['[1, 3, 5, 7, 9]', '[0, 2, 4, 6, 8]', '[2, 4, 6, 8, 10]', '[0, 1, 2, 3, 4]'],
    correctAnswer: 1,
    explanation: 'The if clause filters to even numbers only: 0, 2, 4, 6, 8.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 153,
    question: 'What does {x: x**2 for x in range(4)} produce?',
    options: ['{0, 1, 4, 9}', '{0: 0, 1: 1, 2: 4, 3: 9}', '[(0,0), (1,1), (2,4), (3,9)]', 'Error'],
    correctAnswer: 1,
    explanation: 'This is a dict comprehension. Each number maps to its square.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 154,
    question: 'What does {x for x in [1, 2, 2, 3, 3]} produce?',
    options: ['[1, 2, 2, 3, 3]', '{1, 2, 3}', '[1, 2, 3]', 'Error'],
    correctAnswer: 1,
    explanation: 'This is a set comprehension. Sets automatically remove duplicates.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 155,
    question: 'What type does (x**2 for x in range(5)) create?',
    options: ['tuple', 'list', 'generator', 'set'],
    correctAnswer: 2,
    explanation: 'Parentheses with a comprehension create a generator expression, not a tuple.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 156,
    question: 'What does [c.upper() for c in "hello"] produce?',
    options: ['"HELLO"', '["H","E","L","L","O"]', '["hello"]', 'Error'],
    correctAnswer: 1,
    explanation: 'Iterating a string yields characters. upper() is applied to each, returning a list.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 157,
    question: 'What does [x if x > 0 else 0 for x in [-1, 2, -3, 4]] produce?',
    options: ['[2, 4]', '[0, 2, 0, 4]', '[-1, 2, -3, 4]', 'Error'],
    correctAnswer: 1,
    explanation: 'The ternary expression replaces negatives with 0: [0, 2, 0, 4].',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 158,
    question: 'What does [[j for j in range(3)] for i in range(2)] produce?',
    options: ['[[0,1,2], [0,1,2]]', '[[0,0], [1,1], [2,2]]', '[0,1,2,0,1,2]', 'Error'],
    correctAnswer: 0,
    explanation: 'The outer loop creates 2 lists. Each inner list is [0, 1, 2].',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 159,
    question: 'What does [x for row in [[1,2],[3,4]] for x in row] produce?',
    options: ['[[1,2],[3,4]]', '[1, 2, 3, 4]', '[(1,2),(3,4)]', 'Error'],
    correctAnswer: 1,
    explanation: 'This flattens a nested list. The outer for comes first, then inner for.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 160,
    question: 'Which is more memory-efficient for large data?',
    options: ['List comprehension [x for x in range(10**6)]', 'Generator expression (x for x in range(10**6))', 'Both are equal', 'Neither — use a tuple'],
    correctAnswer: 1,
    explanation: 'Generator expressions are lazy — they generate values one at a time, using minimal memory.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 161,
    question: 'What does any([False, False, True]) return?',
    options: ['True', 'False', '[True]', 'Error'],
    correctAnswer: 0,
    explanation: 'any() returns True if at least one element is truthy.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 162,
    question: 'What does all([True, True, False]) return?',
    options: ['True', 'False', '[False]', 'Error'],
    correctAnswer: 1,
    explanation: 'all() returns True only if ALL elements are truthy. One False makes it False.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 163,
    question: 'What does any([]) return?',
    options: ['True', 'False', 'None', 'Error'],
    correctAnswer: 1,
    explanation: 'any() on an empty iterable returns False — there are no truthy elements.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 164,
    question: 'What does all([]) return?',
    options: ['True', 'False', 'None', 'Error'],
    correctAnswer: 0,
    explanation: 'all() on an empty iterable returns True — there are no falsy elements (vacuous truth).',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 165,
    question: 'What does list(filter(lambda x: x > 0, [-1, 2, -3, 4])) return?',
    options: ['[-1, -3]', '[2, 4]', '[-1, 2, -3, 4]', '[True, False]'],
    correctAnswer: 1,
    explanation: 'filter() keeps elements where the function returns True. Only 2 and 4 are > 0.',
    difficulty: 'intermediate',
    chapter: 2
  },
  // ===== TRY/EXCEPT (71-88) =====
  {
    id: 166,
    question: 'What is the basic syntax for exception handling in Python?',
    options: ['try {} catch {}', 'try: ... except:', 'try: ... catch:', 'begin: ... rescue:'],
    correctAnswer: 1,
    explanation: 'Python uses try/except blocks (not try/catch like other languages).',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 167,
    question: 'What is the output of:\ntry:\n    x = 1/0\nexcept ZeroDivisionError:\n    print("caught")',
    options: ['Error crash', 'caught', '0', 'None'],
    correctAnswer: 1,
    explanation: 'The ZeroDivisionError is caught by the except block, printing "caught".',
    difficulty: 'beginner',
    chapter: 2
  },
  {
    id: 168,
    question: 'What does the finally block do?',
    options: ['Runs only on error', 'Runs only on success', 'Always runs regardless of exceptions', 'Is the same as else'],
    correctAnswer: 2,
    explanation: 'finally always executes — whether an exception occurred or not.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 169,
    question: 'When does the else clause in try/except execute?',
    options: ['When an exception occurs', 'When no exception occurs', 'Always', 'Never — it is invalid'],
    correctAnswer: 1,
    explanation: 'The else block runs only if the try block completed without raising an exception.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 170,
    question: 'What is the output of:\ntry:\n    print("A")\nexcept:\n    print("B")\nelse:\n    print("C")\nfinally:\n    print("D")',
    options: ['A B C D', 'A C D', 'A D', 'A B D'],
    correctAnswer: 1,
    explanation: 'No exception: try prints "A", else prints "C", finally prints "D". Except is skipped.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 171,
    question: 'What is the output of:\ntry:\n    print("A")\n    raise ValueError("oops")\n    print("B")\nexcept ValueError:\n    print("C")\nfinally:\n    print("D")',
    options: ['A B C D', 'A C D', 'A C', 'A D'],
    correctAnswer: 1,
    explanation: '"A" prints, exception raised (skips "B"), caught prints "C", finally prints "D".',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 172,
    question: 'How do you catch multiple exception types in one block?',
    options: ['except TypeError, ValueError:', 'except (TypeError, ValueError):', 'except TypeError and ValueError:', 'except TypeError || ValueError:'],
    correctAnswer: 1,
    explanation: 'Use a tuple of exception types: except (Type1, Type2):',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 173,
    question: 'How do you access the exception object in an except block?',
    options: ['except Error(e):', 'except ValueError as e:', 'except e = ValueError:', 'except ValueError -> e:'],
    correctAnswer: 1,
    explanation: 'Use "as" to bind the exception to a variable: except ValueError as e:',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 174,
    question: 'What does raise do without any arguments inside an except block?',
    options: ['Raises a new generic exception', 'Re-raises the current exception', 'Does nothing', 'Exits the program'],
    correctAnswer: 1,
    explanation: 'A bare raise re-raises the exception that is currently being handled.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 175,
    question: 'What is the output of:\ntry:\n    int("abc")\nexcept ValueError:\n    print("A")\nexcept TypeError:\n    print("B")',
    options: ['A', 'B', 'A B', 'Error'],
    correctAnswer: 0,
    explanation: 'int("abc") raises ValueError (not TypeError). The first matching except handles it.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 176,
    question: 'What exception does accessing a non-existent dictionary key raise?',
    options: ['ValueError', 'IndexError', 'KeyError', 'AttributeError'],
    correctAnswer: 2,
    explanation: 'Accessing dict["nonexistent_key"] raises a KeyError.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 177,
    question: 'What exception does accessing an out-of-range list index raise?',
    options: ['ValueError', 'IndexError', 'KeyError', 'RangeError'],
    correctAnswer: 1,
    explanation: 'Accessing a list index beyond its length raises an IndexError.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 178,
    question: 'What does assert False, "oops" do?',
    options: ['Nothing', 'Prints "oops"', 'Raises AssertionError with message "oops"', 'Raises ValueError'],
    correctAnswer: 2,
    explanation: 'assert raises AssertionError when the condition is False, with the given message.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 179,
    question: 'What is the parent class of all built-in exceptions?',
    options: ['Exception', 'BaseException', 'Error', 'Throwable'],
    correctAnswer: 1,
    explanation: 'BaseException is the root of the exception hierarchy. Exception inherits from it.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 180,
    question: 'Why should you generally catch Exception rather than BaseException?',
    options: ['They are the same', 'BaseException includes SystemExit and KeyboardInterrupt', 'Exception is faster', 'BaseException does not exist'],
    correctAnswer: 1,
    explanation: 'BaseException includes SystemExit and KeyboardInterrupt, which usually should not be caught.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 181,
    question: 'What does except: (with no exception type) catch?',
    options: ['Only ValueError', 'Only Exception subclasses', 'All exceptions including SystemExit', 'Nothing'],
    correctAnswer: 2,
    explanation: 'A bare except catches everything, including BaseException subclasses. This is usually discouraged.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 182,
    question: 'What is the output of:\ntry:\n    pass\nfinally:\n    print("done")',
    options: ['No output', 'done', 'Error', 'None'],
    correctAnswer: 1,
    explanation: 'finally always runs. Even though try had no exception, "done" is printed.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 183,
    question: 'What does "raise ValueError from TypeError" do?',
    options: ['Raises both errors', 'Chains the exceptions — sets __cause__', 'Raises only TypeError', 'Syntax error'],
    correctAnswer: 1,
    explanation: '"raise X from Y" creates exception chaining, setting __cause__ for the traceback.',
    difficulty: 'advanced',
    chapter: 2
  },
  // ===== ADVANCED CONTROL FLOW (84-100) =====
  {
    id: 184,
    question: 'What is the output of:\nfor i in range(5):\n    if i == 3:\n        continue\n    if i == 4:\n        break\nelse:\n    print("done")',
    options: ['done', 'No output', '3', 'Error'],
    correctAnswer: 1,
    explanation: 'break was triggered at i=4, so the else block does NOT execute.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 185,
    question: 'What does list(map(lambda x: x*2, [1,2,3])) return?',
    options: ['[1, 2, 3]', '[2, 4, 6]', '[1, 4, 9]', '[[1,1],[2,2],[3,3]]'],
    correctAnswer: 1,
    explanation: 'map() applies the function to each element. Each is multiplied by 2.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 186,
    question: 'What does the walrus operator allow in a while loop?\nwhile (n := int(input())) != 0:\n    print(n)',
    options: ['Nothing special', 'Assigns and tests a value in one expression', 'Creates an infinite loop', 'This is invalid syntax'],
    correctAnswer: 1,
    explanation: 'The walrus operator := assigns and evaluates in one step, useful in while conditions.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 187,
    question: 'What is the output of:\nx = [i for i in range(5) if i != 3]\nprint(x)',
    options: ['[0, 1, 2, 3, 4]', '[0, 1, 2, 4]', '[3]', '[0, 1, 2]'],
    correctAnswer: 1,
    explanation: 'The if clause excludes 3 from the list comprehension.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 188,
    question: 'What does iter() do?',
    options: ['Creates a list', 'Returns an iterator object', 'Runs a loop', 'Counts elements'],
    correctAnswer: 1,
    explanation: 'iter() returns an iterator from an iterable object.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 189,
    question: 'What does next() do on an iterator?',
    options: ['Resets the iterator', 'Returns the next item or raises StopIteration', 'Skips an item', 'Counts remaining items'],
    correctAnswer: 1,
    explanation: 'next() retrieves the next item. Raises StopIteration when exhausted.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 190,
    question: 'What exception is raised when an iterator is exhausted?',
    options: ['ValueError', 'IndexError', 'StopIteration', 'RuntimeError'],
    correctAnswer: 2,
    explanation: 'StopIteration signals that there are no more items in the iterator.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 191,
    question: 'What is the output of:\nit = iter([10, 20, 30])\nprint(next(it))\nprint(next(it))',
    options: ['10\\n10', '10\\n20', '20\\n30', '30\\n20'],
    correctAnswer: 1,
    explanation: 'next() advances the iterator. First call returns 10, second returns 20.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 192,
    question: 'What does a for loop use internally to iterate?',
    options: ['Index counting', 'The iter() and next() protocol', 'Recursion', 'The while protocol'],
    correctAnswer: 1,
    explanation: 'for loops call iter() on the iterable, then repeatedly call next() until StopIteration.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 193,
    question: 'What is the Python 3.10+ structural pattern matching keyword?',
    options: ['switch', 'case', 'match', 'select'],
    correctAnswer: 2,
    explanation: 'Python 3.10 introduced match/case statements for structural pattern matching.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 194,
    question: 'What does the following match statement do?\nmatch status:\n    case 200: print("OK")\n    case 404: print("Not Found")\n    case _: print("Other")',
    options: ['Compares status to patterns and executes matching block', 'Creates a dictionary', 'Defines a function', 'This is invalid syntax'],
    correctAnswer: 0,
    explanation: 'match/case matches the value against patterns. _ is the wildcard/default case.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 195,
    question: 'What does the with statement provide?',
    options: ['Loop control', 'Context management (automatic resource cleanup)', 'Variable scoping', 'Exception suppression'],
    correctAnswer: 1,
    explanation: 'with is used for context managers, ensuring resources like files are properly closed.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 196,
    question: 'What is the output of:\nwith open("test.txt", "w") as f:\n    f.write("hello")\nprint(f.closed)',
    options: ['True', 'False', 'Error', 'None'],
    correctAnswer: 0,
    explanation: 'The with statement automatically closes the file when the block exits.',
    difficulty: 'intermediate',
    chapter: 2
  },
  {
    id: 197,
    question: 'What is the output of:\nresult = []\nfor i in range(3):\n    result.append(lambda: i)\nprint([f() for f in result])',
    options: ['[0, 1, 2]', '[2, 2, 2]', '[0, 0, 0]', 'Error'],
    correctAnswer: 1,
    explanation: 'The lambda captures the variable i, not its value. After the loop i=2 for all.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 198,
    question: 'How do you fix the closure problem in the previous question?',
    options: ['Use a global variable', 'Use default argument: lambda i=i: i', 'Use a while loop instead', 'It cannot be fixed'],
    correctAnswer: 1,
    explanation: 'Default arguments are evaluated at definition time, capturing the current value of i.',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 199,
    question: 'What is the maximum recursion depth in Python by default?',
    options: ['100', '500', '1000', 'Unlimited'],
    correctAnswer: 2,
    explanation: 'Python default recursion limit is typically 1000 (can be changed with sys.setrecursionlimit).',
    difficulty: 'advanced',
    chapter: 2
  },
  {
    id: 200,
    question: 'What exception is raised when recursion depth is exceeded?',
    options: ['StackOverflowError', 'RecursionError', 'MemoryError', 'RuntimeError'],
    correctAnswer: 1,
    explanation: 'Python raises RecursionError (a subclass of RuntimeError) when the recursion limit is hit.',
    difficulty: 'advanced',
    chapter: 2
  }
];

export default chapter2Questions;
