import logo from './logo.svg';
import './App.css';
import LmsAdminManagement from './pages/LmsAdminManagement';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { RequireAuth } from './components/RequireAuth';
import Appbar from './components/Appbar';


function App() {
  return (
    <div className="App">

      <AuthProvider>

    <Router>

    <Appbar/>
      <Routes>
        <Route path = "/" element={<Login />} />

        <Route path = "/LmsAdminManagement" element={
        <RequireAuth>
          <LmsAdminManagement/>
        </RequireAuth>} />

      </Routes>
    </Router>
    </AuthProvider>
  </div>
);

}

export default App;
