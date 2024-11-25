import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Landing from './components/landing';
import ProtectedRoute from './components/protectedRoute';
import Admin from './components/admin';
import Login from './components/login';
import Error from './components/error';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Landing />} />

        {/* Ruta de Login, no necesita estar protegida */}
        <Route path="/login" element={<Login />} />

        {/* Ruta para admins, protegida por login */}
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        
        {/* Ruta para manejar errores */}
        <Route path="/error" element={<Error />} />
        
        {/* Redirección para rutas no existentes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
