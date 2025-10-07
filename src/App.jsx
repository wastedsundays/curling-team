import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './styles/global-styles.css';
import './styles/section-styles.css';


import Header from './components/Header/Header'
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ResultsPage from './pages/ResultsPage'
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer'

function App() {

  return (
    <Router basename='/slidefamilycurling'>
      <div className="App">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
