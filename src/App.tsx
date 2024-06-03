import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/login/SignUp'
import { AnimatePresence } from "framer-motion";
import NotFound from './pages/NotFound';
import Home from './pages/home/Home';
import Backoffice from './pages/backoffice/Backoffice';

function App() {
  
  return (
    <BrowserRouter>
      <AnimatePresence initial={false} mode={"wait"}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/backoffice" element={<Backoffice />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App
