import { useContext } from "react";
import FLSubHeader from "../Subheader";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import useFetch from "../../../../hooks/useFetch";

function FLNotification() {
  const { token } = useContext(AuthContext);
  const { data: notifications, loading, refetch } = useFetch("/api/notifications");

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
      <FLSubHeader />
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
                  className={`flex items-start p-4 border rounded-lg transition-all ${notif.isRead ? "bg-white border-gray-200" : "bg-orange-50 border-orange-200"
                    }`}
                >
                  <div className={`flex-shrink-0 p-2 rounded-full ${notif.type === "project_assigned" ? "bg-green-100" :
                      notif.type === "application_rejected" ? "bg-red-100" : "bg-gray-100"
                    }`}>
                    <svg
                      className={`w-6 h-6 ${notif.type === "project_assigned" ? "text-green-600" :
                          notif.type === "application_rejected" ? "text-red-600" : "text-gray-600"
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1 4h.01M12 8h.01M21 12.2A9.2 9.2 0 113.8 12a9.2 9.2 0 0117.4.2z" />
                    </svg>
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
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FLNotification;

