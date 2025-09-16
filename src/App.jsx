import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

import Header from './components/Header/Header'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ResultsPage from './pages/ResultsPage'

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
