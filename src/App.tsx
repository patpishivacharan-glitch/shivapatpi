import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutMe from './pages/AboutMe';
import Technical from './pages/Technical';
import Spiritual from './pages/Spiritual';
import Friends from './pages/Friends';
import Books from './pages/Books';
import ContactUs from './pages/ContactUs';
import Quiz from './pages/Quiz';
import './styles/App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutMe />} />
              <Route path="/technical" element={<Technical />} />
              <Route path="/spiritual" element={<Spiritual />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/books" element={<Books />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/quiz" element={<Quiz />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;