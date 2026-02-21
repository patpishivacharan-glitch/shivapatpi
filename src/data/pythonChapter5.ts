import { PythonQuestion } from './pythonQuestionTypes';

const chapter5Questions: PythonQuestion[] = [
  // ===== CLASS BASICS (1-15) =====
  {
    id: 401,
    question: 'Which keyword is used to define a class in Python?',
    options: ['def', 'class', 'struct', 'object'],
    correctAnswer: 1,
    explanation: 'The class keyword is used to define a new class in Python.',
    difficulty: 'beginner',
    chapter: 5
  },
  {
    id: 402,
    question: 'What is the purpose of the __init__ method?',
    options: ['To delete an object', 'To initialize a new instance (constructor)', 'To import a module', 'To define a static method'],
    correctAnswer: 1,
    explanation: '__init__ is the constructor — it initializes a new instance when the class is called.',
    difficulty: 'beginner',
    chapter: 5
  },
  {
    id: 403,
    question: 'What does self refer to in a class method?',
    options: ['The class itself', 'The current instance of the class', 'The parent class', 'A global variable'],
    correctAnswer: 1,
    explanation: 'self is a reference to the current instance, used to access its attributes and methods.',
    difficulty: 'beginner',
    chapter: 5
  },
  {
    id: 404,
    question: 'Is self a keyword in Python?',
    options: ['Yes — it is required', 'No — it is a convention; any name works', 'Only in Python 3', 'Only in classes'],
    correctAnswer: 1,
    explanation: 'self is a convention, not a keyword. You could use any name, but self is universally used.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 405,
    question: 'What is the output of:\nclass Dog:\n    def __init__(self, name):\n        self.name = name\nd = Dog("Rex")\nprint(d.name)',
    options: ['Dog', 'Rex', 'name', 'Error'],
    correctAnswer: 1,
    explanation: 'The constructor sets self.name = "Rex". Accessing d.name returns "Rex".',
    difficulty: 'beginner',
    chapter: 5
  },
  {
    id: 406,
    question: 'How do you create an instance of a class MyClass?',
    options: ['new MyClass()', 'MyClass.create()', 'MyClass()', 'create MyClass()'],
    correctAnswer: 2,
    explanation: 'In Python, you create instances by calling the class like a function: MyClass().',
    difficulty: 'beginner',
    chapter: 5
  },
  {
    id: 407,
    question: 'What is an instance attribute?',
    options: ['An attribute shared by all instances', 'An attribute specific to a single instance', 'A class-level constant', 'A module-level variable'],
    correctAnswer: 1,
    explanation: 'Instance attributes are defined on self (e.g., self.name) and are unique per instance.',
    difficulty: 'beginner',
    chapter: 5
  },
  {
    id: 408,
    question: 'What is a class attribute?',
    options: ['An attribute defined inside __init__', 'An attribute defined directly in the class body, shared by all instances', 'A private attribute', 'An attribute that cannot be changed'],
    correctAnswer: 1,
    explanation: 'Class attributes are defined in the class body (outside methods) and shared across all instances.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 409,
    question: 'What is the output of:\nclass Counter:\n    count = 0\n    def __init__(self):\n        Counter.count += 1\na = Counter()\nb = Counter()\nprint(Counter.count)',
    options: ['0', '1', '2', 'Error'],
    correctAnswer: 2,
    explanation: 'count is a class attribute. Each __init__ increments it. Two instances = 2.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 410,
    question: 'What happens when an instance attribute has the same name as a class attribute?',
    options: ['Error', 'Instance attribute shadows the class attribute', 'Class attribute takes priority', 'Both are deleted'],
    correctAnswer: 1,
    explanation: 'Instance attributes shadow class attributes. The instance sees its own value.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 411,
    question: 'What does the __str__ method control?',
    options: ['How the object is created', 'The user-friendly string representation (print/str)', 'The object hash', 'The object comparison'],
    correctAnswer: 1,
    explanation: '__str__ defines the readable string representation, used by print() and str().',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 412,
    question: 'What does the __repr__ method control?',
    options: ['The user-friendly display', 'The unambiguous developer-oriented string representation', 'Object deletion', 'Attribute access'],
    correctAnswer: 1,
    explanation: '__repr__ returns an unambiguous string, ideally one that could recreate the object.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 413,
    question: 'If __str__ is not defined, what does print(obj) use?',
    options: ['Raises Error', '__repr__', '__name__', '__doc__'],
    correctAnswer: 1,
    explanation: 'If __str__ is not defined, Python falls back to __repr__ for string conversion.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 414,
    question: 'What is the output of:\nclass Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __str__(self):\n        return f"({self.x}, {self.y})"\nprint(Point(3, 4))',
    options: ['Point(3, 4)', '(3, 4)', '<Point object>', 'Error'],
    correctAnswer: 1,
    explanation: '__str__ returns "(3, 4)", which is what print() displays.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 415,
    question: 'What does the __del__ method do?',
    options: ['Deletes the class', 'Called when an object is about to be garbage collected', 'Deletes attributes', 'Prevents deletion'],
    correctAnswer: 1,
    explanation: '__del__ is the destructor — called when an object is being garbage collected.',
    difficulty: 'advanced',
    chapter: 5
  },
  // ===== INHERITANCE (16-35) =====
  {
    id: 416,
    question: 'How do you create a class that inherits from a parent class?',
    options: ['class Child extends Parent:', 'class Child(Parent):', 'class Child inherits Parent:', 'class Child <- Parent:'],
    correctAnswer: 1,
    explanation: 'Python uses parentheses after the class name: class Child(Parent):',
    difficulty: 'beginner',
    chapter: 5
  },
  {
    id: 417,
    question: 'What does the super() function do?',
    options: ['Creates a superclass', 'Returns a proxy to call methods on the parent class', 'Makes a method static', 'Prevents inheritance'],
    correctAnswer: 1,
    explanation: 'super() returns a proxy object for accessing parent class methods.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 418,
    question: 'What is the output of:\nclass Animal:\n    def speak(self):\n        return "..."\nclass Dog(Animal):\n    def speak(self):\n        return "Woof"\nd = Dog()\nprint(d.speak())',
    options: ['...', 'Woof', 'Error', 'None'],
    correctAnswer: 1,
    explanation: 'Dog overrides the speak method. The Dog version is called.',
    difficulty: 'beginner',
    chapter: 5
  },
  {
    id: 419,
    question: 'What is method overriding?',
    options: ['Defining multiple methods with the same name in one class', 'A child class providing its own implementation of a parent method', 'Adding parameters to a method', 'Deleting a parent method'],
    correctAnswer: 1,
    explanation: 'Method overriding occurs when a child class redefines a method inherited from its parent.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 420,
    question: 'Does Python support multiple inheritance?',
    options: ['No', 'Yes', 'Only with interfaces', 'Only up to 2 parents'],
    correctAnswer: 1,
    explanation: 'Python supports multiple inheritance: class Child(Parent1, Parent2):',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 421,
    question: 'What is MRO in Python?',
    options: ['Method Return Object', 'Method Resolution Order', 'Module Reference Object', 'Multiple Return Output'],
    correctAnswer: 1,
    explanation: 'MRO defines the order in which parent classes are searched for a method.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 422,
    question: 'What algorithm does Python use for MRO?',
    options: ['Depth-first search', 'Breadth-first search', 'C3 linearization', 'Random order'],
    correctAnswer: 2,
    explanation: 'Python uses C3 linearization to determine the method resolution order.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 423,
    question: 'How do you view the MRO of a class?',
    options: ['MyClass.order()', 'MyClass.mro() or MyClass.__mro__', 'MyClass.hierarchy()', 'inspect.mro(MyClass)'],
    correctAnswer: 1,
    explanation: 'Use MyClass.mro() method or MyClass.__mro__ attribute to see the resolution order.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 424,
    question: 'What is the diamond problem in multiple inheritance?',
    options: ['A syntax error', 'Ambiguity when two parent classes share a common grandparent', 'A memory leak', 'A performance issue'],
    correctAnswer: 1,
    explanation: 'The diamond problem occurs when a class inherits from two classes that share a common ancestor.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 425,
    question: 'What does isinstance(obj, MyClass) check?',
    options: ['If obj is exactly MyClass type', 'If obj is an instance of MyClass or its subclasses', 'If obj has the same attributes', 'If obj can call MyClass methods'],
    correctAnswer: 1,
    explanation: 'isinstance returns True if the object is an instance of the class or any of its subclasses.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 426,
    question: 'What does issubclass(Dog, Animal) check?',
    options: ['If Dog is an instance of Animal', 'If Dog is a subclass of Animal', 'If they share methods', 'If Dog created Animal'],
    correctAnswer: 1,
    explanation: 'issubclass checks if the first class is a subclass of (or the same as) the second.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 427,
    question: 'What class do all Python classes implicitly inherit from?',
    options: ['Base', 'Object', 'object', 'None'],
    correctAnswer: 2,
    explanation: 'All classes in Python 3 implicitly inherit from object (lowercase).',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 428,
    question: 'What is the output of:\nclass A:\n    def greet(self):\n        return "A"\nclass B(A):\n    pass\nprint(B().greet())',
    options: ['A', 'Error', 'None', 'B'],
    correctAnswer: 0,
    explanation: 'B inherits greet() from A. Since B does not override it, A\'s version is called.',
    difficulty: 'beginner',
    chapter: 5
  },
  {
    id: 429,
    question: 'What is the output of:\nclass A:\n    def __init__(self):\n        self.x = 1\nclass B(A):\n    def __init__(self):\n        super().__init__()\n        self.y = 2\nb = B()\nprint(b.x, b.y)',
    options: ['1 2', 'Error', '1 None', 'None 2'],
    correctAnswer: 0,
    explanation: 'super().__init__() calls A\'s constructor, setting x=1. Then y=2 is set.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 430,
    question: 'What happens if a child __init__ does not call super().__init__()?',
    options: ['Error', 'Parent attributes are not initialized', 'Parent __init__ runs automatically', 'The child cannot be instantiated'],
    correctAnswer: 1,
    explanation: 'The parent __init__ does NOT run automatically. You must call super().__init__() explicitly.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 431,
    question: 'What is composition in OOP?',
    options: ['A class inheriting from another', 'A class containing instances of other classes (has-a)', 'Method overriding', 'Multiple inheritance'],
    correctAnswer: 1,
    explanation: 'Composition models "has-a" relationships: a Car has an Engine, rather than "is-a".',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 432,
    question: 'When should you prefer composition over inheritance?',
    options: ['Always', 'When you want "has-a" rather than "is-a" relationships', 'Never — inheritance is always better', 'Only for abstract classes'],
    correctAnswer: 1,
    explanation: 'Composition is preferred for "has-a" relationships and provides better flexibility and loose coupling.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 433,
    question: 'What is a mixin class?',
    options: ['A class that cannot be instantiated', 'A small class that provides specific functionality to be mixed into other classes', 'A class with only static methods', 'A deprecated pattern'],
    correctAnswer: 1,
    explanation: 'Mixins add specific functionality via multiple inheritance without being standalone classes.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 434,
    question: 'What is the output of:\nclass A:\n    def method(self):\n        return "A"\nclass B:\n    def method(self):\n        return "B"\nclass C(A, B):\n    pass\nprint(C().method())',
    options: ['A', 'B', 'Error', 'AB'],
    correctAnswer: 0,
    explanation: 'In MRO, A comes before B (left to right). C inherits method from A first.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 435,
    question: 'What does type(obj) return?',
    options: ['The value of obj', 'The class/type of obj', 'The id of obj', 'The module of obj'],
    correctAnswer: 1,
    explanation: 'type() returns the type (class) of an object.',
    difficulty: 'beginner',
    chapter: 5
  },
  // ===== ENCAPSULATION & ACCESS (36-50) =====
  {
    id: 436,
    question: 'What does a single underscore prefix (_attr) indicate?',
    options: ['The attribute is private', 'Convention: the attribute is intended for internal use', 'The attribute is read-only', 'The attribute is a constant'],
    correctAnswer: 1,
    explanation: 'A single underscore is a convention meaning "internal use" — not enforced by Python.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 437,
    question: 'What does a double underscore prefix (__attr) do?',
    options: ['Makes the attribute truly private', 'Triggers name mangling (_ClassName__attr)', 'Makes the attribute constant', 'Deletes the attribute'],
    correctAnswer: 1,
    explanation: 'Double underscore triggers name mangling: __attr becomes _ClassName__attr to avoid collisions.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 438,
    question: 'Can name-mangled attributes still be accessed from outside?',
    options: ['No — they are completely private', 'Yes — via _ClassName__attr', 'Only with decorators', 'Only in subclasses'],
    correctAnswer: 1,
    explanation: 'Name mangling is not true privacy. You can still access via _ClassName__attr.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 439,
    question: 'What does the @property decorator do?',
    options: ['Makes a method private', 'Turns a method into a read-only attribute', 'Creates a class attribute', 'Makes a method static'],
    correctAnswer: 1,
    explanation: '@property allows a method to be accessed like an attribute (getter).',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 440,
    question: 'How do you create a setter for a property?',
    options: ['@attr.set', '@attr.setter', '@setter(attr)', 'def set_attr():'],
    correctAnswer: 1,
    explanation: 'Use @property_name.setter decorator to define a setter method.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 441,
    question: 'What is the output of:\nclass Circle:\n    def __init__(self, r):\n        self._radius = r\n    @property\n    def radius(self):\n        return self._radius\nc = Circle(5)\nprint(c.radius)',
    options: ['5', 'Error', 'None', '<property object>'],
    correctAnswer: 0,
    explanation: '@property makes radius accessible like an attribute. c.radius returns 5.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 442,
    question: 'What does @staticmethod define?',
    options: ['A method that takes self', 'A method that takes cls', 'A method with no self or cls parameter', 'An abstract method'],
    correctAnswer: 2,
    explanation: 'Static methods do not receive self or cls. They behave like regular functions in a class namespace.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 443,
    question: 'What does @classmethod define?',
    options: ['A method that takes self as first argument', 'A method that takes cls (the class) as first argument', 'A method with no parameters', 'A private method'],
    correctAnswer: 1,
    explanation: 'Class methods receive the class (cls) as first argument, not an instance.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 444,
    question: 'What is a common use for @classmethod?',
    options: ['Defining utility functions', 'Creating alternative constructors (factory methods)', 'Making methods private', 'Preventing inheritance'],
    correctAnswer: 1,
    explanation: 'Class methods are often used as factory methods — alternative ways to create instances.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 445,
    question: 'What is the output of:\nclass MyClass:\n    @staticmethod\n    def greet():\n        return "Hello"\nprint(MyClass.greet())',
    options: ['Hello', 'Error — no self', 'None', 'MyClass'],
    correctAnswer: 0,
    explanation: 'Static methods can be called on the class directly. No self/cls is needed.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 446,
    question: 'What is the output of:\nclass MyClass:\n    name = "Test"\n    @classmethod\n    def get_name(cls):\n        return cls.name\nprint(MyClass.get_name())',
    options: ['Test', 'MyClass', 'Error', 'None'],
    correctAnswer: 0,
    explanation: 'cls refers to MyClass. cls.name accesses the class attribute "Test".',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 447,
    question: 'What is the __dict__ attribute of an instance?',
    options: ['A built-in dictionary', 'A dictionary of the instance attributes', 'The class methods', 'The module imports'],
    correctAnswer: 1,
    explanation: '__dict__ stores the instance attributes as a dictionary.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 448,
    question: 'What does __slots__ do in a class?',
    options: ['Adds extra methods', 'Restricts allowed attributes and saves memory', 'Creates time slots', 'Makes the class abstract'],
    correctAnswer: 1,
    explanation: '__slots__ declares fixed attributes, preventing __dict__ creation and saving memory.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 449,
    question: 'What happens if you try to add an attribute not in __slots__?',
    options: ['It works normally', 'AttributeError is raised', 'The attribute is ignored', 'It is added to __dict__'],
    correctAnswer: 1,
    explanation: 'With __slots__, only declared attributes are allowed. Others raise AttributeError.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 450,
    question: 'What is duck typing in Python?',
    options: ['A type checking system', 'If it walks like a duck and quacks like a duck, treat it as a duck', 'A design pattern for ducks', 'A testing methodology'],
    correctAnswer: 1,
    explanation: 'Duck typing means Python cares about what an object can do (methods), not what it is (type).',
    difficulty: 'intermediate',
    chapter: 5
  },
  // ===== ABSTRACT & POLYMORPHISM (51-65) =====
  {
    id: 451,
    question: 'What module provides abstract base classes?',
    options: ['abstract', 'abc', 'base', 'interface'],
    correctAnswer: 1,
    explanation: 'The abc module provides ABC class and @abstractmethod decorator.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 452,
    question: 'What happens if you try to instantiate an abstract class?',
    options: ['It works fine', 'TypeError is raised', 'It creates a partial object', 'Warning is shown'],
    correctAnswer: 1,
    explanation: 'You cannot instantiate a class with unimplemented abstract methods — TypeError is raised.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 453,
    question: 'What does @abstractmethod do?',
    options: ['Makes a method optional', 'Forces subclasses to implement the method', 'Makes a method static', 'Prevents method overriding'],
    correctAnswer: 1,
    explanation: '@abstractmethod marks a method that MUST be overridden in concrete subclasses.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 454,
    question: 'What is polymorphism?',
    options: ['Having multiple constructors', 'The ability for different classes to be treated through a common interface', 'Creating many instances', 'Inheriting from multiple classes'],
    correctAnswer: 1,
    explanation: 'Polymorphism lets different types respond to the same method call in their own way.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 455,
    question: 'What is the output of:\nclass Cat:\n    def speak(self): return "Meow"\nclass Dog:\n    def speak(self): return "Woof"\nfor a in [Cat(), Dog()]:\n    print(a.speak(), end=" ")',
    options: ['Meow Meow ', 'Woof Woof ', 'Meow Woof ', 'Error'],
    correctAnswer: 2,
    explanation: 'Polymorphism: each object calls its own speak() method. Cat says Meow, Dog says Woof.',
    difficulty: 'beginner',
    chapter: 5
  },
  {
    id: 456,
    question: 'Does Python support method overloading (same name, different signatures)?',
    options: ['Yes, like Java/C++', 'No — the last definition wins', 'Only with decorators', 'Only for __init__'],
    correctAnswer: 1,
    explanation: 'Python does not support traditional overloading. The last definition replaces earlier ones.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 457,
    question: 'How can you simulate method overloading in Python?',
    options: ['Use different method names', 'Use *args, **kwargs, or default parameters', 'Use a switch statement', 'You cannot'],
    correctAnswer: 1,
    explanation: 'Use default parameters, *args, **kwargs, or @singledispatch to handle multiple signatures.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 458,
    question: 'What does operator overloading mean?',
    options: ['Using too many operators', 'Defining custom behavior for operators via magic methods', 'Disabling operators', 'Creating new operators'],
    correctAnswer: 1,
    explanation: 'Operator overloading lets classes define custom behavior for +, -, ==, etc. via magic methods.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 459,
    question: 'Which magic method enables the + operator for a class?',
    options: ['__plus__', '__add__', '__sum__', '__concat__'],
    correctAnswer: 1,
    explanation: '__add__(self, other) is called when the + operator is used on instances.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 460,
    question: 'Which magic method enables len() for a class?',
    options: ['__size__', '__length__', '__len__', '__count__'],
    correctAnswer: 2,
    explanation: '__len__(self) is called by the built-in len() function.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 461,
    question: 'Which magic method enables == comparison?',
    options: ['__cmp__', '__eq__', '__equals__', '__compare__'],
    correctAnswer: 1,
    explanation: '__eq__(self, other) is called for the == operator.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 462,
    question: 'Which magic method enables < comparison?',
    options: ['__less__', '__lt__', '__lessthan__', '__cmp__'],
    correctAnswer: 1,
    explanation: '__lt__(self, other) is called for the < (less than) operator.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 463,
    question: 'Which magic method makes an object callable like a function?',
    options: ['__run__', '__call__', '__exec__', '__invoke__'],
    correctAnswer: 1,
    explanation: '__call__(self, ...) allows an instance to be called with parentheses like a function.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 464,
    question: 'Which magic method enables indexing with obj[key]?',
    options: ['__index__', '__get__', '__getitem__', '__item__'],
    correctAnswer: 2,
    explanation: '__getitem__(self, key) is called when you use bracket notation obj[key].',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 465,
    question: 'Which magic method enables obj[key] = value?',
    options: ['__set__', '__setitem__', '__assign__', '__put__'],
    correctAnswer: 1,
    explanation: '__setitem__(self, key, value) is called for bracket assignment.',
    difficulty: 'advanced',
    chapter: 5
  },
  // ===== MAGIC METHODS & PROTOCOLS (66-80) =====
  {
    id: 466,
    question: 'Which magic method enables the "in" operator for a class?',
    options: ['__in__', '__has__', '__contains__', '__member__'],
    correctAnswer: 2,
    explanation: '__contains__(self, item) is called by the "in" operator.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 467,
    question: 'Which magic methods make a class iterable?',
    options: ['__loop__ and __next__', '__iter__ and __next__', '__for__ and __step__', '__start__ and __stop__'],
    correctAnswer: 1,
    explanation: '__iter__ returns the iterator object, __next__ returns the next value.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 468,
    question: 'What is the output of:\nclass Range3:\n    def __init__(self):\n        self.i = 0\n    def __iter__(self):\n        return self\n    def __next__(self):\n        if self.i >= 3:\n            raise StopIteration\n        self.i += 1\n        return self.i\nprint(list(Range3()))',
    options: ['[0, 1, 2]', '[1, 2, 3]', '[0, 1, 2, 3]', 'Error'],
    correctAnswer: 1,
    explanation: '__next__ increments i then returns it. Yields 1, 2, 3 before stopping.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 469,
    question: 'What does __new__ do compared to __init__?',
    options: ['They are the same', '__new__ creates the instance; __init__ initializes it', '__init__ creates; __new__ initializes', '__new__ is deprecated'],
    correctAnswer: 1,
    explanation: '__new__ is called first to create the instance. __init__ then initializes it.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 470,
    question: 'When would you override __new__?',
    options: ['Always', 'When subclassing immutable types or implementing singletons', 'For every class', 'When using decorators'],
    correctAnswer: 1,
    explanation: '__new__ is overridden for immutable types (str, int, tuple) or singleton patterns.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 471,
    question: 'What is the output of:\nclass Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n        return Vector(self.x+other.x, self.y+other.y)\nv = Vector(1,2) + Vector(3,4)\nprint(v.x, v.y)',
    options: ['1 2', '3 4', '4 6', 'Error'],
    correctAnswer: 2,
    explanation: '__add__ adds x and y components: (1+3, 2+4) = (4, 6).',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 472,
    question: 'What magic methods are needed for a context manager class?',
    options: ['__open__ and __close__', '__enter__ and __exit__', '__start__ and __stop__', '__begin__ and __end__'],
    correctAnswer: 1,
    explanation: 'Context managers implement __enter__ (setup) and __exit__ (cleanup) for with statements.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 473,
    question: 'What is the output of:\nclass CM:\n    def __enter__(self):\n        print("enter", end=" ")\n        return self\n    def __exit__(self, *args):\n        print("exit", end=" ")\nwith CM():\n    print("body", end=" ")',
    options: ['enter body exit ', 'body enter exit ', 'enter exit body ', 'Error'],
    correctAnswer: 0,
    explanation: '__enter__ runs first, then the body, then __exit__ runs on block exit.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 474,
    question: 'What does __hash__ control?',
    options: ['String representation', 'The hash value used in sets and dict keys', 'Object comparison', 'Memory allocation'],
    correctAnswer: 1,
    explanation: '__hash__ returns an integer hash value. Objects used in sets/dicts must be hashable.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 475,
    question: 'If you define __eq__, what happens to __hash__ by default?',
    options: ['Nothing changes', '__hash__ is set to None (object becomes unhashable)', '__hash__ is auto-generated', 'Error is raised'],
    correctAnswer: 1,
    explanation: 'If you define __eq__ without __hash__, Python sets __hash__ to None, making the object unhashable.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 476,
    question: 'What does the __class__ attribute return?',
    options: ['The parent class', 'The class of the instance', 'The module name', 'The method list'],
    correctAnswer: 1,
    explanation: '__class__ returns the type/class of an object, same as type(obj).',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 477,
    question: 'What is a descriptor in Python?',
    options: ['A docstring', 'An object defining __get__, __set__, or __delete__', 'A decorator', 'A module attribute'],
    correctAnswer: 1,
    explanation: 'Descriptors are objects that customize attribute access by defining __get__, __set__, or __delete__.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 478,
    question: 'What is a metaclass?',
    options: ['A class inside another class', 'A class of a class — it defines how classes behave', 'An abstract class', 'A base class'],
    correctAnswer: 1,
    explanation: 'A metaclass is the class of a class. It controls class creation. The default metaclass is type.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 479,
    question: 'What is type used for (as a metaclass)?',
    options: ['Only checking types', 'type is the default metaclass that creates all classes', 'Creating instances', 'Type checking at runtime'],
    correctAnswer: 1,
    explanation: 'type serves dual purpose: checking types (type(x)) and as the metaclass for creating classes.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 480,
    question: 'What is the output of:\nclass Singleton:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance\na = Singleton()\nb = Singleton()\nprint(a is b)',
    options: ['True', 'False', 'Error', 'None'],
    correctAnswer: 0,
    explanation: '__new__ returns the same instance each time — this is the Singleton pattern.',
    difficulty: 'advanced',
    chapter: 5
  },
  // ===== DATACLASSES & MODERN OOP (81-92) =====
  {
    id: 481,
    question: 'What module provides the @dataclass decorator?',
    options: ['collections', 'typing', 'dataclasses', 'attrs'],
    correctAnswer: 2,
    explanation: 'The dataclasses module (Python 3.7+) provides the @dataclass decorator.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 482,
    question: 'What does @dataclass automatically generate?',
    options: ['Only __init__', '__init__, __repr__, and __eq__', 'All magic methods', 'Only __str__'],
    correctAnswer: 1,
    explanation: '@dataclass auto-generates __init__, __repr__, __eq__ and optionally others.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 483,
    question: 'What is the output of:\nfrom dataclasses import dataclass\n@dataclass\nclass Point:\n    x: int\n    y: int\np = Point(3, 4)\nprint(p)',
    options: ['<Point object>', 'Point(x=3, y=4)', '(3, 4)', 'Error'],
    correctAnswer: 1,
    explanation: '@dataclass generates a nice __repr__ that shows the class name and field values.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 484,
    question: 'How do you make a dataclass immutable (frozen)?',
    options: ['@dataclass(immutable=True)', '@dataclass(frozen=True)', '@frozen_dataclass', 'Use __slots__'],
    correctAnswer: 1,
    explanation: '@dataclass(frozen=True) makes instances immutable — they become hashable too.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 485,
    question: 'What is __post_init__ in a dataclass?',
    options: ['A destructor', 'A method called after __init__ for additional initialization', 'A class method', 'A validation hook only'],
    correctAnswer: 1,
    explanation: '__post_init__ is called after the auto-generated __init__ for extra setup or validation.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 486,
    question: 'What does @dataclass(order=True) enable?',
    options: ['Alphabetical attribute sorting', 'Comparison operators (<, >, <=, >=)', 'Dictionary ordering', 'Method ordering'],
    correctAnswer: 1,
    explanation: 'order=True generates __lt__, __le__, __gt__, __ge__ based on field order.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 487,
    question: 'What is the Enum class used for?',
    options: ['Enumerating lists', 'Creating a set of named constants', 'Counting iterations', 'Defining abstract classes'],
    correctAnswer: 1,
    explanation: 'Enum creates symbolic names bound to unique constant values.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 488,
    question: 'What is the output of:\nfrom enum import Enum\nclass Color(Enum):\n    RED = 1\n    GREEN = 2\nprint(Color.RED.value)',
    options: ['RED', '1', 'Color.RED', 'Error'],
    correctAnswer: 1,
    explanation: '.value returns the value of the enum member. Color.RED.value is 1.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 489,
    question: 'What is the output of:\nfrom enum import Enum\nclass Color(Enum):\n    RED = 1\n    GREEN = 2\nprint(Color.RED.name)',
    options: ['RED', '1', 'Color.RED', 'Error'],
    correctAnswer: 0,
    explanation: '.name returns the name of the enum member as a string.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 490,
    question: 'What is method chaining?',
    options: ['Calling multiple unrelated methods', 'Each method returns self so calls can be chained', 'Inheriting methods from multiple classes', 'Using decorators on methods'],
    correctAnswer: 1,
    explanation: 'Method chaining: each method returns self, allowing obj.method1().method2().method3().',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 491,
    question: 'What is the output of:\nclass Builder:\n    def __init__(self):\n        self.parts = []\n    def add(self, part):\n        self.parts.append(part)\n        return self\nb = Builder().add("a").add("b")\nprint(b.parts)',
    options: ["['a']", "['a', 'b']", 'Error', 'None'],
    correctAnswer: 1,
    explanation: 'Each add() returns self, enabling chaining. Both "a" and "b" are added.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 492,
    question: 'What is __init_subclass__ used for?',
    options: ['Initializing instances', 'Customizing subclass creation without a metaclass', 'Importing submodules', 'Creating abstract methods'],
    correctAnswer: 1,
    explanation: '__init_subclass__ is called when a class is subclassed, enabling validation or registration.',
    difficulty: 'advanced',
    chapter: 5
  },
  // ===== DESIGN PATTERNS & PRINCIPLES (93-100) =====
  {
    id: 493,
    question: 'What is the danger of mutable class attributes?',
    options: ['No danger', 'All instances share the same mutable object', 'They use too much memory', 'They prevent inheritance'],
    correctAnswer: 1,
    explanation: 'A mutable class attribute (like a list) is shared. Modifying it via one instance affects all.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 494,
    question: 'What is the output of:\nclass A:\n    items = []\na1 = A()\na2 = A()\na1.items.append(1)\nprint(a2.items)',
    options: ['[]', '[1]', 'Error', 'None'],
    correctAnswer: 1,
    explanation: 'items is a class attribute (shared list). Appending via a1 affects a2 as well.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 495,
    question: 'What does the "S" in SOLID stand for?',
    options: ['Simple Responsibility', 'Single Responsibility', 'Structured Responsibility', 'Shared Responsibility'],
    correctAnswer: 1,
    explanation: 'Single Responsibility Principle: a class should have only one reason to change.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 496,
    question: 'What is the Liskov Substitution Principle?',
    options: ['Lists should be substitutable for tuples', 'Subtypes should be substitutable for their base types', 'All classes need a substitute', 'Variables can change type'],
    correctAnswer: 1,
    explanation: 'LSP: objects of a subclass should be usable anywhere the parent class is expected.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 497,
    question: 'What design pattern ensures only one instance of a class exists?',
    options: ['Factory', 'Observer', 'Singleton', 'Adapter'],
    correctAnswer: 2,
    explanation: 'The Singleton pattern restricts a class to a single instance.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 498,
    question: 'What is the Factory pattern?',
    options: ['A class that creates objects without specifying the exact class', 'A class that makes copies', 'A pattern for deleting objects', 'A singleton variant'],
    correctAnswer: 0,
    explanation: 'Factory pattern creates objects through a common interface, hiding creation logic.',
    difficulty: 'intermediate',
    chapter: 5
  },
  {
    id: 499,
    question: 'What is the Observer pattern?',
    options: ['A debugging tool', 'Objects subscribe to events and are notified of changes', 'A way to observe memory usage', 'A testing pattern'],
    correctAnswer: 1,
    explanation: 'Observer pattern: subjects notify registered observers when state changes occur.',
    difficulty: 'advanced',
    chapter: 5
  },
  {
    id: 500,
    question: 'What is the key difference between abstract classes and interfaces in Python?',
    options: ['Python has both as separate concepts', 'Python uses abstract classes (via abc) since it has no formal interface keyword', 'Interfaces exist but abstract classes do not', 'They are completely identical'],
    correctAnswer: 1,
    explanation: 'Python has no interface keyword. Abstract base classes (abc module) serve the same purpose.',
    difficulty: 'advanced',
    chapter: 5
  }
];

export default chapter5Questions;
