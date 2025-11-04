import { useState, useEffect } from "react";
import { useSidebar } from "../context/Sidebarcontext";
import { Pencil, Trash2, Plus, X } from "lucide-react";

export default function Checkout() {
  const { collapsed } = useSidebar();
  const [checkouts, setCheckouts] = useState([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const API_URL = "http://localhost:5000/api/checkouts";

  useEffect(() => {
    fetchCheckouts();
  }, []);

  const fetchCheckouts = async () => {
    try {
      const res = await fetch(`${API_URL}/getCheckOut`);
      const data = await res.json();
      setCheckouts(data.checkOut || []);
    } catch (err) {
      console.error("Error fetching checkouts:", err);
    }
  };

  const openModal = (index = null) => {
    if (index !== null) {
      const entry = checkouts[index];
      setEditIndex(index);
      setTime(entry.endTime);
      setDate(entry.endDate);
    } else {
      setEditIndex(null);
      setTime("");
      setDate("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTime("");
    setDate("");
    setEditIndex(null);
  };

  const handleSave = async () => {
    if (!time || !date) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/addCheckOut`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endDate: date,
          endTime: time,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save check-out");
      }

      alert("Check-out added!");
      closeModal();
      fetchCheckouts();
    } catch (error) {
      console.error("Error saving check-out:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this checkout?")) {
      const updated = checkouts.filter((_, i) => i !== index);
      setCheckouts(updated);
      alert("Checkout deleted!");
    }
  };

  return (
    <div
      className={`relative transition-all duration-300 w-full sm:ml-0 md:${
        collapsed ? "ml-20" : "ml-64"
      } p-4 sm:p-6`}
    >
      <div className={isModalOpen ? "blur-sm pointer-events-none select-none" : ""}>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-1 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white px-1 py-1 rounded-md shadow hover:opacity-90"
          >
            <Plus size={18} /> Add Check Out
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white">
              <tr className="border-b border-blue-300">
                <th className="text-left text-sm px-2 py-2">End Time</th>
                <th className="text-left text-sm px-2 py-2">End Date</th>
                <th className="text-left text-sm px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-900">
              {checkouts.length === 0 ? (
                <tr className="text-center">
                  <td colSpan={3} className="py-6 text-gray-500">
                    No check-outs found.
                  </td>
                </tr>
              ) : (
                checkouts.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition-colors">
                    <td className="px-4 py-2">{entry.endTime}</td>
                    <td className="px-4 py-2">{entry.endDate}</td>
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
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="h-full w-full max-w-md bg-white shadow-lg overflow-y-auto transition-all">
            <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-white">
              <h3 className="text-lg font-semibold text-blue-800">Add Check Out</h3>
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
                End Time <span className="text-red-500">*</span>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded bg-white transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
                />
              </label>

              <label className="flex flex-col text-sm text-gray-900">
                End Date <span className="text-red-500">*</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded bg-white transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
                />
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
                  Save Check Out
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
