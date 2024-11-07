import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Footer = () => {
  return (
    <div>
      <footer className="bg-gradient-to-r from-orange-500 to-orange-300 text-white pl-8 py-10 mt-10">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* For Clients */}
          <div>
            <h3 className="font-semibold mb-4">For Clients</h3>
            <ul>
              <li><Link to="#" className="text-white-400 hover:text-white">How to hire</Link></li>
              <li><Link to="#" className="text-white-400 hover:text-white">Talent Marketplace</Link></li>
              <li><Link to="#" className="text-white-400 hover:text-white">Project Catalog</Link></li>
              <li><Link to="#" className="text-white-400 hover:text-white">Hire an agency</Link></li>
              <li><Link to="#" className="text-white-400 hover:text-white">Enterprise</Link></li>
            </ul>
          </div>

          {/* For Talent */}
          <div>
            <h3 className="font-semibold mb-4">For Talent</h3>
            <ul>
              <li><Link to="#" className="text-white-400 hover:text-white">How to find work</Link></li>
              <li><Link to="#" className="text-white-400 hover:text-white">Direct Contracts</Link></li>
              <li><Link to="#" className="text-white-400 hover:text-white">Find jobs worldwide</Link></li>
              <li><Link to="#" className="text-white-400 hover:text-white">Win work with ads</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul>
              <li><Link to="#" className="text-white-400 hover:text-white">Help & Support</Link></li>
              <li><Link to="#" className="text-white-400 hover:text-white">Upwork Reviews</Link></li>
              <li><Link to="#" className="text-white-400 hover:text-white">Community</Link></li>
              <li><Link to="#" className="text-white-400 hover:text-white">Blog</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul>
              <li><Link to="#" className="text-white-400 hover:text-white">About Us</Link></li>
              <li><Link to="#" className="text-white-400 hover:text-white">Leadership</Link></li>
              <li><Link to="#" className="text-white-400 hover:text-white">Careers</Link></li>
              <li><Link to="#" className="text-white-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

        </div>

        {/* Social Media Links */}
        <div className="container mx-auto mt-10 flex justify-between items-center">
          <div className="text-white-400">
            <p>Follow us</p>
            <div className="flex space-x-4 mt-4">
              <Link to="#" className="text-white"><i className="fab fa-facebook-f"></i></Link>
              <Link to="#" className="text-white"><i className="fab fa-linkedin-in"></i></Link>
              <Link to="#" className="text-white"><i className="fab fa-twitter"></i></Link>
              <Link to="#" className="text-white"><i className="fab fa-instagram"></i></Link>
            </div>
          </div>
         
        </div>
      </footer>
      <div className='bg-gradient-to-r from-orange-500 to-orange-300' >
      <div className='border p-0'></div>
        <p className='mt-2 p-2 text-white'>&copy; {new Date().getFullYear()} HireElite. All rights reserved.</p>
     </div>
    </div>
  );
}

export default Footer;
