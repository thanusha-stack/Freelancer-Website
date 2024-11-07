import {Link} from 'react-router-dom';
import Client from '../../../assets/images/Client.svg';

function ClientHome() {

    return (
      <>
        <section>
        <div className="flex flex-col-reverse items-center h-100 px-6 mx-5 mt-10 space-y-0 md:flex-row md:space-y-0">
                <div className="flex flex-col space-y-12 md:w-1/2">
                    <h1 className="max-w-md text-4xl font-bold text-center mt-10 md:text-5xl md:textleft">Search to build your products</h1>
                    <p className="max-w-md text- text-DEFAULT md:text-left">
                        HireElite makes it simple for software teams to plan 
                        day-to-day tasks
                        while keeping the larger team goals in view
                    </p>
                    <div className="flex justify-center md:justify-start">
                        <button className="block px-6 p-2 text-white bg-orange-500 rounded-lg text-bold baseline hover:bg-orange-300">
                           <Link to="/PostProject"> Post Project </Link></button>
                    </div>
                </div>     
            <div className="">
                <img  src={Client} className="hidden md:block mr-4 max-w-md rounded-lg" alt="" />
            </div>
        </div>
     </section>
      </>
    )
  }
  
  export default ClientHome;