import { PythonQuestion } from './pythonQuestionTypes';

const chapter4Questions: PythonQuestion[] = [
  // ===== LISTS (1-20) =====
  {
    id: 301,
    question: 'How do you create an empty list in Python?',
    options: ['list = ()', 'list = []', 'list = {}', 'list = set()'],
    correctAnswer: 1,
    explanation: 'Empty lists are created with [] or list(). {} creates a dict, not a list.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 302,
    question: 'What does [1, 2, 3].append(4) do?',
    options: ['Returns [1, 2, 3, 4]', 'Modifies the list in-place to [1, 2, 3, 4]', 'Creates a new list', 'Error'],
    correctAnswer: 1,
    explanation: 'append() adds an element to the end of the list in-place. It returns None.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 303,
    question: 'What is the difference between append() and extend()?',
    options: ['They are the same', 'append adds one element; extend adds all elements from an iterable', 'extend adds one element; append adds all', 'append returns a new list'],
    correctAnswer: 1,
    explanation: 'append adds a single item. extend unpacks an iterable and adds each element.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 304,
    question: 'What is the output of:\nx = [1, 2, 3]\nx.append([4, 5])\nprint(x)',
    options: ['[1, 2, 3, 4, 5]', '[1, 2, 3, [4, 5]]', '[[1, 2, 3], [4, 5]]', 'Error'],
    correctAnswer: 1,
    explanation: 'append adds the list [4, 5] as a single element, creating a nested list.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 305,
    question: 'What is the output of:\nx = [1, 2, 3]\nx.extend([4, 5])\nprint(x)',
    options: ['[1, 2, 3, 4, 5]', '[1, 2, 3, [4, 5]]', '[[1, 2, 3], 4, 5]', 'Error'],
    correctAnswer: 0,
    explanation: 'extend unpacks the iterable and adds each element individually.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 306,
    question: 'What does [1, 2, 3].insert(1, "a") produce?',
    options: ['[1, "a", 2, 3]', '["a", 1, 2, 3]', '[1, 2, "a", 3]', 'Error'],
    correctAnswer: 0,
    explanation: 'insert(1, "a") inserts "a" at index 1, shifting existing elements right.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 307,
    question: 'What does [1, 2, 3, 2].remove(2) do?',
    options: ['Removes all 2s', 'Removes the first occurrence of 2', 'Removes the element at index 2', 'Returns a new list without 2'],
    correctAnswer: 1,
    explanation: 'remove() deletes the first occurrence of the specified value.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 308,
    question: 'What does [10, 20, 30].pop(1) return?',
    options: ['10', '20', '30', 'None'],
    correctAnswer: 1,
    explanation: 'pop(1) removes and returns the element at index 1, which is 20.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 309,
    question: 'What does [10, 20, 30].pop() return (no argument)?',
    options: ['10', '20', '30', 'None'],
    correctAnswer: 2,
    explanation: 'pop() without an argument removes and returns the last element.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 310,
    question: 'What does [3, 1, 2].sort() return?',
    options: ['[1, 2, 3]', 'None', '[3, 2, 1]', 'Error'],
    correctAnswer: 1,
    explanation: 'sort() modifies the list in-place and returns None. Use sorted() for a new list.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 311,
    question: 'What is the difference between sort() and sorted()?',
    options: ['They are the same', 'sort() modifies in-place; sorted() returns a new list', 'sorted() modifies in-place; sort() returns new', 'sort() only works on numbers'],
    correctAnswer: 1,
    explanation: 'sort() is a list method (in-place, returns None). sorted() is a built-in (returns new list).',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 312,
    question: 'What does [1, 2, 3].reverse() return?',
    options: ['[3, 2, 1]', 'None', '[1, 2, 3]', 'Error'],
    correctAnswer: 1,
    explanation: 'reverse() modifies the list in-place and returns None.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 313,
    question: 'What is the output of:\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)',
    options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4, 1, 2, 3]', 'Error'],
    correctAnswer: 1,
    explanation: 'b = a creates an alias (same object). Modifying b also modifies a.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 314,
    question: 'How do you create a shallow copy of a list?',
    options: ['b = a', 'b = a.copy() or b = a[:]', 'b = copy(a)', 'b = a.clone()'],
    correctAnswer: 1,
    explanation: 'Use .copy() or slicing [:] for a shallow copy. Direct assignment creates an alias.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 315,
    question: 'What does del mylist[1] do?',
    options: ['Deletes the entire list', 'Deletes the element at index 1', 'Deletes all elements equal to 1', 'Nothing'],
    correctAnswer: 1,
    explanation: 'del with an index removes the element at that position from the list.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 316,
    question: 'What does [1, 2, 3] + [4, 5] produce?',
    options: ['[1, 2, 3, 4, 5]', '[[1,2,3],[4,5]]', '[5, 7, 3]', 'Error'],
    correctAnswer: 0,
    explanation: 'The + operator concatenates two lists into a new list.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 317,
    question: 'What does [0] * 5 produce?',
    options: ['[0, 0, 0, 0, 0]', '[5]', '[0, 5]', 'Error'],
    correctAnswer: 0,
    explanation: 'The * operator repeats a list. [0] * 5 creates [0, 0, 0, 0, 0].',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 318,
    question: 'What is the danger of [[]] * 3?',
    options: ['Nothing — it works fine', 'All inner lists are the same object', 'It creates an error', 'It uses too much memory'],
    correctAnswer: 1,
    explanation: '[[]] * 3 creates [[], [], []] but all inner lists reference the SAME object. Modifying one affects all.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 319,
    question: 'What does [1, 2, 3].index(2) return?',
    options: ['2', '1', '0', 'Error'],
    correctAnswer: 1,
    explanation: 'index() returns the position of the first occurrence. 2 is at index 1.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 320,
    question: 'What does [1, 2, 2, 3].count(2) return?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'count() returns the number of occurrences. 2 appears twice.',
    difficulty: 'beginner',
    chapter: 4
  },
  // ===== TUPLES (21-30) =====
  {
    id: 321,
    question: 'How do you create a tuple with one element?',
    options: ['(1)', '(1,)', '[1]', 'tuple(1)'],
    correctAnswer: 1,
    explanation: 'A single-element tuple requires a trailing comma: (1,). Without it, (1) is just an integer.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 322,
    question: 'What happens when you try to modify a tuple element?',
    options: ['It works fine', 'TypeError is raised', 'The tuple is converted to a list', 'Nothing happens'],
    correctAnswer: 1,
    explanation: 'Tuples are immutable. Attempting to modify an element raises TypeError.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 323,
    question: 'What is the main advantage of tuples over lists?',
    options: ['Tuples can hold more items', 'Tuples are immutable (can be dict keys, are hashable)', 'Tuples support more methods', 'Tuples are always faster'],
    correctAnswer: 1,
    explanation: 'Tuples are immutable and hashable, making them usable as dictionary keys and set elements.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 324,
    question: 'What does tuple([1, 2, 3]) return?',
    options: ['[1, 2, 3]', '(1, 2, 3)', '{1, 2, 3}', 'Error'],
    correctAnswer: 1,
    explanation: 'tuple() converts an iterable (like a list) to a tuple.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 325,
    question: 'What is tuple unpacking?',
    options: ['Converting tuple to list', 'Assigning tuple elements to individual variables', 'Adding elements to a tuple', 'Removing elements from a tuple'],
    correctAnswer: 1,
    explanation: 'Tuple unpacking assigns each element to a corresponding variable: a, b = (1, 2).',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 326,
    question: 'What does a, *b = (1, 2, 3, 4) assign to b?',
    options: ['(2, 3, 4)', '[2, 3, 4]', '2', 'Error'],
    correctAnswer: 1,
    explanation: 'The * operator captures remaining elements as a LIST: b = [2, 3, 4].',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 327,
    question: 'Can a tuple contain mutable elements?',
    options: ['No — all elements must be immutable', 'Yes — the tuple itself is immutable but elements can be mutable', 'Only if the tuple has one element', 'Only in Python 3'],
    correctAnswer: 1,
    explanation: 'A tuple can contain lists or dicts. The tuple reference is immutable, but the contents of mutable elements can change.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 328,
    question: 'What methods do tuples support?',
    options: ['append, extend, sort', 'Only count and index', 'All list methods', 'No methods at all'],
    correctAnswer: 1,
    explanation: 'Tuples only have count() and index() methods — no modification methods.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 329,
    question: 'What is a named tuple?',
    options: ['A tuple with string keys', 'A tuple subclass with named fields', 'A dictionary pretending to be a tuple', 'A class decorator'],
    correctAnswer: 1,
    explanation: 'collections.namedtuple creates tuple subclasses with named fields for readability.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 330,
    question: 'What is the output of:\nfrom collections import namedtuple\nPoint = namedtuple("Point", ["x", "y"])\np = Point(3, 4)\nprint(p.x, p[0])',
    options: ['3 4', '3 3', '4 3', 'Error'],
    correctAnswer: 1,
    explanation: 'Named tuples support both attribute access (p.x) and index access (p[0]). Both give 3.',
    difficulty: 'intermediate',
    chapter: 4
  },
  // ===== DICTIONARIES (31-50) =====
  {
    id: 331,
    question: 'How do you create an empty dictionary?',
    options: ['dict = []', 'dict = ()', 'dict = {}', 'dict = set()'],
    correctAnswer: 2,
    explanation: 'Empty dictionaries are created with {} or dict(). Note: set() creates a set.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 332,
    question: 'What is the output of:\nd = {"a": 1, "b": 2}\nprint(d["a"])',
    options: ['1', '"a"', '{"a": 1}', 'Error'],
    correctAnswer: 0,
    explanation: 'Bracket notation accesses the value associated with the key "a".',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 333,
    question: 'What happens when you access d["x"] and "x" is not a key?',
    options: ['Returns None', 'Returns 0', 'Raises KeyError', 'Returns False'],
    correctAnswer: 2,
    explanation: 'Accessing a non-existent key with [] raises KeyError. Use .get() for safe access.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 334,
    question: 'What does d.get("x", 0) return if "x" is not in d?',
    options: ['KeyError', 'None', '0', 'False'],
    correctAnswer: 2,
    explanation: 'get() returns the default value (0) when the key is not found, instead of raising an error.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 335,
    question: 'What does d.get("x") return if "x" is not in d (no default given)?',
    options: ['KeyError', 'None', '0', '""'],
    correctAnswer: 1,
    explanation: 'get() without a default returns None when the key is not found.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 336,
    question: 'What does d.keys() return?',
    options: ['A list of keys', 'A dict_keys view object', 'A tuple of keys', 'A set of keys'],
    correctAnswer: 1,
    explanation: 'keys() returns a view object (dict_keys), not a list. Use list() to convert.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 337,
    question: 'What does d.values() return?',
    options: ['A list of values', 'A dict_values view object', 'A tuple', 'A generator'],
    correctAnswer: 1,
    explanation: 'values() returns a dict_values view object reflecting current dictionary values.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 338,
    question: 'What does d.items() return?',
    options: ['A list of keys', 'A dict_items view of (key, value) pairs', 'A tuple of values', 'A set of pairs'],
    correctAnswer: 1,
    explanation: 'items() returns a view of (key, value) tuple pairs.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 339,
    question: 'What does d.update({"c": 3}) do?',
    options: ['Returns a new dict', 'Merges the new dict into d in-place', 'Replaces d entirely', 'Error'],
    correctAnswer: 1,
    explanation: 'update() merges key-value pairs into the existing dictionary in-place.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 340,
    question: 'What does d.pop("a") do?',
    options: ['Returns the last item', 'Removes key "a" and returns its value', 'Removes the first item', 'Returns True if "a" exists'],
    correctAnswer: 1,
    explanation: 'pop(key) removes the key and returns its value. Raises KeyError if not found.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 341,
    question: 'What does d.setdefault("x", 10) do if "x" is not in d?',
    options: ['Returns None', 'Adds "x": 10 to d and returns 10', 'Raises KeyError', 'Returns False'],
    correctAnswer: 1,
    explanation: 'setdefault inserts the key with the default value if absent, and returns the value.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 342,
    question: 'What types can be used as dictionary keys?',
    options: ['Any type', 'Only strings', 'Only hashable (immutable) types', 'Only integers and strings'],
    correctAnswer: 2,
    explanation: 'Dictionary keys must be hashable. Lists and dicts cannot be keys, but tuples and strings can.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 343,
    question: 'Can a list be used as a dictionary key?',
    options: ['Yes', 'No — lists are mutable and not hashable', 'Only empty lists', 'Only with str() conversion'],
    correctAnswer: 1,
    explanation: 'Lists are mutable and unhashable, so they cannot be dictionary keys.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 344,
    question: 'What is the output of:\nd = {"a": 1, "b": 2}\nd["a"] = 10\nprint(d)',
    options: ['{"a": 1, "b": 2}', '{"a": 10, "b": 2}', 'Error', '{"a": 1, "a": 10, "b": 2}'],
    correctAnswer: 1,
    explanation: 'Assigning to an existing key updates its value. Keys are unique.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 345,
    question: 'What does dict.fromkeys(["a","b","c"], 0) return?',
    options: ['{"a": "b": "c": 0}', '{"a": 0, "b": 0, "c": 0}', '[("a",0), ("b",0), ("c",0)]', 'Error'],
    correctAnswer: 1,
    explanation: 'fromkeys creates a dict with specified keys all set to the same value.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 346,
    question: 'What is the output of: {**{"a":1}, **{"b":2, "a":3}}?',
    options: ['{"a": 1, "b": 2}', '{"a": 3, "b": 2}', 'Error', '{"a": 1, "b": 2, "a": 3}'],
    correctAnswer: 1,
    explanation: 'Dict unpacking merges dicts. Later values override earlier ones. "a" becomes 3.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 347,
    question: 'What does the | operator do between two dicts in Python 3.9+?',
    options: ['Bitwise OR of values', 'Merges the dictionaries', 'Finds common keys', 'Raises Error'],
    correctAnswer: 1,
    explanation: 'In Python 3.9+, d1 | d2 merges two dicts, with d2 values taking precedence.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 348,
    question: 'What is a dict comprehension?',
    options: ['A way to sort a dict', 'A concise way to create a dict: {k:v for k,v in iterable}', 'A method to delete dict entries', 'A type of list comprehension'],
    correctAnswer: 1,
    explanation: 'Dict comprehensions create dicts using {key_expr: val_expr for item in iterable}.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 349,
    question: 'What is the average time complexity of dict key lookup?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
    correctAnswer: 1,
    explanation: 'Dictionary key lookup is O(1) average time due to hash table implementation.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 350,
    question: 'Are Python 3.7+ dictionaries ordered?',
    options: ['No — dicts are unordered', 'Yes — insertion order is preserved', 'Only if you use OrderedDict', 'Only for string keys'],
    correctAnswer: 1,
    explanation: 'Since Python 3.7, regular dicts maintain insertion order as a language guarantee.',
    difficulty: 'intermediate',
    chapter: 4
  },
  // ===== SETS (51-65) =====
  {
    id: 351,
    question: 'How do you create an empty set?',
    options: ['s = {}', 's = set()', 's = []', 's = ()'],
    correctAnswer: 1,
    explanation: '{} creates an empty dict, not a set. Use set() for an empty set.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 352,
    question: 'What happens with duplicate values in a set?',
    options: ['Error is raised', 'Duplicates are automatically removed', 'Both copies are kept', 'Last one overwrites first'],
    correctAnswer: 1,
    explanation: 'Sets only store unique elements. Duplicates are silently ignored.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 353,
    question: 'What is the output of: print({1, 2, 2, 3, 3, 3})?',
    options: ['{1, 2, 2, 3, 3, 3}', '{1, 2, 3}', '[1, 2, 3]', 'Error'],
    correctAnswer: 1,
    explanation: 'Sets remove duplicates automatically. Only unique values remain.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 354,
    question: 'What does {1,2,3}.add(4) do?',
    options: ['Returns {1,2,3,4}', 'Adds 4 to the set in-place', 'Creates a new set', 'Error'],
    correctAnswer: 1,
    explanation: 'add() inserts an element into the set in-place. Returns None.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 355,
    question: 'What is the difference between remove() and discard() for sets?',
    options: ['They are identical', 'remove raises KeyError if not found; discard does not', 'discard raises KeyError; remove does not', 'remove returns the element; discard does not'],
    correctAnswer: 1,
    explanation: 'remove() raises KeyError if the element is absent. discard() silently does nothing.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 356,
    question: 'What does {1,2,3} | {3,4,5} return?',
    options: ['{1, 2, 3, 4, 5}', '{3}', '{1, 2, 4, 5}', 'Error'],
    correctAnswer: 0,
    explanation: '| is the union operator. It returns all unique elements from both sets.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 357,
    question: 'What does {1,2,3} & {2,3,4} return?',
    options: ['{1, 2, 3, 4}', '{2, 3}', '{1, 4}', 'Error'],
    correctAnswer: 1,
    explanation: '& is the intersection operator. It returns elements common to both sets.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 358,
    question: 'What does {1,2,3} - {2,3,4} return?',
    options: ['{1}', '{4}', '{1, 2, 3, 4}', 'Error'],
    correctAnswer: 0,
    explanation: '- is the difference operator. It returns elements in the first set but not the second.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 359,
    question: 'What does {1,2,3} ^ {2,3,4} return?',
    options: ['{1, 4}', '{2, 3}', '{1, 2, 3, 4}', 'Error'],
    correctAnswer: 0,
    explanation: '^ is symmetric difference. Returns elements in either set but not both.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 360,
    question: 'What is a frozenset?',
    options: ['A sorted set', 'An immutable set', 'A set of frozen values', 'A set with fixed size'],
    correctAnswer: 1,
    explanation: 'frozenset is an immutable version of a set. It can be used as a dict key or set element.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 361,
    question: 'Can a set contain a list?',
    options: ['Yes', 'No — lists are unhashable', 'Only empty lists', 'Only with conversion'],
    correctAnswer: 1,
    explanation: 'Set elements must be hashable. Lists are mutable and unhashable.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 362,
    question: 'What is the average time complexity of set membership testing (x in s)?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
    correctAnswer: 1,
    explanation: 'Sets use hash tables, so membership testing is O(1) on average.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 363,
    question: 'What does {1,2}.issubset({1,2,3}) return?',
    options: ['True', 'False', '{1, 2}', 'Error'],
    correctAnswer: 0,
    explanation: 'issubset returns True if all elements of the set are in the other set.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 364,
    question: 'What does {1,2,3}.issuperset({1,2}) return?',
    options: ['True', 'False', '{1, 2, 3}', 'Error'],
    correctAnswer: 0,
    explanation: 'issuperset returns True if the set contains all elements of the other set.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 365,
    question: 'How do you convert a list to a set to remove duplicates?',
    options: ['list.unique()', 'set(list)', 'list.distinct()', 'list.toset()'],
    correctAnswer: 1,
    explanation: 'set() creates a set from the list, automatically removing duplicates.',
    difficulty: 'beginner',
    chapter: 4
  },
  // ===== COLLECTIONS MODULE (66-80) =====
  {
    id: 366,
    question: 'What does collections.Counter do?',
    options: ['Counts from 1 to n', 'Counts occurrences of elements in an iterable', 'Creates a countdown timer', 'Counts function calls'],
    correctAnswer: 1,
    explanation: 'Counter creates a dict-like object mapping elements to their counts.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 367,
    question: 'What is the output of:\nfrom collections import Counter\nprint(Counter("banana"))',
    options: ['6', "Counter({'a': 3, 'n': 2, 'b': 1})", '{"banana": 1}', 'Error'],
    correctAnswer: 1,
    explanation: "Counter counts each character: 'a' appears 3 times, 'n' twice, 'b' once.",
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 368,
    question: 'What does Counter("hello").most_common(2) return?',
    options: ["[('l', 2), ('h', 1)]", "[('h', 1), ('e', 1)]", "[('l', 2), ('o', 1)]", "Error"],
    correctAnswer: 0,
    explanation: "most_common(2) returns the 2 most frequent elements as (element, count) pairs.",
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 369,
    question: 'What does collections.defaultdict(int) do?',
    options: ['Creates a dict with default value 0 for missing keys', 'Creates a dict of integers only', 'Creates an integer counter', 'Error'],
    correctAnswer: 0,
    explanation: 'defaultdict(int) returns 0 (int()) for any missing key instead of raising KeyError.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 370,
    question: 'What does collections.defaultdict(list) do for missing keys?',
    options: ['Returns None', 'Returns an empty list []', 'Returns 0', 'Raises KeyError'],
    correctAnswer: 1,
    explanation: 'defaultdict(list) calls list() for missing keys, providing an empty list as default.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 371,
    question: 'What is collections.OrderedDict?',
    options: ['A dict that sorts keys automatically', 'A dict that remembers insertion order (pre-3.7)', 'A dict with integer keys only', 'A read-only dict'],
    correctAnswer: 1,
    explanation: 'OrderedDict preserves insertion order. In Python 3.7+, regular dicts also do, but OrderedDict has extra comparison features.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 372,
    question: 'What is collections.deque?',
    options: ['A double-ended queue', 'A priority queue', 'A stack', 'A sorted list'],
    correctAnswer: 0,
    explanation: 'deque (double-ended queue) supports efficient append/pop from both ends.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 373,
    question: 'What is the advantage of deque over list for queue operations?',
    options: ['deque uses less memory', 'deque has O(1) append/pop from both ends', 'deque is sorted', 'No advantage'],
    correctAnswer: 1,
    explanation: 'Lists have O(n) for insert(0)/pop(0). deque has O(1) for appendleft/popleft.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 374,
    question: 'What does deque([1,2,3]).appendleft(0) produce?',
    options: ['deque([1, 2, 3, 0])', 'deque([0, 1, 2, 3])', 'deque([0])', 'Error'],
    correctAnswer: 1,
    explanation: 'appendleft adds an element to the left (front) of the deque.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 375,
    question: 'What does deque([1,2,3]).popleft() return?',
    options: ['3', '1', '[2, 3]', 'Error'],
    correctAnswer: 1,
    explanation: 'popleft removes and returns the leftmost element.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 376,
    question: 'How do you implement a stack using a list?',
    options: ['Use insert(0) and pop(0)', 'Use append() and pop()', 'Use extend() and remove()', 'Lists cannot be used as stacks'],
    correctAnswer: 1,
    explanation: 'append() pushes to top, pop() removes from top — LIFO (Last In, First Out).',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 377,
    question: 'How do you implement a queue using collections.deque?',
    options: ['append() and pop()', 'append() and popleft()', 'appendleft() and pop()', 'insert() and remove()'],
    correctAnswer: 1,
    explanation: 'append() adds to rear, popleft() removes from front — FIFO (First In, First Out).',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 378,
    question: 'What module provides a heap (priority queue) implementation?',
    options: ['queue', 'heapq', 'collections', 'heap'],
    correctAnswer: 1,
    explanation: 'heapq provides min-heap operations on regular lists.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 379,
    question: 'What does heapq.heappush(h, 3) do?',
    options: ['Appends 3 to the end', 'Inserts 3 maintaining heap (min-heap) order', 'Sorts the list', 'Removes 3 from the heap'],
    correctAnswer: 1,
    explanation: 'heappush inserts an element while maintaining the min-heap invariant.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 380,
    question: 'What does heapq.heappop(h) return?',
    options: ['The largest element', 'The smallest element', 'The last element', 'A random element'],
    correctAnswer: 1,
    explanation: 'heappop removes and returns the smallest element from the min-heap.',
    difficulty: 'advanced',
    chapter: 4
  },
  // ===== ADVANCED DATA STRUCTURES (81-100) =====
  {
    id: 381,
    question: 'What does copy.deepcopy() do that copy.copy() does not?',
    options: ['It is faster', 'It recursively copies nested objects', 'It copies only the top level', 'They are identical'],
    correctAnswer: 1,
    explanation: 'deepcopy recursively copies all nested objects. copy only copies the top-level container.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 382,
    question: 'What is the output of:\na = [[1, 2], [3, 4]]\nimport copy\nb = copy.copy(a)\nb[0].append(5)\nprint(a)',
    options: ['[[1, 2], [3, 4]]', '[[1, 2, 5], [3, 4]]', '[[1, 2], [3, 4, 5]]', 'Error'],
    correctAnswer: 1,
    explanation: 'Shallow copy shares nested objects. Modifying b[0] also affects a[0].',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 383,
    question: 'What is the output of:\na = [[1, 2], [3, 4]]\nimport copy\nb = copy.deepcopy(a)\nb[0].append(5)\nprint(a)',
    options: ['[[1, 2], [3, 4]]', '[[1, 2, 5], [3, 4]]', '[[1, 2], [3, 4, 5]]', 'Error'],
    correctAnswer: 0,
    explanation: 'Deep copy creates independent nested objects. Modifying b does not affect a.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 384,
    question: 'What does sorted([(2,"b"),(1,"a"),(3,"c")]) return?',
    options: ['[(3,"c"),(2,"b"),(1,"a")]', '[(1,"a"),(2,"b"),(3,"c")]', '[(1,"a"),(3,"c"),(2,"b")]', 'Error'],
    correctAnswer: 1,
    explanation: 'Tuples are sorted by their first element by default.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 385,
    question: 'How do you sort a list of dicts by a specific key?',
    options: ['list.sort("key")', 'sorted(list, key=lambda x: x["key"])', 'list.sortby("key")', 'sorted(list, "key")'],
    correctAnswer: 1,
    explanation: 'Use the key parameter with a lambda to extract the sort value.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 386,
    question: 'What does list(range(5)) return?',
    options: ['range(0, 5)', '[0, 1, 2, 3, 4]', '(0, 1, 2, 3, 4)', '[1, 2, 3, 4, 5]'],
    correctAnswer: 1,
    explanation: 'list() converts the range object to an actual list: [0, 1, 2, 3, 4].',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 387,
    question: 'What does list("hello") return?',
    options: ['["hello"]', '["h", "e", "l", "l", "o"]', 'Error', '"hello"'],
    correctAnswer: 1,
    explanation: 'list() on a string splits it into individual characters.',
    difficulty: 'beginner',
    chapter: 4
  },
  {
    id: 388,
    question: 'What is the time complexity of list.append()?',
    options: ['O(n)', 'O(1) amortized', 'O(log n)', 'O(n²)'],
    correctAnswer: 1,
    explanation: 'append() is O(1) amortized. Occasionally O(n) when the underlying array is resized.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 389,
    question: 'What is the time complexity of list.insert(0, x)?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 1,
    explanation: 'insert(0, x) is O(n) because all existing elements must be shifted.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 390,
    question: 'What is the time complexity of x in list?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 1,
    explanation: 'List membership check is O(n) — it scans elements one by one.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 391,
    question: 'What is the time complexity of x in set?',
    options: ['O(n)', 'O(1) average', 'O(log n)', 'O(n²)'],
    correctAnswer: 1,
    explanation: 'Set membership is O(1) average due to hash table implementation.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 392,
    question: 'How do you flatten [[1,2],[3,4],[5]] into [1,2,3,4,5]?',
    options: ['list.flatten()', '[x for sub in lst for x in sub]', 'flat(list)', 'list.merge()'],
    correctAnswer: 1,
    explanation: 'A nested list comprehension iterates over sublists then elements to flatten.',
    difficulty: 'intermediate',
    chapter: 4
  },
  {
    id: 393,
    question: 'What does itertools.chain([1,2], [3,4]) produce?',
    options: ['[[1,2],[3,4]]', 'An iterator yielding 1, 2, 3, 4', '[(1,3),(2,4)]', 'Error'],
    correctAnswer: 1,
    explanation: 'chain() concatenates multiple iterables into a single iterator.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 394,
    question: 'What does itertools.combinations("ABC", 2) produce?',
    options: ['All permutations of length 2', 'All combinations of length 2: AB, AC, BC', 'All subsets', 'Error'],
    correctAnswer: 1,
    explanation: 'combinations returns subsequences of length r without repetition or reordering.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 395,
    question: 'What does itertools.permutations("AB") produce?',
    options: ["('A','B') and ('B','A')", "Only ('A','B')", "('AA','AB','BA','BB')", 'Error'],
    correctAnswer: 0,
    explanation: 'permutations returns all possible orderings: (A,B) and (B,A).',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 396,
    question: 'What does the bisect module do?',
    options: ['Splits a list in half', 'Maintains a sorted list using binary search', 'Creates binary trees', 'Converts binary to decimal'],
    correctAnswer: 1,
    explanation: 'bisect provides functions to insert elements into sorted lists while maintaining order.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 397,
    question: 'What is collections.ChainMap used for?',
    options: ['Chaining list operations', 'Grouping multiple dicts into a single view', 'Creating linked lists', 'Mapping functions in sequence'],
    correctAnswer: 1,
    explanation: 'ChainMap groups multiple dictionaries into a single mapping view for lookups.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 398,
    question: 'What does bytes(5) create?',
    options: ['b"5"', 'b"\\x00\\x00\\x00\\x00\\x00"', 'Error', '5'],
    correctAnswer: 1,
    explanation: 'bytes(n) creates a bytes object of n zero bytes.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 399,
    question: 'What is the difference between bytes and bytearray?',
    options: ['They are identical', 'bytes is immutable; bytearray is mutable', 'bytearray is immutable; bytes is mutable', 'bytes is for text; bytearray for binary'],
    correctAnswer: 1,
    explanation: 'bytes is immutable (like str for binary). bytearray is its mutable counterpart.',
    difficulty: 'advanced',
    chapter: 4
  },
  {
    id: 400,
    question: 'Which data structure should you choose for fast membership testing?',
    options: ['list', 'tuple', 'set', 'deque'],
    correctAnswer: 2,
    explanation: 'Sets use hash tables for O(1) average membership testing. Lists are O(n).',
    difficulty: 'intermediate',
    chapter: 4
  }
];

export default chapter4Questions;
