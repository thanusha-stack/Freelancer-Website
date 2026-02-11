import { useContext, useState, useEffect } from "react";
import SubHeader from "../SubHeader/SubHeader";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

function ClientNotification() {
  const { token } = useContext(AuthContext);
  const { data: notifications, loading, refetch } = useFetch("/api/notifications");
  const [actionLoading, setActionLoading] = useState(null);

  const handleAction = async (notificationId, applicationId, action) => {
    setActionLoading(notificationId);
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/applications/${applicationId}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Mark notification as read
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/notifications/${notificationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Application ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
      refetch(); // Refresh notifications
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || `Failed to ${action} application`);
    } finally {
      setActionLoading(null);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <SubHeader />
      <div className="min-h-screen bg-gray-100 py-8">
        <section className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-700">Notifications</h1>
            {notifications?.length > 0 && (
              <button
                onClick={async () => {
                  await axios.patch(`${import.meta.env.VITE_API_URL}/api/notifications/read-all`, {}, { headers: { Authorization: `Bearer ${token}` } });
                  refetch();
                }}
                className="text-orange-500 hover:underline text-sm font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-center text-gray-500 py-10">Loading notifications...</p>
            ) : notifications?.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No notifications yet.</p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`flex flex-col p-4 border rounded-lg transition-all ${notif.isRead ? "bg-white border-gray-200" : "bg-orange-50 border-orange-200"
                    }`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 p-2 rounded-full ${notif.type === "application_received" ? "bg-blue-100" : "bg-gray-100"
                      }`}>
                      {notif.type === "application_received" ? (
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1 4h.01M12 8h.01M21 12.2A9.2 9.2 0 113.8 12a9.2 9.2 0 0117.4.2z" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <p className={`font-medium ${notif.isRead ? "text-gray-700" : "text-gray-900"}`}>
                          {notif.message}
                        </p>
                        <span className="text-xs text-gray-400">
                          {new Date(notif.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {notif.type === "application_received" && notif.applicationId?.status === "Pending" && (
                        <div className="mt-4 flex flex-wrap gap-3">
                          <Link
                            to={`/FLViewProfile/${notif.senderId._id}`}
                            className="text-sm font-medium text-blue-600 hover:underline"
                          >
                            View Freelancer Profile
                          </Link>
                          <button
                            disabled={actionLoading === notif._id}
                            onClick={() => handleAction(notif._id, notif.applicationId._id, 'approve')}
                            className="px-4 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:bg-gray-400 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            disabled={actionLoading === notif._id}
                            onClick={() => handleAction(notif._id, notif.applicationId._id, 'reject')}
                            className="px-4 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:bg-gray-400 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {notif.type === "application_received" && notif.applicationId?.status !== "Pending" && (
                        <p className="mt-2 text-sm italic text-gray-500">
                          Status: {notif.applicationId.status}
                        </p>
                      )}

                      {!notif.isRead && (
                        <button
                          onClick={() => markAsRead(notif._id)}
                          className="mt-2 text-xs text-gray-500 hover:text-orange-500"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ClientNotification;

