import React from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed
import logo1 from '../assets/images/google.jpeg';
import logo2 from '../assets/images/trust.png';
import WebsiteDeveloper from '../assets/images/WebsiteDeveloper.svg';

function Dashboard() {
  return (
    <div>
      {/* Section 1 */}
      <section>
        <div className="flex flex-col items-center px-6 mx-5 mt-5 space-y-0 md:flex-row md:space-y-0">
          {/* Left item */}
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
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
<path fill="#3f51b5" d="M48 16L48 14 40.469 14 39.809 16zM33 31L33 29 29 29 27 29 27 31zM39.766 28L40.51 26 34.51 26 35.266 28zM29 26H33V28H29zM29 23H33V25H29zM42 29L42 31 48 31 48 29 46 29zM36.181 19L35.521 17 27 17 27 19 29 19zM37.17 22L36.51 20 29 20 29 22zM33.378 23L34.133 25 40.883 25 41.628 23zM42 23H46V25H42zM27 32H33V34H27zM35.191 16L34.531 14 27 14 27 16zM36.776 32L37.531 34 38.276 32zM42 32H48V34H42zM39.479 17L38.819 19 46 19 48 19 48 17zM39.393 29L35.643 29 36.398 31 38.648 31zM42 26H46V28H42zM38.49 20L37.83 22 46 22 46 20zM0 14H8V16H0zM0 17H8V19H0zM2 20H6V22H2zM2 23H6V25H2zM2 26H6V28H2zM0 29H8V31H0zM0 32H8V34H0zM10 17H18V19H10zM24.977 16c-.913-1.208-2.347-2-3.977-2H10v2h7.023H24.977z"></path><path fill="#3f51b5" d="M25.578 17h-9.131C16.171 17.613 16 18.283 16 19h10C26 18.288 25.846 17.613 25.578 17zM23.975 23H12v2h11.973c-.833-.62-1.854-1-2.973-1C22.119 24 23.142 23.621 23.975 23zM17.023 32H10v2h11c1.63 0 3.065-.792 3.977-2H17.023zM18 29h-2-6v2h6.447H18h7.578C25.846 30.387 26 29.712 26 29H18zM21 20c0 0 0 .083 0 1s-1 1-1 1h4.979c.441-.584.77-1.257.921-2H21zM12 20H17V22H12z"></path><g><path fill="#3f51b5" d="M21 28h4.885c-.156-.738-.467-1.418-.907-2H20c0 0 1 .167 1 1S21 28 21 28zM12 26H17V28H12z"></path></g>
</svg><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
<path fill="#0d62ab" d="M18.7,13.767l0.005,0.002C18.809,13.326,19.187,13,19.66,13h13.472c0.017,0,0.034-0.007,0.051-0.006	C32.896,8.215,28.887,6,25.35,6H11.878c-0.474,0-0.852,0.335-0.955,0.777l-0.005-0.002L5.029,33.813l0.013,0.001	c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,0.991,1,0.991h8.071L18.7,13.767z"></path><path fill="#199be2" d="M33.183,12.994c0.053,0.876-0.005,1.829-0.229,2.882c-1.281,5.995-5.912,9.115-11.635,9.115	c0,0-3.47,0-4.313,0c-0.521,0-0.767,0.306-0.88,0.54l-1.74,8.049l-0.305,1.429h-0.006l-1.263,5.796l0.013,0.001	c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,1,1,1h7.333l0.013-0.01c0.472-0.007,0.847-0.344,0.945-0.788l0.018-0.015	l1.812-8.416c0,0,0.126-0.803,0.97-0.803s4.178,0,4.178,0c5.723,0,10.401-3.106,11.683-9.102	C42.18,16.106,37.358,13.019,33.183,12.994z"></path><path fill="#006fc4" d="M19.66,13c-0.474,0-0.852,0.326-0.955,0.769L18.7,13.767l-2.575,11.765	c0.113-0.234,0.359-0.54,0.88-0.54c0.844,0,4.235,0,4.235,0c5.723,0,10.432-3.12,11.713-9.115c0.225-1.053,0.282-2.006,0.229-2.882	C33.166,12.993,33.148,13,33.132,13H19.66z"></path>
</svg>
              </div>
            </div>
          </div>
          {/* Right item - Illustration */}
          <div>
            <img src={WebsiteDeveloper} alt="Illustration" className="hidden md:block" />
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section>
        <div className="flex flex-col px-4 mx-5 mt-10 space-y-12 md:space-y-0 md:flex-row">
          {/* Left content */}
          <div className="flex flex-col space-y-12 md:w-1/2">
            <h2 className="max-w-md text-4xl font-bold text-center md:text-left">
              What's different about HireElite?
            </h2>
            <p className="max-w-sm text-center text-gray-500 md:text-left">
              HireElite provides all the functionality your team needs, without the complexity. Our software is tailor-made for modern digital product teams.
            </p>
          </div>

          {/* Right content - Features */}
          <div className="flex flex-col space-y-8 md:w-1/2">
            {/* List Item 1 */}
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

            {/* List Item 2 */}
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

            {/* List Item 3 */}
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
