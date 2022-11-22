import "./App.css";
import LmsAdminManagement from "./pages/LmsAdminManagement";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";
import Appbar from "./components/Appbar";
import MyProfile from "./pages/MyProfile";
import Learner from "./pages/Learner";
import OrgAdmin from "./pages/OrgAdmin";
import TeachingCoursesList from "./pages/TeachingCoursesList";
import TeachingCourse from "./pages/TeachingCourse";
import TeachingCourseSettings from "./components/TeachingCourseSettings";
import TeachingFileList from "./components/TeachingFileList";
import TeachingChildFileCover from "./components/TeachingChildFileCover";
import PendingApprovalReq from "./pages/PendingApprovalReq";
import ApprovedApprovalReq from "./pages/ApprovedApprovalReq";
import RejectedApprovalReq from "./pages/RejectedApprovalReq";
import Tags from "./pages/Tags";
import LearnerTransaction from "./pages/LearnerTransaction";
import OrgBalance from "./pages/OrgBalance";
import LmsTransaction from "./pages/LmsTransaction";
import Refund from "./pages/Refund";
import RefundTransactions from "./pages/RefundTransactions";
import Test from "./components/Test";
import RewardsPage from "./pages/RewardPage";
import CreateNewReward from "./pages/CreateNewReward";
import PendingRequestsList from "./components/PendingRequestsList";
import ResolvedRequestsList from "./components/ResolvedRequestsList";
import PendingReelApprovals from "./pages/PendingReelApprovals";
import ApprovedReels from "./pages/ApprovedReels";
import RejectedReels from "./pages/RejectedReels";
import ListOfEnhancement from './pages/ListOfEnhancementItem';
import CreateNewEnhancementItem from './pages/CreateNewEnhancementItem';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          {/* <Appbar/> */}
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/LmsAdminManagement"
              element={
                <RequireAuth>
                  <Appbar />
                  <LmsAdminManagement />
                </RequireAuth>
              }
            />

            <Route
              path="/MyProfile"
              element={
                <RequireAuth>
                  <Appbar />
                  <MyProfile />
                </RequireAuth>
              }
            />

            <Route
              path="/OrgAdmin"
              element={
                <RequireAuth>
                  <Appbar />
                  <OrgAdmin />
                </RequireAuth>
              }
            />

            <Route
              path="/Learner"
              element={
                <RequireAuth>
                  <Appbar />
                  <Learner />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCoursesList"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingCoursesList />
                </RequireAuth>
              }
            />

            <Route
              path="/rewardsPage"
              element={
                <RequireAuth>
                  <Appbar />
                  <RewardsPage />
                </RequireAuth>
              }
            />

            <Route
              path="/createNewReward"
              element={
                <RequireAuth>
                  <Appbar />
                  <CreateNewReward />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:courseId"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingCourse />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:courseId/courseSettings"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingCourseSettings />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:courseId/files"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingFileList />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:courseId/files/:folderId"
              element={
                <>
                  <Appbar />
                  <TeachingChildFileCover />
                </>
              }
            />

            <Route
              path="/myTeachingCourse/:courseId/files"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingFileList />
                </RequireAuth>
              }
            />

            <Route
              path="/ApprovedApprovalReq"
              element={
                <RequireAuth>
                  <Appbar />
                  <ApprovedApprovalReq />
                </RequireAuth>
              }
            />

            <Route
              path="/PendingApprovalReq"
              element={
                <RequireAuth>
                  <Appbar />
                  <PendingApprovalReq />
                </RequireAuth>
              }
            />

            <Route
              path="/RejectedApprovalReq"
              element={
                <RequireAuth>
                  <Appbar />
                  <RejectedApprovalReq />
                </RequireAuth>
              }
            />

            <Route
              path="/tags"
              element={
                <RequireAuth>
                  <Appbar />
                  <Tags />
                </RequireAuth>
              }
            />

            <Route
              path="/learnerTransaction"
              element={
                <RequireAuth>
                  <Appbar />
                  <LearnerTransaction />
                </RequireAuth>
              }
            />

            <Route
              path="/OrgBalance"
              element={
                <RequireAuth>
                  <Appbar />
                  <OrgBalance />
                </RequireAuth>
              }
            />

            <Route
              path="/lmsTransaction"
              element={
                <RequireAuth>
                  <Appbar />
                  <LmsTransaction />
                </RequireAuth>
              }
            />

            <Route
              path="/refund"
              element={
                <RequireAuth>
                  <Appbar />
                  <Refund />
                </RequireAuth>
              }
            />

            <Route
              path="/refundTransactions"
              element={
                <RequireAuth>
                  <Appbar />
                  <RefundTransactions />
                </RequireAuth>
              }
            />

            <Route
              path="/pendingReelApprovals"
              element={
                <RequireAuth>
                  <Appbar />
                  <PendingReelApprovals />
                </RequireAuth>
              }
            />

            <Route
              path="/approvedReels"
              element={
                <RequireAuth>
                  <Appbar />
                  <ApprovedReels />
                </RequireAuth>
              }
            />

            <Route
              path="/rejectedReels"
              element={
                <RequireAuth>
                  <Appbar />
                  <RejectedReels />
                </RequireAuth>
              }
            />

            <Route
              path="/pendingRequests"
              element={
                <RequireAuth>
                  <Appbar />
                  <PendingRequestsList />
                </RequireAuth>
              }
            />

            <Route
              path="/resolvedRequests"
              element={
                <RequireAuth>
                  <Appbar />
                  <ResolvedRequestsList />
                </RequireAuth>
              }
            />
            <Route path="/listOfEnhancementItems" element={
              <RequireAuth>
                <Appbar />
                <ListOfEnhancement />
              </RequireAuth>} />

              <Route path="/createNewEnhancement" element={
              <RequireAuth>
                <Appbar />
                <CreateNewEnhancementItem/>
              </RequireAuth>} />

              <Route path="/dummyPath" element={
                <Test />
               } />

            <Route path="/dummyPath" element={<Test />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
