import React from "react";
import { Link } from "react-router-dom";
import logo1 from '../assets/images/google.jpeg';
import logo2 from '../assets/images/trust.png';
import twitterLogo from '../assets/images/twitter.svg';
import WebsiteDeveloper from '../assets/images/WebsiteDeveloper.svg';

function Dashboard() {
  return (
    <div>
      <section>
        <div className="flex flex-col items-center px-6 mx-5 mt-5 space-y-0 md:flex-row md:space-y-0">
          <div className="flex flex-col space-y-12 md:w-1/2">
            <h1 className="max-w-md text-4xl font-bold text-left md:text-5xl md:text-left">
              Bring everyone together to build products
            </h1>
            <p className="max-w-sm text-center text-gray-500 md:text-left">
              HireElite makes it simple for software teams to plan day-to-day tasks while keeping the larger team goals in view.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link to="/GetInfo" className="block px-6 py-2 text-white bg-orange-500 rounded-full baseline hover:bg-orange-300">
                Get Started
              </Link>
            </div>
            <div>
              <p className="text-gray-500 text-1xl">Trusted by</p>
              <div className="flex space-x-8 pt-7">
                <a href="https://mysore-tourism.onrender.com" target="_blank" rel="noopener noreferrer">
                  <img src={twitterLogo} alt="Mysore Tourism" className="h-10 w-auto hover:opacity-80 transition-opacity" />
                  <p>Mysore Tourism</p>
                </a>
              </div>
            </div>
          </div>
          <div>
            <img src={WebsiteDeveloper} alt="Illustration" className="hidden md:block" />
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col px-4 mx-5 mt-10 space-y-12 md:space-y-0 md:flex-row">
          <div className="flex flex-col space-y-12 md:w-1/2">
            <h2 className="max-w-md text-4xl font-bold text-center md:text-left">
              What's different about HireElite?
            </h2>
            <p className="max-w-sm text-center text-gray-500 md:text-left">
              HireElite provides all the functionality your team needs, without the complexity. Our software is tailor-made for modern digital product teams.
            </p>
          </div>

          <div className="flex flex-col space-y-8 md:w-1/2">
            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="rounded-l-full bg-orange-200 md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-white rounded-full md:py-1 bg-orange-500">
                    01
                  </div>
                  <h3 className="text-base font-bold md:mb-4 md:hidden">
                    Track company-wide progress
                  </h3>
                </div>
              </div>
              <div>
                <h3 className="hidden mb-4 text-lg font-bold md:block">
                  Track company-wide progress
                </h3>
                <p className="text-gray-700">
                  See how your day-to-day tasks fit into the wider vision. Go from tracking progress at the milestone level all the way down to the smallest of details. Never lose sight of the bigger picture again.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="rounded-l-full bg-orange-200 md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-white rounded-full md:py-1 bg-orange-500">
                    02
                  </div>
                  <h3 className="text-base font-bold md:mb-4 md:hidden">
                    Advanced built-in reports
                  </h3>
                </div>
              </div>
              <div>
                <h3 className="hidden mb-4 text-lg font-bold md:block">
                  Advanced built-in reports
                </h3>
                <p className="text-gray-700">
                  Set internal delivery estimates and track progress toward company goals. Our customizable dashboard helps you build out the reports you need to keep key stakeholders informed.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="rounded-l-full bg-orange-200 md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-white rounded-full md:py-1 bg-orange-500">
                    03
                  </div>
                  <h3 className="text-base font-bold md:mb-4 md:hidden">
                    Everything you need in one place
                  </h3>
                </div>
              </div>
              <div>
                <h3 className="hidden mb-4 text-lg font-bold md:block">
                  Everything you need in one place
                </h3>
                <p className="text-gray-700">
                  Stop jumping from one service to another to communicate, store files, track tasks, and share documents.  HireElite offers an all-in-one team productivity solution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
