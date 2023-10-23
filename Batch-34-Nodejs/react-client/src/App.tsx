import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard';
import NoPage from './pages/NoPage';
import Category from './pages/Category';
import Login from './pages/Login';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/category" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
