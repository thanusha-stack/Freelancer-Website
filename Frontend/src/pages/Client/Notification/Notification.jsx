import SubHeader from "../SubHeader/SubHeader";

function ClientNotification() {
  
    return (
    <div><SubHeader />
        <div className="min-h-screen bg-gray-100">
          <section className="max-w-4xl mx-auto p-6 sm:p-8 bg-white shadow-md rounded-lg mt-8">
            <p className="text-2xl font-semibold text-gray-700 mb-4">Notifications</p>
  
            <div className="space-y-4">
              {/* Example Notification 1 */}
              <div className="flex items-start p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="blue"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1 4h.01M12 8h.01M21 12.2A9.2 9.2 0 113.8 12a9.2 9.2 0 0117.4.2z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 font-medium">New Message</p>
                  <p className="text-sm text-gray-500">You have a new message from the client.</p>
                  <p className="text-xs text-gray-400 mt-1">10 mins ago</p>
                </div>
              </div>
  
              {/* Example Notification 2 */}
              <div className="flex items-start p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 p-2 bg-green-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="green"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m2 0a8 8 0 11-16 0 8 8 0 0116 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 font-medium">Job Application Approved</p>
                  <p className="text-sm text-gray-500">Your application for 'Graphic Designer' was approved.</p>
                  <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                </div>
              </div>
  
              {/* Example Notification 3 */}
              <div className="flex items-start p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 p-2 bg-red-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="red"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 font-medium">Payment Failed</p>
                  <p className="text-sm text-gray-500">We couldn’t process your payment. Please try again.</p>
                  <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                </div>
              </div>
           
  
              {/* Example Notification 1 */}
              <div className="flex items-start p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 p-2 bg-yellow-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="orange"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l2 2m4-2a8 8 0 11-16 0 8 8 0 0116 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 font-medium">Reminder</p>
                  <p className="text-sm text-gray-500">Don't forget to submit your timesheet for this week.</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
  
              {/* Example Notification 2 */}
              <div className="flex items-start p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 p-2 bg-purple-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="purple"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1 4h.01M12 8h.01M21 12.2A9.2 9.2 0 113.8 12a9.2 9.2 0 0117.4.2z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 font-medium">New Project Invitation</p>
                  <p className="text-sm text-gray-500">You've been invited to join the 'Mobile App Redesign' project.</p>
                  <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                </div>
              </div>
  
              {/* Example Notification 3 */}
              <div className="flex items-start p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 p-2 bg-teal-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="teal"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 9l3-3 3 3m0 6l-3 3-3-3"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 font-medium">System Update</p>
                  <p className="text-sm text-gray-500">
                    Our platform will undergo maintenance from 12 AM to 2 AM UTC.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                </div>
              </div>
            </div>
          </section>
        </div>
    </div>
    );
  }
  
  export default ClientNotification;
  