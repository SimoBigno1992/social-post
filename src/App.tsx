import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/login/SignUp'
import NotFound from './pages/NotFound';
import Home from './pages/home/Home';
import Backoffice from './pages/backoffice/Backoffice';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
