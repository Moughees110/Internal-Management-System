import { useState, useEffect } from "react";
import { useSidebar } from "../context/Sidebarcontext";
import { Pencil, Trash2, Plus, X } from "lucide-react";

export default function Checkin() {
  const { collapsed } = useSidebar();
  const [checkins, setCheckins] = useState([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const API_URL = "http://localhost:5000/api/checkIn";

  useEffect(() => {
    fetchCheckins();
  }, []);

  const fetchCheckins = async () => {
    try {
      const response = await fetch(`${API_URL}/getCheckIn`);
      const data = await response.json();
      setCheckins(data.checkIn || []);
    } catch (err) {
      console.error("Error fetching check-ins:", err);
      alert("Failed to fetch check-ins. Check your backend and API URL.");
    }
  };

  const openModal = (index = null) => {
    if (index !== null) {
      const checkin = checkins[index];
      setTime(checkin.time);
      setDate(checkin.date);
      setStatus(checkin.status);
      setEditIndex(index);
    } else {
      setTime("");
      setDate("");
      setStatus("Pending");
      setEditIndex(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTime("");
    setDate("");
    setStatus("Pending");
    setEditIndex(null);
  };

  const handleSave = async () => {
    if (!time || !date || !status) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const payload = { time, date, status: status.toLowerCase() };
      const response = await fetch(`${API_URL}/addCheckIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save check-in");
      }

      alert(editIndex !== null ? "Check-in updated!" : "Check-in added!");
      closeModal();
      fetchCheckins();
    } catch (error) {
      console.error("Error saving check-in:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this check-in?"
    );
    if (!confirmDelete) return;

    const updated = checkins.filter((_, i) => i !== index);
    setCheckins(updated);
    alert("Check-in deleted (local only; implement DELETE API to persist).");
  };

  return (
    <div
      className={`relative transition-all duration-300 w-full sm:ml-0 md:${
        collapsed ? "ml-20" : "ml-64"
      } p-4 sm:p-6`}
    >
      <div
        className={isModalOpen ? "blur-sm pointer-events-none select-none" : ""}
      >
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-1 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white px-2 py-1 rounded-md shadow hover:opacity-90"
          >
            <Plus size={18} /> Add Check In
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white">
              <tr className="border-b border-blue-300">
                <th className="text-left text-sm px-2 py-2">Start Time</th>
                <th className="text-left text-sm px-2 py-2">Start Date</th>
                <th className="text-left text-sm px-2 py-2">Status</th>
                <th className="text-left text-sm px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-900">
              {checkins.length === 0 ? (
                <tr className="text-center">
                  <td colSpan={4} className="py-6 text-gray-500">
                    No check-ins found.
                  </td>
                </tr>
              ) : (
                checkins.map((entry, index) => (
                  <tr
                    key={entry.id || index}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-4 py-2">{entry.time}</td>
                    <td className="px-4 py-2">{entry.date}</td>
                    <td className="px-4 py-2 capitalize">{entry.status}</td>
                    <td className="px-4 py-2 flex gap-3">
                      <button
                        onClick={() => openModal(index)}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed top-17 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-lg overflow-y-auto transition-all">
          <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-white">
            <h3 className="text-lg font-semibold text-blue-800">
              {editIndex !== null ? "Edit Check In" : "Add Check In"}
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-700 hover:text-gray-900"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-red-600 hover:text-red-700" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="p-4 flex flex-col gap-4 bg-white"
          >
            <label className="flex flex-col text-sm text-gray-900">
              Start Time <span className="text-red-500">*</span>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              />
            </label>

            <label className="flex flex-col text-sm text-gray-900">
              Start Date <span className="text-red-500">*</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              />
            </label>

            <label className="flex flex-col text-sm text-gray-900">
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </label>

            <div className="flex justify-end gap-3 mt-4 bg-white">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white rounded"
              >
                Save Check In
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
