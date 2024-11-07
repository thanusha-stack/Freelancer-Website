
import Footer from "../../../components/footer/footer";
import JobsDash from "../../../components/JobSection/jobsDash";
import FLHome from "../home/home";
import FLSubHeader from "../Subheader/Subheader";

function FLDashboard() {

    return (
      <>
        <FLSubHeader/>
        <FLHome />
        <JobsDash />
        <Footer />
      </>
    )
  }
  
  export default FLDashboard;
  