import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useAuth, QuizHistoryEntry } from '../contexts/AuthContext';
import { getRandomPythonQuestions } from '../data/pythonQuestions';
import '../styles/Quiz.css';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  questions: Question[];
  subcategories?: QuizSubcategory[];
}

interface QuizSubcategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  questions: Question[];
  questionPoolSize?: number;
}

type QuizState = 'login' | 'categories' | 'subcategories' | 'quiz' | 'results';

const quizCategories: QuizCategory[] = [
  {
    id: 'technical',
    title: 'Technical',
    icon: '💻',
    description: 'Choose a technology and test your programming knowledge.',
    color: '#6366f1',
    questions: [],
    subcategories: [
      {
        id: 'csharp',
        title: 'C# .NET',
        icon: '🟣',
        description: 'C# language features, .NET framework, LINQ, async/await, and more.',
        color: '#512bd4',
        questions: [
          {
            id: 1,
            question: 'What is the default access modifier for a class in C#?',
            options: ['public', 'private', 'internal', 'protected'],
            correctAnswer: 2,
            explanation: 'In C#, the default access modifier for a top-level class is "internal", meaning it is accessible only within the same assembly.'
          },
          {
            id: 2,
            question: 'Which keyword is used to prevent a class from being inherited in C#?',
            options: ['static', 'sealed', 'abstract', 'readonly'],
            correctAnswer: 1,
            explanation: 'The "sealed" keyword prevents other classes from inheriting from that class.'
          },
          {
            id: 3,
            question: 'What does LINQ stand for?',
            options: [
              'Language Integrated Native Query',
              'Language Integrated Query',
              'Linked Integer Query',
              'Linear Integrated Queue'
            ],
            correctAnswer: 1,
            explanation: 'LINQ (Language Integrated Query) allows querying data from various sources using a consistent C# syntax.'
          },
          {
            id: 4,
            question: 'Which .NET type is used for immutable strings?',
            options: ['StringBuilder', 'string', 'StringBuffer', 'CharArray'],
            correctAnswer: 1,
            explanation: 'The "string" type in C# is immutable — any modification creates a new string object. StringBuilder is used for mutable strings.'
          },
          {
            id: 5,
            question: 'What does the "async" keyword do in C#?',
            options: [
              'Makes the method run on a separate thread',
              'Marks a method as asynchronous, enabling the use of await',
              'Pauses execution until a task completes',
              'Converts a method to a background task'
            ],
            correctAnswer: 1,
            explanation: 'The "async" modifier marks a method as asynchronous, allowing the use of "await" expressions within it for non-blocking operations.'
          },
          {
            id: 6,
            question: 'Which interface must be implemented to use "foreach" on a custom collection?',
            options: ['IComparable', 'IEnumerable', 'IDisposable', 'ICollection'],
            correctAnswer: 1,
            explanation: 'IEnumerable (or IEnumerable<T>) must be implemented to support iteration with foreach.'
          },
          {
            id: 7,
            question: 'What is dependency injection in .NET?',
            options: [
              'Injecting SQL queries into a database',
              'A design pattern where dependencies are provided to a class rather than created by it',
              'A way to inject JavaScript into .NET applications',
              'A method of adding NuGet packages at runtime'
            ],
            correctAnswer: 1,
            explanation: 'Dependency Injection (DI) is a design pattern where a class receives its dependencies from external sources rather than creating them internally.'
          },
          {
            id: 8,
            question: 'What is the difference between "==" and ".Equals()" in C#?',
            options: [
              'No difference, they are identical',
              '"==" compares references by default for objects; ".Equals()" compares values',
              '".Equals()" is faster than "=="',
              '"==" only works with strings'
            ],
            correctAnswer: 1,
            explanation: 'For reference types, "==" compares references by default, while ".Equals()" compares values. However, "==" is overloaded for string to compare values.'
          }
        ]
      },
      {
        id: 'python',
        title: 'Python',
        icon: '🐍',
        description: '50-question pool — Beginner, Intermediate & Advanced. 10 random questions each attempt!',
        color: '#3776ab',
        questionPoolSize: 50,
        questions: [
          {
            id: 1,
            question: 'What is the output of: list(range(0, 10, 3))?',
            options: ['[0, 3, 6, 9]', '[0, 3, 6]', '[3, 6, 9]', '[0, 1, 2, 3]'],
            correctAnswer: 0,
            explanation: 'range(0, 10, 3) generates numbers starting from 0, up to (but not including) 10, stepping by 3: 0, 3, 6, 9.'
          },
          {
            id: 2,
            question: 'Which keyword is used to create a generator function in Python?',
            options: ['return', 'yield', 'generate', 'async'],
            correctAnswer: 1,
            explanation: 'The "yield" keyword turns a function into a generator, producing values one at a time lazily.'
          },
          {
            id: 3,
            question: 'What does "self" represent in a Python class?',
            options: [
              'A reserved keyword for static methods',
              'The instance of the class',
              'The parent class',
              'A global variable'
            ],
            correctAnswer: 1,
            explanation: '"self" refers to the current instance of the class and is used to access instance attributes and methods.'
          },
          {
            id: 4,
            question: 'What is a Python decorator?',
            options: [
              'A comment that decorates code',
              'A function that modifies the behavior of another function',
              'A CSS-like styling system for Python',
              'A type of class constructor'
            ],
            correctAnswer: 1,
            explanation: 'A decorator is a function that wraps another function to extend or modify its behavior, using the @decorator syntax.'
          },
          {
            id: 5,
            question: 'Which data structure in Python is unordered and has unique elements?',
            options: ['list', 'tuple', 'set', 'dictionary'],
            correctAnswer: 2,
            explanation: 'A set is an unordered collection of unique elements. Duplicates are automatically removed.'
          },
          {
            id: 6,
            question: 'What does "pip" stand for?',
            options: [
              'Python Installation Package',
              'Pip Installs Packages',
              'Python Index Program',
              'Package Installation for Python'
            ],
            correctAnswer: 1,
            explanation: '"pip" is a recursive acronym for "Pip Installs Packages" — it is Python\'s standard package manager.'
          },
          {
            id: 7,
            question: 'What is the difference between a list and a tuple in Python?',
            options: [
              'Lists are faster than tuples',
              'Tuples are mutable, lists are immutable',
              'Lists are mutable, tuples are immutable',
              'There is no difference'
            ],
            correctAnswer: 2,
            explanation: 'Lists are mutable (can be changed), while tuples are immutable (cannot be modified after creation).'
          },
          {
            id: 8,
            question: 'What does the "__init__" method do in Python?',
            options: [
              'Destroys the object',
              'Initializes the object when created',
              'Imports modules',
              'Creates a static method'
            ],
            correctAnswer: 1,
            explanation: '__init__ is the constructor method in Python that is automatically called when a new instance of a class is created.'
          }
        ]
      },
      {
        id: 'powershell',
        title: 'PowerShell',
        icon: '⚡',
        description: 'PowerShell scripting, cmdlets, pipelines, and Windows automation.',
        color: '#012456',
        questions: [
          {
            id: 1,
            question: 'What symbol is used for variables in PowerShell?',
            options: ['@', '#', '$', '&'],
            correctAnswer: 2,
            explanation: 'In PowerShell, variables are prefixed with the dollar sign ($), e.g., $myVariable.'
          },
          {
            id: 2,
            question: 'What does the "|" (pipe) operator do in PowerShell?',
            options: [
              'Performs a logical OR',
              'Passes the output of one command as input to the next',
              'Concatenates strings',
              'Creates a new variable'
            ],
            correctAnswer: 1,
            explanation: 'The pipe operator passes objects from one command to the next in a pipeline, enabling powerful command chaining.'
          },
          {
            id: 3,
            question: 'Which cmdlet is used to get a list of running processes?',
            options: ['Get-Service', 'Get-Process', 'Get-Task', 'Get-Job'],
            correctAnswer: 1,
            explanation: 'Get-Process retrieves information about running processes on the local computer or remote machines.'
          },
          {
            id: 4,
            question: 'What is the PowerShell equivalent of "if-else" for pattern matching?',
            options: ['match', 'switch', 'case', 'select'],
            correctAnswer: 1,
            explanation: 'The "switch" statement in PowerShell is used for pattern matching, similar to switch/case in other languages but more powerful.'
          },
          {
            id: 5,
            question: 'How do you define a function in PowerShell?',
            options: [
              'def MyFunction()',
              'function MyFunction { }',
              'func MyFunction()',
              'create function MyFunction'
            ],
            correctAnswer: 1,
            explanation: 'Functions in PowerShell are defined with the "function" keyword followed by the name and a script block in curly braces.'
          },
          {
            id: 6,
            question: 'Which cmdlet exports data to a CSV file?',
            options: ['Write-CSV', 'Out-CSV', 'Export-Csv', 'Save-Csv'],
            correctAnswer: 2,
            explanation: 'Export-Csv converts objects into CSV strings and saves them to a file.'
          },
          {
            id: 7,
            question: 'What does "$_" represent in a PowerShell pipeline?',
            options: [
              'The last error',
              'The current object in the pipeline',
              'The script root path',
              'The null value'
            ],
            correctAnswer: 1,
            explanation: '$_ (or $PSItem) represents the current object being processed in the pipeline, commonly used in ForEach-Object and Where-Object.'
          },
          {
            id: 8,
            question: 'Which PowerShell command installs modules from the PowerShell Gallery?',
            options: ['Add-Module', 'Import-Module', 'Install-Module', 'Get-Module'],
            correctAnswer: 2,
            explanation: 'Install-Module downloads and installs modules from the PowerShell Gallery. Import-Module loads an already-installed module.'
          }
        ]
      },
      {
        id: 'sql',
        title: 'SQL',
        icon: '🗄️',
        description: 'SQL queries, joins, indexes, stored procedures, and database concepts.',
        color: '#cc2927',
        questions: [
          {
            id: 1,
            question: 'What does SQL stand for?',
            options: [
              'Structured Query Language',
              'Standard Query Logic',
              'Sequential Query Language',
              'System Query Loader'
            ],
            correctAnswer: 0,
            explanation: 'SQL stands for Structured Query Language, used to manage and manipulate relational databases.'
          },
          {
            id: 2,
            question: 'Which JOIN returns only matching rows from both tables?',
            options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL OUTER JOIN'],
            correctAnswer: 2,
            explanation: 'INNER JOIN returns only the rows where there is a match in both tables.'
          },
          {
            id: 3,
            question: 'What is a PRIMARY KEY?',
            options: [
              'A key used for encryption',
              'A column (or set of columns) that uniquely identifies each row',
              'The first column in a table',
              'A foreign reference to another table'
            ],
            correctAnswer: 1,
            explanation: 'A PRIMARY KEY is a constraint that uniquely identifies each record in a table. It must contain unique, non-null values.'
          },
          {
            id: 4,
            question: 'Which clause is used to filter groups in SQL?',
            options: ['WHERE', 'HAVING', 'GROUP BY', 'FILTER'],
            correctAnswer: 1,
            explanation: 'HAVING filters groups after GROUP BY aggregation, while WHERE filters individual rows before grouping.'
          },
          {
            id: 5,
            question: 'What is a stored procedure?',
            options: [
              'A temporary table',
              'A precompiled collection of SQL statements stored in the database',
              'A backup of the database',
              'A type of index'
            ],
            correctAnswer: 1,
            explanation: 'A stored procedure is a precompiled set of SQL statements that can be executed repeatedly, improving performance and reusability.'
          },
          {
            id: 6,
            question: 'What does the "DISTINCT" keyword do?',
            options: [
              'Sorts results alphabetically',
              'Removes duplicate rows from the result set',
              'Limits the number of results',
              'Joins two tables'
            ],
            correctAnswer: 1,
            explanation: 'DISTINCT removes duplicate rows from the query result, returning only unique values.'
          },
          {
            id: 7,
            question: 'Which SQL command is used to add a new row to a table?',
            options: ['UPDATE', 'INSERT INTO', 'ADD ROW', 'CREATE'],
            correctAnswer: 1,
            explanation: 'INSERT INTO is used to add new records (rows) to a table.'
          },
          {
            id: 8,
            question: 'What is an INDEX in SQL?',
            options: [
              'A list of table names',
              'A data structure that improves query performance by allowing faster lookups',
              'A primary key constraint',
              'A type of stored procedure'
            ],
            correctAnswer: 1,
            explanation: 'An index is a database object that speeds up data retrieval by creating a fast lookup structure, similar to a book\'s index.'
          }
        ]
      },
      {
        id: 'azure',
        title: 'Azure',
        icon: '☁️',
        description: 'Azure cloud services, App Service, DevOps, and cloud architecture.',
        color: '#0078d4',
        questions: [
          {
            id: 1,
            question: 'What is Azure App Service?',
            options: [
              'A virtual machine service',
              'A fully managed platform for building and hosting web apps',
              'A database service',
              'A content delivery network'
            ],
            correctAnswer: 1,
            explanation: 'Azure App Service is a fully managed PaaS for building, deploying, and scaling web apps, REST APIs, and mobile backends.'
          },
          {
            id: 2,
            question: 'What does "IaaS" stand for?',
            options: [
              'Internet as a Service',
              'Infrastructure as a Service',
              'Integration as a System',
              'Intelligent App Service'
            ],
            correctAnswer: 1,
            explanation: 'IaaS (Infrastructure as a Service) provides virtualized computing resources like VMs, storage, and networking on demand.'
          },
          {
            id: 3,
            question: 'Which Azure service is used for CI/CD pipelines?',
            options: ['Azure Functions', 'Azure DevOps', 'Azure Monitor', 'Azure Sentinel'],
            correctAnswer: 1,
            explanation: 'Azure DevOps provides CI/CD pipelines, repos, boards, test plans, and artifact management for software development.'
          },
          {
            id: 4,
            question: 'What is Azure Blob Storage primarily used for?',
            options: [
              'Running virtual machines',
              'Storing unstructured data like files, images, and videos',
              'Hosting SQL databases',
              'Managing DNS records'
            ],
            correctAnswer: 1,
            explanation: 'Azure Blob Storage is optimized for storing massive amounts of unstructured data such as documents, media files, and backups.'
          },
          {
            id: 5,
            question: 'What is a Resource Group in Azure?',
            options: [
              'A type of virtual network',
              'A logical container for Azure resources that share the same lifecycle',
              'A pricing tier',
              'A security group for users'
            ],
            correctAnswer: 1,
            explanation: 'A Resource Group is a logical container that holds related Azure resources for management, billing, and access control.'
          },
          {
            id: 6,
            question: 'Which Azure service provides serverless computing?',
            options: ['Azure VM', 'Azure Functions', 'Azure SQL', 'Azure AD'],
            correctAnswer: 1,
            explanation: 'Azure Functions is a serverless compute service that lets you run event-triggered code without managing infrastructure.'
          },
          {
            id: 7,
            question: 'What is Azure Active Directory (Azure AD)?',
            options: [
              'A file storage system',
              'A cloud-based identity and access management service',
              'A virtual network',
              'A monitoring tool'
            ],
            correctAnswer: 1,
            explanation: 'Azure AD (now Microsoft Entra ID) is a cloud-based identity and access management service for authentication and authorization.'
          },
          {
            id: 8,
            question: 'What is the Azure CLI?',
            options: [
              'A graphical portal for Azure',
              'A command-line tool for managing Azure resources',
              'A programming language',
              'A monitoring dashboard'
            ],
            correctAnswer: 1,
            explanation: 'Azure CLI is a cross-platform command-line tool for creating and managing Azure resources from the terminal.'
          }
        ]
      },
      {
        id: 'javascript',
        title: 'JavaScript',
        icon: '🟨',
        description: 'JS fundamentals, ES6+, closures, promises, and the event loop.',
        color: '#f7df1e',
        questions: [
          {
            id: 1,
            question: 'What is the output of: typeof null?',
            options: ['"null"', '"undefined"', '"object"', '"boolean"'],
            correctAnswer: 2,
            explanation: 'This is a well-known JavaScript quirk — typeof null returns "object" due to a legacy bug in the language.'
          },
          {
            id: 2,
            question: 'What does "===" do differently from "=="?',
            options: [
              'Nothing, they are the same',
              '"===" checks value and type without coercion',
              '"===" is slower',
              '"===" only works with numbers'
            ],
            correctAnswer: 1,
            explanation: '"===" (strict equality) checks both value and type without type coercion, while "==" performs type coercion before comparing.'
          },
          {
            id: 3,
            question: 'What is a Promise in JavaScript?',
            options: [
              'A guaranteed function return',
              'An object representing an eventual completion or failure of an async operation',
              'A type of loop',
              'A variable declaration'
            ],
            correctAnswer: 1,
            explanation: 'A Promise is an object representing the eventual result of an asynchronous operation — pending, fulfilled, or rejected.'
          },
          {
            id: 4,
            question: 'Which method converts a JSON string to a JavaScript object?',
            options: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.toObject()'],
            correctAnswer: 1,
            explanation: 'JSON.parse() parses a JSON string and returns the corresponding JavaScript object.'
          },
          {
            id: 5,
            question: 'What is the event loop in JavaScript?',
            options: [
              'A for loop that handles events',
              'A mechanism that allows JS to perform non-blocking operations on a single thread',
              'A method for looping through DOM events',
              'A recursive function pattern'
            ],
            correctAnswer: 1,
            explanation: 'The event loop allows JavaScript to handle asynchronous callbacks on a single thread by managing a call stack and callback queue.'
          },
          {
            id: 6,
            question: 'What does "let" provide that "var" does not?',
            options: [
              'Global scoping',
              'Block scoping',
              'Type safety',
              'Immutability'
            ],
            correctAnswer: 1,
            explanation: '"let" provides block-level scoping, while "var" is function-scoped and can lead to hoisting issues.'
          },
          {
            id: 7,
            question: 'What is the purpose of Array.prototype.reduce()?',
            options: [
              'Removes elements from an array',
              'Reduces the array to a single value by applying a function',
              'Filters the array',
              'Sorts the array in place'
            ],
            correctAnswer: 1,
            explanation: 'reduce() executes a reducer function on each element, accumulating a single output value — useful for sums, grouping, etc.'
          },
          {
            id: 8,
            question: 'What is "hoisting" in JavaScript?',
            options: [
              'Moving elements in the DOM',
              'The behavior of moving declarations to the top of their scope during compilation',
              'Lifting state in React',
              'Importing modules dynamically'
            ],
            correctAnswer: 1,
            explanation: 'Hoisting is JavaScript\'s behavior of moving variable and function declarations to the top of their scope before execution.'
          }
        ]
      }
    ]
  },
  {
    id: 'spiritual',
    title: 'Spiritual Wisdom',
    icon: '🧘',
    description: 'Explore your understanding of spiritual teachings, meditation, and ancient wisdom traditions.',
    color: '#8b5cf6',
    questions: [
      {
        id: 1,
        question: 'The Bhagavad Gita is a part of which ancient Indian epic?',
        options: ['Ramayana', 'Mahabharata', 'Vedas', 'Upanishads'],
        correctAnswer: 1,
        explanation: 'The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata.'
      },
      {
        id: 2,
        question: 'What does the Sanskrit word "Yoga" literally mean?',
        options: ['Exercise', 'Union', 'Peace', 'Flexibility'],
        correctAnswer: 1,
        explanation: 'Yoga comes from the Sanskrit root "yuj" meaning to yoke or unite, symbolizing the union of body, mind, and spirit.'
      },
      {
        id: 3,
        question: 'How many chapters are there in the Bhagavad Gita?',
        options: ['12', '15', '18', '21'],
        correctAnswer: 2,
        explanation: 'The Bhagavad Gita consists of 18 chapters, each representing a different yoga or path of spiritual wisdom.'
      },
      {
        id: 4,
        question: 'What is "Dharma" most closely translated to?',
        options: [
          'Religion',
          'Righteous duty or cosmic law',
          'Meditation practice',
          'Temple worship'
        ],
        correctAnswer: 1,
        explanation: 'Dharma encompasses righteous duty, moral law, and the cosmic order that maintains the universe.'
      },
      {
        id: 5,
        question: 'Who narrated the Bhagavad Gita to Arjuna?',
        options: ['Brahma', 'Shiva', 'Krishna', 'Vishnu'],
        correctAnswer: 2,
        explanation: 'Lord Krishna narrated the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra.'
      },
      {
        id: 6,
        question: 'What is the Eightfold Path associated with?',
        options: ['Hinduism', 'Buddhism', 'Jainism', 'Sikhism'],
        correctAnswer: 1,
        explanation: 'The Noble Eightfold Path is a core teaching of Buddhism, outlining the path to liberation from suffering.'
      },
      {
        id: 7,
        question: 'What does "Karma" literally mean?',
        options: ['Fate', 'Luck', 'Action', 'Punishment'],
        correctAnswer: 2,
        explanation: 'Karma literally means "action" or "deed" in Sanskrit. It refers to the principle that every action has consequences.'
      },
      {
        id: 8,
        question: 'Which of these is one of the four Vedas?',
        options: ['Bhagavad Gita', 'Rig Veda', 'Mahabharata', 'Ramayana'],
        correctAnswer: 1,
        explanation: 'The Rig Veda is one of the four Vedas, which are the oldest sacred texts of Hinduism. The four Vedas are Rig, Sama, Yajur, and Atharva.'
      }
    ]
  },
  {
    id: 'books',
    title: 'Books & Literature',
    icon: '📚',
    description: 'Challenge yourself with questions about famous books, authors, and literary concepts.',
    color: '#10b981',
    questions: [
      {
        id: 1,
        question: 'Who wrote "The Alchemist"?',
        options: ['Gabriel Garcia Marquez', 'Paulo Coelho', 'Jorge Luis Borges', 'Isabel Allende'],
        correctAnswer: 1,
        explanation: 'Paulo Coelho, a Brazilian author, wrote "The Alchemist" in 1988. It has become one of the best-selling books in history.'
      },
      {
        id: 2,
        question: '"Atomic Habits" was written by which author?',
        options: ['Cal Newport', 'James Clear', 'Charles Duhigg', 'BJ Fogg'],
        correctAnswer: 1,
        explanation: 'James Clear wrote "Atomic Habits," which explores how tiny changes in behavior can lead to remarkable results.'
      },
      {
        id: 3,
        question: 'Which book introduced the concept of "emotional intelligence"?',
        options: [
          'Thinking, Fast and Slow',
          'Emotional Intelligence by Daniel Goleman',
          'The Power of Now',
          'Mindset by Carol Dweck'
        ],
        correctAnswer: 1,
        explanation: 'Daniel Goleman\'s "Emotional Intelligence" (1995) popularized the concept and its importance in personal and professional success.'
      },
      {
        id: 4,
        question: 'Who wrote "Sapiens: A Brief History of Humankind"?',
        options: ['Jared Diamond', 'Yuval Noah Harari', 'Steven Pinker', 'Malcolm Gladwell'],
        correctAnswer: 1,
        explanation: 'Yuval Noah Harari, an Israeli historian, wrote "Sapiens" which explores the history of humankind from the Stone Age to the present.'
      },
      {
        id: 5,
        question: '"Clean Code" is a famous programming book by which author?',
        options: ['Martin Fowler', 'Robert C. Martin', 'Kent Beck', 'Donald Knuth'],
        correctAnswer: 1,
        explanation: 'Robert C. Martin (Uncle Bob) wrote "Clean Code: A Handbook of Agile Software Craftsmanship."'
      },
      {
        id: 6,
        question: 'Which book says "Be the change you wish to see in the world"?',
        options: [
          'The 7 Habits of Highly Effective People',
          'This is often attributed to Mahatma Gandhi',
          'The Art of War',
          'Man\'s Search for Meaning'
        ],
        correctAnswer: 1,
        explanation: 'This quote is commonly attributed to Mahatma Gandhi, though the exact phrasing is a paraphrase of his broader teachings.'
      },
      {
        id: 7,
        question: 'Who is the author of "Thinking, Fast and Slow"?',
        options: ['Dan Ariely', 'Daniel Kahneman', 'Nassim Taleb', 'Richard Thaler'],
        correctAnswer: 1,
        explanation: 'Daniel Kahneman, a Nobel Prize-winning psychologist, wrote "Thinking, Fast and Slow" about the two systems of thought.'
      },
      {
        id: 8,
        question: '"The Pragmatic Programmer" was co-authored by Andrew Hunt and who?',
        options: ['Robert C. Martin', 'David Thomas', 'Kent Beck', 'Martin Fowler'],
        correctAnswer: 1,
        explanation: 'David Thomas co-authored "The Pragmatic Programmer" with Andrew Hunt. It\'s a classic software development book.'
      }
    ]
  },
  {
    id: 'general',
    title: 'General Knowledge',
    icon: '🌍',
    description: 'A mix of fun and interesting questions spanning science, history, geography, and more.',
    color: '#f59e0b',
    questions: [
      {
        id: 1,
        question: 'Which planet is known as the "Red Planet"?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1,
        explanation: 'Mars is called the Red Planet because of iron oxide (rust) on its surface, giving it a reddish appearance.'
      },
      {
        id: 2,
        question: 'What is the smallest unit of matter?',
        options: ['Molecule', 'Cell', 'Atom', 'Quark'],
        correctAnswer: 3,
        explanation: 'Quarks are the smallest known fundamental particles. They combine to form protons and neutrons within atoms.'
      },
      {
        id: 3,
        question: 'Which country has the most natural languages spoken?',
        options: ['India', 'Papua New Guinea', 'Indonesia', 'Nigeria'],
        correctAnswer: 1,
        explanation: 'Papua New Guinea has over 840 living languages, making it the most linguistically diverse country on Earth.'
      },
      {
        id: 4,
        question: 'What year was the World Wide Web invented?',
        options: ['1985', '1989', '1993', '1995'],
        correctAnswer: 1,
        explanation: 'Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN.'
      },
      {
        id: 5,
        question: 'Which element has the chemical symbol "Au"?',
        options: ['Silver', 'Aluminum', 'Gold', 'Argon'],
        correctAnswer: 2,
        explanation: 'Au comes from the Latin word "Aurum" meaning gold. It has been a precious metal throughout human history.'
      },
      {
        id: 6,
        question: 'How many bones does an adult human body have?',
        options: ['186', '206', '226', '256'],
        correctAnswer: 1,
        explanation: 'An adult human body has 206 bones. Babies are born with about 270 bones, some of which fuse together as they grow.'
      },
      {
        id: 7,
        question: 'What is the longest river in the world?',
        options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        correctAnswer: 1,
        explanation: 'The Nile River, stretching about 6,650 km through northeastern Africa, is traditionally considered the longest river in the world.'
      },
      {
        id: 8,
        question: 'Which mathematician is known as the "Father of Geometry"?',
        options: ['Pythagoras', 'Euclid', 'Archimedes', 'Aristotle'],
        correctAnswer: 1,
        explanation: 'Euclid, an ancient Greek mathematician, is known as the "Father of Geometry" for his work "Elements."'
      }
    ]
  }
];

const Quiz: React.FC = () => {
  const { user, loading, firebaseAvailable, signInWithGoogle, signInWithMicrosoft, logout, quizHistory, addQuizHistory, clearHistory } = useAuth();
  const [quizState, setQuizState] = useState<QuizState>(firebaseAvailable ? 'login' : 'categories');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [selectedParentCategory, setSelectedParentCategory] = useState<QuizCategory | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [authError, setAuthError] = useState<string>('');
  const [showHistory, setShowHistory] = useState(false);

  // Timer state
  const QUESTION_TIME_LIMIT = 30; // seconds per question
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start/reset timer when question changes or quiz starts
  useEffect(() => {
    if (quizState !== 'quiz') return;
    setTimeLeft(QUESTION_TIME_LIMIT);
    setTimedOut(false);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex, quizState]);

  // Handle timeout — auto-reveal answer
  useEffect(() => {
    if (timeLeft === 0 && quizState === 'quiz' && !showExplanation) {
      setTimedOut(true);
      setShowExplanation(true);
      // Mark as unanswered (null stays in selectedAnswers)
    }
  }, [timeLeft, quizState, showExplanation]);

  // Stop timer when answer is selected
  useEffect(() => {
    if (showExplanation && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [showExplanation]);

  // Redirect to categories if already logged in (only when Firebase is configured)
  React.useEffect(() => {
    if (!firebaseAvailable) {
      if (quizState === 'login') setQuizState('categories');
      return;
    }
    if (user && quizState === 'login') {
      setQuizState('categories');
    }
    if (!user && !loading && quizState !== 'login') {
      setQuizState('login');
    }
  }, [user, loading, quizState, firebaseAvailable]);

  const getFriendlyAuthError = (error: any): string => {
    const code = error?.code || '';
    if (code === 'auth/configuration-not-found') {
      return 'This sign-in provider is not enabled yet. Please enable it in Firebase Console → Authentication → Sign-in method.';
    }
    if (code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') {
      return 'Firebase API key is invalid. Please check your .env configuration.';
    }
    if (code === 'auth/popup-closed-by-user') {
      return 'Sign-in was cancelled. Please try again.';
    }
    if (code === 'auth/popup-blocked') {
      return 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
    }
    if (code === 'auth/network-request-failed') {
      return 'Network error. Please check your internet connection and try again.';
    }
    return error?.message || 'Sign-in failed. Please try again.';
  };

  const handleGoogleSignIn = async () => {
    setAuthError('');
    try {
      await signInWithGoogle();
    } catch (error: any) {
      setAuthError(getFriendlyAuthError(error));
    }
  };

  const handleMicrosoftSignIn = async () => {
    setAuthError('');
    try {
      await signInWithMicrosoft();
    } catch (error: any) {
      setAuthError(getFriendlyAuthError(error));
    }
  };

  const handleLogout = async () => {
    await logout();
    setQuizState('login');
  };

  const startQuiz = useCallback((category: QuizCategory | QuizSubcategory) => {
    let quizCategory = { ...category } as QuizCategory;

    // If this is the Python subcategory with a question pool, randomly select 10
    if (category.id === 'python' && (category as QuizSubcategory).questionPoolSize) {
      const randomQuestions = getRandomPythonQuestions(10);
      quizCategory = { ...category, questions: randomQuestions } as QuizCategory;
    }

    setSelectedCategory(quizCategory);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(quizCategory.questions.length).fill(null));
    setShowExplanation(false);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setTimedOut(false);
    setQuizState('quiz');
  }, []);

  const handleCategoryClick = useCallback((category: QuizCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setSelectedParentCategory(category);
      setQuizState('subcategories');
    } else {
      startQuiz(category);
    }
  }, [startQuiz]);

  const selectAnswer = useCallback((answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => {
      const updated = [...prev];
      updated[currentQuestionIndex] = answerIndex;
      return updated;
    });
    setShowExplanation(true);
  }, [showExplanation, currentQuestionIndex]);

  const nextQuestion = useCallback(() => {
    if (!selectedCategory) return;
    setShowExplanation(false);
    setTimedOut(false);
    if (currentQuestionIndex < selectedCategory.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Save to history before showing results
      const score = selectedCategory.questions.reduce((s, q, i) => {
        return s + (selectedAnswers[i] === q.correctAnswer ? 1 : 0);
      }, 0);
      addQuizHistory({
        categoryId: selectedCategory.id,
        categoryTitle: selectedCategory.title,
        categoryIcon: selectedCategory.icon,
        score,
        totalQuestions: selectedCategory.questions.length,
        percentage: Math.round((score / selectedCategory.questions.length) * 100),
      });
      setQuizState('results');
    }
  }, [selectedCategory, currentQuestionIndex, selectedAnswers, addQuizHistory]);

  const goBackToCategories = useCallback(() => {
    setQuizState('categories');
    setSelectedCategory(null);
    setSelectedParentCategory(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowExplanation(false);
  }, []);

  const goBackToSubcategories = useCallback(() => {
    setQuizState('subcategories');
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowExplanation(false);
  }, []);

  const retryQuiz = useCallback(() => {
    if (selectedCategory) {
      startQuiz(selectedCategory);
    }
  }, [selectedCategory, startQuiz]);

  const getScore = (): number => {
    if (!selectedCategory) return 0;
    return selectedCategory.questions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScorePercentage = (): number => {
    if (!selectedCategory) return 0;
    return Math.round((getScore() / selectedCategory.questions.length) * 100);
  };

  const getResultMessage = (): { emoji: string; title: string; message: string } => {
    const percentage = getScorePercentage();
    if (percentage === 100) return { emoji: '🏆', title: 'Perfect Score!', message: 'Outstanding! You\'re a true expert!' };
    if (percentage >= 75) return { emoji: '🌟', title: 'Excellent!', message: 'Great job! You really know your stuff!' };
    if (percentage >= 50) return { emoji: '👍', title: 'Good Effort!', message: 'Not bad! Keep learning and you\'ll improve!' };
    if (percentage >= 25) return { emoji: '📖', title: 'Keep Learning!', message: 'There\'s room for improvement. Don\'t give up!' };
    return { emoji: '💪', title: 'Don\'t Give Up!', message: 'Every expert was once a beginner. Try again!' };
  };

  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getUserDisplayName = (): string => {
    if (!user) return '';
    return user.displayName || user.email || 'User';
  };

  const getUserPhoto = (): string | null => {
    return user?.photoURL || null;
  };

  // User bar shown during quiz and categories (only when logged in)
  const renderUserBar = () => {
    if (!firebaseAvailable || !user) return null;
    return (
      <div className="quiz-user-bar">
        <div className="user-info-row">
          {getUserPhoto() ? (
            <img src={getUserPhoto()!} alt="Avatar" className="user-avatar" referrerPolicy="no-referrer" />
          ) : (
            <div className="user-avatar-placeholder">
              {getUserDisplayName().charAt(0).toUpperCase()}
            </div>
          )}
          <div className="user-details">
            <span className="user-name">{getUserDisplayName()}</span>
            {user?.email && <span className="user-email">{user.email}</span>}
          </div>
        </div>
        <div className="user-actions">
          <button
            className="history-toggle-btn"
            onClick={() => setShowHistory(!showHistory)}
            title="Quiz History"
          >
            📊 History {quizHistory.length > 0 && <span className="history-badge">{quizHistory.length}</span>}
          </button>
          <button className="logout-btn" onClick={handleLogout} title="Sign Out">
            Sign Out
          </button>
        </div>
      </div>
    );
  };

  // History sidebar/panel
  const renderHistoryPanel = () => (
    <div className={`history-panel ${showHistory ? 'open' : ''}`}>
      <div className="history-panel-header">
        <h3>📊 Quiz History</h3>
        <button className="history-close-btn" onClick={() => setShowHistory(false)}>✕</button>
      </div>
      {quizHistory.length === 0 ? (
        <div className="history-empty">
          <span className="history-empty-icon">📝</span>
          <p>No quizzes completed yet.</p>
          <p className="history-empty-sub">Take a quiz to see your results here!</p>
        </div>
      ) : (
        <>
          <div className="history-stats">
            <div className="history-stat">
              <span className="stat-number">{quizHistory.length}</span>
              <span className="stat-label">Quizzes Taken</span>
            </div>
            <div className="history-stat">
              <span className="stat-number">
                {Math.round(quizHistory.reduce((sum, h) => sum + h.percentage, 0) / quizHistory.length)}%
              </span>
              <span className="stat-label">Avg Score</span>
            </div>
            <div className="history-stat">
              <span className="stat-number">
                {Math.max(...quizHistory.map(h => h.percentage))}%
              </span>
              <span className="stat-label">Best Score</span>
            </div>
          </div>
          <div className="history-list">
            {quizHistory.map((entry) => (
              <div key={entry.id} className="history-entry">
                <div className="history-entry-icon">{entry.categoryIcon}</div>
                <div className="history-entry-info">
                  <span className="history-entry-title">{entry.categoryTitle}</span>
                  <span className="history-entry-date">{formatDate(entry.completedAt)}</span>
                </div>
                <div className={`history-entry-score ${entry.percentage >= 75 ? 'great' : entry.percentage >= 50 ? 'good' : 'low'}`}>
                  {entry.score}/{entry.totalQuestions}
                  <span className="history-entry-pct">{entry.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          <button className="clear-history-btn" onClick={clearHistory}>
            🗑️ Clear History
          </button>
        </>
      )}
    </div>
  );

  // Login Screen
  const renderLogin = () => (
    <div className="quiz-login-view">
      <div className="login-card">
        <div className="login-icon">🧩</div>
        <h1>Quiz Challenge</h1>
        <p className="login-subtitle">
          Sign in to start taking quizzes, track your scores, and view your history.
        </p>

        {authError && (
          <div className="auth-error">
            <span>⚠️</span> {authError}
          </div>
        )}

        <div className="login-buttons">
          <button className="login-btn google-btn" onClick={handleGoogleSignIn}>
            <svg className="login-provider-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>

          <button className="login-btn microsoft-btn" onClick={handleMicrosoftSignIn}>
            <svg className="login-provider-icon" viewBox="0 0 24 24" width="20" height="20">
              <rect fill="#F25022" x="1" y="1" width="10" height="10"/>
              <rect fill="#7FBA00" x="13" y="1" width="10" height="10"/>
              <rect fill="#00A4EF" x="1" y="13" width="10" height="10"/>
              <rect fill="#FFB900" x="13" y="13" width="10" height="10"/>
            </svg>
            Sign in with Microsoft
          </button>
        </div>

        <p className="login-note">
          🔒 We only use your name and email for the quiz experience. No data is shared externally.
        </p>
      </div>
    </div>
  );

  // Category Selection Screen
  const renderCategories = () => (
    <div className="quiz-categories-view">
      {renderUserBar()}

      <section className="quiz-hero">
        <h1>Quiz Challenge</h1>
        <p className="lead">
          {user
            ? <>Welcome, <strong>{getUserDisplayName()}</strong>! Choose a category and test your knowledge.</>
            : <>Choose a category and test your knowledge! Each quiz has 8 questions with instant feedback.</>
          }
        </p>
      </section>

      <div className="quiz-main-area">
        <div className="categories-grid">
          {quizCategories.map(category => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
              style={{ '--category-color': category.color } as React.CSSProperties}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <div className="category-meta">
                {category.subcategories ? (
                  <>
                    <span className="question-count">{category.subcategories.length} Topics</span>
                    <span className="start-label">Choose Topic →</span>
                  </>
                ) : (
                  <>
                    <span className="question-count">{category.questions.length} Questions</span>
                    <span className="start-label">Start Quiz →</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {renderHistoryPanel()}
      {showHistory && <div className="history-overlay" onClick={() => setShowHistory(false)} />}
    </div>
  );

  // Subcategory Selection Screen (for Technical)
  const renderSubcategories = () => {
    if (!selectedParentCategory || !selectedParentCategory.subcategories) return null;
    return (
      <div className="quiz-subcategories-view">
        {renderUserBar()}

        <div className="subcategories-header">
          <button className="back-btn" onClick={goBackToCategories}>
            ← All Categories
          </button>
        </div>

        <section className="quiz-hero">
          <h1>{selectedParentCategory.icon} {selectedParentCategory.title}</h1>
          <p className="lead">Choose a technology to test your knowledge</p>
        </section>

        <div className="quiz-main-area">
          <div className="subcategories-grid">
            {selectedParentCategory.subcategories.map(sub => (
              <div
                key={sub.id}
                className="subcategory-card"
                onClick={() => startQuiz(sub)}
                style={{ '--category-color': sub.color } as React.CSSProperties}
              >
                <div className="subcategory-icon">{sub.icon}</div>
                <div className="subcategory-info">
                  <h3>{sub.title}</h3>
                  <p>{sub.description}</p>
                </div>
                <div className="subcategory-meta">
                  {sub.questionPoolSize ? (
                    <span className="question-count">🎲 {sub.questionPoolSize} Pool • 10 per quiz</span>
                  ) : (
                    <span className="question-count">{sub.questions.length} Questions</span>
                  )}
                  <span className="start-label">Start →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {renderHistoryPanel()}
        {showHistory && <div className="history-overlay" onClick={() => setShowHistory(false)} />}
      </div>
    );
  };

  // Active Quiz Screen
  const renderQuiz = () => {
    if (!selectedCategory) return null;
    const question = selectedCategory.questions[currentQuestionIndex];
    const selectedAnswer = selectedAnswers[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedCategory.questions.length) * 100;

    return (
      <div className="quiz-active-view">
        {renderUserBar()}

        <div className="quiz-header-bar">
          <button className="back-btn" onClick={selectedParentCategory ? goBackToSubcategories : goBackToCategories}>
            ← {selectedParentCategory ? selectedParentCategory.title : 'Categories'}
          </button>
          <div className="quiz-info">
            <span className="category-badge" style={{ backgroundColor: selectedCategory.color }}>
              {selectedCategory.icon} {selectedCategory.title}
            </span>
          </div>
          <span className="question-counter">
            {currentQuestionIndex + 1} / {selectedCategory.questions.length}
          </span>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%`, backgroundColor: selectedCategory.color }}
          />
        </div>

        <div className="timer-section">
          <div className="timer-bar-container">
            <div
              className={`timer-bar-fill ${timeLeft <= 10 ? 'danger' : timeLeft <= 20 ? 'warning' : ''}`}
              style={{ width: `${(timeLeft / QUESTION_TIME_LIMIT) * 100}%` }}
            />
          </div>
          <div className={`timer-display ${timeLeft <= 10 ? 'danger' : timeLeft <= 20 ? 'warning' : ''}`}>
            <svg className="timer-ring" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="17" className="timer-ring-bg" />
              <circle
                cx="20" cy="20" r="17"
                className="timer-ring-fill"
                style={{
                  strokeDasharray: `${(timeLeft / QUESTION_TIME_LIMIT) * 106.81} 106.81`,
                }}
              />
            </svg>
            <span className="timer-text">{timeLeft}</span>
          </div>
        </div>

        <div className="question-card">
          <h2 className="question-text">{question.question}</h2>
          <div className="options-list">
            {question.options.map((option, index) => {
              let optionClass = 'option-btn';
              if (showExplanation) {
                if (index === question.correctAnswer) {
                  optionClass += ' correct';
                } else if (index === selectedAnswer && index !== question.correctAnswer) {
                  optionClass += ' incorrect';
                } else {
                  optionClass += ' dimmed';
                }
              } else if (selectedAnswer === index) {
                optionClass += ' selected';
              }

              return (
                <button
                  key={index}
                  className={optionClass}
                  onClick={() => selectAnswer(index)}
                  disabled={showExplanation}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-text">{option}</span>
                  {showExplanation && index === question.correctAnswer && (
                    <span className="option-icon">✓</span>
                  )}
                  {showExplanation && index === selectedAnswer && index !== question.correctAnswer && (
                    <span className="option-icon">✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={`explanation-box ${timedOut ? 'timeout' : selectedAnswer === question.correctAnswer ? 'correct' : 'incorrect'}`}>
              <div className="explanation-header">
                {timedOut ? '⏰ Time\'s Up!' : selectedAnswer === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
              </div>
              <p>{question.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <button className="next-btn" onClick={nextQuestion}>
              {currentQuestionIndex < selectedCategory.questions.length - 1
                ? 'Next Question →'
                : 'See Results 🎉'}
            </button>
          )}
        </div>

        {renderHistoryPanel()}
        {showHistory && <div className="history-overlay" onClick={() => setShowHistory(false)} />}
      </div>
    );
  };

  // Results Screen
  const renderResults = () => {
    if (!selectedCategory) return null;
    const score = getScore();
    const percentage = getScorePercentage();
    const result = getResultMessage();

    return (
      <div className="quiz-results-view">
        {renderUserBar()}

        <div className="results-card">
          <div className="results-emoji">{result.emoji}</div>
          <h1>{result.title}</h1>
          <p className="results-message">{result.message}</p>

          <div className="score-circle-container">
            <div className="score-circle" style={{ '--score-color': selectedCategory.color } as React.CSSProperties}>
              <svg viewBox="0 0 120 120" className="score-ring">
                <circle cx="60" cy="60" r="54" className="score-ring-bg" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  className="score-ring-fill"
                  style={{
                    strokeDasharray: `${(percentage / 100) * 339.292} 339.292`,
                    stroke: selectedCategory.color
                  }}
                />
              </svg>
              <div className="score-text">
                <span className="score-number">{percentage}%</span>
                <span className="score-detail">{score}/{selectedCategory.questions.length}</span>
              </div>
            </div>
          </div>

          <div className="results-breakdown">
            <h2>Question Breakdown</h2>
            <div className="breakdown-list">
              {selectedCategory.questions.map((question, index) => {
                const wasAnswered = selectedAnswers[index] !== null;
                const isCorrect = selectedAnswers[index] === question.correctAnswer;
                const isTimedOut = !wasAnswered;
                return (
                  <div key={index} className={`breakdown-item ${isCorrect ? 'correct' : isTimedOut ? 'timeout' : 'incorrect'}`}>
                    <div className="breakdown-status">
                      {isCorrect ? '✅' : isTimedOut ? '⏰' : '❌'}
                    </div>
                    <div className="breakdown-content">
                      <p className="breakdown-question">Q{index + 1}: {question.question}</p>
                      {!isCorrect && (
                        <p className="breakdown-answer">
                          {isTimedOut ? 'Time ran out! ' : ''}Correct answer: <strong>{question.options[question.correctAnswer]}</strong>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="results-actions">
            <button className="retry-btn" onClick={retryQuiz}>
              🔄 Retry Quiz
            </button>
            <button className="categories-btn" onClick={goBackToCategories}>
              📋 All Categories
            </button>
          </div>
        </div>

        {renderHistoryPanel()}
        {showHistory && <div className="history-overlay" onClick={() => setShowHistory(false)} />}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="quiz-page">
        <div className="container">
          <div className="quiz-loading">
            <div className="loading-spinner" />
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="container">
        {quizState === 'login' && renderLogin()}
        {quizState === 'categories' && renderCategories()}
        {quizState === 'subcategories' && renderSubcategories()}
        {quizState === 'quiz' && renderQuiz()}
        {quizState === 'results' && renderResults()}
      </div>
    </div>
  );
};

export default Quiz;
