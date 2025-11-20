import React, { useState } from 'react';
import '../styles/Books.css';

interface Book {
  id: number;
  bookName: string;
  bookAuthor: string;
  type: 'Technical' | 'Spiritual';
  author: string;
  readUrl?: string;
  downloadUrl?: string;
  uploadDate: string;
  fileSize?: string;
}

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      bookName: "Clean Code: A Handbook of Agile Software Craftsmanship",
      bookAuthor: "Robert C. Martin",
      type: "Technical",
      author: "Uncle Bob",
      readUrl: "#",
      downloadUrl: "#",
      uploadDate: "2024-01-15",
      fileSize: "2.4 MB"
    },
    {
      id: 2,
      bookName: "The Power of Now",
      bookAuthor: "Eckhart Tolle",
      type: "Spiritual",
      author: "Eckhart Tolle",
      readUrl: "#",
      downloadUrl: "#",
      uploadDate: "2024-02-10",
      fileSize: "1.8 MB"
    },
    {
      id: 3,
      bookName: "Design Patterns: Elements of Reusable Object-Oriented Software",
      bookAuthor: "Gang of Four",
      type: "Technical",
      author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
      readUrl: "#",
      downloadUrl: "#",
      uploadDate: "2024-03-05",
      fileSize: "3.2 MB"
    },
    {
      id: 4,
      bookName: "Bhagavad Gita As It Is",
      bookAuthor: "A.C. Bhaktivedanta Swami Prabhupada",
      type: "Spiritual",
      author: "Srila Prabhupada",
      readUrl: "#",
      downloadUrl: "#",
      uploadDate: "2024-03-20",
      fileSize: "4.1 MB"
    },
    {
      id: 5,
      bookName: "JavaScript: The Good Parts",
      bookAuthor: "Douglas Crockford",
      type: "Technical",
      author: "Douglas Crockford",
      readUrl: "#",
      downloadUrl: "#",
      uploadDate: "2024-04-08",
      fileSize: "1.2 MB"
    },
    {
      id: 6,
      bookName: "The Alchemist",
      bookAuthor: "Paulo Coelho",
      type: "Spiritual",
      author: "Paulo Coelho",
      readUrl: "#",
      downloadUrl: "#",
      uploadDate: "2024-04-15",
      fileSize: "980 KB"
    },
    {
      id: 7,
      bookName: "React: Up & Running",
      bookAuthor: "Stoyan Stefanov",
      type: "Technical",
      author: "Stoyan Stefanov",
      readUrl: "#",
      downloadUrl: "#",
      uploadDate: "2024-05-01",
      fileSize: "2.8 MB"
    },
    {
      id: 8,
      bookName: "Meditation and Its Methods",
      bookAuthor: "Swami Vivekananda",
      type: "Spiritual",
      author: "Swami Vivekananda",
      readUrl: "#",
      downloadUrl: "#",
      uploadDate: "2024-05-12",
      fileSize: "1.5 MB"
    }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filterType, setFilterType] = useState<'All' | 'Technical' | 'Spiritual'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [newBook, setNewBook] = useState({
    bookName: '',
    bookAuthor: '',
    type: 'Technical' as 'Technical' | 'Spiritual',
    author: '',
    file: null as File | null
  });

  const filteredBooks = books.filter(book => {
    const matchesFilter = filterType === 'All' || book.type === filterType;
    const matchesSearch = book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewBook({ ...newBook, file });
    }
  };

  const handleUploadBook = () => {
    if (newBook.bookName && newBook.bookAuthor && newBook.author && newBook.file) {
      const book: Book = {
        id: books.length + 1,
        bookName: newBook.bookName,
        bookAuthor: newBook.bookAuthor,
        type: newBook.type,
        author: newBook.author,
        readUrl: "#",
        downloadUrl: "#",
        uploadDate: new Date().toISOString().split('T')[0],
        fileSize: `${(newBook.file.size / (1024 * 1024)).toFixed(1)} MB`
      };
      setBooks([...books, book]);
      setNewBook({ bookName: '', bookAuthor: '', type: 'Technical', author: '', file: null });
      setShowUploadModal(false);
    }
  };

  const handleReadBook = (book: Book) => {
    // In a real app, this would open a PDF viewer or external link
    alert(`Opening "${book.bookName}" for reading...`);
  };

  const handleDownloadBook = (book: Book) => {
    // In a real app, this would trigger a file download
    alert(`Downloading "${book.bookName}"...`);
  };

  return (
    <div className="books-page">
      <div className="container">
        <section className="books-hero">
          <h1>Digital Library</h1>
          <p className="lead">
            Explore a curated collection of technical and spiritual books. 
            Read online or download for offline reading.
          </p>
        </section>

        <section className="books-controls">
          <div className="controls-row">
            <div className="search-filter-group">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search books, authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'All' | 'Technical' | 'Spiritual')}
                className="filter-select"
              >
                <option value="All">All Categories</option>
                <option value="Technical">Technical</option>
                <option value="Spiritual">Spiritual</option>
              </select>
            </div>
            
            <button
              className="upload-btn"
              onClick={() => setShowUploadModal(true)}
            >
              📚 Upload Book
            </button>
          </div>
          
          <div className="books-count">
            Showing {filteredBooks.length} of {books.length} books
          </div>
        </section>

        <section className="books-table-section">
          <div className="table-container">
            <table className="books-table">
              <thead>
                <tr>
                  <th>Book ID</th>
                  <th>Book Name</th>
                  <th>Book Author</th>
                  <th>Type</th>
                  <th>Uploaded By</th>
                  <th>Upload Date</th>
                  <th>File Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="book-row">
                    <td className="book-id">#{book.id.toString().padStart(3, '0')}</td>
                    <td className="book-name">
                      <div className="book-title">{book.bookName}</div>
                    </td>
                    <td className="book-author">{book.bookAuthor}</td>
                    <td className="book-type">
                      <span className={`type-badge ${book.type.toLowerCase()}`}>
                        {book.type === 'Technical' ? '💻' : '🕉️'} {book.type}
                      </span>
                    </td>
                    <td className="book-uploader">{book.author}</td>
                    <td className="upload-date">{book.uploadDate}</td>
                    <td className="file-size">{book.fileSize}</td>
                    <td className="book-actions">
                      <div className="action-buttons">
                        <button
                          className="action-btn read-btn"
                          onClick={() => handleReadBook(book)}
                          title="Read in Browser"
                        >
                          👁️ Read
                        </button>
                        <button
                          className="action-btn download-btn"
                          onClick={() => handleDownloadBook(book)}
                          title="Download Book"
                        >
                          ⬇️ Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="upload-modal-overlay" onClick={() => setShowUploadModal(false)}>
            <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Upload New Book</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowUploadModal(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="modal-body">
                <div className="form-group">
                  <label>Book Name *</label>
                  <input
                    type="text"
                    value={newBook.bookName}
                    onChange={(e) => setNewBook({ ...newBook, bookName: e.target.value })}
                    placeholder="Enter book title"
                  />
                </div>
                
                <div className="form-group">
                  <label>Book Author *</label>
                  <input
                    type="text"
                    value={newBook.bookAuthor}
                    onChange={(e) => setNewBook({ ...newBook, bookAuthor: e.target.value })}
                    placeholder="Enter author name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={newBook.type}
                    onChange={(e) => setNewBook({ ...newBook, type: e.target.value as 'Technical' | 'Spiritual' })}
                  >
                    <option value="Technical">Technical</option>
                    <option value="Spiritual">Spiritual</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Uploaded By *</label>
                  <input
                    type="text"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    placeholder="Your name or organization"
                  />
                </div>
                
                <div className="form-group">
                  <label>Book File *</label>
                  <input
                    type="file"
                    accept=".pdf,.epub,.mobi"
                    onChange={handleFileUpload}
                    className="file-input"
                  />
                  <small>Supported formats: PDF, EPUB, MOBI (Max 10MB)</small>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleUploadBook}
                  disabled={!newBook.bookName || !newBook.bookAuthor || !newBook.author || !newBook.file}
                >
                  Upload Book
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;