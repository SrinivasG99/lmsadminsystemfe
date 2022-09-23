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
import TeachingCoursesList from './pages/TeachingCoursesList';
import TeachingCourse from './pages/TeachingCourse';
import TeachingCourseSettings from './components/TeachingCourseSettings';
import TeachingFileList from './components/TeachingFileList';
import TeachingChildFileCover from './components/TeachingChildFileCover';



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

        <Route path = "/myTeachingCoursesList" element={
        <RequireAuth>
          <Appbar />
          <TeachingCoursesList/>
        </RequireAuth>} />

        <Route path = "/myTeachingCourse/:courseId" element={
        <RequireAuth>
          <Appbar />
          <TeachingCourse />
        </RequireAuth>} />

        <Route path = "/myTeachingCourse/:courseId/courseSettings" element={
        <RequireAuth>
          <Appbar />
          <TeachingCourseSettings />
        </RequireAuth>} />

        <Route path = "/myTeachingCourse/:courseId/files" element={
        <RequireAuth>
          <Appbar />
          <TeachingFileList />
        </RequireAuth>} />

        <Route path = "/myTeachingCourse/:courseId/files/:folderId" element={
        <>
          <Appbar />
          <TeachingChildFileCover/>
        </>} />

        <Route path = "/myTeachingCourse/:courseId/files" element={
        <RequireAuth>
          <Appbar />
          <TeachingFileList />
        </RequireAuth>} />

      </Routes>
    </Router>
    </AuthProvider>
  </div>
);

}

export default App;
