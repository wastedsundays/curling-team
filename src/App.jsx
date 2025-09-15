import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/results" element={<h1>Results Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
