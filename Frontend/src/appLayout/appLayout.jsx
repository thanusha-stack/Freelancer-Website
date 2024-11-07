import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import MainDashboard from '../pages/MainDashboard';
import FLHome from '../pages/Freelancer/home/home';
import FLDashboard from '../pages/Freelancer/Dashboard/Dashboard';
import Certify from '../pages/Freelancer/Certificy/Certify'
import ClientProfile from '../pages/Client/profile/Profile';
import ClientHome from '../pages/Client/ClientHome/ClientHome';
import ClientDashboard from '../pages/Client/ClientDashboard/ClientDashboard';
import PostProject from '../pages/Client/PostProject/Post';
import Messaging from '../components/Message/Message';
import AboutUs from '../components/About Us/AboutUs';
import MessageToggle from '../components/MessageToggle/MessageToggle';
import Support from '../components/Support/Support';
import LiveChat from '../components/live chat/liveChat';
import Login from '../components/login/login';
import Signup from '../components/SignUp/SignUp';
import GetInfo from '../components/GetInfo/signIn';
import FreelancerPage from '../components/FRLists/FRLists';
import ViewProjects from '../pages/Freelancer/ViewProjects/ViewProjects';
import ClientViewProjects from '../pages/Client/ViewProjects/ViewProjects';
import FLViewProfile from '../pages/Freelancer/ViewProfile/ViewProfile';
import JobDescription from '../components/JobDescription/JobDescription';
import SubHeader from '../pages/Client/SubHeader/SubHeader';
import CLNotifyBell from '../pages/Client/NotifyBell/NotifyBell';
import ClientNotification from '../pages/Client/Notification/Notification';
import FLNotification from '../pages/Freelancer/Subheader/Notification/Notification';
import FLSubHeader from '../pages/Freelancer/Subheader/Subheader';
import JobsListPage from '../components/JobLists/JobLists';
import JobsDash from '../components/JobSection/jobsDash';
import JobsCard from '../components/JobLists/JobsCard.jsx/JobsCard';

function App() {
  
  return (
    <Router>
      <Navbar />
    <div className="mt-16 bg-gray-100">
      <Routes>
        <Route path="/" element={<MainDashboard/>} /> 
        <Route path="/GetInfo" element={<GetInfo />} />
        <Route path="/Certify" element={<Certify />} /> 
        <Route path="/FLDashboard" element={<FLDashboard /> } /> 
        <Route path="/FLHome" element={<FLHome />} />
        <Route path="/PostProject" element={<PostProject />} />
        <Route path="/ClientProfile" element={<ClientProfile />} />
        <Route path="/ClientHome" element={<ClientHome />}></Route>
        <Route path="/ClientDashboard" element={<ClientDashboard />} />
        <Route path="/Messaging" element={<Messaging />} />
        <Route path="/AboutUS" element={<AboutUs/>} />
        <Route path="/MessageToggle" element={<MessageToggle />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/LiveChat" element={ <LiveChat /> } />
        <Route path="/Login" element={<Login /> } />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/FreelancerPage" element={<FreelancerPage />} />
        <Route path="/ViewProjects" element={ <ViewProjects /> } />
        <Route path="/FLViewProfile" element={<FLViewProfile />} />
        <Route path="/ClientViewProjects" element={ <ClientViewProjects />} />
        <Route path="/JobDescription" element={<JobDescription />} />
        <Route path="/SubHeader" element={<SubHeader />}/>
        <Route path="/CLNotifyBell" element={<CLNotifyBell/>} />
        <Route path="/ClientNotification" element={<ClientNotification/>} />
        <Route path="/FLNotification" element={<FLNotification/>} />
        <Route path="/FLSubheader" element={<FLSubHeader/>} />
        <Route path="/JobsDash" element={<JobsDash />}/>
        <Route path="/JobsListPage" element={<JobsListPage />} /> 
        <Route path="/JobsCard" element={<JobsCard/>}/>
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
