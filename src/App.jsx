import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TermsPage from './pages/TermsPage'
import SignupPage from './pages/SignupPage'
import SignupContactPage from './pages/SignupContactPage'
import SignupCategoriesPage from './pages/SignupCategoriesPage'
import SignupCompletePage from './pages/SignupCompletePage'
import SellPage from './pages/SellPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup-contact" element={<SignupContactPage />} />
        <Route path="/signup-categories" element={<SignupCategoriesPage />} />
        <Route path="/signup-complete" element={<SignupCompletePage />} />
        <Route path="/sell" element={<SellPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

