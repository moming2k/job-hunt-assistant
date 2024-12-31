import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <Router>
      {/* Container for the entire layout */}
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="p-4 bg-gray-800 shadow-md flex items-center justify-between text-white">
          <div className="text-lg font-semibold">
            My App
          </div>
          <div>
            <Link to="/" className="mr-4 hover:text-gray-300">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
          </div>
        </nav>
        {/* Main content area flex-grow so it expands */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>

        {/* Simple footer */}
        <footer className="bg-gray-200 p-4 text-center text-gray-700 mt-auto">
          © {new Date().getFullYear()} My Awesome App
        </footer>
      </div>
    </Router>
  )
}

export default App