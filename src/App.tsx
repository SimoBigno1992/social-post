import { Navigate, Route, Routes as RoutesD, HashRouter } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/login/SignUp'
import { AnimatePresence } from "framer-motion";
import NotFound from './pages/NotFound';
import Home from './pages/home/Home';

function App() {

  return (
    <HashRouter>
      <AnimatePresence initial={false} mode={"wait"}>
        <RoutesD>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </RoutesD>
      </AnimatePresence>
    </HashRouter>
  )
}

export default App
