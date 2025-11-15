import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutMe from './pages/AboutMe';
import Technical from './pages/Technical';
import Spiritual from './pages/Spiritual';
import Friends from './pages/Friends';
import ContactUs from './pages/ContactUs';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/technical" element={<Technical />} />
            <Route path="/spiritual" element={<Spiritual />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;