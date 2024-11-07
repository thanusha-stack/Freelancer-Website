import FreelancerSection from "../../../components/FLsection/FreeLancer";
import Footer from "../../../components/footer/footer";
import ClientHome from "../ClientHome/ClientHome";
import SubHeader from "../SubHeader/SubHeader";


function ClientDashboard() {

    return (
      <>
        <SubHeader/>
        <ClientHome />
        <FreelancerSection />
        <Footer />
      </>
    )
  }
  
  export default ClientDashboard;
  