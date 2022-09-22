import logo from './logo.svg';
import './App.css';
import LmsAdminManagement from './pages/LmsAdminManagement';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { RequireAuth } from './components/RequireAuth';
import Appbar from './components/Appbar';
import MyProfile from './pages/MyProfile';
import Learner from './pages/Learner'
import OrgAdmin from './pages/OrgAdmin'



function App() {
  return (
    <div className="App">

      <AuthProvider>

    <Router>

    {/* <Appbar/> */}
      <Routes>
        <Route path = "/" element={<Login />} />

        <Route path = "/LmsAdminManagement" element={
        <RequireAuth>
          <Appbar />
          <LmsAdminManagement/>
        </RequireAuth>} />

        <Route path = "/MyProfile" element={
        <RequireAuth>
          <Appbar />
          <MyProfile/>
        </RequireAuth>} />

        <Route path = "/OrgAdmin" element={
        <RequireAuth>
          <Appbar />
          <OrgAdmin/>
        </RequireAuth>} />

        <Route path = "/Learner" element={
        <RequireAuth>
          <Appbar />
          <Learner/>
        </RequireAuth>} />
      </Routes>
    </Router>
    </AuthProvider>
  </div>
);

}

export default App;
