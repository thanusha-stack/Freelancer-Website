import React, { Suspense, lazy } from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import FloatBar from '../components/FloatBar/FloatBar';
import ProtectedRoutes from "../routes/ProtectedRoutes";
import { Routes, Route } from "react-router-dom";

// Lazy loaded components
const MainDashboard = lazy(() => import('../pages/MainDashboard'));
const FLHome = lazy(() => import('../pages/Freelancer/home/home'));
const FLDashboard = lazy(() => import('../pages/Freelancer/Dashboard/Dashboard'));
const Certify = lazy(() => import('../pages/Freelancer/Certificy/Certify'));
const ClientProfileCreate = lazy(() => import('../components/ClientProfileCreate/ClientProfileCreate'));
const ClientProfile = lazy(() => import('../pages/Client/profile/profile'));
const ClientHome = lazy(() => import('../pages/Client/ClientHome/ClientHome'));
const ClientDashboard = lazy(() => import('../pages/Client/ClientDashboard/ClientDashboard'));
const PostProject = lazy(() => import('../pages/Client/PostProject/Post'));
const Messaging = lazy(() => import('../components/Message/Message'));
const AboutUs = lazy(() => import('../components/About Us/AboutUs'));
const MessageToggle = lazy(() => import('../components/MessageToggle/MessageToggle'));
const Support = lazy(() => import('../components/Support/Support'));
const LiveChat = lazy(() => import('../components/live chat/liveChat'));
const Login = lazy(() => import('../components/login/login'));
const GetInfo = lazy(() => import('../components/GetInfo/signIn'));
const FreelancerPage = lazy(() => import('../components/FRLists/FRLists'));
const ViewProjects = lazy(() => import('../pages/Freelancer/ViewProjects/ViewProjects'));
const ClientViewProjects = lazy(() => import('../pages/Client/ViewProjects/ViewProjects'));
const FLViewProfile = lazy(() => import('../pages/Freelancer/ViewProfile/ViewProfile'));
const JobDescription = lazy(() => import('../components/JobDescription/JobDescription'));
const SubHeader = lazy(() => import('../pages/Client/SubHeader/SubHeader'));
const CLNotifyBell = lazy(() => import('../pages/Client/NotifyBell/NotifyBell'));
const ClientNotification = lazy(() => import('../pages/Client/Notification/Notification'));
const FLNotification = lazy(() => import('../pages/Freelancer/Subheader/Notification/Notification'));
const FLSubHeader = lazy(() => import('../pages/Freelancer/Subheader/Subheader'));
const JobsListPage = lazy(() => import('../components/JobLists/JobLists'));
const JobsDash = lazy(() => import('../components/JobSection/jobsDash'));
const JobsCard = lazy(() => import('../components/JobLists/JobsCard.jsx/JobsCard'));
const Profile = lazy(() => import('../pages/Freelancer/Certificy/profile/Profile'));
const { ProfileProvider } = lazy(() => import('../pages/Freelancer/Certificy/profile/profileProvider/profilrprovider'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
  </div>
);

function App() {
  return (
    <>
      <Navbar />
      <div className="mt-16 bg-gray-100">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/GetInfo" element={<GetInfo />} />
            <Route path="/Certify" element={<Certify />} />
            <Route path="/profileProvider" element={<ProfileProvider />} />
            <Route path="/clientProfileCreate" element={<ClientProfileCreate />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/FLDashboard" element={<FLDashboard />} />
            <Route path="/FLHome" element={<FLHome />} />
            <Route path="/PostProject" element={<PostProject />} />
            <Route path="/ClientProfile" element={<ClientProfile />} />
            <Route path="/ClientHome" element={<ClientHome />} />
            <Route path="/ClientDashboard" element={<ClientDashboard />} />
            <Route path="/Messaging" element={<Messaging />} />
            <Route path="/AboutUS" element={<AboutUs />} />
            <Route path="/MessageToggle" element={<MessageToggle />} />
            <Route path="/Support" element={<Support />} />
            <Route path="/LiveChat" element={<LiveChat />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<Login />} />

            <Route path="/FreelancerPage" element={
              <ProtectedRoutes>
                <FreelancerPage />
              </ProtectedRoutes>
            } />

            <Route path="/ViewProjects" element={
              <ProtectedRoutes>
                <ViewProjects />
              </ProtectedRoutes>
            } />
            <Route path="/FLViewProfile" element={
              <ProtectedRoutes>
                <FLViewProfile />
              </ProtectedRoutes>} />
            <Route path="/FLViewProfile/:id" element={
              <ProtectedRoutes>
                <FLViewProfile />
              </ProtectedRoutes>} />
            <Route path="/ClientViewProjects" element={
              <ProtectedRoutes>
                <ClientViewProjects />
              </ProtectedRoutes>
            } />
            <Route path="/JobDescription" element={<JobDescription />} />
            <Route path="/SubHeader" element={<SubHeader />} />
            <Route path="/CLNotifyBell" element={<CLNotifyBell />} />
            <Route path="/ClientNotification" element={<ClientNotification />} />
            <Route path="/FLNotification" element={<FLNotification />} />
            <Route path="/FLSubheader" element={<FLSubHeader />} />
            <Route path="/JobsDash" element={<JobsDash />} />

            <Route path="/JobsListPage" element={
              <ProtectedRoutes>
                <JobsListPage />
              </ProtectedRoutes>
            } />

            <Route path="/JobsCard" element={<JobsCard />} />
            <Route path="/footer" element={<Footer />} />
          </Routes>
        </Suspense>
      </div>
      <FloatBar />
    </>
  );
}

export default App;
