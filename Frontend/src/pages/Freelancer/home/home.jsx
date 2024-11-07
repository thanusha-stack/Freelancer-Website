import { Link } from 'react-router-dom';
import FreelancerImage from "../../../assets/images/FreelancerImage.svg"

function FLHome() {
  return (
    <section className="bg-gray-100 pb-9">
     <div className="flex flex-col-reverse items-center h-100 px-6 mx-5 mt-10 space-y-0 md:flex-row md:space-y-0">
                <div className="flex flex-col space-y-12 md:w-1/2">
                <h1 className="max-w-md text-2xl font-bold text-left mt-10 md:text-2xl md:text-left">Welcome back!</h1>
                    <h1 className="max-w-md text-4xl font-bold text-left md:text-5xl md:text-left">Search to build your products</h1>
                    <p className="max-w-sm text-center text-gray-500 md:text-left">
                    Welcome to Freelancer Haven,
                     where talented individuals like you 
                    find the freedom to thrive while pursuing their passions.
                    </p>
                    <div className="flex gap-10 justify-center md:justify-start">
                        <button className="block px-4 py-2 text-white font-bold bg-orange-500 rounded-lg baseline hover:bg-orange-700 transition-full">
                           <Link to="/JobsListPage">  Search Projects </Link></button>
                    </div>
                </div>     
            <div className="">
                <img  src={FreelancerImage} className="hidden md:block mr-4 max-w-md rounded-lg" alt="" />
            </div>
        </div>
    </section>
  );
}

export default FLHome;
